#!/usr/bin/env bash
#
# First-time provisioning of UniLab on the catter.app droplet, served at
# unilab.mlbbshop.app.
#
# Run this ONCE, after both preconditions below are true. After that, ordinary
# updates go through ./deploy.sh (point it at this host with the env vars shown
# at the bottom).
#
# PRECONDITIONS (this script checks them and stops if unmet):
#   1. SSH:  `ssh catter true` succeeds. The alias is in ~/.ssh/config; if the
#            key is rejected, add THIS Mac's public key to the droplet:
#              ssh-copy-id -i ~/.ssh/id_ed25519.pub <user>@129.212.146.127
#            (from a shell where you can authenticate), or paste
#            ~/.ssh/id_ed25519.pub into /root/.ssh/authorized_keys there, and set
#            the correct User in the `Host catter` block of ~/.ssh/config.
#   2. DNS:  unilab.mlbbshop.app  →  129.212.146.127 (an A record), propagated.
#            Let's Encrypt validates over HTTP to this name, so it must resolve
#            to the catter droplet before the cert can be issued.
#
# It is idempotent: safe to re-run. It never touches whatever else the droplet
# already serves — it adds a vhost that sorts after any existing one and does
# not claim default_server.

set -euo pipefail

HOST="${UNILAB_HOST:-catter}"
DOMAIN="${UNILAB_DOMAIN:-unilab.mlbbshop.app}"
EXPECT_IP="129.212.146.127"
REMOTE_DIR="/var/www/unilab"
HERE="$(cd "$(dirname "$0")" && pwd)"
VHOST_SRC="/private/tmp/claude-501/-Users-thomas-Backbencher-Projects-UniLab/8b2abff8-896c-425c-9807-56d002aa6568/scratchpad/unilab-mlbbshop.nginx"
HEADERS_SRC="/private/tmp/claude-501/-Users-thomas-Backbencher-Projects-UniLab/8b2abff8-896c-425c-9807-56d002aa6568/scratchpad/unilab-headers.conf"

say()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
fail() { printf '\033[31mSTOP: %s\033[0m\n' "$*"; exit 1; }

say "0/6  Checking preconditions"
ssh -o BatchMode=yes -o ConnectTimeout=12 "$HOST" true 2>/dev/null \
  || fail "cannot SSH to '$HOST'. Add this Mac's key to the droplet and set the right User in ~/.ssh/config (see header)."
echo "  ok  ssh $HOST"

resolved="$(dig +short "$DOMAIN" A | tail -1)"
[ "$resolved" = "$EXPECT_IP" ] \
  || fail "DNS: $DOMAIN resolves to '${resolved:-nothing}', not $EXPECT_IP. Add the A record and wait for it to propagate."
echo "  ok  $DOMAIN → $EXPECT_IP"

[ -f "$VHOST_SRC" ]   || fail "missing $VHOST_SRC"
[ -f "$HEADERS_SRC" ] || fail "missing $HEADERS_SRC"
[ -f "$HERE/dist/index.html" ] || { say "building"; (cd "$HERE" && npm run build); }

say "1/6  Ensuring nginx + certbot + a shared ACME webroot exist"
ssh "$HOST" 'set -e
  command -v nginx  >/dev/null || { sudo apt-get update -qq && sudo apt-get install -y -qq nginx; }
  command -v certbot>/dev/null || sudo apt-get install -y -qq certbot python3-certbot-nginx
  sudo mkdir -p /var/www/letsencrypt /etc/nginx/snippets
  echo "  nginx $(nginx -v 2>&1 | grep -oE "[0-9.]+" | head -1), certbot $(certbot --version 2>&1 | grep -oE "[0-9.]+" | head -1)"'

say "2/6  Installing the shared headers snippet"
scp -q "$HEADERS_SRC" "$HOST:/tmp/unilab-headers.conf"
ssh "$HOST" 'sudo mv /tmp/unilab-headers.conf /etc/nginx/snippets/unilab-headers.conf'

say "3/6  Installing an HTTP-only vhost so certbot can validate"
# The HTTPS half of the vhost references a cert that does not exist yet, so nginx
# would refuse to load it. Ship a minimal HTTP vhost first, get the cert, then
# drop in the full config in step 5.
ssh "$HOST" "sudo tee /etc/nginx/sites-available/unilab >/dev/null <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;
    location ^~ /.well-known/acme-challenge/ { root /var/www/letsencrypt; default_type \"text/plain\"; }
    location / { return 200 'provisioning'; }
}
NGINX
sudo mkdir -p /etc/nginx/sites-enabled
sudo ln -sfn /etc/nginx/sites-available/unilab /etc/nginx/sites-enabled/unilab
# Make sure nginx.conf actually includes sites-enabled (nginx-full does; some do not).
grep -q 'sites-enabled' /etc/nginx/nginx.conf || sudo sed -i '/http {/a \    include /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf
sudo nginx -t && sudo systemctl reload nginx"
echo "  ok  HTTP vhost live"

say "4/6  Issuing the Let's Encrypt certificate"
ssh "$HOST" "sudo certbot certonly --webroot -w /var/www/letsencrypt -d $DOMAIN \
  --non-interactive --agree-tos --register-unsafely-without-email --keep-until-expiring 2>&1 | tail -4"

# certbot's nginx options file must exist for the full vhost's include to resolve.
ssh "$HOST" '[ -f /etc/letsencrypt/options-ssl-nginx.conf ] || sudo sh -c "certbot --version >/dev/null; curl -s https://raw.githubusercontent.com/certbot/certbot/main/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf -o /etc/letsencrypt/options-ssl-nginx.conf" 2>/dev/null || true
  [ -f /etc/letsencrypt/ssl-dhparams.pem ] || sudo openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048 2>/dev/null || true'

say "5/6  Installing the full HTTPS vhost + a renewal reload hook"
scp -q "$VHOST_SRC" "$HOST:/tmp/unilab.nginx"
ssh "$HOST" 'sudo mv /tmp/unilab.nginx /etc/nginx/sites-available/unilab
  # add .mjs to the MIME map — nginx omits it, which breaks ES-module workers
  grep -q "mjs" /etc/nginx/mime.types || sudo sed -i "s|application/javascript\( *\)js;|application/javascript\1js mjs;|" /etc/nginx/mime.types
  sudo mkdir -p /etc/letsencrypt/renewal-hooks/deploy
  echo "#!/bin/sh
nginx -t && systemctl reload nginx" | sudo tee /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh >/dev/null
  sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
  sudo nginx -t && sudo systemctl reload nginx'
echo "  ok  HTTPS vhost live"

say "6/6  Shipping the build"
ssh "$HOST" "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R \$(whoami): '$REMOTE_DIR'"
rsync -az --delete -e ssh "$HERE/dist/" "$HOST:$REMOTE_DIR/"
ssh "$HOST" "sudo chown -R www-data:www-data '$REMOTE_DIR'"

say "Provisioned → https://$DOMAIN"
echo "From now on, redeploy with:"
echo "  UNILAB_HOST=$HOST UNILAB_URL=https://$DOMAIN ./deploy.sh"

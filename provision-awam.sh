#!/usr/bin/env bash
#
# First-time provisioning of UniLab on the AWS Lightsail box `awam-prod`
# (3.0.126.159, ap-southeast-1), served at https://unilab.3-0-126-159.nip.io
#
# Run this ONCE. After that, ordinary updates go through ./deploy.sh:
#
#   UNILAB_HOST=awam-prod UNILAB_URL=https://unilab.3-0-126-159.nip.io ./deploy.sh
#
# It is idempotent — safe to re-run — and deliberately self-contained: every
# config it installs is a heredoc in this file. (provision-catter.sh referenced
# files in a session scratchpad, which made it unrunnable once that session
# ended. Don't reintroduce that.)
#
# Configs are written to a local temp file from a QUOTED heredoc and scp'd up,
# rather than piped through `ssh host "tee <<EOF"`. That is not a style choice:
# the ssh form puts three levels of quoting between you and the file, so an
# nginx `$uri` has to be written `\\\$uri` and silently lands as a literal
# backslash-dollar if you get it wrong. A quoted heredoc needs no escaping at
# all, and `nginx -t` then checks the exact bytes that will be served.
#
# WHAT THIS BOX ALREADY RUNS — none of it may be disturbed:
#   awam-web.service         Next.js :3000        -> actuallywearemad.com
#   awam-shop.service        Telegram bot
#   notevault-team-*.service gunicorn :9081/:9082 -> *.3-0-126-159.nip.io
#   postgresql@16, redis, fail2ban
# UniLab adds a static webroot and one vhost. No app server, no database, no
# port of its own: every tool runs in the visitor's browser.
#
# THREE THINGS THIS BOX GETS WRONG OUT OF THE BOX, ALL FIXED IN STEP 5:
#   1. nginx's stock mime.types has no `.mjs` entry, so ES-module workers are
#      served as application/octet-stream and the browser refuses to execute
#      them ("Strict MIME type checking is enforced for module scripts"). That
#      breaks every pdf.js-backed tool in UniLab.
#   2. There is no certbot renewal deploy hook, so a renewed certificate would
#      sit on disk while nginx went on serving the expired one.
#   3. /etc/nginx/sites-enabled/awam declares `listen [::]:443 ssl ipv6only=on`.
#      ipv6only may be set only once per socket, so the UniLab vhost must not
#      repeat it and its filename must sort AFTER `awam`. `unilab` does, and it
#      still sorts before `zz-default-catchall`, which claims default_server.

set -euo pipefail

HOST="${UNILAB_HOST:-awam-prod}"
DOMAIN="${UNILAB_DOMAIN:-unilab.3-0-126-159.nip.io}"
EXPECT_IP="3.0.126.159"
REMOTE_DIR="/var/www/unilab"
ACME_ROOT="/var/www/html"   # zz-default-catchall already serves ACME from here
HERE="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

say()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
ok()   { printf '  \033[32mok\033[0m  %s\n' "$*"; }
fail() { printf '\033[31mSTOP: %s\033[0m\n' "$*"; exit 1; }

# ---------------------------------------------------------------------------
say "0/6  Preconditions"
# ---------------------------------------------------------------------------
ssh -o BatchMode=yes -o ConnectTimeout=15 "$HOST" true 2>/dev/null \
  || fail "cannot SSH to '$HOST'. Check the Host block in ~/.ssh/config."
ok "ssh $HOST"

resolved="$(dig +short "$DOMAIN" A | tail -1)"
[ "$resolved" = "$EXPECT_IP" ] \
  || fail "$DOMAIN resolves to '${resolved:-nothing}', not $EXPECT_IP."
ok "$DOMAIN -> $EXPECT_IP"

# Refuse to run if this box is not the one we think it is. Two DigitalOcean
# droplets in this project's history were silently reassigned to strangers
# (see ops/hosts.env in the AWAM repo); the check costs nothing and stops us
# shipping onto someone else's server.
remote_ip="$(ssh "$HOST" 'curl -s -m 8 https://checkip.amazonaws.com || true' | tr -d '[:space:]')"
[ "$remote_ip" = "$EXPECT_IP" ] \
  || fail "'$HOST' reports public IP '${remote_ip:-unknown}', expected $EXPECT_IP. Not deploying."
ok "host identity confirmed ($remote_ip)"

[ -f "$HERE/dist/index.html" ] || { say "building (no dist yet)"; (cd "$HERE" && npm run build); }
ok "dist/ present"

# ---------------------------------------------------------------------------
say "1/6  Ensuring nginx, certbot and the ACME webroot exist"
# ---------------------------------------------------------------------------
ssh "$HOST" "set -e
  command -v nginx   >/dev/null || { sudo apt-get update -qq && sudo apt-get install -y -qq nginx; }
  command -v certbot >/dev/null || sudo apt-get install -y -qq certbot python3-certbot-nginx
  sudo mkdir -p '$ACME_ROOT/.well-known/acme-challenge' /etc/nginx/snippets"
ok "nginx + certbot present, $ACME_ROOT ready"

# ---------------------------------------------------------------------------
say "2/6  Installing the shared headers snippet"
# ---------------------------------------------------------------------------
cat > "$TMP/unilab-headers.conf" <<'CONF'
# Shared security headers for the UniLab vhost.
#
# Included by EVERY location that sets its own add_header. That repetition is
# required, not sloppy: nginx drops all inherited add_header directives from
# outer scopes the moment a location declares one of its own, so headers set
# only at server level would silently vanish on /assets/, /sw.js and the rest.
add_header X-Content-Type-Options    "nosniff" always;
add_header X-Frame-Options           "SAMEORIGIN" always;
add_header Referrer-Policy           "strict-origin-when-cross-origin" always;
add_header Permissions-Policy        "geolocation=(), microphone=(), camera=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
CONF
scp -q "$TMP/unilab-headers.conf" "$HOST:/tmp/unilab-headers.conf"
ssh "$HOST" 'sudo mv /tmp/unilab-headers.conf /etc/nginx/snippets/unilab-headers.conf
             sudo chown root:root /etc/nginx/snippets/unilab-headers.conf'
ok "/etc/nginx/snippets/unilab-headers.conf"

# ---------------------------------------------------------------------------
say "3/6  Installing an HTTP-only vhost so certbot can validate"
# ---------------------------------------------------------------------------
# The HTTPS half references a certificate that does not exist yet, and nginx
# refuses to load a config pointing at a missing cert. So: HTTP first, cert,
# then the real vhost in step 5.
cat > "$TMP/unilab-http.conf" <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name __DOMAIN__;
    location ^~ /.well-known/acme-challenge/ { root __ACME_ROOT__; default_type "text/plain"; }
    location / { return 200 'provisioning'; }
}
NGINX
sed -i.bak -e "s|__DOMAIN__|$DOMAIN|g" -e "s|__ACME_ROOT__|$ACME_ROOT|g" "$TMP/unilab-http.conf"
scp -q "$TMP/unilab-http.conf" "$HOST:/tmp/unilab.conf"
ssh "$HOST" "sudo mv /tmp/unilab.conf /etc/nginx/sites-available/unilab
  sudo chown root:root /etc/nginx/sites-available/unilab
  sudo ln -sfn /etc/nginx/sites-available/unilab /etc/nginx/sites-enabled/unilab
  sudo nginx -t && sudo systemctl reload nginx"
ok "HTTP vhost live"

# ---------------------------------------------------------------------------
say "4/6  Issuing the Let's Encrypt certificate"
# ---------------------------------------------------------------------------
ssh "$HOST" "sudo certbot certonly --webroot -w '$ACME_ROOT' -d '$DOMAIN' \
  --cert-name unilab --non-interactive --agree-tos \
  --register-unsafely-without-email --keep-until-expiring 2>&1 | tail -5"
# sudo, not a bare test: /etc/letsencrypt/live is mode 700 root:root, so an
# unprivileged [ -f ] cannot even traverse into it and reports "missing" for a
# certificate that was issued perfectly well.
ssh "$HOST" 'sudo test -f /etc/letsencrypt/live/unilab/fullchain.pem' \
  || fail "certbot did not produce /etc/letsencrypt/live/unilab/fullchain.pem"
ok "certificate issued"

# ---------------------------------------------------------------------------
say "5/6  Full HTTPS vhost + the .mjs MIME fix + a renewal reload hook"
# ---------------------------------------------------------------------------
cat > "$TMP/unilab-https.conf" <<'NGINX'
# UniLab — https://__DOMAIN__
#
# A static site and nothing else: no upstream, no PHP, no database. Every tool
# runs in the visitor's browser, so there is no server-side state here to
# protect and nothing to restart on deploy.
#
# Filename note: this must sort AFTER 'awam' in sites-enabled, because that file
# opens [::]:443 with ipv6only=on and the flag may be set only once per socket.
# It must sort BEFORE 'zz-default-catchall', which claims default_server.

server {
    listen 443 ssl;
    listen [::]:443 ssl;      # deliberately no ipv6only: 'awam' already set it

    # No HTTP/2 here, on purpose. This box runs nginx 1.24, where `http2 on;`
    # does not exist and the only way to enable it is the `listen ... http2`
    # flag — which is a property of the LISTEN SOCKET, not of this server block.
    # Setting it here would switch actuallywearemad.com and both NoteVault
    # services to HTTP/2 as a side effect. That is very likely harmless and
    # probably an improvement, but it is a change to other people's production
    # services and not this deploy's to make. To enable it deliberately: add
    # `http2` to the listen lines in /etc/nginx/sites-available/awam (the first
    # vhost to open :443) and reload.

    server_name __DOMAIN__;
    root __REMOTE_DIR__;
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/unilab/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/unilab/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Some bundles are genuinely large (the HEIC decoder is 1.3 MB), so compress
    # what compresses. wasm and already-compressed media are left alone.
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css application/javascript application/json
               application/manifest+json image/svg+xml font/ttf font/woff2;

    # ---- app shell ---------------------------------------------------------
    # UniLab is a single-page app: an unknown path is a route, not a 404.
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
        include snippets/unilab-headers.conf;
    }

    # ---- fingerprinted build output ---------------------------------------
    # Vite content-hashes these names, so a year is safe. It is also
    # unforgiving: a file served ONCE with the wrong Content-Type stays wrong in
    # that browser for a year, and a 304 revalidation does not repair it.
    # deploy.sh asserts the Content-Type of a .js, a .mjs and a .css on every
    # deploy for exactly this reason.
    location ^~ /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        include snippets/unilab-headers.conf;
        try_files $uri =404;
    }
    location ^~ /fonts/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        include snippets/unilab-headers.conf;
        try_files $uri =404;
    }

    # ---- must never be stale ----------------------------------------------
    # The worker script and the offline manifest determine what every other
    # cached file is. A stale sw.js pins a stale app, so these come from the
    # network every time.
    location = /sw.js {
        add_header Cache-Control "no-store";
        include snippets/unilab-headers.conf;
    }
    location = /precache.json {
        add_header Cache-Control "no-store";
        include snippets/unilab-headers.conf;
    }
    location = /manifest.webmanifest {
        add_header Cache-Control "no-cache";
        include snippets/unilab-headers.conf;
    }

    location ^~ /.well-known/acme-challenge/ { root __ACME_ROOT__; default_type "text/plain"; }
    location ~ /\.(?!well-known) { deny all; }

    access_log /var/log/nginx/unilab.access.log;
    error_log  /var/log/nginx/unilab.error.log;
}

server {
    listen 80;
    listen [::]:80;
    server_name __DOMAIN__;
    location ^~ /.well-known/acme-challenge/ { root __ACME_ROOT__; default_type "text/plain"; }
    location / { return 301 https://$host$request_uri; }
}
NGINX
sed -i.bak -e "s|__DOMAIN__|$DOMAIN|g" -e "s|__REMOTE_DIR__|$REMOTE_DIR|g" \
           -e "s|__ACME_ROOT__|$ACME_ROOT|g" "$TMP/unilab-https.conf"
grep -q '__' "$TMP/unilab-https.conf" && fail "unsubstituted placeholder left in the vhost"

# nginx's stock mime.types is missing three extensions this build actually
# ships. Each one is served as application/octet-stream without this fix:
#
#   .mjs          ES-module workers (pdf.js). The browser REFUSES to execute a
#                 module script with a non-JS type — "Strict MIME type checking
#                 is enforced for module scripts". Every PDF tool dies.
#   .webmanifest  The PWA manifest. Chrome ignores it, so "Install app" and the
#                 whole offline story quietly stop working.
#   .ttf          The bundled Noto Sans Myanmar/Thai faces. Browsers are lax
#                 about font types, so this one is not fatal — but /fonts/ is
#                 served `immutable, max-age=1y`, and a wrong Content-Type
#                 cached under that directive sticks in a visitor's browser for
#                 a YEAR, unrepairable by a 304. Cheap to get right, expensive
#                 to get wrong.
cat > "$TMP/unilab-fix-mime.sh" <<'MIMEFIX'
#!/bin/sh
# Idempotently add the MIME types UniLab needs to /etc/nginx/mime.types.
# Backs the file up once per day before the first change.
set -e
MT=/etc/nginx/mime.types
changed=0

backup_once() {
  [ "$changed" = "1" ] && return 0
  cp "$MT" "$MT.bak-$(date +%Y%m%d-%H%M%S)"
  changed=1
}

# .mjs rides along on the existing application/javascript line.
if ! grep -qw mjs "$MT"; then
  backup_once
  sed -i 's|application/javascript\( *\)js;|application/javascript\1js mjs;|' "$MT"
fi

# The rest get their own lines, inserted before the closing brace of types {}.
add_line() {  # $1 = mime type, $2 = extension
  grep -qw "$2" "$MT" && return 0
  backup_once
  sed -i "s|^}|    $1  $2;\n}|" "$MT"
}
add_line application/manifest+json webmanifest
add_line font/ttf                  ttf

for ext in mjs webmanifest ttf; do
  grep -qw "$ext" "$MT" || { echo "FAILED to add .$ext to $MT"; exit 1; }
done
MIMEFIX
scp -q "$TMP/unilab-fix-mime.sh" "$HOST:/tmp/unilab-fix-mime.sh"

scp -q "$TMP/unilab-https.conf" "$HOST:/tmp/unilab.conf"
ssh "$HOST" "set -e
  sudo mv /tmp/unilab.conf /etc/nginx/sites-available/unilab
  sudo chown root:root /etc/nginx/sites-available/unilab

  # 1. Missing MIME types — see fix-mime-types.sh, uploaded just above.
  sudo sh /tmp/unilab-fix-mime.sh
  sudo rm -f /tmp/unilab-fix-mime.sh

  # 2. certbot renews the cert, but nothing told nginx to load the new one.
  sudo mkdir -p /etc/letsencrypt/renewal-hooks/deploy
  printf '#!/bin/sh\nnginx -t && systemctl reload nginx\n' \
    | sudo tee /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh >/dev/null
  sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

  sudo nginx -t && sudo systemctl reload nginx"
ok "HTTPS vhost live, .mjs mapped, renewal hook installed"

# ---------------------------------------------------------------------------
say "6/6  Shipping the build"
# ---------------------------------------------------------------------------
ssh "$HOST" "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R \$(whoami): '$REMOTE_DIR'"
rsync -az --delete -e ssh "$HERE/dist/" "$HOST:$REMOTE_DIR/"
ssh "$HOST" "sudo chown -R www-data:www-data '$REMOTE_DIR'"
ok "$(find "$HERE/dist" -type f | wc -l | tr -d ' ') files -> $REMOTE_DIR"

say "Provisioned -> https://$DOMAIN"
echo "Redeploy from now on with:"
echo "  UNILAB_HOST=$HOST UNILAB_URL=https://$DOMAIN ./deploy.sh"

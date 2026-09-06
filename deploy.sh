#!/usr/bin/env bash
#
# Deploy UniLab to production.
#
#   ./deploy.sh
#
# Production is the AWS Lightsail box `awam-prod` (3.0.126.159), where UniLab is
# one static vhost beside AWAM, the AWAM shop bot and two NoteVault services.
# First-time setup of a NEW host is ./provision-awam.sh, not this script.
#
# It used to be the DigitalOcean droplet at 165.22.62.67. That box — and the
# `catter` droplet at 129.212.146.127 before it — became unreachable, which is
# why the defaults below moved. Do not point them back.
#
# Builds, ships the build to /var/www/unilab over rsync, and verifies the result
# from outside. Everything here is a static file copy: there is no application
# server to restart, no migration to run and no database to touch, because every
# tool in UniLab runs in the visitor's browser.
#
# The one thing worth understanding before changing anything: assets under
# /assets/ and /fonts/ are served with `immutable, max-age=1y`, which is correct
# because Vite content-hashes their filenames — but it also means a file served
# ONCE with a wrong Content-Type stays wrong in that browser for a year, and a
# 304 revalidation will not repair it. That is why this script checks MIME types
# on the live site after every deploy rather than assuming.

set -euo pipefail

HOST="${UNILAB_HOST:-awam-prod}"
REMOTE_DIR="${UNILAB_REMOTE_DIR:-/var/www/unilab}"
URL="${UNILAB_URL:-https://unilab.3-0-126-159.nip.io}"

say() { printf '\n\033[1m%s\033[0m\n' "$*"; }
fail() { printf '\033[31m  FAIL: %s\033[0m\n' "$*"; exit 1; }

say "1/4  Building"
npm run build

[ -f dist/index.html ] || fail "dist/index.html missing — the build did not produce a site"

say "2/4  Shipping to ${HOST}:${REMOTE_DIR}"
ssh "$HOST" "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R \$(whoami): '$REMOTE_DIR'"
# --stats, not --info=stats1: macOS still ships rsync 2.6.9, which has neither
# --info nor most modern long options.
rsync -az --delete --stats dist/ "$HOST:$REMOTE_DIR/" | grep -E "Number of files transferred|Total transferred file size" || true
ssh "$HOST" "sudo chown -R www-data:www-data '$REMOTE_DIR'"

say "3/4  Reloading nginx"
ssh "$HOST" 'sudo nginx -t && sudo systemctl reload nginx'

say "4/4  Verifying the live site"

check() {  # path  expected-content-type  expected-cache-substring
  local path="$1" want_type="$2" want_cache="$3"
  local headers status type cache
  headers=$(curl -sSI --max-time 25 "${URL}${path}")
  status=$(printf '%s' "$headers" | awk 'NR==1{print $2}')
  type=$(printf '%s' "$headers" | awk -F': ' 'tolower($1)=="content-type"{print $2}' | tr -d '\r')
  cache=$(printf '%s' "$headers" | awk -F': ' 'tolower($1)=="cache-control"{print $2}' | tr -d '\r')

  [ "$status" = "200" ] || fail "$path returned HTTP $status"
  case "$type" in *"$want_type"*) ;; *) fail "$path has Content-Type '$type', expected '$want_type'" ;; esac
  case "$cache" in *"$want_cache"*) ;; *) fail "$path has Cache-Control '$cache', expected to contain '$want_cache'" ;; esac
  printf '  ok  %-46s %s\n' "$path" "$type"
}

check "/"                    "text/html"              "no-cache"
check "/sw.js"               "application/javascript" "no-store"
check "/manifest.webmanifest" "application/manifest+json" "no-cache"

# Every hashed asset the page actually references, checked by real extension.
# The .mjs worker is the one that has bitten this deploy before: nginx's stock
# mime.types has no entry for it, so it ships as application/octet-stream and
# the browser refuses to run it as a module. The same omission covers
# .webmanifest and .ttf — both caught on awam-prod in Sep 2026, which is why
# the manifest check above is not decorative.
index_html=$(curl -sS --max-time 25 "${URL}/")
for ext in js mjs css; do
  asset=$(printf '%s' "$index_html" | grep -oE "/assets/[A-Za-z0-9._-]+\.${ext}" | head -1 || true)
  [ -n "$asset" ] || continue
  case "$ext" in
    css) check "$asset" "text/css"               "immutable" ;;
    *)   check "$asset" "application/javascript" "immutable" ;;
  esac
done

# The pdf.js worker is loaded dynamically, so it never appears in index.html.
worker=$(ssh "$HOST" "ls '$REMOTE_DIR'/assets/ | grep -E '^pdf\.worker.*\.mjs$' | head -1" || true)
[ -n "$worker" ] && check "/assets/${worker}" "application/javascript" "immutable"

say "Deployed → ${URL}"

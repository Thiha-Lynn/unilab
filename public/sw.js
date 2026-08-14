// UniLab service worker
// Plain ES2020 service-worker script — no imports, no bundler.
// Strategy: cache-first for the app shell, with runtime caching of
// same-origin GET responses so hashed asset chunks get cached as they're
// visited (exact hashed filenames aren't known at write-time, so we can't
// precache everything up front).

const CACHE_NAME = 'unilab-v2';
const PRECACHE_URLS = ['./', './index.html'];

// ---------------------------------------------------------------------------
// install: open the cache and best-effort precache the app shell.
// Never fail install just because a precache URL couldn't be fetched.
// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        try {
          await cache.addAll(PRECACHE_URLS);
        } catch (err) {
          // Ignore individual precache failures (e.g. offline at install time,
          // or a URL that doesn't resolve at this scope) — runtime caching
          // will pick things up as the user actually visits pages.
          console.warn('[sw] precache addAll failed (non-fatal):', err);
        }
      } catch (err) {
        console.warn('[sw] install: could not open cache (non-fatal):', err);
      }
    })()
  );
  self.skipWaiting();
});

// ---------------------------------------------------------------------------
// activate: clean up old cache versions that don't match CACHE_NAME.
// ---------------------------------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        );
      } catch (err) {
        console.warn('[sw] activate: cache cleanup failed (non-fatal):', err);
      }
      await self.clients.claim();
    })()
  );
});

// ---------------------------------------------------------------------------
// fetch strategy:
//  - Navigations (the HTML shell): NETWORK-first, cache fallback. Cache-first
//    here would pin returning visitors to a stale index.html forever, since
//    sw.js itself rarely changes between deploys. Network-first means a deploy
//    reaches users on their next visit, while offline still serves the cache.
//  - Everything else (Vite's content-hashed assets are immutable): cache-first
//    with runtime caching, so tool chunks work offline once visited.
// Never let a caching error break a fetch — always fall back to network.
// ---------------------------------------------------------------------------
async function stashInCache(request, response) {
  try {
    const isSameOrigin = new URL(request.url).origin === self.location.origin;
    if (isSameOrigin && response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
  } catch (err) {
    console.warn('[sw] runtime cache put failed (non-fatal):', err);
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests; let everything else (POST, etc.) pass through.
  if (request.method !== 'GET') {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          await stashInCache(request, networkResponse);
          return networkResponse;
        } catch (err) {
          const cached = await caches.match(request).catch(() => null)
            || await caches.match('./index.html').catch(() => null)
            || await caches.match('./').catch(() => null);
          if (cached) return cached;
          throw err;
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }
      } catch (err) {
        console.warn('[sw] cache match failed (non-fatal):', err);
      }

      try {
        const networkResponse = await fetch(request);
        await stashInCache(request, networkResponse);
        return networkResponse;
      } catch (err) {
        // Network failed too (offline, no cache hit). Nothing more we can do.
        console.warn('[sw] fetch failed and no cache match:', err);
        throw err;
      }
    })()
  );
});

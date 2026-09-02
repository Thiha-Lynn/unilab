import { defineConfig } from 'vite';
import { readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Tiny build plugin: after the bundle is written (and public/ has been copied
// into the output directory), walk that directory and write precache.json —
// a flat JSON array of every deployable file as a relative URL
// ("./index.html", "./assets/….js", "./fonts/…", icons, manifest) plus "./"
// for the root navigation. The service worker fetches this list when the user
// clicks "Make UniLab work offline" (see PRECACHE_ALL in public/sw.js) and
// caches every entry, so tools the user has never opened still work offline.
// Excluded: sw.js (the browser manages the worker script itself) and
// precache.json (must always be fetched fresh, never from cache).
function precacheManifest() {
  let outDir;
  const walk = (dir, prefix = '') =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
      d.isDirectory() ? walk(join(dir, d.name), `${prefix}${d.name}/`) : [`${prefix}${d.name}`]
    );
  return {
    name: 'unilab-precache-manifest',
    apply: 'build',
    configResolved(config) {
      // resolve(), not join() — --outDir on the CLI may be an absolute path.
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const files = walk(outDir)
        .filter((f) => f !== 'sw.js' && f !== 'precache.json' && !f.endsWith('.DS_Store'))
        .sort();
      const entries = ['./', ...files.map((f) => `./${f}`)];
      writeFileSync(join(outDir, 'precache.json'), JSON.stringify(entries, null, 2));
      console.log(`[precache] wrote precache.json (${entries.length} entries)`);
    },
  };
}

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1500,
  },
  plugins: [precacheManifest()],
});

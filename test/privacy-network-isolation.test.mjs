// QA / Privacy & Network Isolation Suite (B11, NFR1, LR1, LR3, LR4, LR8)
// Verifies architecturally that no source module uploads user files,
// production logging suppresses filenames, and privacy disclosures match code.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';

import { debug, debugError } from '../src/log.js';
import { renderPrivacy } from '../src/privacy.js';
import { TTL_MINUTES } from '../src/vault.js';
import { describeLimit, MAX_FILE_BYTES } from '../src/intake.js';

function collectJsFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectJsFiles(full));
    } else if (entry.endsWith('.js')) {
      files.push(full);
    }
  }
  return files;
}

test('NFR1 / LR1: src/ contains no upload sinks (XHR, sendBeacon, WebSocket, FormData, or POST fetch)', () => {
  const jsFiles = collectJsFiles('src');
  assert.ok(jsFiles.length >= 60, `expected >= 60 source files, found ${jsFiles.length}`);

  const forbidden = [
    { name: 'XMLHttpRequest', re: /\bXMLHttpRequest\b/ },
    { name: 'navigator.sendBeacon', re: /\bsendBeacon\b/ },
    { name: 'WebSocket', re: /\bnew\s+WebSocket\b/ },
    { name: 'RTCPeerConnection', re: /\bRTCPeerConnection\b/ },
    { name: 'FormData', re: /\bFormData\b/ },
    { name: 'mutating fetch method', re: /\bfetch\s*\([^)]*method\s*:\s*['"`](POST|PUT|PATCH|DELETE)/i },
  ];

  for (const file of jsFiles) {
    const code = readFileSync(file, 'utf8');
    for (const rule of forbidden) {
      assert.equal(rule.re.test(code), false, `${file} must not contain ${rule.name}`);
    }
  }
});

test('LR8: production logging helpers stay silent outside Vite DEV mode', () => {
  const warnings = [];
  const errors = [];
  const origWarn = console.warn;
  const origError = console.error;
  console.warn = (...args) => warnings.push(args);
  console.error = (...args) => errors.push(args);
  try {
    debug('sensitive-student-transcript.pdf');
    debugError(new Error('Could not read passport-scan.jpg'));
  } finally {
    console.warn = origWarn;
    console.error = origError;
  }
  assert.equal(warnings.length, 0, 'debug() must not emit in non-DEV runtime');
  assert.equal(errors.length, 0, 'debugError() must not emit in non-DEV runtime');
});

test('LR4 / PDPA 25: privacy page dynamically reflects vault TTL and intake size limits', () => {
  const dom = new JSDOM('<!doctype html><html><body><div id="app"></div></body></html>');
  const prevDoc = globalThis.document;
  globalThis.document = dom.window.document;
  try {
    const host = dom.window.document.getElementById('app');
    renderPrivacy(host);
    const text = host.textContent;
    assert.match(text, new RegExp(`${TTL_MINUTES}\\s+minutes`));
    assert.ok(text.includes(describeLimit(MAX_FILE_BYTES)), 'privacy page must cite enforced MAX_FILE_BYTES');
    assert.match(text, /Clear files from memory/);
    assert.match(text, /OCR/);
    assert.match(text, /Remove Background/);
  } finally {
    globalThis.document = prevDoc;
  }
});

test('LR3 / NFR5 / F14: OCR ships 19 languages and Remove Background gates model download behind dynamic import', () => {
  const ocrCode = readFileSync('src/tools/ocr-pdf.js', 'utf8');
  const langsBlock = ocrCode.match(/const LANGS = \[([\s\S]*?)\];/);
  assert.ok(langsBlock, 'ocr-pdf.js must declare LANGS');
  const langMatches = [...langsBlock[1].matchAll(/\{\s*id:\s*'[^']+',\s*label:/g)];
  assert.equal(langMatches.length, 19, 'ocr-pdf.js LANGS must ship all 19 documented languages');
  assert.match(ocrCode, /about 5 MB/, 'OCR must disclose engine download size');

  const bgCode = readFileSync('src/tools/remove-background.js', 'utf8');
  assert.equal(/^import\s+.*@imgly\/background-removal/m.test(bgCode), false,
    'remove-background.js must not statically import @imgly/background-removal');
  assert.match(bgCode, /await import\('@imgly\/background-removal'\)/,
    'remove-background.js must lazy-import the model only on explicit user action');
  assert.match(bgCode, /MODEL_BYTES\s*=\s*44_348_940/, 'Remove Background must disclose exact model byte count');
});

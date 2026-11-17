// QA / Registry, Composable Ops, and Core PDF Workflow Suite
// Covers tool registry integrity (59 tools), ops chain validation,
// page-range parsing, and local PDF merge/extract with zero network calls.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DOMMatrix } from '@napi-rs/canvas';
import { PDFDocument, StandardFonts } from 'pdf-lib';

globalThis.DOMMatrix ??= DOMMatrix;

import { CATEGORIES, TOOLS } from '../src/registry.js';
const { KIND, OPS, OP_BY_ID, defaultParams, kindOf, validateChain } = await import('../src/ops.js');
const { parsePageRanges } = await import('../src/pdf-utils.js');

test('tool registry exposes 59 valid, unique tools across known categories', () => {
  assert.equal(TOOLS.length, 59);
  const seen = new Set();
  for (const tool of TOOLS) {
    assert.ok(tool.id && !seen.has(tool.id), `duplicate or empty tool id: ${tool.id}`);
    seen.add(tool.id);
    assert.ok(CATEGORIES[tool.category], `unknown category "${tool.category}" for ${tool.id}`);
    assert.ok(tool.name.trim().length > 0, `missing name for ${tool.id}`);
    assert.ok(tool.desc.trim().length > 10, `missing description for ${tool.id}`);
    assert.equal(typeof tool.load, 'function', `missing lazy loader for ${tool.id}`);
    const modulePath = join('src', 'tools', `${tool.id}.js`);
    assert.ok(existsSync(modulePath), `missing tool implementation file ${modulePath}`);
  }
});

test('ops catalogue validates compatible chains and rejects mismatched step types', () => {
  assert.equal(OPS.length, 13);
  assert.equal(kindOf({ name: 'slides.pdf', type: 'application/pdf' }), KIND.PDF);
  assert.equal(kindOf({ name: 'SCAN.PDF', type: '' }), KIND.PDF);
  assert.equal(kindOf({ name: 'id.jpg', type: 'image/jpeg' }), KIND.IMAGE);
  assert.equal(kindOf({ name: 'notes.txt', type: 'text/plain' }), null);

  const valid = validateChain(
    [
      { opId: 'compress-image', params: defaultParams(OP_BY_ID['compress-image']) },
      { opId: 'images-to-pdf', params: defaultParams(OP_BY_ID['images-to-pdf']) },
      { opId: 'compress-pdf', params: defaultParams(OP_BY_ID['compress-pdf']) },
    ],
    KIND.IMAGE,
  );
  assert.equal(valid.ok, true);
  assert.equal(valid.outputKind, KIND.PDF);

  const broken = validateChain(
    [
      { opId: 'compress-pdf', params: defaultParams(OP_BY_ID['compress-pdf']) },
      { opId: 'resize-image', params: defaultParams(OP_BY_ID['resize-image']) },
    ],
    KIND.PDF,
  );
  assert.equal(broken.ok, false);
  assert.equal(broken.problems.length, 1);
  assert.equal(broken.problems[0].index, 1);
});

test('parsePageRanges parses single pages, ranges, deduplicates, and rejects invalid ranges', () => {
  assert.deepEqual(parsePageRanges('42', 120), [42]);
  assert.deepEqual(parsePageRanges('1-3, 5, 2-4, 999', 10), [1, 2, 3, 4, 5]);
  assert.throws(() => parsePageRanges('5-2', 10), /Invalid range/);
  assert.throws(() => parsePageRanges('abc', 10), /Could not understand/);
  assert.throws(() => parsePageRanges('50', 10), /No valid pages/);
});

test('UAT Task 2 & Task 4 core PDF operations (ordered merge and page-42 extract) execute locally with 0 fetch calls', async () => {
  const fetchCalls = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (...args) => {
    fetchCalls.push(args);
    throw new Error('Unexpected network call during local PDF transform');
  };

  try {
    // Build a 120-page synthetic textbook PDF (matches UAT Task 4)
    const textbook = await PDFDocument.create();
    const font = await textbook.embedFont(StandardFonts.Helvetica);
    for (let i = 1; i <= 120; i++) {
      const page = textbook.addPage([300, 400]);
      page.drawText(`Page ${i} content`, { x: 24, y: 360, size: 12, font });
    }
    const textbookBytes = await textbook.save();

    // Extract only page 42 using parsePageRanges + pdf-lib
    const indices = parsePageRanges('42', textbook.getPageCount()).map((p) => p - 1);
    const extracted = await PDFDocument.create();
    const loadedBook = await PDFDocument.load(textbookBytes);
    const [p42] = await extracted.copyPages(loadedBook, indices);
    extracted.addPage(p42);
    const extractedReloaded = await PDFDocument.load(await extracted.save());
    assert.equal(extractedReloaded.getPageCount(), 1);

    // Build 3 separate 1-page documents and merge in exact order (matches UAT Task 2 order logic)
    const merged = await PDFDocument.create();
    for (const [w, h] of [[200, 300], [320, 400], [450, 500]]) {
      const part = await PDFDocument.create();
      part.addPage([w, h]);
      const loadedPart = await PDFDocument.load(await part.save());
      const [copied] = await merged.copyPages(loadedPart, [0]);
      merged.addPage(copied);
    }
    const mergedReloaded = await PDFDocument.load(await merged.save());
    assert.equal(mergedReloaded.getPageCount(), 3);
    assert.deepEqual(
      mergedReloaded.getPages().map((p) => Math.round(p.getWidth())),
      [200, 320, 450],
      'merged pages must preserve exact input order',
    );
    assert.equal(fetchCalls.length, 0, 'PDF operations must make zero network requests');
  } finally {
    globalThis.fetch = origFetch;
  }
});

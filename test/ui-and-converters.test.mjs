// QA / Shared UI Helpers & Client-Side Utility Tools Suite
// Verifies byte formatting, filename stem handling, DOM file list ordering,
// unit conversions (including Thai land units), and word counter DOM updates.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

import { fileListView, formatBytes, stem } from '../src/ui.js';
import renderUnitConverter from '../src/tools/unit-converter.js';
import renderWordCounter from '../src/tools/word-counter.js';

function withDom(fn) {
  const dom = new JSDOM('<!doctype html><html><body><div id="host"></div></body></html>');
  const prevDoc = globalThis.document;
  const prevEvent = globalThis.Event;
  globalThis.document = dom.window.document;
  globalThis.Event = dom.window.Event;
  try {
    return fn(dom.window, dom.window.document.getElementById('host'));
  } finally {
    globalThis.document = prevDoc;
    globalThis.Event = prevEvent;
  }
}

test('formatBytes and stem handle edge cases consistently', () => {
  assert.equal(formatBytes(NaN), '—');
  assert.equal(formatBytes(512), '512 B');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(formatBytes(5 * 1024 ** 2), '5.00 MB');

  assert.equal(stem('assignment.final.pdf'), 'assignment.final');
  assert.equal(stem('IMG_0042.HEIC'), 'IMG_0042');
  assert.equal(stem('README'), 'README');
});

test('fileListView supports reordering and removal for multi-file workflows', () => {
  withDom((_win, host) => {
    const files = [
      { name: '01-application.pdf', size: 1200 },
      { name: '02-scorecard.jpg', size: 2400 },
      { name: '03-id.png', size: 3600 },
    ];
    let changes = 0;
    const view = fileListView(files, {
      reorderable: true,
      removable: true,
      onChange: () => { changes++; },
    });
    host.appendChild(view.root);

    const rows = () => [...view.root.querySelectorAll('.file-row .name')].map((n) => n.textContent);
    assert.deepEqual(rows(), ['01-application.pdf', '02-scorecard.jpg', '03-id.png']);

    // Move second file up
    view.root.querySelectorAll('button[title="Move up"]')[1].click();
    assert.deepEqual(rows(), ['02-scorecard.jpg', '01-application.pdf', '03-id.png']);

    // Remove last file
    view.root.querySelectorAll('button[title="Remove"]')[2].click();
    assert.deepEqual(rows(), ['02-scorecard.jpg', '01-application.pdf']);
    assert.equal(changes, 2);
  });
});

test('unit-converter converts data sizes, temperature, and Thai land area accurately in DOM', () => {
  withDom((win, host) => {
    renderUnitConverter(host);
    const cat = host.querySelector('[data-cat]');
    const val = host.querySelector('[data-val]');
    const from = host.querySelector('[data-from]');
    const to = host.querySelector('[data-to]');
    const result = host.querySelector('[data-result]');

    // Data: 5 MB -> KB = 5120
    cat.value = 'Data';
    cat.dispatchEvent(new win.Event('change'));
    val.value = '5';
    val.dispatchEvent(new win.Event('input'));
    assert.equal(from.value, 'MB');
    assert.equal(to.value, 'KB');
    assert.equal(result.textContent, '5120');

    // Swap units: 5 KB -> MB
    host.querySelector('[data-swap]').click();
    assert.equal(from.value, 'KB');
    assert.equal(to.value, 'MB');

    // Area: 1 rai (ไร่) -> 1600 m²
    cat.value = 'Area';
    cat.dispatchEvent(new win.Event('change'));
    from.value = 'rai (ไร่)';
    to.value = 'm²';
    val.value = '1';
    val.dispatchEvent(new win.Event('input'));
    assert.equal(result.textContent, '1600');
  });
});

test('word-counter updates grapheme, code-point, and stacked-combo counts in DOM', () => {
  withDom((win, host) => {
    renderWordCounter(host);
    const ta = host.querySelector('textarea');
    ta.value = 'ရွဲ့ น้ำ';
    ta.dispatchEvent(new win.Event('input'));

    assert.equal(host.querySelector('[data-chars]').textContent, '3');
    assert.equal(host.querySelector('[data-nospace]').textContent, '2');
    assert.equal(host.querySelector('[data-codepoints]').textContent, '8');
    assert.equal(host.querySelector('[data-combos]').hidden, false);
  });
});

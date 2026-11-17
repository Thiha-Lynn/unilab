// Reproducible QA benchmark for local client-side operations (team-measured, synthetic fixtures).
// Run: node scripts/qa-benchmark.mjs

import { performance } from 'node:perf_hooks';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { createCanvas } from '@napi-rs/canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { redactPdf } from '../src/redaction.js';
import * as vault from '../src/vault.js';

async function renderPage(pdf, n, scale) {
  const page = await pdf.getPage(n);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvas, canvasContext: canvas.getContext('2d'), viewport, intent: 'print' }).promise;
  return canvas;
}

const results = [];

// 1. T2-style 3-document assembly (local pdf-lib merge)
{
  const parts = [];
  for (const [w, h] of [[595, 842], [600, 400], [500, 320]]) {
    const doc = await PDFDocument.create();
    doc.addPage([w, h]);
    parts.push(await doc.save());
  }
  const t0 = performance.now();
  const merged = await PDFDocument.create();
  for (const bytes of parts) {
    const src = await PDFDocument.load(bytes);
    const [pg] = await merged.copyPages(src, [0]);
    merged.addPage(pg);
  }
  const outBytes = await merged.save();
  const ms = performance.now() - t0;
  results.push({
    task: 'Local 3-file PDF assembly (T2 core logic)',
    ms: Number(ms.toFixed(1)),
    outputBytes: outBytes.length,
    networkMeasurement: "not instrumented by this benchmark",
  });
}

// 2. T4-style Page 42 extraction from 120-page textbook
{
  const book = await PDFDocument.create();
  const font = await book.embedFont(StandardFonts.Helvetica);
  for (let i = 1; i <= 120; i++) {
    const page = book.addPage([595, 842]);
    page.drawText(`Chapter page ${i}`, { x: 40, y: 780, size: 12, font });
  }
  const bookBytes = await book.save();
  const t0 = performance.now();
  const src = await PDFDocument.load(bookBytes);
  const out = await PDFDocument.create();
  const [p42] = await out.copyPages(src, [41]);
  out.addPage(p42);
  const outBytes = await out.save();
  const ms = performance.now() - t0;
  results.push({
    task: 'Local Page-42 extraction from 120-page PDF (T4 core logic)',
    ms: Number(ms.toFixed(1)),
    inputBytes: bookBytes.length,
    outputBytes: outBytes.length,
    networkMeasurement: "not instrumented by this benchmark",
  });
}

// 3. F7 / LR6 Permanent PDF Redaction
{
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  doc.addPage([400, 300]).drawText('ID-6631500000', { x: 40, y: 220, size: 20, font });
  const bytes = await doc.save();
  const srcTask = getDocument({ data: bytes.slice(), useSystemFonts: true });
  const pdf = await srcTask.promise;
  const t0 = performance.now();
  const blob = await redactPdf({
    bytes,
    pdf,
    boxes: [{ page: 1, x: 0.08, y: 0.15, w: 0.7, h: 0.2 }],
    colour: '#000000',
    dpi: 144,
    renderPage,
    canvasToBlob: async (c) => new Blob([await c.encode('jpeg', 92)]),
    ctx: { setBusy() {} },
  });
  const ms = performance.now() - t0;
  await srcTask.destroy();
  results.push({
    task: 'Permanent PDF redaction (F7 / LR6)',
    ms: Number(ms.toFixed(1)),
    outputBytes: blob.size,
    networkMeasurement: "not instrumented by this benchmark",
  });
}

// 4. F6 / LR5 In-memory Vault store + purge
{
  const t0 = performance.now();
  const [item] = vault.store([{ name: 'sample.pdf', blob: new Blob(['synthetic-pdf-bytes']) }]);
  const reachableBefore = Boolean(item.url);
  vault.purge({ silent: true });
  const countAfter = vault.state().count;
  const ms = performance.now() - t0;
  results.push({
    task: 'Vault store + immediate purge (F6 / LR5)',
    ms: Number(ms.toFixed(2)),
    reachableBefore,
    countAfter,
    networkMeasurement: "not instrumented by this benchmark",
  });
}

console.log(JSON.stringify({ measuredAt: new Date().toISOString(), environment: `Node ${process.version} (${process.platform}/${process.arch})`, results }, null, 2));

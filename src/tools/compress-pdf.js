import { PDFDocument } from 'pdf-lib';
import { el, dropzone, downloadBlob, progressBar, errorBox, formatBytes, canvasToBlob, stem } from '../ui.js';
import { openPdf, renderPage } from '../pdf-utils.js';

const LEVELS = {
  high: { scale: 1.6, quality: 0.8, label: 'High quality' },
  balanced: { scale: 1.3, quality: 0.62, label: 'Balanced' },
  extreme: { scale: 1.0, quality: 0.42, label: 'Smallest size' },
};

export default function render(container) {
  let file = null;
  const panel = el(`<div class="panel"></div>`);
  const zone = dropzone({
    accept: 'application/pdf',
    multiple: false,
    label: 'Choose a PDF',
    hint: 'Scanned notes and slide decks compress best',
    onFiles: ([f]) => {
      file = f;
      info.textContent = `${f.name} (${formatBytes(f.size)})`;
      options.hidden = false;
    },
  });

  const info = el(`<p class="note"></p>`);
  const options = el(`
    <div hidden>
      <div class="controls">
        <div class="field">
          <label>Compression level</label>
          <select data-level>
            <option value="balanced">Balanced (recommended)</option>
            <option value="high">High quality</option>
            <option value="extreme">Smallest size</option>
          </select>
        </div>
      </div>
      <div class="actions"><button class="btn" data-go>Compress PDF</button></div>
    </div>
  `);

  const progress = progressBar();
  const resultsHost = el(`<div></div>`);

  options.querySelector('[data-go]').addEventListener('click', async () => {
    errorBox(panel, null);
    resultsHost.innerHTML = '';
    progress.show('Compressing…');
    try {
      const level = LEVELS[options.querySelector('[data-level]').value];
      const pdf = await openPdf(file);
      const out = await PDFDocument.create();
      for (let i = 1; i <= pdf.numPages; i++) {
        progress.set((i - 1) / pdf.numPages, `Page ${i}/${pdf.numPages}`);
        const canvas = await renderPage(pdf, i, level.scale);
        const jpeg = await canvasToBlob(canvas, 'image/jpeg', level.quality);
        const img = await out.embedJpg(new Uint8Array(await jpeg.arrayBuffer()));
        // Keep the original page's point size so the PDF prints identically.
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 1 });
        const outPage = out.addPage([vp.width, vp.height]);
        outPage.drawImage(img, { x: 0, y: 0, width: vp.width, height: vp.height });
      }
      const blob = new Blob([await out.save()], { type: 'application/pdf' });
      progress.hide();

      const saved = Math.round((1 - blob.size / file.size) * 100);
      const grew = blob.size >= file.size;
      const box = el(`
        <div class="result">
          <h3>${grew ? '⚠️ This PDF is already small' : `✅ ${saved}% smaller`}</h3>
          <div class="stat-row">
            <div class="stat"><span class="v">${formatBytes(file.size)}</span><span class="k">Before</span></div>
            <div class="stat"><span class="v">${formatBytes(blob.size)}</span><span class="k">After</span></div>
          </div>
          <p>${grew ? 'Text-only PDFs are often smaller than their rasterized version — keep the original.' : 'Pages were re-rendered as images, so text is no longer selectable. Great for submissions, not for editing.'}</p>
          <div class="actions"><button class="btn" data-dl>⬇ Download compressed PDF</button></div>
        </div>
      `);
      box.querySelector('[data-dl]').addEventListener('click', () => downloadBlob(blob, `${stem(file.name)}-compressed.pdf`));
      resultsHost.appendChild(box);
    } catch (err) {
      progress.hide();
      errorBox(panel, `Compression failed: ${err.message}`);
    }
  });

  panel.append(zone, info, options, progress.root);
  container.append(panel, resultsHost);
  container.appendChild(el(`<p class="note">Typical win: a 40 MB scanned reading pack fits under a 10 MB LMS limit at “Balanced”.</p>`));
}

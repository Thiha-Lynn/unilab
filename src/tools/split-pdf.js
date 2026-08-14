import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { el, dropzone, downloadBlob, progressBar, errorBox, formatBytes, stem } from '../ui.js';
import { parsePageRanges } from '../pdf-utils.js';

export default function render(container) {
  let file = null;
  let pageCount = 0;
  const panel = el(`<div class="panel"></div>`);
  const zone = dropzone({
    accept: 'application/pdf',
    multiple: false,
    label: 'Choose a PDF',
    hint: 'Then pick the pages you need',
    onFiles: async ([f]) => {
      errorBox(panel, null);
      try {
        const doc = await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true });
        file = f;
        pageCount = doc.getPageCount();
        info.textContent = `${f.name} — ${pageCount} pages (${formatBytes(f.size)})`;
        options.hidden = false;
      } catch (err) {
        errorBox(panel, `Could not read PDF: ${err.message}`);
      }
    },
  });

  const info = el(`<p class="note"></p>`);
  const options = el(`
    <div hidden>
      <div class="controls">
        <div class="field">
          <label>Mode</label>
          <select data-mode>
            <option value="extract">Extract pages into one PDF</option>
            <option value="every">Split every page into its own PDF (.zip)</option>
          </select>
        </div>
        <div class="field" data-rangewrap style="flex:1;min-width:220px">
          <label>Pages (e.g. 1-3, 5, 8-10)</label>
          <input type="text" data-range placeholder="1-3, 5" />
        </div>
      </div>
      <div class="actions"><button class="btn" data-go>Split PDF</button></div>
    </div>
  `);
  const modeSel = options.querySelector('[data-mode]');
  modeSel.addEventListener('change', () => {
    options.querySelector('[data-rangewrap]').hidden = modeSel.value === 'every';
  });

  const progress = progressBar();
  const resultsHost = el(`<div></div>`);

  options.querySelector('[data-go]').addEventListener('click', async () => {
    errorBox(panel, null);
    resultsHost.innerHTML = '';
    progress.show('Splitting…');
    try {
      const srcBytes = await file.arrayBuffer();
      const src = await PDFDocument.load(srcBytes, { ignoreEncryption: true });

      if (modeSel.value === 'extract') {
        const pages = parsePageRanges(options.querySelector('[data-range]').value, pageCount);
        const out = await PDFDocument.create();
        const copied = await out.copyPages(src, pages.map((p) => p - 1));
        copied.forEach((p) => out.addPage(p));
        const blob = new Blob([await out.save()], { type: 'application/pdf' });
        progress.hide();
        const box = el(`
          <div class="result">
            <h3>✅ Extracted ${pages.length} page${pages.length > 1 ? 's' : ''} (${formatBytes(blob.size)})</h3>
            <div class="actions"><button class="btn" data-dl>⬇ Download PDF</button></div>
          </div>
        `);
        box.querySelector('[data-dl]').addEventListener('click', () => downloadBlob(blob, `${stem(file.name)}-pages.pdf`));
        resultsHost.appendChild(box);
      } else {
        const zip = new JSZip();
        for (let i = 0; i < pageCount; i++) {
          progress.set(i / pageCount, `Page ${i + 1}/${pageCount}`);
          const out = await PDFDocument.create();
          const [p] = await out.copyPages(src, [i]);
          out.addPage(p);
          zip.file(`${stem(file.name)}-page-${String(i + 1).padStart(2, '0')}.pdf`, await out.save());
        }
        const blob = await zip.generateAsync({ type: 'blob' });
        progress.hide();
        const box = el(`
          <div class="result">
            <h3>✅ Split into ${pageCount} PDFs (${formatBytes(blob.size)} zip)</h3>
            <div class="actions"><button class="btn" data-dl>⬇ Download ZIP</button></div>
          </div>
        `);
        box.querySelector('[data-dl]').addEventListener('click', () => downloadBlob(blob, `${stem(file.name)}-split.zip`));
        resultsHost.appendChild(box);
      }
    } catch (err) {
      progress.hide();
      errorBox(panel, err.message);
    }
  });

  panel.append(zone, info, options, progress.root);
  container.append(panel, resultsHost);
  container.appendChild(el(`<p class="note">Example: your lecturer posts one 120-page PDF but this week is only pages 45–60 — extract just those and study light.</p>`));
}

import { PDFDocument } from 'pdf-lib';
import { el, dropzone, fileListView, downloadBlob, progressBar, errorBox, formatBytes } from '../ui.js';

export default function render(container) {
  const files = [];
  const panel = el(`<div class="panel"></div>`);
  const zone = dropzone({
    accept: 'application/pdf',
    label: 'Choose PDF files',
    hint: 'They merge in this order — reorder below',
    onFiles: (f) => { files.push(...f); list.render(); update(); },
  });
  const list = fileListView(files, { reorderable: true, onChange: update });

  const actions = el(`<div class="actions"><button class="btn" data-go disabled>Merge PDFs</button></div>`);
  const goBtn = actions.querySelector('[data-go]');
  const progress = progressBar();
  const resultsHost = el(`<div></div>`);

  function update() { goBtn.disabled = files.length < 2; }

  goBtn.addEventListener('click', async () => {
    errorBox(panel, null);
    resultsHost.innerHTML = '';
    goBtn.disabled = true;
    progress.show('Merging…');
    try {
      const out = await PDFDocument.create();
      let pageTotal = 0;
      for (let i = 0; i < files.length; i++) {
        progress.set(i / files.length, `Adding ${files[i].name} (${i + 1}/${files.length})`);
        const src = await PDFDocument.load(await files[i].arrayBuffer(), { ignoreEncryption: true });
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
        pageTotal += pages.length;
      }
      const blob = new Blob([await out.save()], { type: 'application/pdf' });
      progress.hide();
      const box = el(`
        <div class="result">
          <h3>✅ Merged ${files.length} files → ${pageTotal} pages (${formatBytes(blob.size)})</h3>
          <div class="actions"><button class="btn" data-dl>⬇ Download merged PDF</button></div>
        </div>
      `);
      box.querySelector('[data-dl]').addEventListener('click', () => downloadBlob(blob, 'unilab-merged.pdf'));
      resultsHost.appendChild(box);
    } catch (err) {
      progress.hide();
      errorBox(panel, `Merge failed: ${err.message}. Password-protected PDFs are not supported.`);
    } finally {
      goBtn.disabled = false;
    }
  });

  panel.append(zone, list.root, actions, progress.root);
  container.append(panel, resultsHost);
  container.appendChild(el(`<p class="note">Classic use: cover page + report + appendix → one file for submission. Add at least 2 PDFs to merge.</p>`));
}

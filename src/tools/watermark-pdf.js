import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { el, dropzone, downloadBlob, progressBar, errorBox, formatBytes, stem } from '../ui.js';

const COLORS = {
  gray: rgb(0.5, 0.5, 0.5),
  red: rgb(0.8, 0.15, 0.15),
  blue: rgb(0.15, 0.35, 0.8),
};

export default function render(container) {
  let file = null;
  const panel = el(`<div class="panel"></div>`);
  const zone = dropzone({
    accept: 'application/pdf',
    multiple: false,
    label: 'Choose a PDF',
    hint: 'Then set your watermark text and style',
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
          <label>Watermark text</label>
          <input type="text" data-text value="DRAFT" placeholder="e.g. DRAFT, your student ID" />
        </div>
        <div class="field">
          <label>Font size</label>
          <input type="number" data-size value="60" min="8" max="300" />
        </div>
        <div class="field">
          <label>Opacity — <span data-opacitylabel>25</span>%</label>
          <input type="range" data-opacity min="5" max="100" value="25" />
        </div>
        <div class="field">
          <label>Color</label>
          <select data-color>
            <option value="gray">Gray</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </div>
        <div class="field">
          <label>Rotation (°)</label>
          <input type="number" data-angle value="45" min="-180" max="180" />
        </div>
      </div>
      <label class="checkbox"><input type="checkbox" data-repeat /> Repeat across the page (tiled watermark)</label>
      <div class="actions"><button class="btn" data-go>Add watermark</button></div>
    </div>
  `);
  const opacitySlider = options.querySelector('[data-opacity]');
  const opacityLabel = options.querySelector('[data-opacitylabel]');
  opacitySlider.addEventListener('input', () => (opacityLabel.textContent = opacitySlider.value));

  const progress = progressBar();
  const resultsHost = el(`<div></div>`);

  options.querySelector('[data-go]').addEventListener('click', async () => {
    errorBox(panel, null);
    resultsHost.innerHTML = '';
    const text = options.querySelector('[data-text]').value.trim() || 'DRAFT';
    const size = Number(options.querySelector('[data-size]').value) || 60;
    const opacity = Number(opacitySlider.value) / 100;
    const color = COLORS[options.querySelector('[data-color]').value] || COLORS.gray;
    const angleDeg = Number(options.querySelector('[data-angle]').value) || 0;
    const repeat = options.querySelector('[data-repeat]').checked;
    progress.show('Watermarking…');
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();

      const rad = (angleDeg * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const textWidth = font.widthOfTextAtSize(text, size);
      const textHeight = font.heightAtSize(size);

      function drawCentered(page, cx, cy) {
        const x = cx - (textWidth / 2) * cos + (textHeight / 2) * sin;
        const y = cy - (textWidth / 2) * sin - (textHeight / 2) * cos;
        page.drawText(text, { x, y, size, font, color, opacity, rotate: degrees(angleDeg) });
      }

      for (let i = 0; i < pages.length; i++) {
        progress.set(i / pages.length, `Watermarking page ${i + 1}/${pages.length}`);
        const page = pages[i];
        const { width, height } = page.getSize();
        if (repeat) {
          const stepX = textWidth + size * 3;
          const stepY = textHeight + size * 5;
          for (let y = stepY / 2; y < height + stepY / 2; y += stepY) {
            for (let x = stepX / 2; x < width + stepX / 2; x += stepX) {
              drawCentered(page, x, y);
            }
          }
        } else {
          drawCentered(page, width / 2, height / 2);
        }
        await new Promise((resolve) => setTimeout(resolve, 0));
      }

      const blob = new Blob([await doc.save()], { type: 'application/pdf' });
      progress.hide();
      const box = el(`
        <div class="result">
          <h3>✅ Watermarked ${pages.length} page${pages.length > 1 ? 's' : ''} (${formatBytes(blob.size)})</h3>
          <div class="actions"><button class="btn" data-dl>⬇ Download watermarked PDF</button></div>
        </div>
      `);
      box.querySelector('[data-dl]').addEventListener('click', () => downloadBlob(blob, `${stem(file.name)}-watermarked.pdf`));
      resultsHost.appendChild(box);
    } catch (err) {
      progress.hide();
      errorBox(panel, `Watermarking failed: ${err.message}. Password-protected PDFs are not supported.`);
    }
  });

  panel.append(zone, info, options, progress.root);
  container.append(panel, resultsHost);
  container.appendChild(el(`<p class="note">Classic use: stamp your student ID across a shared draft, or mark it “DRAFT” before submitting for peer review — tick “Repeat across the page” so it can’t be cropped out.</p>`));
}

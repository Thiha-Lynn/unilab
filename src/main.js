import './styles.css';
import { el } from './ui.js';
import { registerServiceWorker } from './register-sw.js';

registerServiceWorker();

// ---------------------------------------------------------------------------
// Tool registry. Each tool module default-exports render(container, tool).
// Lazy imports keep the landing page light.
// ---------------------------------------------------------------------------
export const CATEGORIES = {
  image: { name: 'Image', color: 'var(--c-image)' },
  pdf: { name: 'PDF', color: 'var(--c-pdf)' },
  text: { name: 'Text & Writing', color: 'var(--c-text)' },
  study: { name: 'Study', color: 'var(--c-study)' },
  utility: { name: 'Everyday', color: 'var(--c-utility)' },
};

export const TOOLS = [
  // ---- image ----
  { id: 'compress-image', name: 'Compress Image', icon: '🗜️', category: 'image',
    desc: 'Shrink photos to fit LMS upload limits while keeping quality.',
    load: () => import('./tools/compress-image.js') },
  { id: 'resize-image', name: 'Resize Image', icon: '📐', category: 'image',
    desc: 'Resize by pixels or percent — ID photos, slides, submissions.',
    load: () => import('./tools/resize-image.js') },
  { id: 'crop-image', name: 'Crop Image', icon: '✂️', category: 'image',
    desc: 'Crop freely or to presets like 1:1 profile and 3:4 ID photo.',
    load: () => import('./tools/crop-image.js') },
  { id: 'convert-image', name: 'Convert Image', icon: '🔄', category: 'image',
    desc: 'JPG ↔ PNG ↔ WebP in bulk, right in your browser.',
    load: () => import('./tools/convert-image.js') },
  { id: 'image-to-pdf', name: 'Images → PDF', icon: '🖼️', category: 'image',
    desc: 'Turn photos of notes or homework into one clean PDF.',
    load: () => import('./tools/image-to-pdf.js') },
  { id: 'heic-to-jpg', name: 'HEIC to JPG', icon: '📱', category: 'image',
    desc: 'Turn iPhone photos into JPG so uploads stop getting rejected.',
    load: () => import('./tools/heic-to-jpg.js') },
  // ---- pdf ----
  { id: 'merge-pdf', name: 'Merge PDF', icon: '➕', category: 'pdf',
    desc: 'Combine reports, cover pages and appendices into one file.',
    load: () => import('./tools/merge-pdf.js') },
  { id: 'split-pdf', name: 'Split PDF', icon: '📑', category: 'pdf',
    desc: 'Extract the pages you need, or split every page apart.',
    load: () => import('./tools/split-pdf.js') },
  { id: 'compress-pdf', name: 'Compress PDF', icon: '📉', category: 'pdf',
    desc: 'Get big scanned PDFs under submission size limits.',
    load: () => import('./tools/compress-pdf.js') },
  { id: 'pdf-to-images', name: 'PDF → Images', icon: '🖨️', category: 'pdf',
    desc: 'Export slides or pages as JPG/PNG for notes and posts.',
    load: () => import('./tools/pdf-to-images.js') },
  { id: 'organize-pdf', name: 'Organize PDF', icon: '🗂️', category: 'pdf',
    desc: 'Reorder, rotate or delete pages with live thumbnails.',
    load: () => import('./tools/organize-pdf.js') },
  { id: 'watermark-pdf', name: 'Watermark PDF', icon: '💧', category: 'pdf',
    desc: 'Stamp a diagonal DRAFT, ID, or CONFIDENTIAL watermark on every page.',
    load: () => import('./tools/watermark-pdf.js') },
  { id: 'page-numbers-pdf', name: 'Page Numbers', icon: '#️⃣', category: 'pdf',
    desc: 'Add page numbers to any PDF for thesis and report formatting rules.',
    load: () => import('./tools/page-numbers-pdf.js') },
  // ---- text ----
  { id: 'word-counter', name: 'Word Counter', icon: '🔢', category: 'text',
    desc: 'Words, characters, sentences and reading time — live.',
    load: () => import('./tools/word-counter.js') },
  { id: 'citation-generator', name: 'Citation Generator', icon: '📚', category: 'text',
    desc: 'APA 7 and MLA 9 citations for websites, books and journals.',
    load: () => import('./tools/citation-generator.js') },
  // ---- study ----
  { id: 'gpa-calculator', name: 'GPA Calculator', icon: '🎓', category: 'study',
    desc: 'Term and cumulative GPA on the standard university scale.',
    load: () => import('./tools/gpa-calculator.js') },
  { id: 'pomodoro', name: 'Focus Timer', icon: '🍅', category: 'study',
    desc: 'Pomodoro study sessions with breaks and a session count.',
    load: () => import('./tools/pomodoro.js') },
  // ---- utility ----
  { id: 'qr-generator', name: 'QR Code Maker', icon: '🔳', category: 'utility',
    desc: 'Share links and Wi-Fi with your group in one scan.',
    load: () => import('./tools/qr-generator.js') },
  { id: 'unit-converter', name: 'Unit Converter', icon: '⚖️', category: 'utility',
    desc: 'Length, mass, temperature, data size and more.',
    load: () => import('./tools/unit-converter.js') },
];

const app = document.getElementById('app');
let activeCategory = 'all';
let searchQuery = '';

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------
function renderHome() {
  document.title = 'UniLab — Every tool a student needs';
  app.innerHTML = '';
  const wrap = el(`<div class="wrap"></div>`);

  wrap.appendChild(el(`
    <header class="topbar">
      <div class="logo"><span class="mark">🎒</span> Uni<b>Lab</b></div>
      <div class="privacy-pill">🔒 Files never leave your device</div>
    </header>
  `));

  const hero = el(`
    <section class="hero">
      <h1>Every tool a student needs,<br>in one place.</h1>
      <p>Free forever. No sign-up, no ads, no upload limits — everything runs
         inside your browser, so your files stay on your device.</p>
      <div class="search">
        <span class="icon">🔍</span>
        <input type="search" placeholder="Search tools… (e.g. compress, PDF, GPA)" aria-label="Search tools" />
      </div>
    </section>
  `);
  const searchInput = hero.querySelector('input');
  searchInput.value = searchQuery;
  searchInput.addEventListener('input', () => { searchQuery = searchInput.value; renderGrid(); });
  wrap.appendChild(hero);

  const pills = el(`<div class="pills"></div>`);
  const cats = [['all', 'All tools'], ...Object.entries(CATEGORIES).map(([k, v]) => [k, v.name])];
  for (const [key, label] of cats) {
    const b = el(`<button class="pill${key === activeCategory ? ' active' : ''}"></button>`);
    b.textContent = label;
    b.addEventListener('click', () => {
      activeCategory = key;
      pills.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
      b.classList.add('active');
      renderGrid();
    });
    pills.appendChild(b);
  }
  wrap.appendChild(pills);

  const grid = el(`<div class="grid" id="tool-grid"></div>`);
  wrap.appendChild(grid);

  function renderGrid() {
    const q = searchQuery.trim().toLowerCase();
    const visible = TOOLS.filter((t) =>
      (activeCategory === 'all' || t.category === activeCategory) &&
      (!q || `${t.name} ${t.desc} ${t.category}`.toLowerCase().includes(q))
    );
    grid.innerHTML = '';
    if (!visible.length) {
      grid.appendChild(el(`<div class="empty-state">No tools match “${q}” — try another word.</div>`));
      return;
    }
    for (const t of visible) {
      const color = CATEGORIES[t.category].color;
      const card = el(`
        <button class="tool-card" style="--cc:${color}">
          <div class="icon">${t.icon}</div>
          <span class="cat">${CATEGORIES[t.category].name}</span>
          <h3></h3>
          <p></p>
        </button>
      `);
      card.querySelector('h3').textContent = t.name;
      card.querySelector('p').textContent = t.desc;
      card.addEventListener('click', () => { location.hash = `#/${t.id}`; });
      grid.appendChild(card);
    }
  }
  renderGrid();

  wrap.appendChild(el(`
    <footer class="footer">
      <p><b>🔒 Private by design:</b> every tool runs 100% in your browser.
      Nothing is uploaded, tracked or stored — PDPA-friendly by architecture.</p>
      <p>UniLab · a student project from Mae Fah Luang University · Software Engineering Case Studies 1/2569</p>
      <p>Free &amp; open source — <a href="https://github.com/mfu-hlaing/unilab" target="_blank" rel="noopener">⭐ star or contribute on GitHub</a></p>
    </footer>
  `));

  app.appendChild(wrap);
}

// ---------------------------------------------------------------------------
// Tool page
// ---------------------------------------------------------------------------
async function renderTool(tool) {
  document.title = `${tool.name} — UniLab`;
  app.innerHTML = '';
  const color = CATEGORIES[tool.category].color;
  const wrap = el(`<div class="wrap tool-page" style="--cc:${color}"></div>`);
  wrap.appendChild(el(`<a class="backlink" href="#/">← All tools</a>`));
  wrap.appendChild(el(`
    <div class="tool-head">
      <div class="icon">${tool.icon}</div>
      <h1>${tool.name}</h1>
      <p>${tool.desc}</p>
    </div>
  `));
  const container = el(`<div></div>`);
  wrap.appendChild(container);
  app.appendChild(wrap);

  try {
    const mod = await tool.load();
    mod.default(container, tool);
  } catch (err) {
    console.error(err);
    container.appendChild(el(`<div class="error-box">This tool failed to load: ${err.message}</div>`));
  }
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------
function route() {
  const id = location.hash.replace(/^#\/?/, '');
  const tool = TOOLS.find((t) => t.id === id);
  if (tool) renderTool(tool);
  else renderHome();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();

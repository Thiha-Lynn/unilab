import { el } from '../ui.js';

// Thai (and other space-less scripts) can't be counted by splitting on spaces —
// Intl.Segmenter segments by real word boundaries when available.
const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter
  ? new Intl.Segmenter(undefined, { granularity: 'word' })
  : null;

function countWords(text) {
  if (!text.trim()) return 0;
  if (segmenter) {
    let n = 0;
    for (const seg of segmenter.segment(text)) if (seg.isWordLike) n++;
    return n;
  }
  return text.trim().split(/\s+/).length;
}

export default function render(container) {
  const panel = el(`
    <div class="panel">
      <textarea class="input" rows="12" placeholder="Paste or type your essay, report or post here…" aria-label="Text to analyze"></textarea>
      <div class="big-stats">
        <div class="big-stat"><div class="v" data-words>0</div><div class="k">Words</div></div>
        <div class="big-stat"><div class="v" data-chars>0</div><div class="k">Characters</div></div>
        <div class="big-stat"><div class="v" data-nospace>0</div><div class="k">No spaces</div></div>
        <div class="big-stat"><div class="v" data-sentences>0</div><div class="k">Sentences</div></div>
        <div class="big-stat"><div class="v" data-paragraphs>0</div><div class="k">Paragraphs</div></div>
        <div class="big-stat"><div class="v" data-reading>0 min</div><div class="k">Reading time</div></div>
        <div class="big-stat"><div class="v" data-speaking>0 min</div><div class="k">Speaking time</div></div>
      </div>
    </div>
  `);
  const ta = panel.querySelector('textarea');
  const set = (sel, v) => (panel.querySelector(sel).textContent = v);
  const mins = (words, wpm) => {
    if (!words) return '0 min';
    const m = words / wpm;
    return m < 1 ? '< 1 min' : `${Math.round(m)} min`;
  };

  function update() {
    const text = ta.value;
    const words = countWords(text);
    set('[data-words]', words.toLocaleString());
    set('[data-chars]', text.length.toLocaleString());
    set('[data-nospace]', text.replace(/\s/g, '').length.toLocaleString());
    set('[data-sentences]', (text.match(/[.!?…]+(\s|$)/g) || []).length.toLocaleString());
    set('[data-paragraphs]', text.trim() ? text.trim().split(/\n\s*\n+/).length : 0);
    set('[data-reading]', mins(words, 200));
    set('[data-speaking]', mins(words, 130));
  }
  ta.addEventListener('input', update);

  container.appendChild(panel);
  container.appendChild(el(`<p class="note">Counting is Thai-aware: ข้อความภาษาไทยนับคำได้ถูกต้อง even without spaces. Everything stays in your browser — nothing is sent anywhere.</p>`));
}

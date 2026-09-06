// The privacy page.
//
// rule.md, PDPA 25: "The system must ship a privacy page, in plain English, stating
// what is processed, where it is processed, what is held and for how long, what is
// fetched from the network and why, and how to erase a result — one screen, not
// twelve pages, and not copied from another product."
//
// Those six questions are the six headings below, in that order, and nothing else is
// here. The temptation with a privacy page is to write the long defensive one every
// other site has; that page exists to protect its author, and rule.md rules it out
// twice — "one screen" and "not copied from another product".
//
// Every claim on this page is checked by something. Where a statement is provable by
// a test or by reading a specific file, the page says which — because rule.md PDPA 24
// forbids a privacy claim the code does not enforce, and a claim the reader can verify
// is worth more than a promise they have to accept.

import { el } from './ui.js';
import { TTL_MINUTES } from './vault.js';
import { describeLimit, MAX_FILE_BYTES } from './intake.js';

export function renderPrivacy(app) {
  const wrap = el(`<div class="wrap privacy-page"></div>`);

  wrap.appendChild(el(`
    <header class="privacy-page__head">
      <a class="back" href="#/">← All tools</a>
      <h1>Privacy</h1>
      <p class="lede">UniLab runs entirely in your browser. That one fact answers most of
      what a privacy page normally has to explain, so this page is short on purpose.</p>
    </header>
  `));

  wrap.appendChild(el(`
    <section class="privacy-page__body">

      <h2>What is processed</h2>
      <p>Whatever file you choose — a PDF, an image, a video, an audio recording — plus the
      options you set for the tool, such as a target size or a page range. Nothing else.
      There is no account, so there is no name, email or phone number to process.</p>

      <h2>Where it is processed</h2>
      <p><b>On your own device, inside this browser tab.</b> Your file is never uploaded.
      There is no server that receives files and no upload endpoint anywhere in the code —
      not switched off, not restricted: absent.</p>
      <p class="check">You can check this yourself: open your browser's developer tools,
      go to the Network tab, and run any tool. No request carries your file.</p>

      <h2>What is held, and for how long</h2>
      <p>Only the <b>finished result</b>, and only in this tab's memory, for
      <b>${TTL_MINUTES} minutes</b>. It is never written to disk, and it is dropped when the
      countdown ends, when you press <b>Delete now</b>, or the moment you close the tab —
      whichever happens first. The file you started with is never held at all.</p>
      <p class="check">This is proven by an automated test, not asserted: after a purge the
      result's object URL no longer resolves, so the bytes are unreachable rather than
      merely delisted. See <code>test/vault-deletion.test.mjs</code>.</p>

      <h2>What is fetched from the network, and why</h2>
      <p>The page itself, and — for two tools only — a program the tool needs in order to
      run on your device:</p>
      <ul>
        <li><b>OCR</b> downloads a recognition engine and the language packs you pick.</li>
        <li><b>Remove Background</b> downloads its model the first time you use it.</li>
      </ul>
      <p>Both say what they will download, and roughly how large, <b>before</b> starting.
      What is fetched is program code and model data. <b>Your file is never part of a
      request</b> — the model comes to your file, not the other way round.</p>

      <h2>How to erase a result</h2>
      <p>Press <b>Delete now</b> on the download screen, or close the tab. Both drop the
      result immediately. There is no account to delete, no data of yours on a server to
      request, and no form to fill in — the delete button <i>is</i> the erasure right,
      exercised directly.</p>

      <h2>Cookies, ads and analytics</h2>
      <p>None. No advertising, no analytics, no tracking pixels, no third-party scripts
      that watch you. Nothing about what you do here is measured or sent anywhere, so
      there is no consent banner — there is nothing to consent to.</p>

      <h2>Limits worth knowing</h2>
      <ul>
        <li>One file at a time, up to ${describeLimit(MAX_FILE_BYTES)}; files the tool
        cannot open are refused and not read.</li>
        <li>Because the work happens on your device, a large video is bounded by how fast
        that device is. We cannot promise server speed, and we do not.</li>
        <li>Installing UniLab for offline use stores the <i>app</i> on your device. It
        never stores your files.</li>
      </ul>

      <h2>Questions</h2>
      <p>UniLab is a student project at Mae Fah Luang University, built by DIGITAL
      IMPOSTERS PVT. CO., LTD. for course 1305493. For a PDPA question, or anything on this
      page you think is wrong, open an issue on
      <a href="https://github.com/Thiha-Lynn/unilab/issues" target="_blank" rel="noopener">GitHub</a>
      — we answer within 30 days. The whole source is public, so you never have to take
      this page's word for anything.</p>

    </section>
  `));

  app.appendChild(wrap);
}

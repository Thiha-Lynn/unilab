#!/usr/bin/env python3
"""Compose the two print documents. Called by render-gate-pdf.sh — not run directly.

argv: <dir of the deck>  <work dir holding png/ and thumb/>

The speaker script is read out of the deck's own <aside class="notes"> blocks, so the
handout and the deck can never disagree about what anyone is meant to say.
"""
import re, sys, pathlib, html

HERE, WORK = (pathlib.Path(p) for p in sys.argv[1:3])
deck = (HERE / "20260909-gate-deck.html").read_text(encoding="utf-8")
NOTES = re.findall(r'<aside class="notes">(.*?)</aside>', deck, re.S)
assert len(NOTES) == 10, f"expected 10 note blocks, found {len(NOTES)}"
# our page header carries the speaker and the timing, so drop the notes' own heading
NOTES = [re.sub(r"<h4>.*?</h4>", "", n, flags=re.S).strip() for n in NOTES]

RUN = [
    ("0", "UniLab · the one line",                "Myo Zin Thant",         "Product Owner", "15 s", ""),
    ("1", "One workflow, fifty-eight settings",   "Myo Zin Thant",         "Product Owner", "30 s", "cut to 20 s — drop the category strip"),
    ("2", "Fifteen people, fifteen programmes",   "Swan Htut Oakkar Aung", "Designer",      "40 s", "cut to 30 s"),
    ("3", "What they said — twelve pains",        "Wanna San",             "AI Lead",       "60 s", "cut to 50 s — drop the out-of-scope line"),
    ("4", "One thread, six documents",            "Thiha Lin",             "Tech Lead",     "50 s", "cut to 40 s"),
    ("5", "What we got wrong",                    "Zaw Win Htut",          "QA / Test",     "50 s", "cut to 40 s"),
    ("6", "It runs with the Wi-Fi off",           "Thiha Lin",             "Tech Lead",     "45 s", "never cut this one"),
    ("7", "Compliance is architecture",           "Zaw Win Htut",          "QA / Test",     "25 s", "cut to 10 s — the bold sentence only"),
    ("8", "What is still open",                   "Myo Zin Thant",         "Product Owner", "25 s", "cut to 20 s"),
    ("9", "Questions",                            "all five",              "",              "—",    ""),
]

# the one sentence each slide exists to land, and the thing to do while saying it
LAND = [
    ("The file never leaves the device.", "Say the five names or point at them. Do not read the three number cards — they are there for the reviewer, not for you."),
    ("58 tools are 58 settings of one workflow, not 58 workflows.", "This is the answer to the one-month, one-workflow guardrail. Say it before anyone can count the tools and call it sprawl."),
    ("Fifteen people, fifteen programmes — and nobody from this course.", "Point at the grid rows: each row is one of us, three each. Then the two numbers that changed the product: five never touched a laptop, four handled an identity document."),
    ("The pain is rarely “I can't make a PDF.” It's the workflow around it.", "Say the numbers, do not read the chart. P7 seven, P6 seven, P10 six. Land on P7 being the one no hypothesis predicted."),
    ("Pain, requirement, backlog, screen — the same thread, every document.", "Walk left to right along the row with your hand. The quote is S12's, so if the reviewer asks who that is, Myo interviewed them."),
    ("Every requirement still in the spec traces to a stated pain — because we took two out.", "This is the slide that earns trust. Do not soften it, do not apologise for it, and do not skip to the good news."),
    ("Nothing left this machine, because nothing could.", "The demo is the argument. Show airplane mode first, then the estimate before the run, then Delete now."),
    ("A duty you have discharged can fail. A duty you never incurred cannot.", "If you are behind the clock, say only that sentence and hand over. The eight LRs are on screen for the reviewer to read."),
    ("Fifteen interviewed, twelve pains, every requirement traced, two parked in the open.", "Say the open items before anyone asks for them. A team that volunteers its gaps is read as a team that knows where it stands."),
    ("Take the question, then hand it to the person who ran that interview.", "Nobody answers for someone else's participant. The next page is the bank of questions and who owns each."),
]

TOK = """
  --bg:#f6f7fb; --card:#fff; --ink:#171c26; --muted:#5b6472; --faint:#8a93a2; --line:#e4e7ee;
  --accent:#5b5bd6; --accent-strong:#4747c2; --accent-soft:#eeeefc;
  --good:#1d9e77; --good-soft:#e4f6ef; --warn:#d97706; --warn-soft:#fff7ed;
  --danger:#d64545; --danger-soft:#fee2e2;
"""
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
         'family=Inter:wght@400;500;600;700;800&display=swap">')
FAM = ('Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,'
       '"Noto Sans Thai","Noto Sans Myanmar",sans-serif')

# ─────────────────────────────── slides ───────────────────────────────
slides_pages = "".join(
    f'<section class="p"><img src="png/slide-{i}.png" alt="Slide {i}"></section>' for i in range(10))
(WORK / "slides.html").write_text(f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>UniLab — W5 User Validation Gate, 9 September 2026</title><style>
@page{{size:13.333in 7.5in;margin:0}}
*{{box-sizing:border-box}} html,body{{margin:0;padding:0;background:#fff}}
.p{{width:13.333in;height:7.5in;overflow:hidden;break-after:page;page-break-after:always;
   display:block;line-height:0}}
.p:last-child{{break-after:auto;page-break-after:auto}}
img{{width:13.333in;height:7.5in;display:block}}
</style></head><body>{slides_pages}</body></html>""", encoding="utf-8")

# ─────────────────────────────── handout ───────────────────────────────
def chip(cls, txt):
    return f'<span class="chip {cls}">{txt}</span>' if txt else ""

pages = []

pages.append(f"""<section class="pg cover">
<div class="brand">1305493 Software Engineering Case Studies · 1/2569 · Dr. Prasara Jakkaew</div>
<h1>Speaker notes</h1>
<p class="sub">W5 User Validation Gate review · 9 September 2026<br>
<b>Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD.</b> — UniLab</p>
<div class="counts">
  <div><b>15</b><span>students interviewed<br>22 Aug – 8 Sep 2026</span></div>
  <div><b>12</b><span>pains recorded<br>six we did not predict</span></div>
  <div><b>5:00</b><span>on the clock<br>ten slides, five speakers</span></div>
</div>
<h2>Before the room — 15 minutes, in this order</h2>
<table class="t">
<tr><th style="width:8.4em">Who</th><th>Do this</th><th style="width:15.5em">Why it matters</th></tr>
<tr><td><b>Thiha Lin</b></td><td>Laptop on the projector. Open <span class="u">thiha-lynn.github.io/unilab</span>, open <b>Compress PDF</b>, and drop a real PDF on it <b>while still online</b>. <b>Then</b> switch to airplane mode.</td><td>The tool module is lazy-loaded. Loaded online once, it runs offline. Going offline <i>first</i> gives you a spinner, not a demo.</td></tr>
<tr><td><b>Thiha Lin</b></td><td>Second tab: the deck. Third tab: <span class="u">results.md</span> on GitHub, in a <b>logged-out</b> window.</td><td>"Tell me about one of them" is answered from the log, not from memory. Logged-out proves the repo is public.</td></tr>
<tr><td><b>Myo Zin Thant</b></td><td>Confirm the Classroom submission shows the link <span class="u">github.com/Thiha-Lynn/unilab</span>.</td><td>The grader opens the link, not the laptop.</td></tr>
<tr><td><b>Zaw Win Htut</b></td><td>Phone open at your three participants — S1, S6, S11.</td><td>Backup if the laptop tab dies.</td></tr>
<tr><td><b>Wanna San</b></td><td>Three numbers in your head: <b>P7 seven, P6 seven, P10 six</b>.</td><td>Slide 3 is numbers. Say them, don't read them off the chart.</td></tr>
<tr><td><b>Everyone</b></td><td>Re-read <b>your own three</b> blocks in <span class="u">results.md</span> — not all fifteen.</td><td>The follow-up question goes to the interviewer, not to whoever is holding the clicker.</td></tr>
</table>
<div class="pfoot">Page 1 of 14 · the run sheet is overleaf</div>
</section>

<section class="pg">
<div class="ph"><span class="pn">Run sheet</span><span class="pt">Who says what, and for how long</span>
<span class="chip time">5:00</span></div>
<table class="t run">
<tr><th style="width:2em">#</th><th>Slide</th><th style="width:11.5em">Speaker</th><th style="width:3.4em">Time</th><th style="width:12.5em">If the clock is ahead of you</th></tr>
{"".join(f'<tr><td class="n">{n}</td><td><b>{t}</b></td><td>{w}{"<span class=role>"+r+"</span>" if r else ""}</td><td class="n">{s}</td><td class="cutcol">{c or "—"}</td></tr>' for n,t,w,r,s,c in RUN)}
</table>
<p class="foot"><b>5:00 with the cuts, 5:40 without.</b> Every cut listed above is the <i>last</i> sentence
of that slide's script, so dropping it never breaks the hand-off to the next speaker.
<b>Never cut slide 6</b> — the offline demo is the one thing nobody else in the room can do.</p>
<h2 class="sp">The hand-offs, in order</h2>
<p class="lede">Each speaker ends by naming the next one. Say the hand-off line even if you have cut
the rest — it is what stops the pause between speakers.</p>
<ol class="hand">
<li><b>Myo</b> opens and stays on for slide 1 → <i>"Swan will tell you who we talked to."</i></li>
<li><b>Swan</b> gives the sample → <i>"Wanna has what they said."</i></li>
<li><b>Wanna</b> gives the twelve pains → <i>"Thiha will take one of those all the way to the screen."</i></li>
<li><b>Thiha</b> walks the chain → <i>"Zaw has the part we got wrong."</i></li>
<li><b>Zaw</b> gives the two that failed → <i>"Thiha — Wi-Fi off."</i></li>
<li><b>Thiha</b> runs the demo → <i>"Zaw — the law, in one line."</i></li>
<li><b>Zaw</b> gives the one compliance sentence → no hand-off; <b>Myo</b> closes.</li>
<li><b>Myo</b> names what is open, then: <i>"Questions."</i></li>
</ol>
<div class="pfoot">Page 2 of 14 · every page after this one is one slide: what is on screen, and the words to say</div>
</section>""")

for i, notes in enumerate(NOTES):
    n, title, who, role, secs, cut = RUN[i]
    land, doing = LAND[i]
    # a long script would push the page furniture onto a second sheet; tighten instead
    words = len(re.sub(r"<[^>]+>", "", notes).split())
    tight = " tight" if words > 85 else ""
    pages.append(f"""<section class="pg{tight}">
<div class="ph"><span class="pn">Slide {n}</span><span class="pt">{title}</span>
{chip("who", who + (" · " + role if role else ""))}{chip("time", secs)}{chip("cut", cut)}</div>
<img class="shot" src="thumb/slide-{i}.png" alt="Slide {n}">
<p class="land">{land}</p>
<div class="say"><h4>Say this</h4>{notes}</div>
<p class="doing"><b>While you say it —</b> {doing}</p>
<div class="pfoot">UniLab · W5 gate · 9 Sep 2026 · page {i+3} of 14 — slide {n} of 9</div>
</section>""")

pages.append("""<section class="pg qa">
<div class="ph"><span class="pn">After the talk</span><span class="pt">The questions — and who answers</span></div>
<p class="lede">Take the question, then hand it to the person named. Answering for someone else's
participant is how an honest pack starts to sound invented.</p>
<table class="t qa">
<tr><th style="width:13.5em">They ask</th><th style="width:7.4em">Who</th><th>Say</th></tr>
<tr><td class="q"><b>"Tell me about one of them."</b></td><td>whoever <b>ran</b> it</td><td>Role, date, the task, the pain in their words, the quote. <b>Zaw</b> S1 S6 S11 · <b>Myo</b> S2 S7 S12 · <b>Wanna</b> S3 S8 S13 · <b>Swan</b> S4 S9 S14 · <b>Thiha</b> S5 S10 S15. Worked example, Myo on S7: first-year Traditional Chinese Medicine, sent a medical certificate to a lecturer over LINE, "I mostly think about getting it accepted" — and the photo carried a full name and a hospital number before they thought about it.</td></tr>
<tr><td class="q">"How did you find them? Are they classmates?"</td><td>Swan</td><td>Own LINE groups and programme contacts. <b>Nobody from this course.</b> Chat counts — the M1 guide says a real user is anyone who has the problem and can be reached.</td></tr>
<tr><td class="q">"Where are the names?"</td><td>Zaw</td><td>Nowhere, by <b>LR7</b> — it is a public repository. Role, pain and quote only, and the code-to-person mapping was never written down.</td></tr>
<tr><td class="q">"Fifty-eight tools in one month?"</td><td>Myo</td><td>Fifty-eight <i>settings</i> of one workflow. The core feature is the one thing month two has to ship end to end; everything else is a parameter of it.</td></tr>
<tr><td class="q"><b>"Why is UniLab not on the topic list?"</b></td><td>Myo</td><td>The overview says pick your own; the 19 August slide lists five. We built on the first and we are confirming with you today. The fallback is mapped — Internship Management System is nearest, and <span class="u">rule.md</span>, the legal chain, the agents and the tests all transfer.</td></tr>
<tr><td class="q">"Where is the OCR? You said nineteen languages."</td><td>Zaw</td><td>Shipped, and <b>parked</b>. Zero of fifteen asked for it — spec §2.1, question Q5. We ask that branch directly in the next five interviews.</td></tr>
<tr><td class="q">"Every requirement traces to a pain?"</td><td>Thiha</td><td>Every F, NFR and LR — the spec carries the column. Two didn't, so they are out of the table rather than re-argued.</td></tr>
<tr><td class="q">"What was the biggest surprise?"</td><td>Wanna</td><td><b>P7.</b> Nobody was stopped by a PDF; seven of fifteen were stopped by finding out too late. It is the pain our estimate-before-the-run already answered, so F5 has the strongest evidence of anything we built.</td></tr>
<tr><td class="q">"H3 — did you measure the Wi-Fi?"</td><td>Zaw</td><td>Our half: <b>zero network attempts</b> across five exit APIs, measured. The competitor half needs campus Wi-Fi and has not been timed. Three participants described it — that is perception, and we say so.</td></tr>
<tr><td class="q">"Is 'free' your pitch?"</td><td>Myo</td><td>No. Nobody in fifteen would switch for free, and two already have free tools they like. One place, fewer steps — and custody for identity documents.</td></tr>
<tr><td class="q">"Why not ffmpeg for the video tools?"</td><td>Thiha</td><td>Thirty-one megabytes and CPU decode. We use WebCodecs through mediabunny — and video and audio are the part no free PDF site has at all.</td></tr>
<tr><td class="q">"What is your metric?"</td><td>Myo</td><td>Files leaving the device per task: every one before, <b>zero</b> after. Secondary: time to a finished file — the sample's median was thirty-five minutes — and format or size rejections, which nine of fifteen hit.</td></tr>
</table>
<div class="pfoot">UniLab · W5 gate · 9 Sep 2026 · page 13 of 14 — after the talk</div>
</section>

<section class="pg">
<div class="ph"><span class="pn">Two answers</span><span class="pt">Have these ready before you walk in</span></div>
<div class="two">
<div><h2>If you do not know</h2><p class="big">"That's in the log — I'll find it."</p>
<p class="lede">Then open <span class="u">.docs/05-log/20260908-log.md</span>, Addendum 3. Every coding
decision, every contradiction and the full audit are in it. Looking it up in front of the room reads
as a team that keeps records. Guessing reads as a team that does not.</p></div>
<div><h2>The sentence to have ready</h2><p class="big">A student cannot verify a deletion promise, so
no file may leave the device, so the tool shows the size before it runs, so screen S3 shows the
countdown and <i>Delete now</i>.</p>
<p class="lede">That is <b>pain → requirement → backlog → design</b> in one breath, and slide 4 is the
picture of it.</p></div>
</div>
<h2 class="sp">And the one thing not to do</h2>
<p class="lede">Do not answer a question about a participant you did not interview, and do not
soften the two parked requirements into something that sounds asked-for. The pack is strong
<i>because</i> it says what fifteen people did not ask for. Reading it any other way is the only
version of this that falls apart under a follow-up question.</p>
<div class="pfoot">UniLab · W5 gate · 9 Sep 2026 · page 14 of 14 — after the talk</div>
</section>""")

(WORK / "notes.html").write_text(f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>UniLab gate — speaker notes, 9 September 2026</title>{FONTS}<style>
:root{{{TOK}}}
@page{{size:A4 portrait;margin:12mm 12mm 10mm}}
*{{box-sizing:border-box}}
html,body{{margin:0;background:#fff;color:var(--ink);font-family:{FAM};
  font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased}}
.pg{{break-after:page;page-break-after:always;position:relative;min-height:271mm;
  padding-bottom:9mm}}
.pg:last-child{{break-after:auto;page-break-after:auto}}
.ph{{display:flex;flex-wrap:wrap;align-items:baseline;gap:5px 8px;
  border-bottom:2px solid var(--ink);padding-bottom:5px}}
.pn{{font-size:8.5pt;font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:var(--faint)}}
.pt{{font-size:15pt;font-weight:800;letter-spacing:-.015em;flex:1;min-width:8em;line-height:1.15}}
.chip{{font-size:8.2pt;font-weight:700;border-radius:99px;padding:2.5px 9px;white-space:nowrap}}
.chip.who{{background:var(--accent-soft);color:var(--accent-strong)}}
.chip.time{{background:var(--ink);color:#fff}}
.chip.cut{{background:var(--warn-soft);color:#8a4b00}}
.shot{{display:block;width:100%;border:1px solid var(--line);border-radius:9px;margin:4mm 0 4.5mm}}
.land{{font-size:13.5pt;font-weight:700;line-height:1.32;letter-spacing:-.012em;margin:0 0 4mm;
  padding-left:4.5mm;border-left:3px solid var(--accent);text-wrap:balance}}
.say h4{{margin:0 0 2.5mm;font-size:8.2pt;letter-spacing:.11em;text-transform:uppercase;color:var(--faint)}}
.say{{font-size:12.6pt;line-height:1.52}}
.say p{{margin:0 0 3mm}}
.say .cue{{color:var(--accent-strong);font-weight:700}}
.say .cut{{color:#8a4b00;font-weight:700;background:var(--warn-soft);padding:0 4px;border-radius:4px}}
.say .hand{{color:var(--good);font-weight:700}}
.say em,.say i{{color:var(--muted)}}
.say .mono,.u{{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9em}}
.u{{background:var(--bg);border:1px solid var(--line);border-radius:5px;padding:0 4px}}
.doing{{font-size:10pt;line-height:1.5;color:var(--muted);background:var(--bg);
  border:1px solid var(--line);border-radius:9px;padding:3mm 4mm;margin:4mm 0 0}}
.doing b{{color:var(--ink)}}
.cover .brand{{font-size:8.2pt;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);font-weight:700}}
.cover h1{{font-size:33pt;margin:2mm 0 1.5mm;letter-spacing:-.028em;line-height:1}}
.cover .sub{{font-size:11.5pt;color:var(--muted);margin:0 0 5mm;line-height:1.45}}
.cover .sub b{{color:var(--ink)}}
.counts{{display:grid;grid-template-columns:repeat(3,1fr);gap:3.5mm;margin-bottom:6mm}}
.counts div{{border:1px solid var(--line);border-radius:10px;padding:3.5mm 4mm}}
.counts b{{display:block;font-size:23pt;font-weight:800;letter-spacing:-.03em;line-height:1}}
.counts span{{font-size:8.6pt;color:var(--muted);line-height:1.35;display:block;margin-top:1.5mm}}
h2{{font-size:12.5pt;margin:0 0 2.5mm;letter-spacing:-.012em}}
h2.sp{{margin-top:6mm}}
table.t{{width:100%;border-collapse:collapse;font-size:9.2pt;line-height:1.42}}
table.t th{{text-align:left;font-size:7.8pt;letter-spacing:.09em;text-transform:uppercase;
  color:var(--faint);border-bottom:1px solid var(--line);padding:0 7px 3px 0;font-weight:700}}
table.t td{{vertical-align:top;padding:2.6mm 7px 2.6mm 0;border-bottom:1px solid var(--line)}}
table.t td:last-child,table.t th:last-child{{padding-right:0}}
.run td.n{{font-weight:700}}
.run .role{{display:block;font-size:8.2pt;color:var(--faint)}}
.run .cutcol{{color:#8a4b00}}
.qa .q{{font-weight:600}}
.foot,.lede{{font-size:9.6pt;color:var(--muted);line-height:1.5;margin:4mm 0 0}}
.lede{{margin:0 0 3.5mm}} .lede b,.foot b{{color:var(--ink)}}
.pg.tight .shot{{width:84%;margin:3mm 0 3.5mm}}
.pg.tight .land{{font-size:12.6pt;margin-bottom:3mm}}
.pg.tight .say{{font-size:11.9pt;line-height:1.46}}
.pg.tight .say p{{margin-bottom:2.4mm}}
.pg.tight .doing{{font-size:9.4pt;padding:2.6mm 3.4mm;margin-top:3mm}}
ol.hand{{margin:0;padding-left:5mm;font-size:9.6pt;line-height:1.5;color:var(--muted)}}
ol.hand li{{margin-bottom:1.6mm}} ol.hand b{{color:var(--ink)}}
ol.hand i{{color:var(--good);font-style:normal;font-weight:600}}
.two{{display:grid;grid-template-columns:1fr 1fr;gap:7mm;margin-top:6mm}}
.big{{font-size:12.5pt;font-weight:700;line-height:1.38;letter-spacing:-.012em;margin:0 0 3mm;
  text-wrap:balance}}
.pfoot{{position:absolute;bottom:0;left:0;right:0;font-size:8pt;color:var(--faint);
  border-top:1px solid var(--line);padding-top:2.2mm}}
</style></head><body>{"".join(pages)}</body></html>""", encoding="utf-8")

print(f"  composed slides.html (10 pages) and notes.html ({len(pages)} pages)")

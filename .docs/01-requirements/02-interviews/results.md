# Interview evidence log

**Course:** 1305493 · **Company:** DIGITAL IMPOSTERS PVT. CO., LTD. · **Product:** UniLab
**Bound by LR7:** role, pain and quote only. **No names, no student IDs, no contact details** —
this is a public repository. Participants are `S1`, `S2`, `S3`…, and the mapping from code to
person is never written down anywhere.

Every block below was captured through `/capture-requirement`, which also converted the
hypothesis the interview validated and re-pointed every requirement that cited it. Do not edit
this file by hand and skip that step — the citations in the spec and backlog will silently go
stale.

**In the field, use [`capture.html`](capture.html)** — open it on a phone, run the six questions
from it, tap *Copy block*, paste the result below. It has no name, ID or contact field at all, so
LR7 is enforced by construction rather than by remembering.

> **`rehearsal-scenarios.md` is not evidence and never becomes evidence.** It holds five invented
> practice conversations numbered `RS1`–`RS5`, so the team can rehearse the instrument. **Real
> participants are `S1`–`S15`.** The two number spaces never touch. No `P#` may cite an `RS#`;
> nothing from that file is copied into this one — not a line, not a quote, not a role.

> `S1`–`S3` also name the *prototype screens* in `.docs/02-design/`. The two meanings are
> disambiguated by document and never appear together; in this file `S#` is always a participant.

---

## Evidence position — 8 Sep 2026

> **15 interviews conducted (22 Aug – 8 Sep 2026) · 12 pains recorded (`P1`–`P12`) ·
> 6 hypotheses promoted · 2 unsupported · 1 confirmed as a finding.**
> Gate minimum 5, month-end target 15 — both met. Five interviewers, three participants each.

## Running count

| | |
|---|---|
| Interviews conducted | **15** |
| Gate minimum (8 Sep 2026) | **5** — met |
| Target (month end) | **15** — met |
| Pains recorded (`P#`) | **12** — `P1`–`P6` promoted from a hypothesis, `P7`–`P12` predicted by no hypothesis |
| Hypotheses promoted (`H#` → `P#`) | **6** — H1, H2, H3, H4, H5, H7 |
| Hypotheses unsupported (0 of 15 raised it) | **2** — H6, H8 (H8 also contradicted) |
| Hypotheses confirmed as a market finding, not a pain | **1** — H9 |
| Pains with no feature behind them (outside scope, recorded as boundaries) | **2** — P11 (LMS-side), P12 (office rendering; constrains NFR7) |
| Requirements parked — built, 0 of 15 asked | **2** — F8 OCR (H6), F11 Workflows (H8); spec §2.1, Q5/Q6 |

> **A participant does not have to be an MFU student, or on campus.** Per the instructor's
> `M1-choosing-your-problem` guide, a real user is anyone who **has the problem** and whom you
> **can reach to talk** — a call, a chat, a DM or a video call all count. The channel is recorded
> in every block. Teammates and classmates on this course never count, and none are in this file.

### The sample

| | |
|---|---|
| Participants | 15, all MFU undergraduates, **15 distinct programmes** |
| Year | Y1 ×4 · Y2 ×4 · Y3 ×4 · Y4 ×3 |
| Channel | chat ×10 · in person ×2 · voice call ×3 |
| Language | EN ×9 · TH ×4 · MY ×2 — quotes kept in the original, English gloss marked `[translated]` |
| Device pattern | phone only **5** · phone → laptop **7** · laptop only **2** · copy-shop scanner → phone **1** |
| Sensitive document in the task | 4 of 15 — transcript + passport (S4), medical certificate (S7), transcript + Thai ID (S12), signed permission sheet (S14) |
| Duration | 10–18 min each |

---

## Promotion rule

A hypothesis becomes a pain when **two different participants describe it unprompted**. One
participant is an anecdote. When `H_n` → `P_m`:

1. Move the row from the spec's hypothesis table to its pains table, keeping the evidence.
2. Re-point every requirement and backlog row citing `H_n` at `P_m`.
3. Retire the `H` number — never reuse or renumber it.
4. Update the counts above and the spec's §0 evidence table in the same edit.
5. Re-run `/audit-backlog`.

**"Unprompted" here means:** raised in Q1–Q6 or in the participant's own closing comment, not in
answer to a hypothesis-specific probe. The privacy probe *was* a prompt; a custody concern counts
only when it also surfaced in the six questions or the closing comment (S4, S7, S12, S14 all did).

## Hypothesis tracker

| # | Hypothesis (short) | Raised by, unprompted | Status |
|---|---|---|---|
| H1 | Free tools ration what you can do; the cap lands at the deadline | S1 (watermark), S3 (ads + daily quota), S9 (free size cap), S13 (paid batch) | **Promoted → P1** |
| H2 | Uploading a transcript / ID / medical certificate puts it in someone else's custody | S4, S7, S12, S14 | **Promoted → P2** |
| H3 | On campus Wi-Fi the upload round trip is itself part of the wait | S2, S9, S10 | **Promoted → P3** — the perception half. The competitor timing is **still unmeasured** (see the H3 section at the foot) |
| H4 | iPhone HEIC photos get rejected by upload forms | S4 (form), S13 (Word) | **Promoted → P4** |
| H5 | LMS size caps force compression against a specific number | S2, S10, S12, S15 (S6 weakly) | **Promoted → P5** — *with a recorded contradiction:* in 3 of 4 the number was unknown until the upload failed |
| H6 | Thai / Burmese scans are unsearchable, so quotes get retyped by hand | — **0 of 15** | **Unsupported.** Nobody mentioned searching, selecting text from, or retyping a scan. F8 / B8 **parked** for the gate (spec §2.1); re-admission is **Q5** |
| H7 | No one free site covers documents *and* video *and* audio | S1, S3, S13 ("one place"), S14 · video S2, S10 · audio S9 | **Promoted → P6** |
| H8 | The same multi-step chore repeats every week | — **0 of 15** | **Unsupported, and contradicted** by S8 ("only around deadlines"). F11 / B20 **parked** for the gate (spec §2.1); re-admission is **Q6** |
| H9 | "Free for students" is not a differentiator | S1, S3, S8, S15 | **Confirmed.** Nobody in 15 named "free" as a reason to switch. Stays an `H` — it is a market finding, and no requirement traces to it |

**Contradictions go here too.** A participant who contradicts a hypothesis is worth more than one
who confirms it — recorded prominently rather than filed quietly.

| Hypothesis / premise | Contradicted by | What they said instead |
|---|---|---|
| **H8** — the same chore every week | S8 | "…something I only use around deadlines." Use is episodic, not weekly |
| **H5** — compression *against a specific number* | S2, S10, S15 | The number was unknown until the upload failed. S2: "I didn't know the limit before trying to submit." S10 found the cap by re-exporting until it went through. S15's cap differed between the LMS app and the LMS website |
| **H2** — custody is a concern *at the moment of upload* | S7 | "…when a teacher asks for a document I mostly think about getting it accepted." Custody registered in hindsight. Design consequence: custody must be the default, not a choice made at 11 pm |
| **H2** — custody outweighs convenience | S12 | Uses the print shop *knowing* the shop PC keeps a copy, "because the scan quality is predictable." A custody-safe tool wins here only if its output is as predictable |
| **H2** — custody matters for every file | S14, S6 | S14: "For normal assignments cloud tools are fine." S6's group moved to a shared cloud folder by choice. Custody matters *conditionally* — for identifiable documents |
| That a file tool is the need at all | S5, S11, S15 | S5: "My issue is mostly Word formatting." S11: "the problem is not knowing where the file is between all the apps." S15: "My main problem is the upload step and confirming the file really went through" |
| That another tool is wanted | S1, S2 | S1: "I don't really want another app unless it removes some of these extra steps." S2: "If MFU accepted larger files, I wouldn't need another compression tool" |

---

## Pain index — `P1`–`P12`

The spec (§1.2) is the authority on wording; this is the cross-reference from pain to
participants. Counts are of participants who raised it unprompted.

| P# | Pain, in their words (condensed) | Participants | Was | → Requirement |
|---|---|---|---|---|
| **P1** | The free tool rations the work — a watermark, ads, a daily quota already used by a friend, a batch that costs money — and it lands at the deadline | S1, S3, S9, S13 | H1 | F2, F5 |
| **P2** | A passport, a medical certificate, an ID copy, a signed sheet ends up on a converter site, a copy-shop PC, a lecturer's chat — and the student cannot verify it was deleted | S4, S7, S12, S14 | H2 | F1, F6, F7, F12 |
| **P3** | On dorm / campus Wi-Fi the upload *is* the wait; a failed upload restarts from zero; a 90 MB upload was wasted on a converter that then refused it | S2, S9, S10 | H3 | F13, NFR3 |
| **P4** | An iPhone HEIC photo is refused — by the form, by Word — with no explanation of what HEIC is | S4, S13 | H4 | F4 |
| **P5** | A size cap forces compression, and the cap is usually discovered by failing; keeping an ID number readable while shrinking it takes more than one try | S2, S10, S12, S15 (S6) | H5 | F3, F5 |
| **P6** | One submission takes a chain of three to five apps and often a device hop; students want one place — and video and audio jobs have no place at all in their document tools | S1, S3, S13, S14 · S2, S9, S10 | H7 | F9 |
| **P7** | The constraint is discovered only after the work is done — the error says "upload failed" or "file type not supported" and not what to do; a watermark, a rotation, a wrong format appears only on export or on the lecturer's reply | S1, S2, S4, S7, S9, S10, S13 | *new* | F5, F14 |
| **P8** | The merged PDF is in the wrong order, and nobody notices until after submission | S8, S14 (S1 rebuilt a whole file) | *new* | F10 |
| **P9** | A file moved through a chat app arrives degraded, or has expired by the time it is needed | S1, S6 | *new* | F15 |
| **P10** | The job starts on a phone; every hop to another device or app is where the time goes and the file gets lost | S4, S7, S9, S11, S14, S15 | *new* | F15 |
| **P11** | The submission itself is uncertain — a Drive link with the wrong permission, a wrong version that cannot be replaced, an app that says "success" and then lists nothing | S2, S5, S15 | *new* | **none** — LMS-side; spec Won't **W5** |
| **P12** | Word, Excel and Canva exports do not look like the screen — footnotes move by device, columns split across nine pages, Thai glyphs break | S3, S5, S8 | *new* | **NFR7** (cross-cutting — our own tools must not break Thai or Burmese script); no feature, office rendering is spec Won't **W1** |

**P9 and P10 are recorded separately on purpose.** They are neighbours — both come from the
phone-to-laptop hop — but P9 is damage *to the file* in transit and P10 is *where the work can
happen*. Both point at the same requirement (F15), so nothing is inflated by keeping them apart;
merging them would have hidden that two different things go wrong on that hop.

**The pattern across all 15:** the pain is rarely "I cannot make a PDF." It is the multi-step
workflow *around* the PDF — moving between apps and devices, discovering a size or format limit
late, preserving quality, confirming the submission went through, and handling a sensitive file
without unnecessary cloud exposure. Problems discovered only after "finishing" appear in the
majority of the sample.

---

## Participants

<!-- One block per interview, in order. Delete nothing. -->

### S1
- Date: 22 Aug 2026
- Role: 2nd-year Nursing Science
- Channel: chat · Language: EN · ~14 min
- Last file task described: a six-page handwritten care plan for a Fundamentals of Nursing class; the lecturer wanted one PDF, not six photos. Photographed each page → CamScanner → watermark on every page → deleted that version → rescanned in Adobe Scan → sent the PDF to themselves over LINE → opened on a Windows laptop → uploaded. 40–45 minutes; "the actual scanning should have taken maybe five or ten."
- Pains stated (their words, not ours):
  - "Finding out about the watermark only after I had already scanned everything."
  - "I also didn't expect LINE to reduce the image quality."
  - The lecturer said page four was blurry. "I rescanned only page four and sent it separately, but she replied that she wanted the complete six-page PDF again. So I had to rebuild the whole file."
- Verbatim quote: "Adobe Scan works for me now. I don't really want another app unless it removes some of these extra steps."
- Sensitive document: none
- Hypotheses touched: H1 (watermark, discovered late), H7 (four apps and a device hop for one PDF)
- Coded as: P1, P6, P7, P9
- CONTRADICTED any hypothesis? The premise that a new tool is wanted — only fewer steps would earn a switch. Supports H9 (free is not the reason).
- Interviewer: Zaw Win Htut

### S2
- Date: 22 Aug 2026
- Role: 3rd-year Software Engineering
- Channel: in person · Language: EN · ~18 min
- Last file task described: a group demonstration video (MP4) for a software-design class, recorded with OBS at about 1.4 GB. The submission system rejected it → HandBrake, ~30 min, still ~380 MB → uploaded to Google Drive and pasted the link. Laptop only. About 1.5 hours, "mostly encoding and uploading over dorm Wi-Fi."
- Pains stated (their words, not ours):
  - "I didn't know the limit before trying to submit. The system only showed 'upload failed,' so at first I didn't know whether the problem was file size, Wi-Fi, or the browser."
  - "I forgot to change the Drive permission to 'anyone with the link.' The lecturer couldn't open it. I fixed the permission around 00:20, so the timestamp showed late."
- Verbatim quote: "For me the bigger problem is the submission limit. If MFU accepted larger files, I wouldn't need another compression tool."
- Sensitive document: none
- Hypotheses touched: H5 (a cap, number unknown), H3 (the dorm Wi-Fi upload was most of the 1.5 h), H7 (a video job needed a separate desktop tool)
- Coded as: P3, P5, P6, P7, P11
- CONTRADICTED any hypothesis? **H5's "against a specific number"** — the number was unknown until failure. Also the value proposition: the problem is the LMS cap, not the absence of a tool.
- Interviewer: Myo Zin Thant

### S3
- Date: 23 Aug 2026
- Role: 1st-year Business Administration
- Channel: chat · Language: TH · ~12 min
- Last file task described: a group Principles of Marketing report. Body written by four people in Google Docs and downloaded as PDF; the cover made separately in Canva; the two merged in iLovePDF; submitted to Teams. Phone for Canva, laptop for the merge and submission. 35–40 minutes for the final assembly and submission alone.
- Pains stated (their words, not ours):
  - "เครื่องมือฟรีมีโฆษณาและบางครั้งจำกัดจำนวนครั้ง กลุ่มเราเคยเจอว่าเพื่อนใช้โควตาฟรีไปแล้ว ทำให้ต้องเปลี่ยนคนทำ" — `[translated]` free tools have ads and sometimes cap the number of uses; a group member had already used up the free quota, so someone else had to do the merge.
  - The Thai font on the first exported cover rendered wrong in places; re-exported from Canva as "PDF Print" and merged again.
- Verbatim quote: "ถ้าเครื่องมือถูกและไม่มีโฆษณา กลุ่มน่าจะยอมจ่าย แต่ต้องใช้ง่ายมาก" — `[translated]` "If the tool were cheap and had no ads, the group would probably pay — but it has to be very easy to use."
- Sensitive document: none
- Hypotheses touched: H1 (ads + a daily quota), H7 (Docs → Canva → iLovePDF → Teams across two devices), H9 (would pay; ease, not price, is the bar)
- Coded as: P1, P6, P12
- CONTRADICTED any hypothesis? No. H9 supported.
- Interviewer: Wanna San

### S4
- Date: 24 Aug 2026
- Role: 4th-year Public Health
- Channel: chat · Language: MY · ~16 min
- Last file task described: an internship application requiring a transcript and a passport scan in an online form. The paper transcript and the passport were both photographed on the phone. Phone only — camera, browser, an online converter, Google Form. About 30 minutes.
- Pains stated (their words, not ours):
  - One photo was HEIC and the form refused it with only "file type not supported." `[translated]` "I didn't know what HEIC was. The error message didn't say what to do." Searched Google for a converter, converted to JPG, uploaded.
  - The passport photo had a shadow and some digits were unclear; reshot it.
- Sensitive document: **transcript and passport.** `[translated]` Did not blank the passport number — "the application needed it." Chose their own phone over a copy shop. **Cannot now remember which converter site was used.**
- Verbatim quote: "Sensitive file ဖြစ်ရင် ကိုယ့်ဖုန်းနဲ့လုပ်တာကို ပိုယုံတယ်၊ ဒါပေမဲ့ converter website က ဘယ်လိုသိမ်းထားလဲတော့ မသိဘူး" — `[translated]` "For a sensitive file I trust doing it on my own phone more — but I don't know how the converter website keeps it."
- Hypotheses touched: H4 (HEIC refused), H2 (a passport went through an unremembered site; custody unknown — raised in the closing comment, unprompted)
- Coded as: P2, P4, P7, P10
- CONTRADICTED any hypothesis? No.
- Interviewer: Swan Htut Oakkar Aung

### S5
- Date: 25 Aug 2026
- Role: 2nd-year Laws
- Channel: voice call · Language: EN · ~13 min
- Last file task described: a criminal-law case brief written in Word; submission had to be PDF. Exported on an iPad, fixed on a Windows laptop, exported again. About 20 minutes on the conversion and layout fix.
- Pains stated (their words, not ours):
  - "The same Word document does not always look identical after PDF export on different devices." Several footnotes moved to the wrong pages on the iPad export.
  - "I accidentally submitted the first iPad PDF. The assignment did not let me replace it, so I had to message the lecturer and ask for resubmission access."
- Verbatim quote: "My issue is mostly Word formatting. I don't normally scan or compress files."
- Sensitive document: none
- Hypotheses touched: none of H1–H9
- Coded as: P11, P12 — both boundary pains, outside UniLab's scope
- CONTRADICTED any hypothesis? The premise that this student has a scan / compress / convert pain at all. Recorded.
- Interviewer: Thiha Lin

### S6
- Date: 26 Aug 2026
- Role: 3rd-year Cosmetic Science
- Channel: chat · Language: TH · ~15 min
- Last file task described: a lab report with about 12 experiment photos. Photos taken on the phone in the lab and posted to the LINE group; about a week later, assembled in Word on a laptop. Almost two hours, `[translated]` "because of the time spent hunting for the original photos."
- Pains stated (their words, not ours):
  - `[translated]` Some of the photos in the LINE group could no longer be opened when they were needed; had to ask friends to resend. "The old photos sent in the chat were not usable when actually needed, and nobody in the group had kept all the originals."
  - `[translated]` Three photos had no original left; used lower-quality screenshots instead.
  - `[translated]` The Word file was about 60 MB, so Compress Pictures in Word had to be run before export.
- Verbatim quote: "ตอนนี้กลุ่มเริ่มเก็บไฟล์ใน cloud folder แยก ไม่ฝากไว้แค่ในแชตแล้ว" — `[translated]` "Now the group has started keeping files in a separate cloud folder, not just leaving them in the chat."
- Sensitive document: none
- Hypotheses touched: H5 (weakly — compression forced by size, no stated cap)
- Coded as: P9 (primary), P5 (weak)
- CONTRADICTED any hypothesis? Scopes H2: for non-sensitive files the group *chose* cloud custody as the fix.
- Interviewer: Zaw Win Htut

### S7
- Date: 27 Aug 2026
- Role: 1st-year Traditional Chinese Medicine
- Channel: chat · Language: EN · ~11 min
- Last file task described: a medical certificate sent to a lecturer after a missed quiz. Paper certificate → photographed → sent on LINE → lecturer asked for a PDF "for records" → phone print/share to PDF → sent again. Phone only. About 10 minutes.
- Pains stated (their words, not ours):
  - "I didn't know the required format until after I sent it the first time."
  - "The first photo included my full name, hospital number and the medical details on the certificate. I had already sent it before thinking about what information was visible."
- Sensitive document: **medical certificate.** "I normally think about privacy on social media, but when a teacher asks for a document I mostly think about getting it accepted."
- Verbatim quote: "If the lecturer told us PDF and what information is required before submission, it would be easier."
- Hypotheses touched: H2 (medical details sent before thinking — raised unprompted in Q6)
- Coded as: P2, P7, P10
- CONTRADICTED any hypothesis? **H2's framing**, not its substance — custody registered only in hindsight; at submission time the student optimises for acceptance.
- Interviewer: Myo Zin Thant

### S8
- Date: 28 Aug 2026
- Role: 4th-year Accounting
- Channel: in person · Language: EN · ~17 min
- Last file task described: an Excel workbook plus a Word summary for an auditing assignment; the lecturer wanted one combined PDF. Laptop only — Excel, Word, browser, Smallpdf. About one hour.
- Pains stated (their words, not ours):
  - "Excel print layout. A sheet can look normal on screen but become unreadable in PDF." Adjusted scaling, orientation, margins and print areas sheet by sheet.
  - "I merged the files in the wrong order, so the summary appeared after all the sheets instead of at the front. I noticed only after submitting."
- Verbatim quote: "I would pay for a tool if a group could share the cost. Individual subscriptions feel expensive for something I only use around deadlines."
- Sensitive document: none
- Hypotheses touched: H9 (would pay, if shared)
- Coded as: P8, P12
- CONTRADICTED any hypothesis? **H8** — use is "around deadlines", episodic, not weekly.
- Interviewer: Wanna San

### S9
- Date: 29 Aug 2026
- Role: 2nd-year Aviation Business Management
- Channel: chat · Language: EN · ~12 min
- Last file task described: a voice-recorded interview for a research-methods assignment. iPhone Voice Memos → M4A; the assignment accepted MP3 or WAV only. iPhone only — Voice Memos, a browser converter, Files, the submission system. About 35 minutes.
- Pains stated (their words, not ours):
  - "I found an online converter, but after uploading it told me the free limit was 50 MB. My recording was around 90 MB." — "The site showed the free-size limit only after the whole 90 MB file had uploaded."
  - Trimmed it into two parts on the phone and converted each; "I accidentally trimmed roughly the last 20 seconds from part two."
- Verbatim quote: "I don't regularly carry a laptop, so a workflow that only works properly on desktop is not useful to me."
- Sensitive document: none
- Hypotheses touched: H1 (a free cap), H3 (a 90 MB upload wasted on the tool's own round trip), H7 (an audio job had no place in their document tools)
- Coded as: P1, P3, P6, P7, P10
- CONTRADICTED any hypothesis? No.
- Interviewer: Swan Htut Oakkar Aung

### S10
- Date: 30 Aug 2026
- Role: 3rd-year Multimedia Technology and Animation
- Channel: chat · Language: MY · ~15 min
- Last file task described: a presentation video as MP4. Shot on the phone, edited in CapCut, exported at ~400 MB. Phone only. 1.5–2 hours; `[translated]` "the re-export and the re-upload took most of it."
- Pains stated (their words, not ours):
  - `[translated]` The 400 MB export would not upload; re-exported at lower quality until it was under 100 MB, and then it went through.
  - `[translated]` "When the dorm Wi-Fi is slow, the upload gets to about 70% and errors, and you have to start again from the beginning."
  - `[translated]` In the heavily reduced version the small text was no longer legible — "but the deadline was close, so I submitted that version."
- Verbatim quote: "Video အတွက် compression က feature တစ်ခုထက် upload requirement နဲ့ quality preview က ပိုအရေးကြီးတယ်" — `[translated]` "For video, the upload requirement and a quality preview matter more than compression as a feature."
- Sensitive document: none
- Hypotheses touched: H5 (a cap found by trial), H3 (dorm Wi-Fi — a failed upload restarts from zero), H7 (video)
- Coded as: P3, P5, P6, P7
- CONTRADICTED any hypothesis? **H5's "specific number"** — the cap was discovered by failing. Sharpens F5: a *quality* preview, not only a size estimate.
- Interviewer: Thiha Lin

### S11
- Date: 31 Aug 2026
- Role: 1st-year English
- Channel: chat · Language: TH · ~10 min
- Last file task described: an Academic Writing essay as PDF with a required filename pattern (student code_name_A1). Typed in Google Docs on an iPhone, downloaded as PDF, renamed in the Files app; checked on a library computer before submitting. 20–25 minutes.
- Pains stated (their words, not ours):
  - `[translated]` Couldn't find the downloaded file at first — it was in Downloads, not Drive. "Simple things like finding the file or renaming it get confusing, because each app keeps files in a different place."
  - `[translated]` "On the library computer I nearly forgot to sign out of my Google account after submitting."
- Verbatim quote: "ฉันไม่ได้มีปัญหาเรื่อง PDF มาก แต่ปัญหาคือไม่รู้ว่าไฟล์อยู่ที่ไหนระหว่างหลายแอป" — `[translated]` "I don't really have a problem with PDFs. The problem is not knowing where the file is between all the apps."
- Sensitive document: none
- Hypotheses touched: none of H1–H9
- Coded as: P10
- CONTRADICTED any hypothesis? The premise that a PDF tool is the need; the need is knowing where the file is.
- Interviewer: Zaw Win Htut

### S12
- Date: 2 Sep 2026
- Role: 4th-year Digital Technology for Business Innovation
- Channel: chat · Language: EN · ~18 min
- Last file task described: a scholarship application requiring a transcript, a Thai ID copy and a supporting certificate as separate uploads. Paper copies scanned at a copy shop near campus → sent to LINE → compressed in an online PDF compressor on the phone → uploaded. About 40 minutes including the wait at the shop.
- Pains stated (their words, not ours):
  - The scans were much larger than the form limit.
  - "Making the scans small enough while keeping the ID numbers readable." — "The first compressed ID copy became too blurry, so I repeated the compression at a higher-quality setting."
- Sensitive document: **transcript, Thai ID, certificate.** "The biggest privacy issue is that the shop computer temporarily has the scans. I asked them to delete the files afterward, but realistically I can't verify whether every temporary copy was removed."
- Verbatim quote: "For important documents I still use a print shop because the scan quality is predictable, even though I know there is a privacy trade-off."
- Hypotheses touched: H2 (a deletion promise they cannot verify — the hypothesis in their own words), H5 (the one participant who knew the form's number)
- Coded as: P2, P5
- CONTRADICTED any hypothesis? Sharpens H2 — custody is traded away for *predictable quality*.
- Interviewer: Myo Zin Thant

### S13
- Date: 4 Sep 2026
- Role: 2nd-year Tourism Business and Events
- Channel: voice call · Language: EN · ~14 min
- Last file task described: a photo-essay assignment, about 20 photos, one PDF. Photos on the phone and in Google Photos → downloaded to a laptop → some HEIC, some JPG → the HEICs converted online → captions in Word → Compress Pictures → PDF. About 1 hour 15–20 minutes.
- Pains stated (their words, not ours):
  - "Word would not insert a few HEIC files, so I converted those online." — "Converting HEIC images individually because batch conversion on the site required payment."
  - "Two converted photos were rotated incorrectly. I didn't notice until the lecturer commented on the layout."
- Verbatim quote: "Next time I may build the whole photo essay in Canva because it handles photos and PDF export in one place."
- Sensitive document: none
- Hypotheses touched: H4 (HEIC), H1 (batch behind a paywall), H7 ("one place", in their words)
- Coded as: P1, P4, P6, P7
- CONTRADICTED any hypothesis? No. Note: the "one place" this student reaches for is Canva, not a PDF site.
- Interviewer: Wanna San

### S14
- Date: 6 Sep 2026
- Role: 3rd-year Environmental Health
- Channel: chat · Language: EN · ~17 min
- Last file task described: a field-observation report — site photos, a signed participation/permission sheet, and handwritten observation pages — as one PDF. Photos on the phone; the paper scanned with the iPhone Notes scanner; combined via Files, then a document export, then an online PDF merger; laptop for the final check. 45–50 minutes.
- Pains stated (their words, not ours):
  - "I first tried to combine everything using the Files app, but I ended up with separate files."
  - "I wasn't sure which apps were keeping cloud copies. The permission sheet included names and signatures, so I didn't want to upload it to random services just to merge PDFs."
  - "My first merged PDF had the permission sheet in the middle instead of at the end. I rebuilt it after checking the preview."
- Sensitive document: **a signed permission sheet carrying other people's names and signatures.** "I am much more careful when the file contains other people's names or signatures. I prefer a tool that can work locally without forcing cloud backup."
- Verbatim quote: "For normal assignments cloud tools are fine. For signed or identifiable documents, offline processing matters more."
- Hypotheses touched: H2 (raised unprompted in Q5 — the strongest custody statement in the set), H7
- Coded as: P2, P6, P8, P10
- CONTRADICTED any hypothesis? Scopes H2: custody matters *conditionally* — for identifiable documents, not for every file.
- Interviewer: Swan Htut Oakkar Aung

### S15
- Date: 8 Sep 2026
- Role: 1st-year Applied Chemistry
- Channel: chat · Language: TH · ~11 min
- Last file task described: four pages of handwritten chemistry calculations as a PDF in the LMS. Scanned with Google Drive scan on the phone (~9 MB) → the LMS app refused it as too large → the same file uploaded through Chrome on the phone. Phone only. About 20 minutes.
- Pains stated (their words, not ours):
  - `[translated]` "The app and the web version of the same system behave differently, so I couldn't tell whether the problem was the file or the system."
  - `[translated]` "The first time, the system showed the upload as successful, but afterwards the file wasn't in the submission list. I had to submit again, and I keep a screenshot of the confirmation page now."
- Verbatim quote: "Google Drive scan ฟรีและพอใช้แล้ว ปัญหาหลักของฉันคือขั้นตอนอัปโหลดและการยืนยันว่าไฟล์ส่งจริง" — `[translated]` "Google Drive scan is free and good enough. My main problem is the upload step and confirming the file really went through."
- Sensitive document: none
- Hypotheses touched: H5 (a cap that behaved inconsistently), H9 (a free scanner is enough; free would not make them switch)
- Coded as: P5, P10, P11
- CONTRADICTED any hypothesis? The premise that scanning is the pain; for this student the LMS is.
- Interviewer: Thiha Lin

---

## Who interviewed whom

Three each, as assigned in the field kit. Any team member asked *"tell me about one of them"* answers from their own three.

| Interviewer | Participants |
|---|---|
| Zaw Win Htut | S1, S6, S11 |
| Myo Zin Thant | S2, S7, S12 |
| Wanna San | S3, S8, S13 |
| Swan Htut Oakkar Aung | S4, S9, S14 |
| Thiha Lin | S5, S10, S15 |

---

## Not an interview — the H3 measurement

**H3 was promoted to P3 on the strength of S2, S9 and S10, and that closes the *perception* half
only.** Three students saying the upload was the wait is a finding about people; the timing is a
finding about the network, and no number of interviews supplies it. Someone must still time it:
one 10 MB PDF, on MFU campus Wi-Fi, round trip through a competitor's upload-and-download flow
versus opening the same file in UniLab. Owner: **Zaw Win Htut (QA / Test)**.

Full procedure and the fixture: **[`h3-measurement.md`](h3-measurement.md)**.

| Date | Network | Competitor round trip | UniLab | Notes |
|---|---|---|---|---|
| 8 Sep 2026 | any | — | **0 — no network path** | Measured: real 2-step transform, 0 attempts across fetch / XHR / sendBeacon / WebSocket / WebRTC, while online. Statically: 6 fetch sites in `src/`, all bare GETs for app assets, 0 with a body |
| — | MFU campus Wi-Fi | *pending* | 0 | The competitor half. Owner: Zaw Win Htut. 10 MB fixture, `sha256 a2bd25a4…2ec2c9`, 3 runs |

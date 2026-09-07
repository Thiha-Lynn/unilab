# Field kit — everything you need to run an interview today

**Bound by LR7:** role, pain and quote only. No names, no student IDs, no contact details.
**Target:** 5 by the gate (8 Sep), 15 by month end. **Three each.**

This is the page to have open on your phone while you are standing in front of someone. The
reasoning lives in [`interview-guide.md`](interview-guide.md); this is the short version you
actually use.

---

## 1. Where to find people — be specific, not hopeful

| Where | When | Why there |
|---|---|---|
| **Harbor Student Center** | lunch, 12:00–13:30 | People are sitting down and not rushing to a class |
| **Library, ground floor** | afternoon | Everyone there is mid-coursework — the pain is live |
| **C5 lab corridor** | between sessions | SE and IT students, so file jobs are constant |
| **Your own LINE groups** | any time | Fastest 3, but see the warning below |

> **Not classmates on this course.** The course rules say no classmates and no AI personas.
> Another MFU student on a different programme is fine and is the better interview anyway —
> they have not heard you talk about this product.

---

## 2. The approach — 15 seconds, out loud

> "Hi — I'm a Software Engineering student. I'm researching how students deal with files for
> coursework. Not selling anything, nothing to try. Ten minutes?"

If they say yes, read the consent line **before** you write anything down:

> "I'll note your year and programme, the problem you describe, and maybe one sentence you say
> — no name, no student ID, no contact. You can stop or skip anything. OK?"

Wait for an actual "yes". If they would rather speak Thai or Burmese, do the whole interview in
that language and translate the quote afterwards, marking it `[translated]`.

---

## 3. The six questions — ask these, in this order

Anchor everything to **one real, recent event**. If they generalise ("usually I…"), pull them
back: *"Let's stay with the most recent one — what happened that time?"*

1. **Think of the last file you had to hand in. What was it, for which class?**
2. **Walk me through what you actually did** — from the file existing to it being submitted.
3. **What device did you start on? What did you finish on?**
4. **How long did that take, start to finish?**
5. **What was the most annoying part?**
6. **Did anything go wrong that time? What did you do about it?**

Questions 2 and 6 produce most of the usable pains. **Do not rush them. Silence is fine.**

### If they open a door, follow it

| They mention… | Ask |
|---|---|
| a website or app | "How did you pick that one? Has it ever stopped you partway?" |
| a size limit | "How did you make it smaller? How did you know when it was small enough?" |
| a photo being rejected | "What did the form say? How did you get around it?" |
| a transcript / ID / certificate | **"Where do you think that file went after you uploaded it?"** |
| a scanned handout | "What do you do when you need a quote out of one?" |
| doing it every week | "Walk me through those steps. Same every time?" |

---

## 4. Never ask these

| Don't | Why it fails | Instead |
|---|---|---|
| "Would you use a tool that keeps files on your device?" | Hypothetical — everyone says yes | "Where do you think that file went?" |
| "Isn't it annoying when there's a size limit?" | Leading — you supplied the answer | "Has a file ever been too big to submit?" |
| "Do you care about privacy?" | Everyone says yes; behaviour differs | "Did you do anything differently because of what was in it?" |
| "Do you like our idea?" | Politeness, not evidence | Don't mention UniLab until the end |

**Do not demo UniLab.** A person who has just been shown a tool will agree it is useful, and
that answer is worthless at the gate. If you want them for follow-up testing, ask at the very
end whether you may send a link next week.

---

## 5. Write it up before you walk away

Straight into [`results.md`](results.md), or `/capture-requirement` if you have a laptop:

```
### S_
- Date:
- Role:            (year + programme only)
- Language:        EN / TH / MY
- Last file task:
- Pains, their words:
- Verbatim quote:
- Hypotheses touched:
- CONTRADICTED anything?
- Interviewer:
```

**The quote is the part that decays fastest.** Write it in their words within a minute of
finishing, or you will paraphrase it into what you wanted them to say.

---

## 6. Recruiting message — for a LINE group or a DM

**English**

> Hi! I'm doing a Software Engineering research project at MFU about how students handle files
> for coursework — compressing, converting, scanning, that sort of thing. I need ~10 minutes to
> ask about the last file you had to submit. Nothing to install, nothing to try, and I don't
> record any personal details. Anyone free today or tomorrow?

**Thai** *(have a native speaker check before sending — this is a draft, not a translation to trust)*

> สวัสดีค่ะ/ครับ ผมเป็นนักศึกษาวิศวกรรมซอฟต์แวร์ มฟล. กำลังทำวิจัยเกี่ยวกับวิธีที่นักศึกษาจัดการไฟล์งาน
> เช่น การบีบอัด แปลงไฟล์ หรือสแกน ขอเวลาประมาณ 10 นาที ถามถึงไฟล์ล่าสุดที่ต้องส่ง
> ไม่ต้องติดตั้งอะไร ไม่เก็บข้อมูลส่วนตัว ใครสะดวกวันนี้หรือพรุ่งนี้บ้างคะ/ครับ

**Burmese** — write this yourselves. Four of the five of you speak it better than any draft I
could give you, and the Burmese-speaking cohort is the group most likely to raise **H6**
(unsearchable Thai/Burmese scans), which is the hypothesis with the least evidence behind it.

---

## 7. Who does what

| Member | Role | Interviews | Suggested source |
|---|---|---|---|
| Myo Zin Thant | Product Owner | 3 | SE cohort, other programmes |
| Thiha Lin | Tech Lead | 3 | Library / C5 lab |
| Swan Htut Oakkar Aung | Designer | 3 | Harbor Student Center |
| Wanna San | AI Lead | 3 | Students who hand in video or audio |
| Zaw Win Htut | QA / Test | 3 **+ the H3 measurement** | Burmese-speaking cohort (covers H6) |

**Five is the gate floor, not the goal.** Five closes B16 on a technicality; fifteen makes the
pains defensible when someone asks in the review.

> **Zaw Win Htut also owns the one thing no interview can settle.** H3 — that the upload round
> trip is itself part of the wait on campus Wi-Fi — is marked *unvalidated **and unmeasured***.
> Time one 10 MB PDF through a competitor's upload-and-download on campus Wi-Fi, and the same
> file in UniLab. Two numbers, into `results.md`.

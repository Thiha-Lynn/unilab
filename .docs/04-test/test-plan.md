# Test Plan — UniLab

**Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD.**
**Course:** 1305493 Software Engineering Case Studies · Semester 1/2569 · Dr. Prasara Jakkaew, ADT MFU
**Deliverable:** Post-Midterm Deliverable — Test Plan
**Submission Deadline:** 28 October 2026, 23:59 Bangkok (latest Classroom screenshot supplied 27 October; verify the assignment before submission). The older PDF says before 28 October.
**Testing Date:** 4 November 2026 (Field Testing Day)
**Final Presentation Date:** 18 November 2026 (Teams 11–20)

---

### **Team Members & Responsibilities**

| Student ID | Name | Project Role | Test Plan Responsibility |
| :---: | :--- | :--- | :--- |
| **6631503076** | Myo Zin Thant | Product Owner | Test Scope, Acceptance Criteria & TAM Evaluation |
| **6631503088** | Swan Htut Oakkar Aung | Designer | UAT Task Scenarios, SUS Usability & Test Moderator |
| **6631503092** | Thiha Lin | Tech Lead | Integration & E2E Testing, Test Harness & Data Fixtures |
| **6631503097** | Wanna San | AI Lead | Model Runtime Benchmarks & Performance Expectancy |
| **6631503101** | Zaw Win Htut | QA / Test Lead | Test Plan Lead, Unit Test Suite & Session Note-taker |

---

## 01. Scope

### 1.1 What We Will Test (In-Scope)
Testing evaluates the **1 Core Workflow** of UniLab across mobile and desktop browsers:
$$\textbf{Select a file} \;\longrightarrow\; \textbf{Transform on this device} \;\longrightarrow\; \textbf{Download the result (Vault Countdown)}$$

All test cases and user sessions evaluate the locked **MUST** requirements and user pain points (`P1`–`P12`):
1. **Document Compression against Named LMS Caps (F3, F5, F6 · P1, P5, P7):** PDF compression with live size estimation before the run, targeting named caps (decimal MB), reporting honestly if the cap cannot be met. Rasterized output must be visually checked for legibility.
2. **Format Intake & Conversion (F1, F4 · P4):** Converting iPhone photos (`.heic`) to standard `.jpg` with client-side EXIF metadata stripping (rule.md PDPA 16).
3. **Multi-Part Assembly & Visual Organization (F2, F10 · P8):** Merging multiple document parts with visual page thumbnail reordering, rotation, and omission.
4. **Privacy & Zero-Upload Custody (F6, F12 · P2, LR1–LR8):** Verification that 0 bytes of file payloads leave the browser, and in-memory outputs purge upon the 30-minute vault countdown or manual deletion.
5. **Mobile Touch Ergonomics & Responsive Behavior (NFR2, P10):** Operation on smartphones (iOS Safari, Android Chrome) ensuring $\ge 38\text{ px}$ touch targets, $16\text{ px}$ input typography, and swipeable category navigation.

### 1.2 What We Will NOT Test (Out-of-Scope / Boundaries)
1. **LMS-Side Confirmation (P11 / W5):** Network status or permission issues inside third-party LMS portals (Moodle, Google Classroom) after the file is downloaded.
2. **Native Installers & App Store Packages:** Testing is restricted to the browser web application and PWA service worker; native desktop release pipelines (`unilab-releases`) are verified independently.
3. **Parked Features (F8 OCR & F11 Workflows):** In accordance with spec §2.1 and W5 validation findings (where 0 of 15 interviewed students raised OCR or multi-step chore recurrence), OCR and Workflows remain parked and are excluded from UAT evaluation.

---

## 02. Test Levels (The Testing Pyramid)

UniLab follows the standard three-tier Testing Pyramid supplemented by real-user Acceptance Testing:

```
           / \
          /   \
         / UAT \          UAT: 10+ Real Student Sessions (4 Nov)
        /-------\
       /   E2E   \        End-to-End: Browser Workflow Smoke Tests
      /-----------\
     / Integration \      Subsystems: pdf.js, Mediabunny, Intake, Vault
    /---------------\
   /   Unit Tests    \    Pure Logic: Graphemes, Bytes, Sanitization (25 automated)
  /-------------------\
```

| Level | Scope & Tools | Target Metrics / Exit Criteria |
| :--- | :--- | :--- |
| **1. Unit Testing** | Automated tests via `node:test` (`test/**/*.test.mjs`). Evaluates pure utility logic: grapheme segmentation for Thai/Burmese script (`Intl.Segmenter`), byte conversions, filename stems, timer calculations, and SVG DOMPurify sanitization. | **100% Pass** for the recorded suite. Record the actual test count, duration and commit; do not reuse historical counts. |
| **2. Integration Testing** | Evaluates interoperability between browser engines: `pdf-lib` + `pdf.js` page pipelines, Mediabunny WebCodecs audio/video worker dispatch, intake file-screening gates, and `vault.js` in-memory countdown purge. | Object URLs revoked and known references cleared after purge; repeat-run memory profile on target devices pending. File screening enforces stated limits. |
| **3. End-to-End (E2E)** | Automated and semi-automated smoke tests running in Chromium/WebKit across the built distribution (`dist/`). Verifies drag-drop upload $\to$ option sidebar update $\to$ progress execution $\to$ vault download button. | Zero console errors; production build strictly respects the **8 MB offline budget**. |
| **4. User Acceptance (UAT)** | Field testing with **$\ge 10$ real student participants** on their personal smartphones and laptops. Evaluates task completion, usability (SUS), and technology acceptance (TAM). | Task Success Rate $\ge 90\%$; Mean SUS $\ge 75$; Mean TAM PU/PEOU $\ge 4.0$. |

---

## 03. Test Cases & UAT Scenarios

### 3.1 Automated & Functional Verification Cases

| Case ID | Feature / Area | Preconditions & Test Data | Execution Steps | Expected Result | Pass/Fail |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Client-Side Custody (NFR1 / LR1) | Local dev or live site; DevTools Network tab open. Test file: `sample.pdf` (4.5 MB). | 1. Open DevTools Network tab.<br>2. Select and compress `sample.pdf`.<br>3. Inspect all HTTP request bodies. | **0 bytes** of file content sent across network. Static assets and optional bounded usage counters may load; no document contents, filenames or passwords may be transmitted. | Pending execution: inspect request bodies |
| **TC-02** | File Size Limit Screening (LR4) | Upload interface for Compress PDF (50 MB limit). Test file: 65 MB PDF. | 1. Attempt to upload the 65 MB file.<br>2. Observe validation response. | File refused with clear UI explanation stating the limit; file not held in memory. | Pending execution: clear refusal box |
| **TC-03** | Vault Auto-Purge (F6 / LR5) | Output vault stage. Test file: Compressed image output. | 1. Complete compression.<br>2. Note object URL.<br>3. Fast-forward timer / press "Delete now". | Blob memory nullified; object URL revoked; countdown resets to 0. | Pending execution: URL revoked and references cleared |
| **TC-04** | Thai & Burmese Word Count (NFR7) | Word counter tool (`#/word-counter`). Text string: Thai and Burmese sample phrases. | 1. Paste multi-lingual text.<br>2. Verify character and word count calculations. | Counts match grapheme cluster boundaries via `Intl.Segmenter`; combining vowels not counted as words. | Pending execution: grapheme accuracy |
| **TC-05** | iOS Safari Zoom Guard (NFR2) | Mobile Safari viewport ($\le 640\text{ px}$). | 1. Focus on any text/number input in sidebar.<br>2. Observe viewport scale behavior. | Input font size is exactly $16\text{ px}$; browser does not zoom in. | Pending physical Safari check |

---

### 3.2 UAT Scenarios (instrument UAT-2026-10-27)

The newer field-kit task set is the working scope, confirmed by the project owner on 27 October. The scenario cards below and the CSV/calculator use the same task IDs. HEIC conversion, redaction, zero-upload custody and vault purge remain engineering regression cases, not substitutes for these four UAT tasks.

### 📋 Task 1: Clean & Standardize Lecturer Slides (Compress + Rotate + B&W)
> **Academic Context:** You just downloaded your lecturer's lecture slides (`sample-lecture-slides-15mb.pdf`). You need to upload your annotated version to MFU Moodle, but Moodle has a strict **5 MB submission ceiling (5,000,000 bytes)**. Additionally, page 3 was scanned upside down, and your home printer will charge you triple if you don't convert color slides to black & white.
>
> **Your Goal:**
> 1. Prepare the document for submission.
> 2. Fix page 3 so it is right-side up.
> 3. Convert the presentation to grayscale (black and white).
> 4. Export a final PDF that is smaller than 5 MB.
>
> *(Take your time and proceed whenever you are ready. The facilitator cannot answer questions regarding where to click.)*

---

### 📋 Task 2: Merge 3 Documents into 1 Scholarship Submission (Multi-format Combine)
> **Academic Context:** You are applying for an exchange scholarship. The application portal accepts only **a single PDF document** containing:
> 1. Your Application Form (`application-form.pdf`)
> 2. Your English Language Proficiency Scorecard (`ielts-cert.jpg`)
> 3. Your Citizen ID Card copy (`thai-id-card.png`)
>
> **Your Goal:**
> Combine all 3 files into one single PDF in the exact order: Application Form first, English Scorecard second, and ID Card third. Then save the combined PDF.

---

### 📋 Task 3: Sign & Password-Protect Academic Petition (Sign + Encrypt)
> **Academic Context:** You need to submit an Urgent Late Add/Drop petition (`petition-form.pdf`) to the Registrar Division via email. The petition requires your handwritten signature, and for this fictional exercise, the recipient requests a password-protected file using `UniLabSecure2026` (a public test password, never for personal files).
>
> **Your Goal:**
> 1. Open the petition in UniLab.
> 2. Draw your signature and place it cleanly on the signature line.
> 3. Protect the document with the password `UniLabSecure2026`.
> 4. Download the signed, secured PDF and verify it asks for password when opened.

---

### 📋 Task 4: Fast Single-Page Extract for Chatbot / AI Research (Extract & Split)
> **Academic Context:** You are summarizing Chapter 4 of a heavy 120-page textbook (`data-structures-textbook.pdf`) using an AI research assistant. The AI tool only accepts files up to 2 pages long. You only need **Page 42**.
>
> **Your Goal:**
> Extract only Page 42 from the 120-page textbook and save it as an independent single-page PDF on your desktop.

---


---

## 04. Real Users & Testing Protocol

### 4.1 Participant Recruitment
* **Cohort:** Target $\ge 10$ real student sessions (`U01` through `U10+`), drawn from Mae Fah Luang University undergraduates across diverse schools (Information Technology, Nursing, Management, Liberal Arts).
* **Exclusions:** Team members and classmates from 1305493 are strictly excluded.
* **Participant Privacy (PDPA / LR7 Compliance):** No student names, student IDs, or contact details are recorded. Participants are assigned anonymized identifiers: `U01`, `U02`, `U03`…

### 4.2 Single Session Structure (~30 Minutes per User)

Following Slide 10:

```
[00:00–03:00] Intro & Informed Consent (PDPA disclosure, explain think-aloud)
[03:00–08:00] Baseline Measurement: Old Way (Perform Task 1 using current tool, e.g. iLovePDF/LINE)
[08:00–20:00] UniLab Tasks 1–4 with Think-Aloud (Moderator observes; Note-taker times)
[20:00–25:00] Questionnaires: SUS (10 items) + TAM (9 items)
[25:00–30:00] Debrief Interview (3 standard questions) + Wrap-up
```

### 4.3 Testing Roles
* **Moderator (Swan Htut Oakkar Aung / Myo Zin Thant):**
  * Explains: *"We are testing the system, not you."*
  * Presents tasks one at a time as scenario cards.
  * **Strict rule:** Observes without pointing, guiding, or answering *"where do I click?"* questions.
* **Note-Taker (Zaw Win Htut / Wanna San / Thiha Lin):**
  * Times each task with a stopwatch (seconds).
  * Records success/failure, hesitation points, error counts, and verbatim quotes.

### 4.4 Iterative Testing Plan (Nielsen 5 + 5 Model)
To generate actionable before-and-after fix evidence for the final presentation:
* **Round 1 (Morning, 4 Nov):** Test users `U01`–`U05`.
* **Rapid Fix Window (Midday, 4 Nov):** Log top usability bottlenecks, triage severity (0–4), deploy quick UI fixes to staging.
* **Round 2 (Afternoon, 4 Nov):** Test users `U06`–`U10` on the refined build to demonstrate measured improvement.

---

## 05. Metrics & Measurement Instruments

### 5.1 Required Performance Metrics (Impact Evidence)
For each task, we record:
1. **Completion Rate (%):** Successful completion without moderator intervention.
2. **Time-on-Task (Seconds):** Direct comparison between **Baseline (Old Way)** and **UniLab**.
3. **Error Frequency:** Number of incorrect clicks or navigations per user per task.

---

### 5.2 System Usability Scale (SUS)

Administered immediately following task completion. 10 standardized items on a 5-point Likert scale (1 = Strongly Disagree, 5 = Strongly Agree):

1. I think that I would like to use UniLab frequently.
2. I found UniLab unnecessarily complex.
3. I thought UniLab was easy to use.
4. I think that I would need the support of a technical person to be able to use UniLab.
5. I found the various functions in UniLab were well integrated.
6. I thought there was too much inconsistency in UniLab.
7. I would imagine that most people would learn to use UniLab very quickly.
8. I found UniLab very cumbersome to use.
9. I felt very confident using UniLab.
10. I needed to learn a lot of things before I could get going with UniLab.

$$\text{SUS Score} = 2.5 \times \left[ \sum_{i \in \{1,3,5,7,9\}} (\text{Score}_i - 1) + \sum_{j \in \{2,4,6,8,10\}} (5 - \text{Score}_j) \right]$$

* **Industry Benchmark:** 68.0 (Grade C / Average).
* **UniLab Target:** **>= 80.8 stretch target; >= 75.0 release exit threshold**.

---

### 5.3 Technology Acceptance Model (TAM)

*Model Justification (per Slide 15 & 18):* UniLab is a student utility/productivity toolbox designed for academic coursework submissions. TAM (Davis, 1989; Venkatesh & Davis, 2000) directly models perceived usefulness and efficiency in task-oriented software.

Use the exact 11-item instrument in `uat-protocol-and-questionnaire.md` section 6: PU1–PU4, PEOU1–PEOU4, BI1–BI3. Each participant's construct score is the mean of its complete valid 1–5 integer responses. Report mean ± sample SD and n per construct. Do not score incomplete scales or infer causation. Team review, translation/back-translation where needed and a 2–3-person questionnaire pilot are pending.

---

### 5.4 Qualitative Debrief Interview
Three standard post-session interview questions:
1. *"What did you like most about using UniLab?"*
2. *"Where did you get stuck, confused, or hesitate?"*
3. *"Would you keep using UniLab instead of your current apps (like iLovePDF or CamScanner), and why?"*

---

## 06. Schedule & Exit Criteria

### 6.1 Timeline & Execution Schedule

| Date | Activity | Responsible | Deliverable / Output |
| :--- | :--- | :--- | :--- |
| **28 Oct, 23:59 Bangkok** | **Submit Test Plan** | All Team | Final `test-plan.md` submitted to Google Classroom |
| **29–31 Oct** | Participant Pre-Recruitment | Swan Htut, Myo Zin | 10 MFU students booked for 4 Nov testing slots |
| **31 Oct (Sat)** | Cybersecurity Lecture | All Team | Attendance in Room E4614; laptop lab |
| **2–3 Nov** | Pilot Test & Data Sheets | Zaw Win Htut, Thiha | 1 pilot session run; Excel data collection sheets prepped |
| **4 Nov (Wed)** | **Field Testing Day (W12)** | All Team | **At least 10 completed UAT sessions; stretch recruitment 30** (Round 1: U01–05, Round 2: U06–10) |
| **5–8 Nov** | Data Analysis & Defect Triage | Wanna San, Zaw Win | SUS calculations, TAM Mean $\pm$ SD, before/after charts |
| **9–12 Nov** | Critical Defect Remediation | Thiha Lin, Swan Htut | Bug fixes committed to `main` with before/after screenshots |
| **18 Nov 2026** | **Final Presentation (W14)** | All Team | 10-minute presentation: Portfolio P1–P5 submitted |

### 6.2 Test Environment & Equipment
* **Hardware:**
  * 5 Android smartphones (Chrome latest)
  * 5 Apple iPhones (iOS 17+ Safari)
  * 2 Laptops (macOS / Windows 11) for testing desktop responsive view
* **Deployment Channels:**
  * Primary: Live Canonical Deployment (`https://unilab.ztvmm.live/`)
  * Secondary Preview: GitHub Pages (`https://thiha-lynn.github.io/unilab/`)
  * Local Fallback: Localhost Vite dev server on laptops for offline resilience

### 6.3 Exit Criteria for Release
1. **Execution:** 100% of planned 10 UAT sessions completed and logged with anonymized IDs (`U01`–`U10`).
2. **Task Performance:** Overall task success rate reaches $\ge 90\%$.
3. **Usability Score:** Mean System Usability Scale (SUS) score achieves $\ge 75.0$ (above average benchmark 68).
4. **Technology Acceptance:** Mean TAM Perceived Usefulness (PU) and Ease of Use (PEOU) $\ge 4.0 / 5.0$.
5. **Defect Severity:** Zero Severity 3 (Major) or Severity 4 (Catastrophic) usability blockers remaining before the final release.

---

## 07. AI-First Policy Disclosure

*In compliance with Course AI Policy (Slide 7):*
* **Where AI was used:** AI assistance (Antigravity) was used to draft initial test case templates, synthesize the TAM item bank from Davis (1989), and structure the Excel scoring formulas.
* **Human Review:** Swan authored the initial plan/kit. The owner selected the newer tasks on 27 October. Codex helped reconcile tasks, harden the calculator, prepare synthetic fixtures and implementation checks. Review by all five team members, submission and real-user testing remain pending; no approval or test outcomes are implied.


## 08. Execution boundaries and release evidence

The canonical product lives in `Thiha-Lynn/unilab-releases`; this repository is the coursework baseline. Do not pool results from the older GitHub Pages build with the new product. Record URL, commit and browser per session. Newer UAT tasks require grayscale/page correction, mixed PDF/JPG/PNG assembly, real PDF password protection after signing, and 120-page extraction. Implement and verify these before freezing the field-test build.

30 invitation links or anonymous sessions do not prove 30 people. The course minimum is ten completed eligible sessions; the product stretch target is thirty distinct participants. Run one workflow pilot before the main study, and keep pilot/automated results separate from the main cohort. The blank CSV is not evidence. See `READINESS.md` for execution status and remaining human work.

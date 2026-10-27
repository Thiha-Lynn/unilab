# Test Plan — UniLab

**Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD.**  
**Course:** 1305493 Software Engineering Case Studies · Semester 1/2569 · Dr. Prasara Jakkaew, ADT MFU  
**Deliverable:** Post-Midterm Deliverable — Test Plan  
**Submission Date:** 28 October 2026  
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
1. **Document Compression against Named LMS Caps (F3, F5, F6 · P1, P5, P7):** PDF compression with live size estimation before the run, guaranteeing output fits typical LMS caps (e.g. 5 MB / 10 MB) without unreadable artifacts.
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
| **1. Unit Testing** | Automated tests via `node:test` (`test/**/*.test.mjs`). Evaluates pure utility logic: grapheme segmentation for Thai/Burmese script (`Intl.Segmenter`), byte conversions, filename stems, timer calculations, and SVG DOMPurify sanitization. | **100% Pass** (25/25 automated tests pass in $< 2\text{ s}$). |
| **2. Integration Testing** | Evaluates interoperability between browser engines: `pdf-lib` + `pdf.js` page pipelines, Mediabunny WebCodecs audio/video worker dispatch, intake file-screening gates, and `vault.js` in-memory countdown purge. | 0 memory leaks; file screening strictly enforces stated limits. |
| **3. End-to-End (E2E)** | Automated and semi-automated smoke tests running in Chromium/WebKit across the built distribution (`dist/`). Verifies drag-drop upload $\to$ option sidebar update $\to$ progress execution $\to$ vault download button. | Zero console errors; production build strictly respects the **8 MB offline budget**. |
| **4. User Acceptance (UAT)** | Field testing with **$\ge 10$ real student participants** on their personal smartphones and laptops. Evaluates task completion, usability (SUS), and technology acceptance (TAM). | Task Success Rate $\ge 90\%$; Mean SUS $\ge 75$; Mean TAM PU/PEOU $\ge 4.0$. |

---

## 03. Test Cases & UAT Scenarios

### 3.1 Automated & Functional Verification Cases

| Case ID | Feature / Area | Preconditions & Test Data | Execution Steps | Expected Result | Pass/Fail |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Client-Side Custody (NFR1 / LR1) | Local dev or live site; DevTools Network tab open. Test file: `sample.pdf` (4.5 MB). | 1. Open DevTools Network tab.<br>2. Select and compress `sample.pdf`.<br>3. Inspect all HTTP request bodies. | **0 bytes** of file content sent across network. Only static assets loaded. | Pass: 0 bytes uploaded |
| **TC-02** | File Size Limit Screening (LR4) | Upload interface for Compress PDF (50 MB limit). Test file: 65 MB PDF. | 1. Attempt to upload the 65 MB file.<br>2. Observe validation response. | File refused with clear UI explanation stating the limit; file not held in memory. | Pass: Clear refusal box |
| **TC-03** | Vault Auto-Purge (F6 / LR5) | Output vault stage. Test file: Compressed image output. | 1. Complete compression.<br>2. Note object URL.<br>3. Fast-forward timer / press "Delete now". | Blob memory nullified; object URL revoked; countdown resets to 0. | Pass: Memory released |
| **TC-04** | Thai & Burmese Word Count (NFR7) | Word counter tool (`#/word-counter`). Text string: Thai and Burmese sample phrases. | 1. Paste multi-lingual text.<br>2. Verify character and word count calculations. | Counts match grapheme cluster boundaries via `Intl.Segmenter`; combining vowels not counted as words. | Pass: Grapheme accuracy |
| **TC-05** | iOS Safari Zoom Guard (NFR2) | Mobile Safari viewport ($\le 640\text{ px}$). | 1. Focus on any text/number input in sidebar.<br>2. Observe viewport scale behavior. | Input font size is exactly $16\text{ px}$; browser does not zoom in. | Pass: Zero auto-zoom |

---

### 3.2 UAT Scenarios (Task-Based Testing with Real Users)

*Per Slide 11 guidelines: All UAT tasks are written as real-world student scenarios without giving away button names or interface directions.*

```
Task 1 (Easy)      : Shrink a scanned report under an LMS submission size cap.
Task 2 (Medium)    : Convert an iPhone photo into an accepted portal image format.
Task 3 (Complex)   : Combine separate project sections in the correct reading order.
Task 4 (Custody)   : Obscure a sensitive citizen ID on a document and purge memory.
```

#### **Task 1: The Deadline Submission Cap (Compress PDF)**
* **User Scenario:**  
  *"You just finished a 6-page assignment on your phone, but the resulting scanned PDF is 8.5 MB. Moodle has a strict 5.0 MB submission limit and the deadline is in 15 minutes. Prepare this document so Moodle will accept it without making your text blurry."*
* **Test Data Provided:** `assignment-scan-8.5mb.pdf`
* **Success Criteria:**
  * Output file size is $\le 5.0\text{ MB}$.
  * Completed in $\le 4$ user interactions without moderator assistance.
  * Time on task recorded and compared to baseline (old tool).

#### **Task 2: The Rejected Form Photo (HEIC to JPG)**
* **User Scenario:**  
  *"You took a photo of your student visa document with your iPhone. When you try to upload it to the university portal, it says 'File format .HEIC is not supported. Please upload a JPG.' Make this photo usable for the portal."*
* **Test Data Provided:** `visa-document.heic`
* **Success Criteria:**
  * Successfully downloads a valid `.jpg` file.
  * Image orientation is upright and legible.
  * Completed within $60\text{ seconds}$.

#### **Task 3: Multi-Part Final Report Assembly (Merge & Organize PDF)**
* **User Scenario:**  
  *"Your teammate sent you the Appendix PDF and you have the main Report PDF. Combine them into a single PDF document, make sure the Cover Page is page 1, and save the final report."*
* **Test Data Provided:** `main-report-3pages.pdf`, `appendix-2pages.pdf`
* **Success Criteria:**
  * Outputs a single merged 5-page PDF document.
  * Pages are in the correct sequence (Cover $\to$ Report $\to$ Appendix).
  * Finished file downloaded to user's device.

#### **Task 4: Identity Document Redaction & Custody (Redact PDF & Vault Purge)**
* **User Scenario:**  
  *"You need to submit your national ID copy for a student club, but university safety rules require you to hide your 13-digit Citizen ID number. Obscure your ID number and ensure the file is completely removed from browser memory afterward."*
* **Test Data Provided:** `thai-id-card-sample.pdf`
* **Success Criteria:**
  * ID number permanently redacted (blacked out).
  * Student successfully clicks "Delete now" or verifies the 30-minute self-clearing countdown.

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
* **UniLab Target:** **$\ge 80.8$ (Grade A / Excellent)**.

---

### 5.3 Technology Acceptance Model (TAM)

*Model Justification (per Slide 15 & 18):* UniLab is a student utility/productivity toolbox designed for academic coursework submissions. TAM (Davis, 1989; Venkatesh & Davis, 2000) directly models perceived usefulness and efficiency in task-oriented software.

Administered on a 5-point Likert scale (1 = Strongly Disagree to 5 = Strongly Agree):

| Code | Construct | Item Wording (Adapted for UniLab) |
| :---: | :--- | :--- |
| **PU1** | Perceived Usefulness | Using UniLab lets me finish my coursework file jobs more quickly. |
| **PU2** | Perceived Usefulness | Using UniLab makes it easier to meet university file submission limits. |
| **PU3** | Perceived Usefulness | I find UniLab useful for my academic work. |
| **PEOU1** | Perceived Ease of Use | Learning to use UniLab is easy for me. |
| **PEOU2** | Perceived Ease of Use | My interaction with UniLab is clear and understandable. |
| **PEOU3** | Perceived Ease of Use | I find UniLab easy to use without instructions. |
| **BI1** | Behavioral Intention | I intend to use UniLab when preparing my next assignment. |
| **BI2** | Behavioral Intention | I plan to use UniLab for my coursework submissions this semester. |
| **BI3** | Behavioral Intention | If UniLab is available, I would recommend it to my group-mates. |

*Analysis Plan:* Each user's construct score is calculated as $\text{Mean}(\text{Items})$. We report $\text{Mean} \pm \text{SD}$ for PU, PEOU, and BI across all 10 participants.

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
| **28 Oct 2026** | **Submit Test Plan** | All Team | Final `test-plan.md` submitted to Google Classroom |
| **29–31 Oct** | Participant Pre-Recruitment | Swan Htut, Myo Zin | 10 MFU students booked for 4 Nov testing slots |
| **31 Oct (Sat)** | Cybersecurity Lecture | All Team | Attendance in Room E4614; laptop lab |
| **2–3 Nov** | Pilot Test & Data Sheets | Zaw Win Htut, Thiha | 1 pilot session run; Excel data collection sheets prepped |
| **4 Nov (Wed)** | **Field Testing Day (W12)** | All Team | **10 completed UAT sessions** (Round 1: U01–05, Round 2: U06–10) |
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
* **Human Review:** Every test scenario, success criterion, and schedule entry was reviewed, calibrated, and approved by all five members of Company 18.

# UniLab Field Testing & UAT Data Collection Kit

**Project:** UniLab — 100% Client-Side Academic Document Suite (Company 18 / Digital Imposters Pvt. Co., Ltd.)  
**Course:** 1305493 Software Engineering Case Studies (Semester 1/2569)  
**Deliverable Date:** Testing on Wednesday 4 November 2026 (Field Testing Day)  
**Target:** $\ge 10$ Participants (`U01` – `U10+`) across MFU Undergraduates  
**Compliance:** Strictly aligns with `Post-Midterm-Plan-2569-EN.pdf` (Slides 6–22), PDPA regulations, SUS benchmark standard, and Davis (1989) TAM model.

---

## 1. Facilitator Protocol & Code of Conduct

### 1.1 The Golden Rule: Strictly "Hands-Off"
Per Course Guidelines (Slide 11), the UAT evaluator or team facilitator **must never touch the input device** (mouse, trackpad, keyboard, or touch screen) once the test commences.
- **Do not** reveal button labels, UI controls, or workflow shortcuts (e.g., do not say *"Click the Grayscale checkbox"* or *"Click Export"*).
- **Do** state the user’s real-world academic goal (e.g., *"You have a lecture slide deck that Moodle rejects because it is 15 MB. Your goal is to submit it under the 5 MB limit"*).
- If the participant asks *"What do I click next?"*, respond neutrally: *"What would you normally try next?"* or *"Please do whatever you think is natural to accomplish your goal."*

### 1.2 Session Roles
Each 25–30 minute testing session is managed by two team members:
1. **Facilitator:** Welcomes participant, reads scenario briefs, conducts consent briefing, hands out survey forms, conducts debrief.
2. **Observer / Timekeeper:** Operates stopwatch for Time-on-Task, logs physical expressions, misclicks, hesitation pauses (>10s), and error recovery behaviors on the observation scorecard.

### 1.3 Time Structure per Participant (Total: 25–30 Mins)
| Phase | Duration | Activity |
|---|---|---|
| **Phase 1: Welcome & PDPA Consent** | 3 mins | Explain privacy, assign ID (`U01`..`U10`), obtain signature/consent. |
| **Phase 2: Baseline (Before Measurement)** | 5 mins | Participant recalls or demonstrates typical current workflow (iLovePDF, Adobe, etc.) for timing. |
| **Phase 3: UniLab Hands-Off Tasks (After)** | 10–12 mins | Participant executes Tasks 1 to 4 on test device with zero facilitator intervention. |
| **Phase 4: Quantitative Questionnaires** | 5 mins | Participant completes SUS (10 items) and TAM (10 items) forms. |
| **Phase 5: Qualitative Debrief** | 4 mins | Structured interview: top pain points, delightful moments, missing features. |

---

## 2. Participant Consent & Demographic Profile

```
PARTICIPANT ID: [ U____ ]     DATE: 2026-11-04     SESSION TIME: [ ____:____ ]
FACILITATOR: [ __________________ ]    OBSERVER: [ __________________ ]
```

### 2.1 PDPA & Academic Ethics Statement
> **Data Privacy Notice:** All data collected in this study is strictly for academic research and evaluation in course 1305493 Software Engineering Case Studies. In strict compliance with the Personal Data Protection Act (PDPA), **no student ID, full legal name, phone number, or personal document content will be recorded or published.** All responses are indexed exclusively by anonymized Participant ID (`U01`–`U10`). No files processed on UniLab leave this computer; UniLab processes all documents 100% client-side in memory.

- [ ] Participant agrees to participate and consents to anonymized evaluation recording.

### 2.2 Participant Demographics
1. **School / Major:**  
   [ ] Information Technology / Software Engineering  
   [ ] Management / Business  
   [ ] Liberal Arts / Languages  
   [ ] Science / Health Sciences  
   [ ] Other: ___________________________
2. **Year of Study:**  
   [ ] 1st Year  
   [ ] 2nd Year  
   [ ] 3rd Year  
   [ ] 4th Year / Graduate
3. **Primary Device Used for Academic Work:**  
   [ ] macOS (MacBook)  
   [ ] Windows Laptop  
   [ ] iPad / Tablet  
   [ ] Android / Chromebook
4. **Current Tool Used for PDF Modification:**  
   [ ] Free Web Converters (iLovePDF, Smallpdf, PDF2Go)  
   [ ] Adobe Acrobat Reader / Pro  
   [ ] Apple Preview (macOS native)  
   [ ] Canva / Microsoft Word Export  
   [ ] None / Ask a friend to do it

---

## 3. UAT Task Scenario Cards (Facilitator Handout)

*Print or display each card separately to the participant without any UI hints.*

---

### 📋 Task 1: Clean & Standardize Lecturer Slides (Compress + Rotate + B&W)
> **Academic Context:** You just downloaded your lecturer's lecture slides (`sample-lecture-slides-15mb.pdf`). You need to upload your annotated version to MFU Moodle, but Moodle has a strict **5 MB submission ceiling**. Additionally, page 3 was scanned upside down, and your home printer will charge you triple if you don't convert color slides to black & white.
> 
> **Your Goal:**  
> 1. Load the document into UniLab.  
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
> **Academic Context:** You need to submit an Urgent Late Add/Drop petition (`petition-form.pdf`) to the Registrar Division via email. The petition requires your handwritten signature, and Registrar regulations require confidential forms containing student personal info to be encrypted with password `UniLabSecure2026`.
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

## 4. Observer Observation & Performance Log

```
PARTICIPANT ID: [ U____ ]
```

| Task | Baseline / Before Time | UniLab / After Time | Completion Status | Error / Hesitation Count | Specific Observations & Obstacles |
|---|---|---|---|---|---|
| **Task 1: Slides** | ______ sec | ______ sec | [ ] Success<br>[ ] Assist/Hint<br>[ ] Failed | ______ | |
| **Task 2: Merge** | ______ sec | ______ sec | [ ] Success<br>[ ] Assist/Hint<br>[ ] Failed | ______ | |
| **Task 3: Sign** | ______ sec | ______ sec | [ ] Success<br>[ ] Assist/Hint<br>[ ] Failed | ______ | |
| **Task 4: Split** | ______ sec | ______ sec | [ ] Success<br>[ ] Assist/Hint<br>[ ] Failed | ______ | |

**Completion Status Criteria:**
- **Success:** Participant finished workflow without any facilitator prompts or external intervention.
- **Assist / Hint:** Participant paused > 60s or made $\ge 3$ consecutive errors, requiring 1 standard non-specific nudge.
- **Failed:** Workflow could not be completed, browser crashed, or participant abandoned task.

---

## 5. System Usability Scale (SUS) Questionnaire
*Standard 10-Item Instrument (Brooke, 1996). Check one box per statement (1 = Strongly Disagree, 5 = Strongly Agree).*

| # | Item Statement | 1<br>(Strongly Disagree) | 2<br>(Disagree) | 3<br>(Neutral) | 4<br>(Agree) | 5<br>(Strongly Agree) |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **Q1** | I think that I would like to use UniLab frequently for my coursework. *(Odd)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q2** | I found UniLab unnecessarily complex. *(Even)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q3** | I thought UniLab was easy to use. *(Odd)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q4** | I think that I would need the support of a technical person to be able to use UniLab. *(Even)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q5** | I found the various functions in UniLab were well integrated. *(Odd)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q6** | I thought there was too much inconsistency in UniLab. *(Even)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q7** | I would imagine that most students would learn to use UniLab very quickly. *(Odd)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q8** | I found UniLab very cumbersome / awkward to use. *(Even)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q9** | I felt very confident using UniLab. *(Odd)* | [ ] | [ ] | [ ] | [ ] | [ ] |
| **Q10** | I needed to learn a lot of things before I could get going with UniLab. *(Even)* | [ ] | [ ] | [ ] | [ ] | [ ] |

### SUS Score Calculation (Facilitator Reference)
1. For odd-numbered questions (Q1, Q3, Q5, Q7, Q9): Score contribution = $\text{User Response} - 1$.
2. For even-numbered questions (Q2, Q4, Q6, Q8, Q10): Score contribution = $5 - \text{User Response}$.
3. Sum the 10 contributions and multiply by $2.5$:
$$\text{SUS Total} = 2.5 \times \left( \sum_{i \in \{1,3,5,7,9\}} (Q_i - 1) + \sum_{i \in \{2,4,6,8,10\}} (5 - Q_i) \right)$$
- **Industry Average Benchmark:** 68.0
- **UniLab Target:** $\ge 80.8$ (Grade A / "Excellent")

---

## 6. Technology Acceptance Model (TAM) Questionnaire
*Adapted from Davis (1989) for academic software utility. Evaluated on a 5-point Likert scale (1 = Strongly Disagree, 5 = Strongly Agree).*

### 6.1 Perceived Usefulness (PU)
| # | Statement | 1 | 2 | 3 | 4 | 5 |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **PU1** | Using UniLab enables me to complete document submission tasks more quickly. | [ ] | [ ] | [ ] | [ ] | [ ] |
| **PU2** | Using UniLab improves the quality and security of my academic submissions. | [ ] | [ ] | [ ] | [ ] | [ ] |
| **PU3** | Using UniLab makes it easier to handle PDF assignments without size limit penalties. | [ ] | [ ] | [ ] | [ ] | [ ] |
| **PU4** | I find UniLab useful in my daily academic activities as a student. | [ ] | [ ] | [ ] | [ ] | [ ] |

$$\text{PU Score} = \frac{\text{PU1} + \text{PU2} + \text{PU3} + \text{PU4}}{4}$$

### 6.2 Perceived Ease of Use (PEOU)
| # | Statement | 1 | 2 | 3 | 4 | 5 |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **PEOU1** | Learning to operate UniLab is easy for me. | [ ] | [ ] | [ ] | [ ] | [ ] |
| **PEOU2** | I find it easy to get UniLab to do what I want it to do. | [ ] | [ ] | [ ] | [ ] | [ ] |
| **PEOU3** | My interaction with UniLab is clear and understandable. | [ ] | [ ] | [ ] | [ ] | [ ] |
| **PEOU4** | I find UniLab flexible to interact with across my devices. | [ ] | [ ] | [ ] | [ ] | [ ] |

$$\text{PEOU Score} = \frac{\text{PEOU1} + \text{PEOU2} + \text{PEOU3} + \text{PEOU4}}{4}$$

### 6.3 Behavioral Intention to Use (BI)
| # | Statement | 1 | 2 | 3 | 4 | 5 |
|---|---|:---:|:---:|:---:|:---:|:---:|
| **BI1** | Assuming I have internet or offline access, I predict that I would use UniLab during exam & submission weeks. | [ ] | [ ] | [ ] | [ ] | [ ] |
| **BI2** | I would recommend UniLab to classmates who struggle with Moodle upload limits. | [ ] | [ ] | [ ] | [ ] | [ ] |

$$\text{BI Score} = \frac{\text{BI1} + \text{BI2}}{2}$$

- **Target Threshold:** Mean score $\ge 4.0 / 5.0$ on each construct.

---

## 7. Qualitative Post-Task Debrief Guide

*Conduct immediately after questionnaires are filled. Record verbatim quotes.*

1. **First Impressions & Highlights:**
   *"What was the easiest or most satisfying part of using UniLab today?"*  
   *Notes:* __________________________________________________________________

2. **Friction Points & Hesitations:**
   *"Was there any point where you felt stuck, hesitated, or wondered if the application was working?"*  
   *Notes:* __________________________________________________________________

3. **Privacy Perception:**
   *"Knowing that UniLab processed your documents completely inside your browser without uploading to any remote server, does that change how willing you are to use it for personal files (e.g. ID cards, academic transcripts)?"*  
   *Notes:* __________________________________________________________________

4. **Missing Capabilities:**
   *"If you could add one feature before final submission week, what would it be?"*  
   *Notes:* __________________________________________________________________

---

## 8. Nielsen 5 + 5 Triage Protocol (4 November Schedule)

Following Jakob Nielsen's usability engineering principle, testing 5 users discovers ~85% of usability defects. Testing 10 users in two iterative waves (5 + 5) prevents wasting sessions on already identified blockers.

```
09:00 - 12:00: Wave 1 (Participants U01 to U05)
               - Record performance, SUS, TAM, and immediate friction points.
12:00 - 13:00: Midday Engineering Sprint
               - Triage critical blockers (UI ambiguity, missing feedback spinners, dropzone edge cases).
               - Fast commit & local deploy if critical blocker detected.
13:30 - 16:30: Wave 2 (Participants U06 to U10)
               - Validate fixes with fresh participants.
               - Confirm metrics elevation in Wave 2 compared to Wave 1.
17:00 - 18:30: Data Consolidation & Aggregation
               - Compile results in uat-results-template.csv and generate final presentation charts.
```

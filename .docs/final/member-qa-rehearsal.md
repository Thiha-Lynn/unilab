# Team rehearsal: likely questions and evidence-backed answers

Prepared 17 November 2026 against the lecturer's supplied 3/17 November instructions. These are simulated questions, not leaked or guaranteed questions. Suggested answers summarize repository evidence. Each member must adapt them to their actual work; do not memorize claims about work or AI usage you did not perform.

## Everyone: the 20-second answer structure

State the decision → open one exact artifact → describe the check → admit the limit. Keep answers to 20–30 seconds so five members can participate in the three-minute Q&A. Say “I do not have evidence for that yet” when appropriate, then explain the next test. Do not turn planned work into completed work.

## Myo Zin Thant — Product Owner

**Q: What problem did you validate, and why this scope?**
Suggested answer: “Our discovery record has 15 interviews and 12 pains. Repeated problems include late file constraints, custody concerns and moving between tools. We kept one workflow: select, transform locally, download. Features without supporting interview pain, F8 and F11, remain parked in the course commitment.” Open [spec](../01-requirements/01-spec/20260826-01-unilab-core.md) and [backlog](../01-requirements/backlog.md).

**Q: What did you personally build rather than just coordinate?**
Evidence-based starting point: “My recorded changes include design-system tokens, theme metadata and header/hero work.” Open [PR18](https://github.com/Thiha-Lynn/unilab/pull/18), [PR16](https://github.com/Thiha-Lynn/unilab/pull/16). Explain one changed rule and its effect in your own words. Do not claim participant observation merely because it was assigned to the Product Owner.

**Q: Would you approve release when SUS is58.64?**
Suggested answer: “Not as meeting our study acceptance criteria. SUS is below75, and task success88.33% is below90%. I would prioritize saving and navigation, reproduce the problems, then compare a new retest wave without deleting the baseline.” Open [survey](survey-results.md) and [defects](../04-test/defect-log.csv).

**Q: How did AI affect requirements or your own work?**
Explain an actual tool/draft and a correction you personally made. A safe project-level example is rejecting unsupported requirements through the pain→requirement→backlog rule. Do not claim this was your intervention unless it was. Repository evidence does not establish your private AI workflow.

**Possible feedback:** “This is a toolbox, not a focused product.”
Response: “The breadth exceeds the evaluated scope. Our presentation focuses on student file preparation and the four planned scenarios. We distinguish shipped features from validated requirements and do not claim all tools were user-tested.”

## Swan Htut Oakkar Aung — Designer / study preparation

**Q: Show your actual design contribution.**
Starting point: “My recorded work includes the responsive audit and layout changes, followed by the test plan and field kit.” Open [PR12](https://github.com/Thiha-Lynn/unilab/pull/12), [PR13](https://github.com/Thiha-Lynn/unilab/pull/13), [PR20](https://github.com/Thiha-Lynn/unilab/pull/20), [PR21](https://github.com/Thiha-Lynn/unilab/pull/21). Explain one responsive change; do not equate desktop resizing with physical-device validation.

**Q: How did you calculate SUS?**
Suggested answer: “For each respondent, subtract1 from odd items, subtract even items from5, sum and multiply by2.5. Then average individual scores. With55 complete responses the mean is58.64 out of100. That is a score, not58.64% satisfied.” Open [scoring script](../../scripts/survey-summary.py).

**Q: Why do faster tasks coexist with low usability ratings?**
Suggested answer: “The timings use successful unassisted pairs only, with different denominators per task. The questionnaire includes55 respondents and measures perceived usability. Those measures can differ; our data does not establish that every user finds the system easy.” Open [comparison](comparison-table.md).

**Q: What did you do with moderator help?**
Suggested answer: “Four T1 rows mentioned save-button reminders but were marked successful. The review conservatively classified those as assisted. The result is53 of60 unassisted attempts, not57 of60.” Open [session review](task-session-review.md). Only explain original moderation if you were present.

**Possible feedback:** “Your questionnaire was collected before the first-time task test.”
Response: “Some original dates and first-use statements conflict. We preserved them and distinguish collection time from form import. We have not resolved every case from original notes, so we qualify those records rather than change the timestamps.” Do not invent a chronology during Q&A.

## Thiha Lin — Tech Lead

**Q: How can you record users if files never upload?**
Suggested answer: “The local file-processing workflow and the research questionnaire are separate. The browser processes a selected document; Google Forms receives survey answers. Public research evidence uses participant codes. The no-document-upload architecture is not a claim that the website or Google Forms makes no network requests.” Open [architecture](../02-design/diagrams.md), [survey provenance](survey-results.md).

**Q: Prove no uploads.**
Suggested answer: “We have source checks and bounded dynamic workflow evidence. These support the inspected paths; they do not certify every dependency and all59tools at runtime. Optional code/model downloads are inbound assets. Complete network coverage remains an open issue.” Open [network tests](../../test/privacy-network-isolation.test.mjs) and [scope of browser checks](../04-test/evidence/20261116-browser-workflows.json).

**Q: Why two repositories and which one is running?**
Suggested answer: “The coursework repository retains the baseline and assignment evidence. Product development and releases are in unilab-releases. The final evidence is on audit/final-readiness-20261116, PR24. We identify the demo revision separately; coursework tests alone do not certify a different production revision.” Open [root README](../../README.md). Verify the live revision before the talk rather than assume it stayed unchanged.

**Q: What does deleting a result actually mean?**
Suggested answer: “The vault holds results in memory and drops its references on expiry or delete-now. That does not erase a copy the user already downloaded. I can show the controls and the vault tests.” Open [vault](../../src/vault.js) and the related tests. Avoid claiming forensic erasure of device memory.

**Q: What did AI get wrong?**
Project example: “The benchmark reported zero uploaded bytes without instrumenting network traffic. The review replaced that with an explicit not-instrumented field. We do not present that benchmark as network proof.” Open [benchmark](../../scripts/qa-benchmark.mjs), [comparison limits](comparison-table.md). Explain your actual review responsibility; AI-assisted commits are not wholly manual work.

**Possible feedback:** “A passing build is not a working demonstration.”
Response: “Agreed. We will perform the tasks and reopen outputs on this laptop. If a scenario fails, we will show the failure and distinguish it from the earlier automated checks.”

## Wanna San — AI Lead

**Q: Where, how, prove, measure: what is your AI story?**
Suggested answer: “The product includes Tesseract OCR and background removal using an ONNX segmentation model. Code and download disclosures support the pipeline explanation. Tests check specific behavior. We have not established multilingual character error rates or segmentation accuracy on a labelled evaluation set.” Open [AI logic](ai-logic.md).

**Q: Did you train these models? What data did you use?**
Suggested answer: “These are third-party pretrained engines/models; our record does not show us training them. We should not claim ownership of their training dataset or evaluation results. Our integration and limitations are documented separately.” Do not guess the provider's training data.

**Q: What about bias and failure?**
Suggested answer: “Language availability does not imply equal recognition accuracy. Output needs checking, especially across scripts. Non-Latin export limitations are documented. Actual failure behavior must be demonstrated; a rule requiring a fallback does not by itself prove every tool implements it.” Open [OCR source](../../src/tools/ocr-pdf.js). Do not claim handwritten Burmese accuracy without measured ground truth.

**Q: What was your personal contribution?**
Evidence-based starting point: “My inspected contribution adds course-source citations, including W4–W6 and M1.” Open [PR14](https://github.com/Thiha-Lynn/unilab/pull/14). Explain how these sources informed your understanding. Add other contributions only if you have actual evidence; the assigned AI Lead title does not establish model implementation.

**Q: How much faster did AI make your development?**
Suggested answer: “We do not have a matched manual-versus-AI experiment. Passing tests and increased test counts are verification outputs, not causal productivity savings. That measurement remains incomplete.”

**Possible feedback:** “Your AI evidence is too weak.”
Response: “The model-quality evaluation is incomplete. The next evaluation needs labelled inputs, fixed model/version, scoring script, per-language results and failure cases. We are not presenting that proposed experiment as already run.”

## Zaw Win Htut — QA / Test Lead

**Q: What do your tests actually establish?**
Suggested answer: “The current coursework suite passes43Node and16Python tests. Checks cover selected privacy, intake, registry, PDF operation, UI and metric-calculation behavior. Passing them does not establish real-user usability or all-device compatibility.” Open [test log](evidence/course-tests-20261117.txt) and [role evidence](role-statements/6631503101-zaw-win-htut.md).

**Q: Where is severity → fix commit → retest?**
Suggested answer: “The issue log records historical engineering fixes and evidence. New survey concerns ISS009–012 await reproduction and severity assessment; we cannot call them fixed or claim zero severe defects from blank fields.” Open [issue log](../04-test/defect-log.csv).

**Q: Are there55 or70users?**
Suggested answer: “55 questionnaire records, with15 overlapping task participants. The task subset is not15additional respondents. Separately, discovery involved15 historical interviews; we do not add these into a unique-person total without deduplication.”

**Q: How can someone reproduce the reported results?**
Suggested answer: “Run python3 scripts/verify-final-evidence.py from the coursework repository. It recomputes both summaries, compares315 overlapping ratings and checks local evidence links. It reports consistency while keeping the study outcome NEEDS ATTENTION.” Open [validator](../../scripts/verify-final-evidence.py).

**Q: Why exclude assisted attempts from timing averages?**
Suggested answer: “That is the existing calculator's successful unassisted observed-pair definition. We show each denominator and all60attempts in the success metric. The selected timing averages can look more favorable than overall experience, so we disclose that limitation.”

**Possible feedback:** “Synthetic benchmarks cannot replace real testing.”
Response: “Correct. We label Node benchmarks as synthetic and keep them separate from supplied task records and survey responses. A24msPDF operation is not a student's end-to-end task time.”

## Three-minute mock Q&A

Practice with one member acting as lecturer, then rotate. Allow30seconds per answer plus30seconds total for handoffs:
1. Myo: Which pain justified your Must scope? Show the source.
2. Swan: Explain SUS and why assisted outcomes changed the success rate.
3. Thiha: Demonstrate file custody and explain what your network evidence does not cover.
4. Wanna: Where is your AI baseline, and what can you truthfully claim without it?
5. Zaw: Show one fix and retest, then identify one unresolved defect.

For each answer, practice opening the exact file within10seconds. If you cannot explain the artifact, do not claim ownership of it.

## Reflection preparation — due22November23:59Bangkok

Do not submit invented personal reflections now. After presenting, each author adds about300words under `## Reflection`: roughly120words on one improvement and one drawback from actual AI-assisted work;80words on their current industry position;100words on a concrete next-year and five-year plan. The structure is optional; the three answers and the author's own words are required.

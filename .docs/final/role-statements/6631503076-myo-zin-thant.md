# Role Statement — Myo Zin Thant (`6631503076`)

**Role:** Product Owner (Company 18 · Digital Imposters Pvt. Co., Ltd.)  
**GitHub:** [`myo-zin-thant18`](https://github.com/myo-zin-thant18)

## What I Owned

As Product Owner for UniLab, I owned the product scope, the backlog, the proposal and the gate submission. My main responsibility was keeping one chain unbroken: every requirement traces from a real student pain to a backlog item. I interviewed three of our fifteen discovery participants (S2, S7, S12) and helped turn the interviews into twelve validated pains (P1–P12). I prioritised the backlog with MoSCoW and made the decision to park OCR and Workflows because 0 of 15 students asked for them. For the test phase, I owned the test scope, the acceptance criteria and the TAM evaluation. I also led the final presentation: the deck, the speaker script and the Q&A preparation, built from our 55-student SUS and TAM results.

## Evidence Links

- Proposal and backlog: [`proposal.md`](../../01-requirements/proposal.md), [`backlog.md`](../../01-requirements/backlog.md), [`TRACEABILITY.md`](../../01-requirements/TRACEABILITY.md)
- Interviews S2, S7, S12: [`results.md`](../../01-requirements/02-interviews/results.md)
- Test scope, acceptance criteria and TAM: [`test-plan.md`](../../04-test/test-plan.md)
- Open item I own: [`defect-log.csv`](../../04-test/defect-log.csv) (ISS-008)

## AI Disclosure

I used Claude (Anthropic) to draft the final presentation deck, compute the SUS and TAM results from our survey export, write the speaker script and Q&A preparation, and draft parts of this statement. I checked every number against the raw survey sheet and the repository before presenting, and I edited the text in my own words. AI was never used to invent users, interviews or survey answers.

---

## Reflection

### 1. Lessons learned: building UniLab with AI

As Product Owner, I saw AI change how we handled requirements and quality. **What got better:** traceability. Our AI skills and subagents (`/audit-backlog`, `diagram-checker`) checked the full chain from pain to requirement to backlog item. On 7 September they found 7 problems, and we fixed all 7. Our automated tests grew from 17 to 49 (37 Node + 12 Python), and every AI-assisted change had to pass CI. Because the checks ran automatically, I could spend more time on what students actually needed.

**What got worse:** building features became too easy. AI let us ship 59 tools, but our UAT with 55 students gave a SUS score of only 58.6. Twenty students said they got lost on first use, and six asked for features we already had. AI also repeated our mistakes faithfully: a wrong OCR description in the spec was copied into 9 files until someone counted the languages in the code. AI speeds up building, but it does not tell you whether you are building the right thing. That still needs real users and a human checking the evidence.

### 2. Where I stand in the AI-era software industry

I think the value of a software engineer is moving from writing code to deciding what to build and proving that it works. In UniLab, the most important work was not typing code. It was interviewing 15 students, refusing to keep features nobody asked for (we parked OCR and Workflows), and designing the system so privacy is guaranteed by the architecture. I see myself as an engineer who uses AI to build faster but still owns the requirements, the testing and the responsibility for the result.

### 3. My plan

**Next year:** I will finish my B.Eng. in Software Engineering at MFU (April 2027) and complete my final-year research on enrollment prediction. I also plan to complete a software internship, ideally at MFU's Digital Technology and Information Services Center (DTI), so I can practise requirements, testing and teamwork on real systems that real users depend on.

**In 5 years:** I want to be working as a software engineer building data-driven, AI-assisted systems for education and public services — tools like my enrollment-prediction research and air-quality forecasting, where good data helps people make better decisions. I want to lead requirements and quality for a team, and be someone who can say what AI should build, and prove that what it built is correct, safe and respectful of users' data.

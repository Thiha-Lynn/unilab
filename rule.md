# DIGITAL IMPOSTERS PVT. CO., LTD. — Legal & Compliance Rules (rule.md)

Read this before writing any code that touches user data or user actions.

**Product:** **UniLab** — a free student toolbox for the everyday file jobs a student
actually has: shrink a report under a submission cap, turn an iPhone photo into a JPG a
form will accept, scan a transcript, trim a lecture recording. In the spirit of
iLovePDF / iLoveIMG, and taken from the Company Charter (W1), not from a case company.

**One core workflow — the Charter's, word for word:**
**select a file → transform it on this device → download the result.**
All 58 tools are 58 settings of that one workflow, not 58 workflows.

**How we pay for it:** we do not. There is no advertising, no analytics, no accounts, no
paid tier and no monetization partner. The Charter's §4 puts advertising and third-party
analytics in the explicit Won'ts, so there is no ad revenue to protect and no partner to
disclose.

**What this architecture means legally — read this twice:**

1. **We never receive a user's file.** Every transformation runs in the browser; there is
   no upload endpoint anywhere in the codebase. Under §3(2) of the Computer Crime Act a
   service provider is someone who *stores data for another person's benefit*. We store
   nothing for anyone, so the §26 access-log duty **does not attach to us** — not because
   we found an exemption, but because we never perform the act that triggers it.
2. **We are not a data controller over file content**, because collection never happens.
   PDPA duties attach "from the moment the first byte arrives" — and no byte arrives.
   Duties that *do* still bind us are listed below; the rest are recorded under
   "Duties this architecture removes" so nobody has to re-derive them next term.
3. **Because there are no ads, no third party collects personal data through our page.**
   That is what makes the claim "your files never leave your device" a statement we may
   make: it is not marketing, it is a description of the code, and it is testable.

> **The trade this file records.** Compliance here is *architectural, not procedural*. We
> did not write a better deletion policy than iLovePDF; we removed the thing that needed a
> deletion policy. That is worth more marks and more trust than a promise — but only while
> the architecture holds. **Most rules below exist to keep it holding.**

**Company Charter — the five roles this file binds:**

| Member | Student ID | Role |
|---|---|---|
| Myo Zin Thant | 6631503076 | Product Owner |
| Thiha Lin | 6631503092 | Tech Lead |
| Wanna San | 6631503097 | AI Lead |
| Swan Htut Oakkar Aung | 6631503088 | Designer |
| Zaw Win Htut | 6631503101 | QA / Test |

**Ownership:** the Tech Lead owns this file and the architecture claims in it; the AI Lead
owns on-device model disclosure; the QA / Test lead owns the tests that prove the claims —
the zero-upload test, the redaction test and the deletion test. No one merges a change that
breaks a rule here without the Tech Lead's sign-off.

**How to read a rule:** every line under "Rules for the agent" is a command to the AI coding
agent, not an explanation for a human. A rule beginning **"If the system…"** is a condition
we may one day meet; a rule beginning **"The agent must not…"** is a line that keeps this
product the product the Charter describes.

---

## PDPA (Personal Data Protection Act)

**What it is:** Thailand's Personal Data Protection Act B.E. 2562 governs any collection,
use, or disclosure of data that can identify a living person. It binds a data controller
from the moment personal data is collected — and a student's transcript, ID card or medical
certificate is exactly that.

**What it requires:** consent · purpose limit · minimise · access/correct/delete ·
sensitive data — in practice: have a lawful basis before you store, use the data only for
what the user asked, keep the least you need for the shortest time, and make deletion a
real, verifiable function rather than a promise.

**Rules for the agent:**

*Minimise — the byte you never receive cannot leak. These rules are the product.*

1. If a transformation can run in the browser, the agent must run it in the browser and
   never upload the file. This is not a preference; it is the Charter's core workflow.
2. The agent must not add an upload endpoint, a file-receiving API route, a storage bucket,
   or any server-side processing of user content. If a feature appears to need one, the
   agent must stop and escalate rather than build it.
3. The agent must not require an account, sign-in, email, name, or phone number to use any
   tool, and must not add a task-per-day limit that would need a user identity to enforce.
4. If a tool can complete its job without a field, the agent must not ask for that field.
5. The system must keep the original filename in memory for display only, and must never
   write it to storage, a log, an error report, or a URL.
6. Production builds must not print filenames, file contents, or object URLs to the console
   or to an error tracker. A message that names the file on screen is correct; the same
   string in the console is not.
7. The system must not persist EXIF, GPS coordinates, or device identifiers from an image
   beyond the moment of processing. Where a tool cannot guarantee this by re-encoding, the
   agent must strip the metadata explicitly.
8. The system must reject a file above a stated size, and a file of a type the tool cannot
   open, and must not retain a file it refused to process. `accept` on an input filters the
   operating system's picker only — the agent must enforce the same rule on the drop path.

*Results — the one thing we do hold, and only in memory*

9. If the system produces a result file, it must hold it in memory only, and must never
   write it to disk, Cache Storage, OPFS, IndexedDB, or any origin-private file system.
10. If the system holds a result, it must set a hard expiry at the moment it is produced,
    show that countdown on screen, and drop the result when it passes.
11. The system must state the exact retention window as a number beside the control, before
    the user commits a file — not only as a countdown they meet afterwards.
12. If the system offers a "delete now" action, it must appear on the result page so a user
    can erase the result before the countdown without contacting anyone.
13. When a result is dropped, the system must revoke its object URL so the bytes are
    unreachable; setting a `deleted` flag or clearing a list is not deletion.
14. The system must drop every held result when the tab closes, without waiting for the
    countdown.
15. The agent must not add a feature that makes results survive a reload, because that means
    writing them to disk.

*Sensitive data — assume every file is an ID card or a medical certificate*

16. The system must not read, parse, index, OCR, classify, fingerprint, or store the
    contents of a user's file beyond the transformation the user explicitly asked for.
17. If a feature would send user content to an AI model or any third-party API, the agent
    must not build it. On-device only — the Charter puts this in the Won'ts.
18. If a tool must fetch from the network, it must fetch **only program code or model data,
    never user content**, and must state what it will download and roughly how large before
    the download starts.
19. If a tool claims to remove content — redaction, face blurring, metadata stripping — the
    removed content must be absent from the output file, not covered by a drawn shape. The
    agent must not ship such a tool without a test that extracts from the output and asserts
    absence.
20. No member of the company may open, view, or download a user's file. There is no
    mechanism by which we could; the agent must not build one.
21. The agent must never use a user's file as training data, a test fixture, a demo asset,
    or a screenshot in marketing or coursework.
22. If the product is offered to users under 20, the agent must not proceed without a
    written guardian-consent plan approved by a human.

*Claims — what we may say, and the condition that makes it sayable*

23. The agent may state that files never leave the device and that we hold no personal data
    **only while both are true of the code**. They are true today because there is no upload
    path and no analytics. If either is ever added, the agent must delete every such claim
    in the same change that adds it — the claim and the architecture ship together or not at
    all.
24. The agent must not write a privacy claim the code does not enforce. A promise of
    deletion needs a test that proves the bytes are gone.
25. The system must ship a privacy page, in plain English, stating what is processed, where
    it is processed, what is held and for how long, what is fetched from the network and
    why, and how to erase a result — one screen, not twelve pages, and not copied from
    another product.
26. If the agent ever adds advertising, analytics, or any monetization script, it must not
    load before the user has consented, the banner must offer a Reject that genuinely
    prevents loading, and rules 23–25 must be revisited in the same change.
27. The agent must not place a filename or any file-derived value in a URL path or query
    string, because the browser sends that URL onward in the `Referer` header.

*User rights are features, not email addresses*

28. PDPA access/correct/delete rights must be satisfied by the product itself. Because we
    hold no user data, "see what we hold" is answerable on the privacy page and "delete it"
    is the delete-now control — the agent must keep both true rather than adding a contact
    form that promises a human will do it.
29. The system must publish a contact channel for PDPA questions and answer within 30 days.

*Our own user research is already a PDPA activity*

30. The agent must not paste interview transcripts, names, phone numbers, student IDs, or
    contact details into any AI tool.
31. The agent must not commit a real user's file, a screenshot showing a real name or student
    ID, or an evidence log containing contact details to the public repository; use redacted
    sample data.
32. The evidence log must store role, pain, and quote only, and recordings must be deleted
    once the quote is captured.

---

## Computer Crime Act §26

**What it is:** Section 26 of the Computer Crime Act B.E. 2550 requires a "service provider"
to keep computer traffic logs showing who accessed the system, when, and from where. Under
§3(2) a service provider includes anyone who **stores computer data for the benefit of
another person**.

**What it requires:** keep an access/traffic log ≥ 90 days tied to a real user, and keep the
data identifying that user for a further 90 days after they stop using the service;
non-compliance is a fine of up to 500,000 baht.

**Why it does not bind UniLab today — and the rules that keep it that way:**

UniLab stores no computer data for anyone. A student's file is opened by their own browser,
transformed on their own device, and saved by them; it is never transmitted to us and we
have nothing to log. §26 attaches to the *act of storing for another*, and we do not perform
it. The honest reading is not "we are exempt" but "we never do the thing".

That conclusion is fragile in exactly one way: it stops being true the moment anyone adds a
server that receives a file. So the rules below are written to make that impossible to do by
accident, and to make the duty impossible to forget if it is ever done deliberately.

**Rules for the agent:**

1. The agent must not add any code path that transmits user file content off the device.
   If a proposed feature requires one, the agent must stop and escalate to the Tech Lead
   before writing it, and must say in the escalation that §26 logging becomes mandatory.
2. If the system ever stores a user's file for them — any cache, any queue, any "resume
   later" feature — the agent must treat §26 as a launch blocker and must not ship that
   feature without the log described in rules 3–7.
3. If such a log becomes required, the system must write an entry for every upload, process,
   download, deletion and failed attempt, containing the actor (session or device identifier
   if no account exists), an ISO-8601 timestamp with the Asia/Bangkok timezone, the source
   IP, the action, and the random file id.
4. If such a log becomes required, the system must retain it at least 90 days, append-only or
   hash-chained so tampering is detectable, and must never configure a rotation or TTL
   shorter than 90 days to save storage cost.
5. If such a log becomes required, deleting a user's file must never delete the log entry
   about it; the agent must not join file deletion and log deletion in one transaction.
6. If such a log becomes required, it must reference a file only by a random id, and must
   never contain the original filename, the file contents, or anything extracted from them.
7. If such a log becomes required, the agent must not rely on the hosting provider's or a
   CDN's logs to satisfy §26; the system must write its own inside storage we control.
8. The agent must not describe UniLab as a "service provider" in any document, and must not
   copy a §26 logging requirement into the backlog while rule 1 holds — an unnecessary log of
   IP addresses would itself be a PDPA collection we have no basis for. **Logging nothing is
   the compliant state here, and it must stay a decision rather than an oversight.**
9. If the team ships a self-hosted or white-label version for another school or organisation,
   the agent must stop and escalate before writing that code; that deployment stores data for
   others and carries its own §26 duty.

---

## Electronic Transactions Act §9 / 26 / 28

**What it is:** the Electronic Transactions Act B.E. 2544 gives electronic signatures legal
force, so a click or a tick — including agreeing to terms — can be a binding legal act.

**What it requires:** valid e-signature test (§9) · presumed-reliable signature (§26) ·
CA duties (§28) — in practice, if you cannot show who agreed, when, and to which version of
the text, you do not have a signature.

**Where this bites UniLab:** almost nowhere, and that is a design outcome. There is no
account to register, no terms to accept before a tool runs, no payment, and no consent
banner — because there is nothing to consent to. The rules below cover the two places a
click could still create an obligation, and the trap of building one carelessly later.

**Rules for the agent:**

1. The agent must not add an "I agree" gate in front of a tool. Nothing about transforming a
   file on your own device creates an obligation, and a consent tick that protects nobody is
   a dark pattern, not compliance.
2. If the user clicks "I agree", "I accept", or "I understand" on anything that *does* create
   an obligation, the system must record four things: **who** (session or device identifier),
   **when** (ISO-8601 with timezone), **what** (the exact version or content hash of the text
   shown), and **how** (the method used to identify them).
3. The agent must not record consent as a bare boolean; `consent = true` is not evidence.
4. The agent must never pre-tick a consent box, and must never bundle two different consents
   into one control.
5. The system must show the actual text beside the control, or one click away; a tick over a
   link the user never opened is weak evidence under §9(1).
6. The system must version every legal text, store which version was agreed to, and re-ask
   when a change is material.
7. The system must store consent records append-only; the agent must never issue an in-place
   `UPDATE` on a consent row — corrections are new rows.
8. The agent must scale identification to the value and risk of the act (§9(2)). A tick with
   a timestamp is enough for a free file transform; anything touching money, a contract, a
   grade, or an identity document must use an authenticated account, OTP, or an established
   certificate authority.
9. If a feature carries real legal or financial value — a sponsorship agreement, an
   internship document — the agent must not build a homemade signature scheme, and must use
   an existing provider such as Thai Digital ID, DBD e-Certificate, or bank e-KYC.
10. If the system exports a document a user may rely on — a receipt, a certificate, a signed
    PDF — it must embed the generation timestamp and a verifiable identifier. A PDF nobody
    can verify is not evidence.
11. The system must never issue digital certificates to third parties; if a request asks for
    that, stop and escalate, because it triggers §28's CA duties plus §§32–34 licensing
    (1–3 years imprisonment or 100,000–300,000 baht).
12. The agent may use a self-signed certificate only inside our own closed systems, and must
    never issue one to a user or another organisation.
13. If a CLA or DCO sign-off is added to the repository, treat the `Signed-off-by` line plus
    the commit author identity and timestamp as the signature record, and do not accept an
    agreement collected any other way without a who / when / version record.

---

## AI accountability (ETDA guideline · course W2)

UniLab ships machine-learning models — OCR for Thai, English and Burmese, and the background
removal model — so the three failure modes from the lecture apply to us even though no model
ever answers a user in prose.

1. **Hallucination.** OCR output is a guess, not a transcription. The system must present
   recognised text as something to check, and must never imply it is verbatim.
2. **Bias.** OCR accuracy is not equal across scripts, and Burmese is the least well served
   by the models we use. The agent must not describe language support as equal, and must
   state the languages actually shipped, consistently, in the code, the registry and the
   README.
3. **No owner.** A human is always responsible: the AI Lead owns model choice and disclosure,
   and every model-backed tool must work as a plain manual tool if the model fails to load.
4. The agent must disclose every model download before it starts, including its size, per
   PDPA rule 18.
5. The agent must not add a model that requires sending user content off-device, whatever its
   accuracy.

---

## Carry into the W3 backlog

These are the legal requirements this file produces. They are numbered LR1–LR8 and every one
is already traced in `.docs/01-requirements/01-spec/` and `.docs/01-requirements/backlog.md`.

| # | Legal requirement | Source | Priority |
|---|---|---|---|
| **LR1** | The system must not transmit user file content to any server, ours or anyone else's. No upload endpoint exists in the codebase. | PDPA (minimisation) — PDPA rules 1, 2 | **Must** — the product |
| **LR2** | The system must not require an account, email, name, or phone number for any tool. | PDPA (minimisation) — PDPA rule 3 | **Must** |
| **LR3** | A tool that reaches the network must fetch only program code or model data, never user content, and must disclose the download and its size beforehand. | PDPA + honesty of LR4 — PDPA rule 18 | **Must** |
| **LR4** | No page may claim files never leave the device unless the architecture makes it true; if an upload path or analytics is ever added, every such claim goes in the same change. | PDPA — PDPA rules 23, 24 | **Must** |
| **LR5** | Results must be held in memory only, expire without user action, be erasable on demand, and be unreachable once dropped — proven by test, not asserted. | PDPA (retention, user rights) — PDPA rules 9–15 | **Must** |
| **LR6** | Redaction, blurring and metadata stripping must remove the content, not overlay it — proven by a test that extracts from the output. | PDPA (sensitive data) — PDPA rules 7, 19 | **Must** |
| **LR7** | No interview transcript, name, phone number, student ID, or contact detail may be pasted into an AI tool or committed to the public repo; the evidence log holds role, pain and quote only. | PDPA (our own research) — PDPA rules 30–32 | **Must** |
| **LR8** | No filename, file content, or object URL may reach the console, an error tracker, or any diagnostic sink in a production build. Naming the file on screen is correct; the same string in the console is not. | PDPA (minimisation) — PDPA rule 6 | **Must** |

### Duties this architecture removes — recorded, not deleted

Nothing here is a loophole. Each line is a duty that would bind us under a different design,
the reason it does not bind this one, and the rule that keeps it that way. **If the reason
ever stops being true, the duty returns in full.**

| Duty under a server-upload design | Why it does not bind UniLab | Kept true by |
|---|---|---|
| §26 access log ≥ 90 days, with source IPs | We store no data for another person, so §3(2) does not describe us | CCA rules 1, 2, 8 |
| Random storage ids, TTL, encryption at rest, signed expiring URLs, backup exclusion | There is no stored upload to protect | PDPA rules 1, 2 |
| Verified deletion of uploads and derived artefacts on the server | Nothing is ever received, so nothing needs deleting; only the in-memory result exists | PDPA rules 9–15 |
| Consent banner gating ad and analytics scripts | There are no ads and no analytics | PDPA rule 26, ETA rule 1 |
| Privacy page naming every partner and the cross-border transfer basis | There are no partners and no cross-border transfer of user data | PDPA rule 25 |
| Session/token ownership checks so one user cannot fetch another's file | Files are never in a shared space to fetch | PDPA rules 1, 2 |

**Escalate to a human, never decide alone:** adding any upload or server-side processing ·
adding a monetization or analytics partner · anything that reads file contents beyond the
requested transformation · changing the result retention window · adding a model that needs
the network at run time · shipping a self-hosted version · issuing certificates.

---

*1305493 Software Engineering Case Studies · 1/2569 · Week 2 in-class case*
*Company: DIGITAL IMPOSTERS PVT. CO., LTD. · Product: UniLab (Company Charter, W1)*
*Written by: Thiha Lin (6631503092), Tech Lead — submitted on behalf of the company*
*Draft submitted in class 19 Aug 2026; rewritten against the Charter's product 6 Sep 2026 (B12).*
*The submitted text is preserved verbatim at `.docs/01-requirements/04-legal/rule-as-submitted-20260819.md`.*

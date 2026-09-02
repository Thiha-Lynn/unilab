# DIGITAL IMPOSTERS PVT. CO., LTD. — Legal & Compliance Rules (rule.md)

Read this before writing any code that touches user data or user actions.

**Product:** **UniLab** — a free online editor and toolbox for students: upload an
image, PDF or media file, edit it in a real editor-style UI, and download the
result. In the spirit of iLovePDF / iLoveIMG — the small things a student actually
needs in everyday digital life.

**One core workflow:** upload a file → edit / transform it → download the result →
the uploaded and generated files are queued for automatic deletion.

**How we pay for it:** advertising through Google AdSense or another official,
legal monetization partner, plus grants and sponsorship. We charge students nothing.

**What this architecture means legally — read this twice:**

1. We receive and host other people's files. Under §3(2) of the Computer Crime
   Act that makes us a **service provider (ผู้ให้บริการ)**, so the §26 access log
   is **mandatory, not optional**.
2. We are a **data controller** under PDPA from the moment the first byte arrives.
   Deleting quickly reduces risk; it does not remove the duty.
3. Running ads means a **third party collects personal data through our page**.
   We are therefore *not* a "no personal data" product, and no one may write that
   claim anywhere.

**Company Charter — the five roles this file binds:**

| Member | Student ID | Role |
|---|---|---|
| Myo Zin Thant | 6631503076 | Product Owner |
| Thiha Lin | 6631503092 | Tech Lead |
| Wanna San | 6631503097 | AI Lead |
| Swan Htut Oakkar Aung | 6631503088 | Designer |
| Zaw Win Htut | 6631503101 | QA / Test |

**Ownership:** the Tech Lead owns this file and the retention/deletion jobs; the
AI Lead owns AI-tool disclosure; the QA / Test lead verifies deletion and logging
actually work before every release. No one merges a change that breaks a rule here
without the Tech Lead's sign-off.

**How to read a rule:** every line under "Rules for the agent" is a command to the
AI coding agent, not an explanation for a human.

---

## PDPA (Personal Data Protection Act)

**What it is:** Thailand's Personal Data Protection Act B.E. 2562 governs any
collection, use, or disclosure of data that can identify a living person, and it
binds us as a data controller from the moment a student's upload reaches our server.

**What it requires:** consent · purpose limit · minimise · access/correct/delete ·
sensitive data — in practice: have a lawful basis before you store, use the file
only for the edit the user asked for, keep the least you need for the shortest
time, and make deletion a real, verifiable function rather than a promise.

**Rules for the agent:**

*Upload — the duties that start the moment a byte arrives*

1. If the system stores an uploaded file, it must store it under a random,
   unguessable identifier, and must never use the user's original filename or a
   sequential id as the storage key.
2. If the system stores an uploaded file, it must set a hard expiry (TTL) at the
   moment of upload, and a scheduled job must delete that file when the TTL
   passes — whether or not the user ever downloaded it.
3. If the user completes a download, the system must delete the uploaded file and
   every derived artefact — thumbnails, previews, intermediate renders, the output
   file — immediately, and must not wait for the TTL.
4. If a file is deleted, the system must remove the actual bytes from object
   storage, database rows, CDN and edge caches, and any queue payload; a
   `deleted = true` flag is not deletion.
5. The agent must exclude the upload bucket from all backups and snapshots,
   because a 30-day backup silently overrides a 1-hour deletion promise.
6. If a scheduled deletion job fails, the system must retry and alert the Tech
   Lead; a silent failure means we are holding personal data with no basis.
7. The system must state the exact retention window as a number of hours on the
   privacy page and beside the upload control; "deleted automatically" with no
   number is not a retention policy.
8. The system must encrypt uploads in transit (TLS) and at rest, and must serve
   every download through a signed URL that expires.
9. The system must not make an uploaded file reachable by guessing a URL, by
   directory listing, or by any public bucket permission.
10. The system must verify that the session or token which created an upload is
    the one requesting it back, so one user can never fetch another user's file.
11. If the system offers a "delete now" action, it must appear on the result page
    so a user can erase their file before the TTL without contacting anyone.
12. The system must reject uploads above a stated size and of types we do not
    edit, and must not silently retain a file it refused to process.

*Minimise — the byte you never receive cannot leak*

13. If a transformation can run in the browser, the agent must run it in the
    browser and never upload the file; server-side processing is only for what the
    browser genuinely cannot do.
14. The system must not require an account, email, name, or phone number to use
    any tool.
15. If a tool can complete its job without a field, it must not ask for that field.
16. The system must strip the file to what the edit needs, and must not persist
    EXIF, GPS coordinates, or device identifiers from an uploaded image beyond the
    moment of processing.
17. The system must keep the original filename in memory for display only, and
    must never write it to storage, a log, an error report, or a URL.

*Sensitive data — assume every upload is an ID card or a medical certificate*

18. The system must not read, parse, index, OCR, classify, fingerprint, or
    thumbnail-for-storage the contents of an uploaded file beyond the
    transformation the user explicitly asked for.
19. No member of the company may open, view, or download a user's uploaded file.
    If support genuinely requires it, the user must ask for it in writing, access
    must be time-limited, and the access must be logged under §26.
20. The system must never use an uploaded file as training data, a test fixture,
    a demo asset, or a screenshot in marketing or coursework.
21. If a feature would send user content to an AI model or any third-party API,
    the agent must not build it; propose an on-device or in-VPC alternative and
    escalate.
22. If the product is offered to users under 20, the agent must not proceed
    without a written guardian-consent plan approved by a human.

*Advertising and monetization — where our personal-data exposure actually lives*

23. The agent must not write, and must delete wherever it finds, any claim that
    UniLab "keeps no personal data" or that "files never touch a server". While we
    run ads and accept uploads, both statements are false.
24. The system must not load any advertising, analytics, or monetization script
    before the user has given consent, and the consent banner must offer a Reject
    that genuinely prevents the script from loading.
25. If the user has not consented, the system must serve non-personalised ads only.
26. The system must never place an upload id, a filename, or any file-derived
    value in a URL path or query string, because the browser sends that URL to ad
    and analytics partners in the `Referer` header.
27. The system must isolate ad code from document content: ads must not run in a
    context that can read the editor DOM, the file, or its object URL.
28. The system must name every monetization and infrastructure partner on the
    privacy page, and state what each one receives.
29. The agent must not add a monetization partner without a signed data processing
    agreement and Tech Lead approval; "official and legal" is a floor, not a
    substitute for a DPA.
30. If the hosting provider or ad partner processes data outside Thailand, the
    agent must record the cross-border transfer basis on the privacy page before
    launch.
31. If a grant body or sponsor asks for numbers, the system must share aggregate
    counts only, and must never share a user list, an upload, or file-derived data.

*User rights are features, not email addresses*

32. If the system holds personal data, it must ship "see what we hold", "correct
    it", and "delete it" as functions, and must publish a contact channel that
    answers PDPA requests within 30 days.
33. The system must ship a privacy page in plain English and Thai stating what is
    uploaded, where it is stored, the exact retention window, who else receives
    data, and how to delete — one screen, not twelve pages, and not copied from
    another product.
34. The agent must not write a privacy claim the code does not enforce; if the
    page promises deletion in one hour, a test must prove the bytes are gone.

*Our own user research is already a PDPA activity*

35. The agent must not paste interview transcripts, names, phone numbers, student
    IDs, or contact details into any AI tool.
36. The agent must not commit a real user's file, a screenshot showing a real name
    or student ID, or an evidence log containing contact details to the public
    repository; use redacted sample data.
37. The evidence log must store role, pain, and quote only, and recordings must be
    deleted once the quote is captured.

---

## Computer Crime Act §26

**What it is:** Section 26 of the Computer Crime Act B.E. 2550 requires a "service
provider" — which under §3(2) expressly includes anyone storing data for other
people's benefit, exactly what we do when we host a student's upload — to keep
computer traffic logs showing who accessed the system, when, and from where.

**What it requires:** keep an access/traffic log ≥90 days, tied to a real user —
and keep the data identifying that user for a further 90 days after they stop
using the service; non-compliance is a fine of up to 500,000 baht.

**Rules for the agent:**

1. Treat the access log as a launch blocker: because UniLab accepts uploads and
   hosts files for other people, §26 applies to us today, and the agent must not
   ship the upload feature without the log described below.
2. The system must write a log entry for every upload, every processing job, every
   download, every deletion, and every failed attempt, containing: the actor
   (account id if one exists, otherwise the session or device identifier), an
   ISO-8601 timestamp with the Asia/Bangkok timezone, the source IP, the action,
   and the random file id.
3. The system must retain that log for at least 90 days.
4. **Deleting a user's file must never delete the log entry about it.** The file
   dies in hours; the log lives 90 days. The agent must not implement "erase
   everything about this upload" as a single cascade, and must not join file
   deletion and log deletion in one transaction.
5. The log must reference a file only by its random id, and must never contain the
   original filename, the file contents, or anything extracted from them.
6. The agent must never configure a log rotation, TTL, retention policy, or
   auto-delete shorter than 90 days, even when the only intent is to cut storage
   cost.
7. If the system adds accounts, it must additionally log login, logout, and failed
   login, and must retain the data identifying a user for at least 90 days after
   they stop using the service, even after they delete the account.
8. If a PDPA deletion request conflicts with rule 7, the system must delete the
   profile and the files, keep the §26 log, and state that split explicitly on the
   privacy page.
9. The system must store logs append-only or hash-chained so tampering is
   detectable, keep them exportable and time-ordered, and restrict read access to
   a single named owner role.
10. If a company member, admin tool, background job, or support script touches an
    upload, the system must log that access with the same fields; the admin is an
    actor too.
11. The agent must not rely on the hosting provider's, Cloudflare's, or an OAuth
    provider's logs to satisfy §26; the system must write its own log inside its
    own storage.
12. Production builds must not print filenames, file contents, or signed URLs to
    the console or to an error tracker.
13. The system must rate-limit uploads per IP and per session, and must log the
    refusals, so abuse of our service can be investigated later.
14. The agent must keep the log store on infrastructure we control and can produce
    to an official on request, and must document where it lives.
15. If the team ships a self-hosted or white-label version for another school or
    organisation, the agent must stop and escalate before writing that code, and
    that deployment must carry its own §26 log.

---

## Electronic Transactions Act §9 / 26 / 28

**What it is:** The Electronic Transactions Act B.E. 2544 gives electronic
signatures legal force, so a click or a tick — including agreeing to our terms
before an upload — can be a binding legal act.

**What it requires:** valid e-signature test (§9) · presumed-reliable signature
(§26) · CA duties (§28) — in practice, if you cannot show who agreed, when, and to
which version of the text, you do not have a signature.

**Rules for the agent:**

1. If the user clicks "I agree", "I accept", "Upload", or "I understand" on
   anything that creates an obligation, the system must record four things:
   **who** (account or session/device identifier), **when** (ISO-8601 with
   timezone), **what** (the exact version or content hash of the text shown), and
   **how** (the method used to identify them).
2. The agent must not record consent as a bare boolean; `consent = true` is not
   evidence.
3. The system must keep the consent record for the terms separate from the consent
   record for advertising and cookies, because the user may accept one and refuse
   the other.
4. If the user withdraws consent to advertising, the system must record that
   withdrawal with the same four fields, and must stop loading the ad script on
   the next page view.
5. The system must version every legal text, store which version each user agreed
   to, and re-ask when a change is material.
6. The system must show the actual text beside the control, or one click away; a
   tick over a link the user never opened is weak evidence under §9(1).
7. The agent must never pre-tick a consent box, and must never bundle consent to
   the terms with consent to advertising.
8. The system must scale the strength of identification to the value and risk of
   the transaction (§9(2)): a tick with a timestamp and session id is enough for a
   free file edit, but anything touching money, a contract, a grade, or an
   identity document must use an authenticated account, OTP, or an established
   certificate authority.
9. The agent must not reuse one identification standard across every feature.
10. If a confirmation link is emailed, the system must bind it to a specific user
    and log who actually clicked it; a click with no actor recorded fails §9(1).
11. If the system creates a signature record, it must link that record to the
    signer alone, capture it while under the signer's sole control, and make both
    the record and the signed data tamper-evident by storing a hash of the agreed
    text alongside it (§26).
12. The system must store consent records append-only; the agent must never issue
    an in-place `UPDATE` on a consent row, and corrections must be new rows.
13. If a feature carries real legal or financial value — a sponsorship agreement,
    an advertising contract, an internship document — the agent must not build a
    homemade signature scheme, and must use an existing provider such as Thai
    Digital ID, DBD e-Certificate, or bank e-KYC.
14. The system must never issue digital certificates to third parties; if a
    request asks for that, stop and escalate, because it triggers §28's CA duties
    plus §§32–34 licensing (1–3 years imprisonment or 100,000–300,000 baht).
15. The agent may use a self-signed certificate only inside our own closed
    systems, and must never issue one to a user or another organisation.
16. If a CLA or DCO sign-off is added to the repository, treat the `Signed-off-by`
    line plus the commit author identity and timestamp as the signature record,
    and do not accept an agreement collected any other way without a who / when /
    version record.
17. If the system exports a receipt, a certificate of completion, or any document
    a user may rely on, it must embed the generation timestamp and a verifiable
    identifier; a PDF nobody can verify is not evidence.

---

## Carry into the W3 backlog

| # | Legal requirement | Source | Priority |
|---|---|---|---|
| **LR1** | Every upload gets a random id, a stated TTL, encryption at rest and in transit, signed expiring download URLs, and verified deletion on download — excluded from backups. | PDPA | **Must** — ships with the upload feature |
| **LR2** | Access log for upload / process / download / delete: actor, timestamp+TZ, IP, action, file id. Retained ≥90 days, append-only, never cascade-deleted with the file. | CCA §26 | **Must** — launch blocker, we are a service provider |
| **LR3** | Consent banner gates every ad and analytics script; terms consent and ad consent stored as separate records of who / when / text version; withdrawal recorded the same way. | ETA §9 / 26 + PDPA | **Must** — before the first ad loads |
| **LR4** | Privacy page naming every partner, the exact retention hours, and the cross-border transfer basis; no "we keep no personal data" claim anywhere. | PDPA | **Must** — before public launch |

**Escalate to a human, never decide alone:** adding a monetization or analytics
partner · changing the retention window · anything that reads file contents ·
letting a company member open a user file · shipping a self-hosted version ·
issuing certificates · moving storage to a new country.

---

*1305493 Software Engineering Case Studies · 1/2569 · Week 2 in-class case*
*Company: DIGITAL IMPOSTERS PVT. CO., LTD. · Product: UniLab*
*Written by: Thiha Lin (6631503092), Tech Lead — submitted on behalf of the company*

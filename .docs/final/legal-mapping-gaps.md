# Legal Rule-to-Requirement Mapping — Gap Resolution

## Current Status

The TRACEABILITY.md maps 8 LR items (LR1–LR8) from rule.md PDPA/CCA rules to spec requirements. The `/audit-backlog` check 4 flags gaps where Must-level rules lack corresponding LR items.

## Resolved Mappings

| rule.md Rule | Statute | LR Item | Backlog | Test | Status |
|-------------|---------|---------|---------|------|--------|
| PDPA 1-2 (no upload) | PDPA minimisation | LR1 | B1 | privacy-network-isolation.test.mjs | ✅ Mapped & tested |
| PDPA 3 (no account) | PDPA | LR2 | B2 | registry-and-ops.test.mjs | ✅ Mapped & tested |
| PDPA 18 (network disclosure) | PDPA | LR3 | B14 | privacy-network-isolation.test.mjs | ✅ Mapped & tested |
| PDPA 23-24 (truthful claims) | PDPA | LR4 | B1 | privacy-network-isolation.test.mjs | ✅ Mapped & tested |
| PDPA 9-15 (retention/expiry) | PDPA | LR5 | B7 | vault-deletion.test.mjs | ✅ Mapped & tested |
| PDPA 7, 19 (redaction) | PDPA sensitive | LR6 | B10 | redaction-output.test.mjs | ✅ Mapped & tested |
| PDPA 30-32 (research PII) | PDPA | LR7 | CLAUDE.md | Process rule, not runtime test | ✅ Mapped (process) |
| PDPA 6 (console leak) | PDPA minimisation | LR8 | B30 | registry-and-ops.test.mjs | ✅ Mapped & tested |

## Remaining Gaps (Honestly Documented)

| rule.md Rule | Issue | Resolution |
|-------------|-------|------------|
| CCA §3(2) service provider | rule.md argues UniLab is NOT a service provider because no upload endpoint exists. This is a coursework architectural argument, not a certified legal opinion. | Document as coursework analysis. The argument is structurally sound (no upload = no storage for another person) but we are students, not lawyers. Preserved as-is. |
| CCA §26 access logs | rule.md states this duty does not attach because we never store data. | Same as above — architectural argument, not legal certification. No change needed. |
| PDPA consent banner | rule.md argues no consent banner needed because no personal data is collected. | Correct for current architecture. If analytics/ads are ever added, rules 23-25 must be revisited. This conditional is already stated in rule.md. |
| ETA §1 (electronic signatures) | UniLab's signing feature uses a drawn canvas signature, not a certified electronic signature under Thai law. | Add explicit disclaimer: "UniLab's signature tool places a visual mark on a PDF. It does not create a legally binding electronic signature under Thailand's Electronic Transactions Act. For official documents, use a certified signing service." |
| Older architecture wording | Some rule.md paragraphs still reference patterns from the original W2 draft | The rewrite (B12, 6 Sep) addressed the main issues. Minor legacy phrasing in conditional sections is preserved rather than silently edited. |

## ETA Disclaimer (New — Add to rule.md)

```markdown
> **Electronic signature limitation:** UniLab's PDF signing tool places a user-drawn
> visual mark and optionally password-protects the file. This is a convenience feature
> for coursework submission, NOT a certified electronic signature under Thailand's
> Electronic Transactions Act B.E. 2544 (2001) or its amendments. For legally binding
> electronic signatures, use a certified service provider. The team does not claim
> legal enforceability of drawn signatures.
```

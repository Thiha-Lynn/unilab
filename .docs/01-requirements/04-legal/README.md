# Legal — the W2 artefact and its rewrite

`rule-as-submitted-20260819.md` is the **verbatim text submitted for the Week 2 in-class
case** on 19 August 2026, kept byte-for-byte. It is the graded submission and must not be
edited; this copy exists so rewriting the working `rule.md` never destroys the thing that
was actually handed in.

## Why the working copy was rewritten

The W2 workshop brief opens with one instruction:

> **1. Pick YOUR product — the one in your Company Charter, not a case company.**

The submitted draft did not do that. Written in 45 minutes in class, it analysed a
*generic* upload-and-edit service: "we receive and host other people's files", funded by
"advertising through Google AdSense", and concluded that the Computer Crime Act §26 access
log was therefore mandatory.

None of that is UniLab. The Company Charter defines a product where every tool runs in the
student's own browser, there is no upload endpoint anywhere in the codebase, there are no
ads, and there are no accounts. Analysing a product we are not building produced legal
requirements we cannot implement — LR1 and LR2 in the submitted draft both require a server
that does not exist, and building one would contradict PDPA rule 13 *in the same file*
("if a transformation can run in the browser, run it in the browser and never upload").

The rewrite keeps the required shape — three laws, "what it is / what it requires / rules
for the agent", direct commands to the AI — and applies it to the charter's product. That
turns out to be the stronger answer rather than the weaker one: most duties dissolve
because of an architectural decision, and the rules that remain are the ones that keep the
architecture honest. That framing is recorded in the spec as §4.1 and tracked as **B12**.

Nothing was deleted. Every duty the submitted draft identified is still in the rewrite —
either as a live rule, or in "Duties this architecture removes", which states the duty, why
it no longer binds, and the rule that keeps it that way.

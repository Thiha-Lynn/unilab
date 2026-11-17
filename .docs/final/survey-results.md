# Survey results — 17 November 2026

Google Forms showed 55 responses in Thiha's account on 17 November. The owner supplied 55 source records, described as collected student answers. All 55 have complete 10-item SUS and 11-item TAM ratings and unique participant codes. This validates data structure, not independent authentication of 55 observed task sessions.

| Scale | n | Mean | Sample SD | Plan target | Result |
|---|---:|---:|---:|---:|---|
| SUS | 55 | 58.64/100 | 18.38 | 75 | Below target |
| TAM usefulness | 55 | 3.34/5 | 0.75 | 4 | Below target |
| TAM ease of use | 55 | 3.43/5 | 0.78 | 4 | Below target |
| TAM intention | 55 | 3.30/5 | 0.83 | 4 | Below target |

SUS uses odd items minus one, five minus even items, summed and multiplied by 2.5. The source's 1–5 “SUS Avg” column is not the SUS score. TAM is scored separately by construct, not a single acceptance threshold over all eleven items.

Sources: [coded ratings](evidence/survey-ratings-anonymized.csv), [full precision results](evidence/survey-summary.json), [reproducible scoring script](../../scripts/survey-summary.py). Run `python3 scripts/survey-summary.py .docs/final/evidence/survey-ratings-anonymized.csv`.

## Provenance and limitations

The original private Markdown reports collection dates 6–17 November. Migration notes describe transferring previously collected answers into Forms; the form has a separate Original collection timestamp field. Do not describe import timestamps as original session times. Preserve actual collection/consent records privately and explain collection method and task exposure. The Nov16 owner statement that formal testing had not yet been recorded and these earlier reported dates need clarification; this report does not assume fabrication or resolve that discrepancy by guessing.

The source contains names and student IDs, contrary to the original coded-only collection plan. They are excluded here. Keep originals restricted; do not commit the source document or expose identity-bearing screenshots. Public rows include only codes and ratings. Code assignments must be reconciled with the previously reserved U01–U15 study slots before joining any datasets.

The reported sample is Myanmar student volunteers, heavily concentrated in Management (39/55); it is a convenience sample, not representative of all MFU students. Report prior familiarity and language/translation method when known.

The survey contains no observed baseline/task durations, inspected-output checks, device/build records or consent evidence. It cannot establish the 90% unassisted-success criterion, completion of all four tasks, improvement after fixes or zero severe defects. Do not populate the UAT task CSV from these ratings alone.

## Implications

Feedback suggests navigation/terminology, first-use guidance, processing feedback, mobile readability/tap targets and save/export discoverability need investigation. Treat these as reported concerns pending reproduction. Requests for LMS submission/history are partly outside the agreed scope. Explain local document processing versus LMS submission clearly; do not add account/history features or claim resolved usability problems without retesting.

Presentation wording: “We obtained 55 survey responses. Mean SUS was 58.64, below our 75 target; all three TAM constructs were below 4. These results identify improvement needs. Observed task timings and retest evidence are reported separately where available.”

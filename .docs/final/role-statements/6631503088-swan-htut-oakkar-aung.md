# Role Statement — Swan Htut Oakkar Aung (`6631503088`)

**Role:** UI/UX Designer & Frontend Engineer (Company 18 · Digital Imposters Pvt. Co., Ltd.)  
**GitHub:** [`6631503088`](https://github.com/6631503088)

## What I Owned

As the UI/UX Designer for UniLab, I owned the user experience architecture, design system tokens, mobile ergonomics, and the post-midterm User Acceptance Testing (UAT) instrumentation. My primary mission was ensuring that UniLab's "1 Core Workflow" (*Select a file → Transform locally → Download result*) remained intuitive, accessible, and touch-friendly across mobile and desktop viewports without requiring user manuals.

In the discovery phase, I conducted three real-user interviews (S4, S9, S14) that directly shaped critical requirements: S4 (sensitive passport/transcript custody and HEIC photo rejection, driving `P2` and `P4`), S9 (discovering size limits only after 90 MB upload failed, driving `P1`, `P7`, and mobile-only ergonomics `P10`), and S14 (out-of-order PDF merge on phones, driving `P8` and local custody for signed sheets). To solve these pains, I authored the design system tokens and WCAG contrast palettes ([`design-system.md`](../../02-design/design-system.md)), established the mobile responsiveness audit ([`responsive-audit.md`](../../02-design/responsive-audit.md)) guaranteeing touch targets $\ge 44\times 44$px for phone screens down to 320px (`F15`), and standardized shared UI components across all 59 tools (drag-and-drop dropzones with visual drag-over feedback, file lists with reordering, progress feedback, and the memory vault timer).

For the testing phase, I authored the Post-Midterm Test Plan ([`test-plan.md`](../../04-test/test-plan.md), [PR #20](https://github.com/Thiha-Lynn/unilab/pull/20)) and designed the complete UAT Field Testing Kit ([`uat-protocol-and-questionnaire.md`](../../04-test/uat-protocol-and-questionnaire.md), [PR #21](https://github.com/Thiha-Lynn/unilab/pull/21)), including Slide 11 hands-off conduct rules, 4 goal-based task scenario cards, 10-item System Usability Scale (SUS) forms, Technology Acceptance Model (TAM) constructs (PU, PEOU, BI), the scorecard CSV template, the automated Python metric calculator (`calc-metrics.py`), and the Comprehensive Project Report ([`PROJECT_REPORT.md`](../PROJECT_REPORT.md), [PR #23](https://github.com/Thiha-Lynn/unilab/pull/23)).

## Evidence Links

- **Design System & Tokens:** [`.docs/02-design/design-system.md`](../../02-design/design-system.md) · [Tokens & CSS Variables](../../02-design/design-system.md#design-tokens)
- **Mobile Responsive Audit:** [`.docs/02-design/responsive-audit.md`](../../02-design/responsive-audit.md)
- **Interactive UI Prototype:** [`.docs/02-design/prototype/index.html`](../../02-design/prototype/index.html)
- **Discovery Interviews (S4, S9, S14):** [`.docs/01-requirements/02-interviews/results.md`](../../01-requirements/02-interviews/results.md#s4)
- **Post-Midterm Test Plan:** [`.docs/04-test/test-plan.md`](../../04-test/test-plan.md) · [PR #20](https://github.com/Thiha-Lynn/unilab/pull/20)
- **UAT Protocol, Questionnaires (SUS/TAM) & Scorecard:** [`.docs/04-test/uat-protocol-and-questionnaire.md`](../../04-test/uat-protocol-and-questionnaire.md) · [PR #21](https://github.com/Thiha-Lynn/unilab/pull/21)
- **Metrics Calculator & Scorecard:** [`.docs/04-test/calc-metrics.py`](../../04-test/calc-metrics.py) · [`.docs/04-test/uat-scorecard-template.csv`](../../04-test/uat-scorecard-template.csv)
- **Comprehensive Project Report:** [`.docs/PROJECT_REPORT.md`](../PROJECT_REPORT.md) · [PR #23](https://github.com/Thiha-Lynn/unilab/pull/23)

## AI Disclosure

I used AI assistance (Google DeepMind Antigravity, Claude, and GitHub Copilot) to assist with drafting CSS custom property scales, structuring responsive audit checklists, formatting Markdown documentation, and scaffolding the mathematical scoring formulas in `calc-metrics.py`. I personally verified all UI layouts, touch targets, and visual feedback across desktop Chrome, Safari, and mobile viewports. I conducted the S4, S9, and S14 interviews in person and via voice chat with real MFU students, and no user interviews, survey responses, or usability test scores were ever generated or simulated by AI.

---

## Reflection

### 1. Lessons learned: building UniLab with AI

Developing UniLab alongside AI coding and design assistants fundamentally reshaped how I think about frontend software engineering and usability.

**What got better:** Prototyping velocity and design system consistency improved dramatically. Using AI, I could define design tokens in CSS and immediately propagate them across 59 tool views while maintaining consistent spacing, typography, and dark/light color schemes. When authoring the UAT test plan and metrics calculator, AI helped generate rigorous formula verification scripts and test templates in minutes, freeing up time to focus on craft: refining scenario prompt cards that obey the course's strict "hands-off" rules (Slide 11) so users are never fed UI button labels.

**What got worse:** AI exhibits a profound blindness to tactile and ergonomic context. Left to itself, AI generates visually clean CSS on a desktop resolution that falls apart on a physical 6.1-inch smartphone screen — placing primary action buttons outside the natural thumb zone, creating cramped touch targets below 40px, or failing to anticipate how confusing a multi-file reordering queue feels to an anxious student attempting to merge a scholarship petition at 11:30 PM. Furthermore, AI readily hallucinated features (such as assuming server OCR or cloud backups) that directly violated our architectural zero-upload invariant (`LR1`). AI can write components rapidly, but only rigorous human empathy and physical device testing can guarantee genuine usability.

### 2. Where I stand in the AI-era software industry

In an era where generative AI can write boilerplate HTML, CSS, and React components in seconds, the true differentiator of a software engineer shifts from typing syntax to **user empathy, systems design, and accessibility ethics**.

Anyone can prompt an AI to generate a functional converter interface, but it takes an empathetic human engineer to listen to a student who accidentally sent their passport through an untrusted web converter (S4), identify the emotional anxiety behind that experience, and architect a solution where privacy is guaranteed by mathematics and local execution rather than marketing promises. I position myself as a Design Engineer who bridges the gap between technical architecture and human-centered design: leveraging AI to accelerate implementation while fiercely defending usability, inclusive accessibility (WCAG), and digital privacy.

### 3. My plan

**Next year (2027):** I will graduate with my Bachelor of Engineering in Software Engineering from Mae Fah Luang University (Class of 2027). Leading up to graduation, I plan to undertake a software engineering internship focused on frontend architecture and design systems, further sharpening my expertise in high-performance web applications, WebAssembly integration, and accessible cross-platform UX.

**In 5 years (2031):** I aim to be working as a Senior Product Designer / Frontend Architect leading design engineering teams in building mission-critical, privacy-first software products. I want to build systems that respect human dignity and data sovereignty — proving that modern web applications can be blazing fast, visually delightful, and completely secure without treating user data as a commodity.

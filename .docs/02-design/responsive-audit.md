# Responsive Layout Status & Audit — UniLab

**Assignee:** Swan Htut Oakkar Aung (6631503088) · Designer  
**Course:** 1305493 Software Engineering Case Studies · 1/2569 · Dr. Prasara Jakkaew  
**Company:** Digital Imposters Pvt. Co., Ltd. (Company 18)  
**Date:** 22 September 2026  
**Source of Truth:** [`.docs/02-design/design-system.md`](design-system.md) and [`src/styles.css`](../../src/styles.css)  

---

## 1. Executive Summary

UniLab is designed for student workflows that frequently take place on mobile devices (12 of 15 student interviewees in the project sample initiate tasks or operate entirely on mobile phones). 

A baseline responsive structure is implemented in [`src/styles.css`](../../src/styles.css), providing breakpoints at **640px (phone)**, **900px (tablet/split)**, and **1440px (wide)**. However, a live browser audit across standard viewports (320px, 375px, 768px, 1280px) identified **5 concrete responsive issues and layout friction points** that need alignment.

---

## 2. Baseline Status: What Is Working Well

| Feature | Implementation | Verified Behavior |
| :--- | :--- | :--- |
| **Breakpoint Hierarchy** | `640px`, `900px`, `1440px` | Smooth transitions across standard device classes. |
| **Touch Optimization** | `@media (hover: none)` | Action buttons and stepper touch targets increase to `≥ 38px`. |
| **iOS Safari Guard** | `@media (max-width: 640px)` | Text-entry inputs enforced at `16px` font size to prevent automatic page zoom on focus. |
| **Two-Pane Collapse** | `.ts__work` at `≤ 900px` | Preview area (left) and options sidebar (right) collapse cleanly into a 1-column vertical flow. |
| **Sticky Action Bar** | `.ts__side__foot` at `≤ 900px` | Tool primary CTA pins to the viewport bottom with `env(safe-area-inset-bottom)` support. |

---

## 3. The 5 Responsive Issues & Defects

### Issue 1: Tabular Tools Squished & Overflowing on Mobile (Functional Defect)
* **Affected Files:** [`src/tools/gpa-calculator.js`](../../src/tools/gpa-calculator.js), [`src/styles.css`](../../src/styles.css) (`table.clean`)
* **Route:** `#/gpa-calculator`
* **Symptoms:**
  * The table attempts to render 4 horizontal columns (`Course`, `Credits`, `Grade`, `Remove`) in a single row on phone viewports.
  * On **375px** screens (iPhone SE / 13 mini), the Course input is squished down to **~85px wide**, severely truncating placeholder and course titles.
  * On **320px** screens, the table width exceeds the container and triggers horizontal scrolling.
* **Proposed Alignment:**
  * At `max-width: 640px`, transform `table.clean` rows into a 2-line card/block layout: Course input occupies line 1 (100% width); Credits, Grade selector, and Remove button sit on line 2.

---

### Issue 2: Jagged & Asymmetric Control Wrapping in Form Tools
* **Affected Files:** [`src/tools/compress-image.js`](../../src/tools/compress-image.js), [`src/styles.css`](../../src/styles.css) (`.controls`, `.field`)
* **Routes:** `#/compress-image`, `#/unit-converter`, `#/citation-generator`
* **Symptoms:**
  * `.controls` uses flexbox wrapping with rigid item minimums (`min-width: 110px`, sliders at `min-width: 160px`).
  * On screens between 320px and 480px, wrapped items produce orphan rows, uneven input widths, and jagged vertical alignment.
* **Proposed Alignment:**
  * For mobile viewports (`max-width: 640px`), structure `.controls` into a clean full-width stacked column or an even 2-column grid (`grid-template-columns: repeat(2, 1fr)`) so controls stretch harmoniously.

---

### Issue 3: Home Tool Grid Breakdown at 320px vs 375px
* **Affected Files:** [`src/styles.css`](../../src/styles.css) (`.grid`, `.tool-card`)
* **Route:** `#/`
* **Symptoms:**
  * The mobile grid specifies `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;`.
  * On a **320px** screen with 20px page padding, available width is 280px. Because `150px * 2 + 10px = 310px > 280px`, the grid fails to form 2 columns and abruptly falls back to **1 giant card per row**.
  * On **375px** screens, the cards barely fit (137px each), causing excessive text wrapping on tool titles.
* **Proposed Alignment:**
  * Calibrate the minimum column width to `minmax(130px, 1fr)` or define an explicit 2-column mobile layout (`grid-template-columns: repeat(2, 1fr)`) with compact card padding (`12px 10px`), ensuring a consistent 2-column layout across all phone screens.

---

### Issue 4: Complete Loss of Privacy Badge on Mobile Header
* **Affected Files:** [`src/styles.css:260`](../../src/styles.css#L260) (`.privacy-pill`)
* **Route:** Global Header (`.topbar`)
* **Symptoms:**
  * Rule `.privacy-pill { display: none; }` completely removes the badge on screens `≤ 640px`.
* **Impact:**
  * On-device custody and privacy is the primary differentiator of UniLab (Charter §1, Spec §4 LR1–LR8). Hiding this badge on mobile removes the main trust signal precisely where 80%+ of students interact.
* **Proposed Alignment:**
  * Rather than `display: none`, render a compact mobile badge on phones (e.g. `🔒 On-device` or `🔒 Local` with reduced padding and 11px font).

---

### Issue 5: Category Filter Block Height on Mobile Viewports
* **Affected Files:** [`src/styles.css:97`](../../src/styles.css#L97) (`.pills`, `.pill`)
* **Route:** `#/`
* **Symptoms:**
  * The 8 category pills (`All`, `PDF`, `Image`, `Video`, `Audio`, `Text`, `Study`, `Utility`) use standard wrapping (`flex-wrap: wrap`).
  * On a 360px–390px phone, the pills occupy **3 to 4 lines**, creating a tall barrier that pushes the search bar and tool cards below the fold.
* **Proposed Alignment:**
  * Implement a horizontally scrollable chip bar for mobile (`display: flex; flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;`) or reduce pill padding/font size to neatly pack into 2 balanced rows.

---

## 4. Implementation Priority Matrix

| Priority | Issue | Complexity | Impact |
| :---: | :--- | :---: | :---: |
| **P1** | **Issue 1:** Fix `table.clean` mobile layout (GPA Calculator) | Low | Prevents UI overflow & truncated inputs on phones |
| **P1** | **Issue 3:** Fix Home `.grid` column breakdown for 320px–375px | Low | Eliminates awkward single-card blowout on small devices |
| **P2** | **Issue 2:** Align form `.controls` into clean mobile columns | Medium | Enhances usability and touch ergonomics across 10+ tools |
| **P2** | **Issue 4:** Restore compact mobile Privacy Badge in `.topbar` | Low | Reinstates core trust branding for mobile users |
| **P3** | **Issue 5:** Mobile category pills horizontal scroll / compact rows | Low | Improves above-the-fold tool discovery |

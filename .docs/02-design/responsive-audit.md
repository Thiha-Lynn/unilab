# Responsive Layout Status & Audit — UniLab

**Assignee:** Swan Htut Oakkar Aung (6631503088) · Designer  
**Course:** 1305493 Software Engineering Case Studies · 1/2569 · Dr. Prasara Jakkaew  
**Company:** Digital Imposters Pvt. Co., Ltd. (Company 18)  
**Date:** 22 September 2026  
**Status:** ✅ All 5 Issues Resolved (PR #13)  
**Source of Truth:** [`.docs/02-design/design-system.md`](design-system.md) and [`src/styles.css`](../../src/styles.css)  

---

## 1. Executive Summary

UniLab is designed for student workflows that frequently take place on mobile devices (12 of 15 student interviewees in the project sample initiate tasks or operate entirely on mobile phones). 

A baseline responsive structure is implemented in [`src/styles.css`](../../src/styles.css), providing breakpoints at **640px (phone)**, **900px (tablet/split)**, and **1440px (wide)**. An audit across standard viewports (320px, 375px, 768px, 1280px) identified **5 concrete responsive issues and layout friction points**. 

All 5 items have now been **corrected, verified in the browser, and passed across all automated test suites**.

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

## 3. The 5 Issues & Implemented Corrections

### Issue 1: Tabular Tools Squished & Overflowing on Mobile
* **Status:** ✅ **Resolved**
* **Affected Files:** [`src/styles.css`](../../src/styles.css) (`table.clean`)
* **Route:** `#/gpa-calculator`
* **Symptoms Identified:**
  * The table attempted to render 4 horizontal columns (`Course`, `Credits`, `Grade`, `Remove`) in a single row on phone viewports.
  * On **375px** screens, the Course input was squished to **~85px wide**, severely truncating placeholder text.
  * On **320px** screens, the table width exceeded the container and caused horizontal overflow.
* **Correction Implemented:**
  * In `src/styles.css` under `@media (max-width: 640px)`, converted `table.clean` to a responsive block/card layout:
    * `table.clean thead` is hidden.
    * Each course row (`tr`) becomes a distinct card with `padding: 10px`, `background: var(--bg)`, and `border: 1px solid var(--line)`.
    * Course name input spans **100% width** on line 1.
    * Credits input, Grade select, and Delete button align horizontally on line 2 with `≥ 38px` touch targets.
  * Verified: Course names now have full width; zero horizontal scroll on 320px and 375px screens.

---

### Issue 2: Jagged & Asymmetric Control Wrapping in Form Tools
* **Status:** ✅ **Resolved**
* **Affected Files:** [`src/styles.css`](../../src/styles.css) (`.controls`, `.field`)
* **Routes:** `#/compress-image`, `#/unit-converter`, `#/citation-generator`
* **Symptoms Identified:**
  * `.controls` used flexbox wrapping with rigid item minimums (`min-width: 110px`, sliders at `min-width: 160px`).
  * On mobile screens, wrapped items produced orphan rows, uneven input widths, and jagged vertical alignment.
* **Correction Implemented:**
  * In `src/styles.css` under `@media (max-width: 640px)`:
    * Configured `.controls` as an adaptive CSS grid: `grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;`.
    * Fields, inputs, and selects expand to `width: 100%; min-width: 0;`.
    * Sliders and textareas automatically span full width (`grid-column: 1 / -1`).
  * Verified: Clean, symmetrical 2-column or stacked controls without awkward orphan fields.

---

### Issue 3: Home Tool Grid Breakdown at 320px vs 375px
* **Status:** ✅ **Resolved**
* **Affected Files:** [`src/styles.css`](../../src/styles.css) (`.grid`, `.tool-card`, `.wrap`)
* **Route:** `#/`
* **Symptoms Identified:**
  * Grid used `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;`.
  * On **320px** screens (available width 280px), two 150px cards could not fit (`310px > 280px`), causing an abrupt blowout into **1 single oversized card per row**.
  * On **375px** screens, titles wrapped tightly.
* **Correction Implemented:**
  * In `src/styles.css` under `@media (max-width: 640px)`:
    * Enforced `grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;`.
    * Adjusted card padding to `12px 10px; gap: 6px;` and refined typography scale.
    * Adjusted page edge padding on mobile from 20px to 14px (`.wrap { padding: 0 14px 60px; }`).
  * Verified: Renders an even, balanced 2-column card grid across all phone sizes from 320px up to 640px.

---

### Issue 4: Complete Loss of Privacy Badge on Mobile Header
* **Status:** ✅ **Resolved**
* **Affected Files:** [`src/styles.css`](../../src/styles.css) (`.topbar`, `.privacy-pill`), [`src/main.js`](../../src/main.js)
* **Route:** Global Header (`.topbar`)
* **Symptoms Identified:**
  * Rule `.privacy-pill { display: none; }` completely removed the badge on screens `≤ 640px`, losing the primary custody trust signal on mobile devices.
* **Correction Implemented:**
  * In `src/main.js`, restored `.privacy-pill` inside `.topbar__actions` beside the "Get UniLab" button.
  * In `src/styles.css` under `@media (max-width: 640px)`:
    * Removed `display: none`.
    * Styled as a compact mobile pill (`font-size: 11px; padding: 4px 8px;`).
    * On mobile screens, the pill automatically renders as `🔒 On-device`, keeping the trust promise visible without crowding the header.
  * Verified: Topbar displays `🎒 UniLab`, `🔒 On-device`, and `Get UniLab` cleanly down to 320px.

---

### Issue 5: Category Filter Block Height on Mobile Viewports
* **Status:** ✅ **Resolved**
* **Affected Files:** [`src/styles.css`](../../src/styles.css) (`.pills`, `.pill`)
* **Route:** `#/`
* **Symptoms Identified:**
  * 8 category filter pills used `flex-wrap: wrap`, stacking into **3 to 4 vertical rows** and pushing tool cards down the screen.
* **Correction Implemented:**
  * In `src/styles.css` under `@media (max-width: 640px)`:
    * Converted `.pills` to a native-feeling horizontal swipe chip bar:
      ```css
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      justify-content: flex-start;
      gap: 8px;
      margin: 16px 0 20px;
      padding: 4px 2px 10px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      ```
    * Styled `.pill` with `flex-shrink: 0; white-space: nowrap; font-size: 13.5px; padding: 7px 14px;`.
  * Verified: Chips stay neatly on 1 horizontal row with smooth touch scrolling, reclaiming 3–4 lines of vertical space for immediate tool discovery above the fold.

---

## 4. Resolution Status Matrix

| Priority | Issue | Complexity | Status | Resolution Summary |
| :---: | :--- | :---: | :---: | :--- |
| **P1** | **Issue 1:** Fix `table.clean` mobile layout (GPA Calculator) | Low | ✅ **Done** | Converted to responsive cards; 100% course name input; touch targets `≥ 38px`. |
| **P1** | **Issue 3:** Fix Home `.grid` column breakdown for 320px–375px | Low | ✅ **Done** | Enforced 2 columns (`repeat(2, minmax(0, 1fr))`) with 12px 10px padding. |
| **P2** | **Issue 2:** Align form `.controls` into clean mobile columns | Medium | ✅ **Done** | Adaptive CSS grid (`minmax(130px, 1fr)`) with full-width sliders. |
| **P2** | **Issue 4:** Restore compact mobile Privacy Badge in `.topbar` | Low | ✅ **Done** | Reinstated `.privacy-pill` as compact `🔒 On-device` badge. |
| **P3** | **Issue 5:** Mobile category pills horizontal scroll / compact rows | Low | ✅ **Done** | Single-row horizontal swipe chip bar with `-webkit-overflow-scrolling`. |

---

## 5. Verification & Test Evidence

* **Automated Unit & Integration Tests:**
  * Command: `npm test`
  * Result: **25 passing, 0 failing**.
* **Production Build & Offline Precache Budget:**
  * Command: `npm run build`
  * Result: Built in **1.10s**, core size **7.40 MB** strictly under the **8 MB budget**.
* **Browser Visual Tests:**
  * Verified at 320px, 375px, 768px, and 1280px via automated browser agent.

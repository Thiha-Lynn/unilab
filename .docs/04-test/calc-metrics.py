#!/usr/bin/env python3
"""
calc-metrics.py - UniLab UAT & Usability Metrics Calculator
Company 18 (Digital Imposters Pvt. Co., Ltd.) - Software Engineering Case Studies (1305493)

Usage:
    python3 calc-metrics.py [uat-scorecard-template.csv]

Calculates:
    - Before vs. After Task Durations and % Reduction
    - Task Success Rates (%)
    - System Usability Scale (SUS) Score according to Brooke (1996) standard
    - Technology Acceptance Model (TAM) Constructs: PU, PEOU, BI according to Davis (1989)
    - Formats output for immediate inclusion into Final Presentation slides (18 Nov).
"""

import sys
import os
import csv
import statistics

def compute_sus(q_responses):
    """
    Computes SUS according to Brooke (1996):
    Odd items (1, 3, 5, 7, 9): score - 1
    Even items (2, 4, 6, 8, 10): 5 - score
    Sum * 2.5
    """
    if len(q_responses) != 10:
        return 0.0
    total = 0
    for i, r in enumerate(q_responses):
        if r is None:
            continue
        if i % 2 == 0:  # Odd items: Q1, Q3, Q5, Q7, Q9 (0-indexed: 0, 2, 4, 6, 8)
            total += (r - 1)
        else:          # Even items: Q2, Q4, Q6, Q8, Q10 (0-indexed: 1, 3, 5, 7, 9)
            total += (5 - r)
    return total * 2.5

def get_sus_grade(score):
    if score >= 84.1:
        return "A+ (Best Imaginable)"
    elif score >= 80.8:
        return "A (Excellent)"
    elif score >= 71.1:
        return "B (Good)"
    elif score >= 68.0:
        return "C (Average / Benchmark)"
    elif score >= 51.0:
        return "D (Poor)"
    else:
        return "F (Unacceptable)"

def safe_float(val):
    try:
        return float(val)
    except (ValueError, TypeError):
        return None

def main():
    csv_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), "uat-scorecard-template.csv")
    if not os.path.exists(csv_path):
        print(f"Error: File not found at {csv_path}")
        sys.exit(1)

    participants = []
    with open(csv_path, mode="r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            pid = row.get("Participant_ID", "").strip()
            if not pid or pid.startswith("BENCHMARK") or pid.startswith("FORMULA"):
                continue
            participants.append(row)

    print(f"\n==================================================================")
    print(f"  UniLab Field Testing UAT Metrics Analysis (1305493 Case Studies)  ")
    print(f"==================================================================")
    print(f"Total Participants Analyzed: {len(participants)}")

    if not participants:
        print("No participant rows found in CSV.")
        sys.exit(0)

    # 1. Task Results
    tasks = [
        ("Task 1: Slides (Compress+Rotate+B&W)", "T1_Before_sec", "T1_After_sec", "T1_Status"),
        ("Task 2: Merge (Portfolio Multi-file)", "T2_Before_sec", "T2_After_sec", "T2_Status"),
        ("Task 3: Sign (Petition Sign+Encrypt)", "T3_Before_sec", "T3_After_sec", "T3_Status"),
        ("Task 4: Split (Chapter Extract)", "T4_Before_sec", "T4_After_sec", "T4_Status"),
    ]

    print("\n--- 1. TASK PERFORMANCE: BEFORE vs. AFTER ---")
    for name, b_col, a_col, s_col in tasks:
        b_times = [safe_float(p.get(b_col)) for p in participants if safe_float(p.get(b_col)) is not None]
        a_times = [safe_float(p.get(a_col)) for p in participants if safe_float(p.get(a_col)) is not None]
        successes = [1 for p in participants if p.get(s_col, "").strip().lower() == "success"]

        avg_b = statistics.mean(b_times) if b_times else 0.0
        avg_a = statistics.mean(a_times) if a_times else 0.0
        pct_imp = ((avg_b - avg_a) / avg_b * 100) if avg_b > 0 and avg_a > 0 else 0.0
        succ_rate = (len(successes) / len(participants) * 100) if participants else 0.0

        print(f"\n* {name}:")
        print(f"  - Success Rate: {succ_rate:.1f}% ({len(successes)}/{len(participants)})")
        print(f"  - Baseline Mean Time (Before): {avg_b:.1f}s")
        print(f"  - UniLab Mean Time (After):    {avg_a:.1f}s" if avg_a > 0 else "  - UniLab Mean Time (After):    Pending field test data")
        if pct_imp > 0:
            print(f"  - Time Reduction:              {pct_imp:.1f}% faster")

    # 2. SUS Scores
    sus_scores = []
    for p in participants:
        q_vals = []
        for i in range(1, 11):
            val = safe_float(p.get(f"SUS_Q{i}"))
            if val is not None:
                q_vals.append(val)
        if len(q_vals) == 10:
            sus_scores.append(compute_sus(q_vals))

    print("\n--- 2. SYSTEM USABILITY SCALE (SUS) ---")
    if sus_scores:
        avg_sus = statistics.mean(sus_scores)
        sd_sus = statistics.stdev(sus_scores) if len(sus_scores) > 1 else 0.0
        print(f"  - Mean SUS Score: {avg_sus:.1f} ± {sd_sus:.1f}")
        print(f"  - Usability Grade: {get_sus_grade(avg_sus)}")
        print(f"  - Target Status: {'PASS (>= 80.8 Grade A)' if avg_sus >= 80.8 else 'NEEDS ATTENTION (< 80.8)'}")
    else:
        print("  - SUS Responses pending collection on 4 November testing day.")
        print("  - Target Benchmark: >= 80.8 (Grade A, Industry Avg = 68.0)")

    # 3. TAM Constructs
    pu_scores = []
    peou_scores = []
    bi_scores = []

    for p in participants:
        pu_vals = [safe_float(p.get(f"TAM_PU{i}")) for i in range(1, 5) if safe_float(p.get(f"TAM_PU{i}")) is not None]
        peou_vals = [safe_float(p.get(f"TAM_PEOU{i}")) for i in range(1, 5) if safe_float(p.get(f"TAM_PEOU{i}")) is not None]
        bi_vals = [safe_float(p.get(f"TAM_BI{i}")) for i in range(1, 3) if safe_float(p.get(f"TAM_BI{i}")) is not None]

        if len(pu_vals) == 4:
            pu_scores.append(statistics.mean(pu_vals))
        if len(peou_vals) == 4:
            peou_scores.append(statistics.mean(peou_vals))
        if len(bi_vals) == 2:
            bi_scores.append(statistics.mean(bi_vals))

    print("\n--- 3. TECHNOLOGY ACCEPTANCE MODEL (TAM) ---")
    if pu_scores and peou_scores and bi_scores:
        print(f"  - Perceived Usefulness (PU):         {statistics.mean(pu_scores):.2f} / 5.0 (Target: >= 4.0)")
        print(f"  - Perceived Ease of Use (PEOU):      {statistics.mean(peou_scores):.2f} / 5.0 (Target: >= 4.0)")
        print(f"  - Behavioral Intention to Use (BI):  {statistics.mean(bi_scores):.2f} / 5.0 (Target: >= 4.0)")
    else:
        print("  - TAM Responses pending collection on 4 November testing day.")
        print("  - Target Benchmark: >= 4.0 / 5.0 across PU, PEOU, and BI constructs.")
    print("==================================================================\n")

if __name__ == "__main__":
    main()

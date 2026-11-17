"""Analyze coded ratings only. Input: anonymized CSV; outputs aggregate JSON."""
import csv,json,statistics,sys
from pathlib import Path

def analyze(path):
    with open(path,newline='',encoding='utf-8') as f: rows=list(csv.DictReader(f))
    ids=[r['Participant_Code'] for r in rows]
    if len(set(ids))!=len(ids): raise ValueError('Duplicate participant codes')
    scores={k:[] for k in ['SUS','PU','PEOU','BI']}
    for r in rows:
        d={k:int(r[k]) for k in [*[f'Q{i}' for i in range(1,11)],*[f'{c}{i}' for c,n in [('PU',4),('PEOU',4),('BI',3)] for i in range(1,n+1)]]}
        if any(v<1 or v>5 for v in d.values()):raise ValueError('Ratings must be 1–5')
        scores['SUS'].append(2.5*sum(d[f'Q{i}']-1 if i%2 else 5-d[f'Q{i}'] for i in range(1,11)))
        for c,n in [('PU',4),('PEOU',4),('BI',3)]:scores[c].append(statistics.mean(d[f'{c}{i}'] for i in range(1,n+1)))
    return {'kind':'survey ratings; not observed task completion','responses':len(rows),'metrics':{k:{'n':len(v),'mean':statistics.mean(v),'sampleSD':statistics.stdev(v) if len(v)>1 else None,'target':75 if k=='SUS' else 4,'targetMet':statistics.mean(v)>=(75 if k=='SUS' else 4)} for k,v in scores.items()},'limits':['Collection authenticity/consent and task exposure require original records.','Form entry timestamps and reported collection times are distinct.','No task timing, success-rate or causal improvement is established by ratings.']}
if __name__=='__main__':print(json.dumps(analyze(sys.argv[1]),indent=2))

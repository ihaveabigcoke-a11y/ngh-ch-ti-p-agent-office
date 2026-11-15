import re,subprocess
from pathlib import Path
app=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
office=Path(r'D:\agent-office\ngh-ch-ti-p-agent-office')
files=[office/'STATUS.md',office/'tasks/T-026-subtasks.md',*office.glob('REVIEW-T-026*.md')]
diff=subprocess.check_output(['git','diff','HEAD','--'],cwd=app,text=True,encoding='utf-8')
text='\n'.join(x[1:] for x in diff.splitlines() if x.startswith('+') and not x.startswith('+++'))
for p in files:text+='\n'+p.read_text(encoding='utf-8')
for p in [app/'scripts/check-t026-desktop.mjs',app/'scripts/check-t026i-ui.mjs',app/'ops/office/reports/T-026i.md']:text+='\n'+p.read_text(encoding='utf-8')
patterns={'email':r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b','private-key':r'-----BEGIN [A-Z ]*PRIVATE KEY-----','token-value':r'\b(?:ghp_|github_pat_|sk-proj-|sk-ant-)[A-Za-z0-9_-]{16,}'}
counts={k:len(re.findall(v,text)) for k,v in patterns.items()}
print('Credential scan (counts only):',counts)
assert not any(counts.values())

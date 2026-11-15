from pathlib import Path
import re
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
def write(p,s): p.write_text(s,encoding='utf-8',newline='\n')
pattern=r'<<<<<<< HEAD\n(.*?)=======\n(.*?)>>>>>>>[^\n]*\n'
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8')
def app_resolve(m):
 a,b=m.groups()
 if a.startswith('import '): return a+b
 if 'page-heading' in a:return a.replace("view==='results'", "view==='results'||view==='production'")
 if 'workspaceNotice()' in a:return a.replace('"results"','"results","production"')
 if '<CompactResults' in a:return a.split('          ) : view === "library"')[0]+'          ) : view === "production"'+b.split('          ) : view === "production"',1)[1]
 raise ValueError(a)
s,n=re.subn(pattern,app_resolve,s,flags=re.S);assert n==4;write(p,s)
for name in ['components/lab/compact-flow.css','tests/operations.test.mjs']:
 p=r/name;s=p.read_text(encoding='utf-8');s,n=re.subn(pattern,lambda m:m[1]+('});\n\n' if name.endswith('.mjs') else '\n')+m[2],s,flags=re.S);assert n==1;write(p,s)
lock=r/'.git/office-locks/codex-T-026.txt';write(lock,'CODEX-BOSS T-026f retry, same main agent\ncomponents/lab/app.tsx\ncomponents/lab/compact-flow.css\ncomponents/lab/compact-video.tsx\ncomponents/lab/muse-package.tsx\nlib/lab/auto-video.ts\nlib/lab/production.ts\ndesktop/src/main.mjs\ndesktop/src/muse-night.mjs\ndesktop/src/worker.mjs\ndesktop/test/muse-night.test.mjs\ntests/operations.test.mjs\nscripts/office-ui.mjs\nscripts/check-t026f-ui.mjs\n')

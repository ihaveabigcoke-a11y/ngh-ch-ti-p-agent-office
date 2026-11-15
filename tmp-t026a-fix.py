from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
p=r/'tests/operations.test.mjs';s=p.read_text(encoding='utf-8');s=s.replace('view=overview','view=signals');p.write_text(s,encoding='utf-8',newline='\n')
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8');start=s.index('<label className="advanced-toggle">');end=s.index('<MuseConnectionStrip',start);block=s[start:end];s=s[:start]+s[end:];at=s.index('<MuseConnectionStrip',s.index('function settingsView()'));s=s[:at]+block+s[at:];p.write_text(s,encoding='utf-8',newline='\n')

from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
p=r/'components/lab/research-candidates.tsx';s=p.read_text(encoding='utf-8');s=s.replace("{candidates.length?(display==='table'?<div className=", "{candidates.length?<div hidden={display!=='table'} className=").replace('</div>:null):<Empty','</div>:<Empty');p.write_text(s,encoding='utf-8',newline='\n')

from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
def write(p,s):p.write_text(s,encoding='utf-8',newline='\n')
p=r/'lib/lab/auto-video.ts';s=p.read_text(encoding='utf-8').replace("import {type LabRecord}","import {vietnamDay,type LabRecord}").replace('{suggestProductKey,vietnamDay}','{suggestProductKey}');write(p,s)
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8').replace('<ProductionStudio active={false} records={records}', '<ProductionStudio onSwitchMode={()=>switchMode(!demo)} active={true} records={records}');write(p,s)
p=r/'components/lab/compact-video.tsx';s=p.read_text(encoding='utf-8').replace("[imageMode,setImageMode]=useState(false)","[detailsOpen,setDetailsOpen]=useState(false),[imageMode,setImageMode]=useState(false)").replace('<details><summary>Chi tiết</summary>{details}</details>','<details onToggle={e=>setDetailsOpen(e.currentTarget.open)}><summary>Chi tiết</summary>{detailsOpen&&details}</details>');write(p,s)

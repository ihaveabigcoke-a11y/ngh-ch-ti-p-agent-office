from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
p=r/'lib/lab/daily-selection.ts';s=p.read_text(encoding='utf-8');s=s.replace('revision:z.number().int().positive(),checked:z.boolean(),','revision:z.number().int().positive(),checked:z.boolean(),autoIdentity:z.boolean().optional(),',1)
needle="  if(input.checked&&(!input.productKey||!input.rank))"
block="""  if(input.checked&&input.autoIdentity){
    const existing=selectionEntries(records).filter(s=>s.selectionDay===day);
    if(!input.productKey){
      let key=linked?.data.productKey??suggestProductKey(candidate.name).slice(0,54);
      if(key.length<2)key='SP-'+candidate.id.replace(/[^A-Za-z0-9]/g,'').toUpperCase().slice(0,40);
      const base=key;let suffix=2;
      while(records.some(r=>r.kind==='product'&&r.id!==linked?.id&&r.data.productKey===key))key=base+'-'+suffix++;
      input.productKey=key;
    }
    input.rank??=existing.find(s=>s.productId===linked?.id)?.rank??[1,2,3].find(rank=>!existing.some(s=>s.rank===rank));
  }
"""
assert needle in s;s=s.replace(needle,block+needle,1);p.write_text(s,encoding='utf-8',newline='\n')
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8').replace('import CompactToday','import CompactResearch from "./compact-research";\nimport CompactToday',1)
needle='<OperationsPanel key={`${demo}-${view}`}';start=s.index(needle);end=s.index('/>',start)+2;old=s[start:end];wrapped='{view==="research"?<CompactResearch records={records} demo={demo} onRecords={rows=>{if(demo)putMemory(rows);else setReal(previous=>[...rows,...previous.filter(row=>!rows.some(next=>next.id===row.id))]);}} onNavigate={openHref} details={'+old+'}/>:('+old+')}';s=s[:start]+wrapped+s[end:];s=s.replace('! ["signals","overview"].includes(view)','! ["signals","overview","research"].includes(view)').replace('hidden={["signals","overview"].includes(view)}','hidden={["signals","overview","research"].includes(view)}');p.write_text(s,encoding='utf-8',newline='\n')
p=r/'components/lab/compact-flow.css';s=p.read_text(encoding='utf-8');s+='\n.compact-toolbar{display:flex;align-items:center;gap:12px}.compact-toolbar select{padding:10px 14px;border-radius:8px;border:1px solid var(--lab-border);background:var(--lab-surface);color:var(--lab-ink);font:inherit;max-width:400px}.compact-prices{display:flex;gap:14px;align-items:center;margin:16px;font-size:16px}.compact-card-actions .compact-status{margin:0}.compact-advanced{max-height:75vh;overflow:auto}\n';p.write_text(s,encoding='utf-8',newline='\n')

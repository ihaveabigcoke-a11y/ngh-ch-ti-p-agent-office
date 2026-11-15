from pathlib import Path
import shutil
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
o=Path(r'D:\agent-office\ngh-ch-ti-p-agent-office')
(r/'.git/office-locks/codex-T-026.txt').write_text('CODEX-BOSS T-026e same session\ncomponents/lab/app.tsx\ncomponents/lab/compact-products.tsx\ncomponents/lab/compact-flow.css\nlib/lab/product-compact.ts\nlib/lab/domain.ts\napp/api/lab/route.ts\ndesktop/local/server.mjs\ntests/operations.test.mjs\nscripts/check-t026e-ui.mjs\nops/office/reports/T-026e.md\n',encoding='utf-8')
shutil.copyfile(o/'tmp-product-compact.ts',r/'lib/lab/product-compact.ts')
shutil.copyfile(o/'tmp-compact-products.tsx',r/'components/lab/compact-products.tsx')
p=r/'lib/lab/domain.ts';s=p.read_text(encoding='utf-8');s=s.replace('      supplierUrl: link,','      purchaseUrl: link.optional(),\n      supplierUrl: link,',1);p.write_text(s,encoding='utf-8')
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8');s=s.replace('import CompactResearch','import CompactProducts from "./compact-products";\nimport CompactResearch',1);s=s.replace('            productsView()','            <CompactProducts records={records} demo={demo} onRecord={r=>{if(demo)putMemory([r]);else setReal(prev=>[r,...prev.filter(x=>x.id!==r.id)]);}} onNavigate={openHref} details={productsView()}/>',1);p.write_text(s,encoding='utf-8')
p=r/'app/api/lab/route.ts';s=p.read_text(encoding='utf-8');s="import {compactProductInput} from '@/lib/lab/product-compact';\n"+s;s=s.replace("    if(b.action==='select_daily') {","    if(b.action==='compact_product'){\n      const input=compactProductInput.safeParse(b.input);\n      if(!input.success)throw new ApiError(422,'Hồ sơ không hợp lệ.');\n      if(!(env as any).SAVE_COMPACT_PRODUCT)throw new ApiError(503,'Cần bản desktop local.');\n      try{return Response.json({record:(env as any).SAVE_COMPACT_PRODUCT(uid,input.data)});}catch(error){throw new ApiError(409,(error as Error).message);}\n    }\n    if(b.action==='select_daily') {",1);p.write_text(s,encoding='utf-8')
p=r/'desktop/local/server.mjs';s=p.read_text(encoding='utf-8');s=s.replace("  const metricDomain=", "  const productDomain=await import(pathToFileURL(join(dirname(resolve(routesPath)), 'lib/lab/product-compact.mjs')).href);\n  const metricDomain=",1);s=s.replace('    SELECT_RESEARCH(uid,input){', '''    SAVE_COMPACT_PRODUCT(uid,input){
      db.exec('BEGIN IMMEDIATE');
      try{const records=db.prepare('SELECT * FROM lab_records WHERE owner_id=?').all(uid).map(decodeOffice);
        const r=productDomain.planCompactProduct(records,input,Date.now());
        db.prepare(`INSERT INTO lab_records (owner_id,id,kind,data,revision,created_at,updated_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(owner_id,id) DO UPDATE SET data=excluded.data,revision=excluded.revision,updated_at=excluded.updated_at`).run(uid,r.id,r.kind,JSON.stringify(r.data),r.revision,r.createdAt,r.updatedAt);
        db.exec('COMMIT');return r;
      }catch(error){db.exec('ROLLBACK');throw error;}
    },
    SELECT_RESEARCH(uid,input){''',1);p.write_text(s,encoding='utf-8')
p=r/'components/lab/compact-flow.css';s=p.read_text(encoding='utf-8')+'\n.compact-six-fields{display:grid;grid-template-columns:1fr 1fr;gap:18px}.compact-product-form form{display:grid;gap:20px}.compact-cost{display:flex;gap:6px}.compact-cost input{min-width:0;width:38%}.compact-cost select{max-width:90px}.compact-product-form input,.compact-product-form select{background:var(--lab-surface);border:1px solid var(--lab-border);padding:10px;color:var(--lab-ink);border-radius:6px}.compact-source{margin-bottom:20px;display:grid;gap:10px}.compact-source .lab-button{justify-self:end}.compact-competitor{display:grid;gap:6px;padding:12px 16px;border-top:1px solid var(--lab-border);font-size:12px}\n';p.write_text(s,encoding='utf-8')
p=o/'STATUS.md';s=p.read_text(encoding='utf-8').replace('| [ ] T-026d · Săn sản phẩm | Đang làm | — |','| [x] T-026d · Săn sản phẩm | Xong: 778 pass/1 skip/0 fail; Chốt 1 click; 4 PNG | 2f99eba đã push |').replace('| [ ] T-026e · Sản phẩm | Chờ | — |','| [ ] T-026e · Sản phẩm | Đang làm | — |');p.write_text(s,encoding='utf-8')

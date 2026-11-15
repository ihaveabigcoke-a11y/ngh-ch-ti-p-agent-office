from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local');o=Path(r'D:\agent-office\ngh-ch-ti-p-agent-office')
def write(p,s):p.write_text(s,encoding='utf-8',newline='\n')
for src,dest in [('tmp-result-cards.ts','lib/lab/result-cards.ts'),('tmp-compact-results.tsx','components/lab/compact-results.tsx')]:write(r/dest,(o/src).read_text(encoding='utf-8').replace("@/lib/lab/metrics-table","@/lib/lab/metric-time"))
write(r/'.git/office-locks/codex-T-026.txt','CODEX-BOSS T-026h same session\ncomponents/lab/app.tsx\ncomponents/lab/compact-results.tsx\ncomponents/lab/compact-flow.css\nlib/lab/result-cards.ts\nlib/lab/production.ts\nlib/lab/domain.ts\napp/api/lab/route.ts\ndesktop/local/server.mjs\ntests/operations.test.mjs\nscripts/check-t026h-ui.mjs\n')
p=r/'lib/lab/production.ts';s=p.read_text(encoding='utf-8').replace('  renderPlans:z.array(renderPlanSchema)', '  reuseBodyPlan:renderPlanSchema.optional(),refreshSourcePlanId:id.optional(),\n  renderPlans:z.array(renderPlanSchema)',1);write(p,s)
p=r/'lib/lab/domain.ts';s=p.read_text(encoding='utf-8').replace('  settings: z.object({','  settings: z.object({\n    resultThresholds:z.object({minViews:z.number().int().nonnegative().max(1e12).nullable(),minKeywordComments:z.number().int().nonnegative().max(1e12).nullable()}).optional(),',1);write(p,s)
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8').replace('import CompactPublish','import CompactResults from "./compact-results";\nimport CompactPublish',1)
s=s.replace('view===\'products\'||["research"','view===\'products\'||view===\'results\'||["research"',1).replace('! ["signals","overview","research","social"].includes(view)','! ["signals","overview","research","social","results"].includes(view)',1)
old='<><HookAnalytics records={records} threshold={settings.scaleSignalThreshold??null}/><MetricsTable records={records}/><MetricImport records={records} demo={demo} onRecords={rows=>{if(demo)putMemory(rows);else setReal(prev=>[...rows,...prev.filter(r=>!rows.some(n=>n.id===r.id))]);}}/><details><summary>Số liệu bài test đã lưu</summary>{resultsView()}</details></>'
new='<CompactResults records={records} demo={demo} thresholds={settings.resultThresholds??{}} onNavigate={openHref} onRecords={rows=>{if(demo)putMemory(rows);else setReal(prev=>[...rows,...prev.filter(r=>!rows.some(n=>n.id===r.id))]);}} details={'+old+'}/>'
assert old in s;s=s.replace(old,new,1)
s=s.replace('<p>{settings.scaleSignalThreshold==null?', '<ResultThresholdSettings settings={settings} revision={records.find(r=>r.kind==="settings")?.revision??0} persist={persist}/>\n        <p>{settings.scaleSignalThreshold==null?',1);s=s.replace('import CompactResults from','import {ResultThresholdSettings} from "./compact-results";\nimport CompactResults from',1);write(p,s)
p=r/'components/lab/compact-results.tsx';s=p.read_text(encoding='utf-8');s+='''
export function ResultThresholdSettings({settings,revision,persist}:{settings:Record<string,any>;revision:number;persist:any}){
 const [views,setViews]=useState<string>(String(settings.resultThresholds?.minViews??'')),[comments,setComments]=useState<string>(String(settings.resultThresholds?.minKeywordComments??'')),[error,setError]=useState('');
 async function save(){try{await persist('settings','workspace',{...settings,resultThresholds:{minViews:metricNumber(views),minKeywordComments:metricNumber(comments)}},revision);setError('');}catch(e){setError((e as Error).message);}}
 return <section className="production-card production-card-body"><h3>Ngưỡng sau 48 giờ</h3><label className="field">Lượt xem tối thiểu<input inputMode="numeric" value={views} onChange={e=>setViews(e.target.value)}/></label><label className="field">Comment từ khoá tối thiểu<input inputMode="numeric" value={comments} onChange={e=>setComments(e.target.value)}/></label><Button tone="neutral" onClick={()=>void save()}>Lưu ngưỡng</Button>{error&&<p role="alert">{error}</p>}</section>;
}
''';write(p,s)
p=r/'app/api/lab/route.ts';s=p.read_text(encoding='utf-8');s="import {hookRefreshInput} from '@/lib/lab/result-cards';\n"+s;s=s.replace("    if(b.action==='distribute_hooks'){", "    if(b.action==='refresh_hooks'){\n      const input=hookRefreshInput.safeParse(b.input);if(!input.success)throw new ApiError(422,'Lượt hook không hợp lệ.');\n      if(!(env as any).REFRESH_HOOKS)throw new ApiError(503,'Cần desktop local.');\n      try{return Response.json({record:(env as any).REFRESH_HOOKS(uid,input.data)});}catch(e){throw new ApiError(409,(e as Error).message);}\n    }\n    if(b.action==='distribute_hooks'){");write(p,s)
p=r/'desktop/local/server.mjs';s=p.read_text(encoding='utf-8').replace('  const publishDomain=',"  const resultDomain=await import(pathToFileURL(join(dirname(resolve(routesPath)), 'lib/lab/result-cards.mjs')).href);\n  const publishDomain=",1).replace('    DISTRIBUTE_HOOKS(uid,input){','''    REFRESH_HOOKS(uid,input){
      db.exec('BEGIN IMMEDIATE');try{const records=db.prepare('SELECT * FROM lab_records WHERE owner_id=?').all(uid).map(decodeOffice),r=resultDomain.planHookRefresh(records,input,Date.now());
        if(!records.some(old=>old.id===r.id))db.prepare('INSERT INTO lab_records (owner_id,id,kind,data,revision,created_at,updated_at) VALUES(?,?,?,?,?,?,?)').run(uid,r.id,r.kind,JSON.stringify(r.data),r.revision,r.createdAt,r.updatedAt);
        db.exec('COMMIT');return r;
      }catch(e){db.exec('ROLLBACK');throw e;}
    },
    DISTRIBUTE_HOOKS(uid,input){''',1);write(p,s)
p=r/'components/lab/compact-flow.css';write(p,p.read_text(encoding='utf-8')+'\n.compact-three-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 16px}.compact-three-metrics dt{font-size:10px;color:var(--lab-muted);min-height:28px}.compact-three-metrics dd{font-size:23px;font-weight:600;margin:5px 0 14px}.compact-result-form{display:grid;gap:14px}\n')
p=o/'STATUS.md';s=p.read_text(encoding='utf-8').replace('SHA xem git log, đã push','13f043d đã push');write(p,s)

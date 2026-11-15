from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
def write(p,s):p.write_text(s,encoding='utf-8',newline='\n')
p=r/'components/lab/compact-video.tsx';s=p.read_text(encoding='utf-8')
s=s.replace("[selected,setSelected]=useState('')", "[hookIndex,setHookIndex]=useState(0),[selected,setSelected]=useState('')")
s=s.replace(" const scenes=project?.data.scenes??[]", " const scenes=project?.data.scenes??[]")
needle=" useEffect(()=>{const q=new URLSearchParams(location.search);"
insert=""" const hookScenes=scenes.filter((s:any)=>s.role==='hook'),bodyScenes=scenes.filter((s:any)=>s.role!=='hook');
 const track=scenes.length?[hookScenes[hookIndex]??hookScenes[0],...bodyScenes].filter(Boolean):[null,null,null];
 const plan=project?.data.renderPlans?.[hookIndex]??project?.data.reuseBodyPlan;
 const spans=track.map((s:any,i:number)=>plan?.segments?.find((seg:any)=>seg.sceneId===s?.id)?((seg:any)=>seg.outSec-seg.inSec)(plan.segments.find((seg:any)=>seg.sceneId===s.id)):(s?.toSec!=null&&s?.fromSec!=null?s.toSec-s.fromSec:[4,4,7][i]??4));
 const trackStyle={gridTemplateColumns:'85px '+spans.map((n:number)=>'minmax(110px,'+n+'fr)').join(' ')};
 const marks=spans.reduce((a:number[],n:number)=>[...a,a.at(-1)!+n],[0]);
"""
assert needle in s;s=s.replace(needle,insert+needle,1)
s=s.replace('<label><input type="checkbox"', '<select aria-label="Hook" value={hookIndex} onChange={e=>setHookIndex(Number(e.target.value))}>{[0,1,2].map(i=><option key={i} value={i}>H{i+1}</option>)}</select><label><input type="checkbox"',1)
start=s.index('<div className="compact-ruler">');end=s.index('</div>}\n <div className="compact-cards">',start)
s=s[:start]+"""<div className="compact-ruler" style={trackStyle}><span/>{spans.map((_:number,i:number)=><span key={i}>{marks[i]}s — {marks[i+1]}s</span>)}</div>{['Shot','Chữ đè','Lượt tạo'].map((label,row)=><div className="compact-track" style={trackStyle} key={label}><strong>{label}</strong>{track.map((s:any,i:number)=>{const take=s?.takes?.at(-1);const overlay=plan?.overlays?.filter((o:any)=>o.fromSec<marks[i+1]&&o.toSec>marks[i]).map((o:any)=>o.text).join(' · ')??s?.overlayText;return <div className="compact-shot" key={s?.id??i}>{row===0?<>{take?<img src={'/api/assets/'+take.assetId+'?thumbnail=1'} alt={s.name}/>:product?.data.imageUrl?<img src={product.data.imageUrl} alt={product.data.name}/>:<Film size={32}/>}<span>{s?.name??'—'}</span></>:row===1?<span>{overlay||'—'}</span>:<span className={'tone-'+(take?'green':s?.mediaProvider==='manual'?'amber':busy?'blue':'gray')}>{take?'✓':s?.mediaProvider==='manual'?'◷ Chờ file tay':progress||'◷'}</span>}</div>;})}</div>)}"""+s[end:]
s=s.replace('<div className="compact-cards">{exports.map', '<div className="compact-cards" data-video-exports>{exports.map',1)
write(p,s)
p=r/'scripts/check-t026f-ui.mjs';s=p.read_text(encoding='utf-8').replace('[data-screen=video] .compact-cards video','[data-video-exports] video')
s=s.replace('const sources=[]','const sources=[]')
# The test bridge returns worker state, including a refusal after a recorded submission.
s=s.replace("if(mode==='refused'){store.set('muse_paused',true);throw Error('Muse từ chối (fixture)');}","if(mode==='refused'){const request={projectId,sceneId:'auto_0',productId:p.id,name:'Fixture refused',mediaType:'video'};const {job}=store.enqueue(request,'refused-fixture');store.put({...job,state:'needs_attention',failureCode:'MUSE_REFUSED',history:[...job.history,{at:Date.now(),state:'submitted',note:'Fake submitted'},{at:Date.now(),state:'needs_attention',note:'Fake refusal'}]});store.set('muse_paused',true);throw Error('Muse từ chối (fixture)');}")
s=s.replace("await page.addInitScript(({mode})", "await page.exposeFunction('fakeFlowJobs',async()=>store.jobs());\n await page.addInitScript(({mode})")
s=s.replace('profiles:[],jobs:[],active:0','profiles:[],jobs:await window.fakeFlowJobs(),active:0')
s=s.replace("assert.equal(starts,1);const office", "assert.equal(starts,1);assert.equal(store.jobs()[0].state,'needs_attention');assert.ok(project.data.scenes[0].museReconciledAt);const office")
s=s.replace("await page.setViewportSize({width,height});await screenshot", "await page.setViewportSize({width,height});await screenshot")
# Retain full seed/media evidence for the final measurement; source-built, synthetic only.
s=s.replace("const plans=project.data.exports.map(e=>e.renderPlan);", "await writeFile(join(out,'acceptance-records.json'),JSON.stringify(rows));const plans=project.data.exports.map(e=>e.renderPlan);")
write(p,s)

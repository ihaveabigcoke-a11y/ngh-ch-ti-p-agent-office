from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
def write(p,s):p.write_text(s,encoding='utf-8',newline='\n')
p=r/'components/lab/compact-video.tsx';s=p.read_text(encoding='utf-8');s=s.replace('<select aria-label="Hook"','{product&&<select aria-label="Hook"').replace('</option>)}</select><label>', '</option>)}</select>}<label>',1)
s=s.replace('{imageMode?<a href="?view=images">Mở tạo ảnh</a>:<div', '{!product?null:imageMode?<a href="?view=images">Mở tạo ảnh</a>:<div',1)
s=s.replace('const poll=()=>void desktopBridge()?.status().then(s=>setMusePaused(s.musePaused!==false)).catch(()=>{});', 'const poll=()=>void desktopBridge()?.status().then(s=>setMusePaused(s.musePaused!==false)).catch(()=>{});')
s=s.replace("}finally{lock.current=false;setBusy(false);}}", "}finally{void desktopBridge()?.status().then(s=>setMusePaused(s.musePaused!==false));lock.current=false;setBusy(false);}}",1)
write(p,s)
p=r/'components/lab/compact-office.tsx';s=p.read_text(encoding='utf-8');start=s.index('export const compactTime=');end=s.index('\nconst groups=',start)
s=s[:start]+"""export const compactTime=(value:string|number|null)=>{
 if(value==null)return '—';const date=new Date(value);if(!Number.isFinite(date.getTime()))return '—';
 const parts=Object.fromEntries(new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'}).formatToParts(date).map(p=>[p.type,p.value]));return `${parts.hour}:${parts.minute} · ${parts.day}/${parts.month}`;
};"""+s[end:]
s=s.replace('<strong>{view?.runs', '<strong data-content-value>{view?.runs').replace('<span>Chưa có lượt</span>','<span>Chờ lượt</span>');write(p,s)
p=r/'scripts/check-t026b-ui.mjs';s=p.read_text(encoding='utf-8').replace("getByText('Chưa có lượt'", "getByText('Chờ lượt'");write(p,s)
p=r/'components/lab/compact-publish.tsx';s=p.read_text(encoding='utf-8').replace("[selected,setSelected]=useState('')", "[selected,setSelected]=useState(()=>new URLSearchParams(location.search).get('product')??'')").replace('>Username<input','>Tên tài khoản<input');write(p,s)
p=r/'lib/lab/result-cards.ts';s=p.read_text(encoding='utf-8');idx=s.index('export const hookRefreshInput=')
s=s[:idx]+"""/** Rank only comparable hooks on the same account/group; never pool unlike audiences. */
export function resultHookRank(records:LabRecord[],plan:LabRecord){
 const group=plan.data.comparison?.sourceGroupId,account=plan.data.accountId;
 if(!group||!plan.data.variantId)return null;
 const peers=records.filter(r=>r.kind==='content_plan'&&r.data.productId===plan.data.productId&&r.data.productionId===plan.data.productionId&&r.data.comparison?.sourceGroupId===group&&r.data.accountId===account);
 const byHook=new Map<string,number>();
 for(const p of peers){const views=latestPostSignals(records,p).views;if(views!==null)byHook.set(p.data.variantId,views);}
 const own=byHook.get(plan.data.variantId);if(own==null)return null;
 return 1+[...byHook.values()].filter(v=>v>own).length;
}
"""+s[idx:];write(p,s)
p=r/'components/lab/compact-results.tsx';s=p.read_text(encoding='utf-8').replace('resultDecision,planHookRefresh','resultDecision,resultHookRank,planHookRefresh');start=s.index('const peers=cardData.filter(');end=s.index('return <article',start);s=s[:start]+'const rank=resultHookRank(records,plan);'+s[end:];s=s.replace('Hạng lượt xem trong cùng sản phẩm','Hạng hook cùng sản phẩm, tài khoản và lượt thử');write(p,s)
print('T-026i source fixes applied')

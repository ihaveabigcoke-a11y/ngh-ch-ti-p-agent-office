from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
p=r/'lib/lab/result-cards.ts';s=p.read_text(encoding='utf-8');a=s.index('/** Rank only');b=s.index('export const hookRefreshInput=',a)
s=s[:a]+'''/** Descriptive rank across the three hooks in one product/comparison group. Not a verdict. */
export function resultHookRank(records:LabRecord[],plan:LabRecord){
 const group=plan.data.comparison?.sourceGroupId;
 if(!group||!plan.data.variantId||latestPostSignals(records,plan).views===null)return null;
 const peers=records.filter(r=>r.kind==='content_plan'&&r.data.productId===plan.data.productId&&r.data.productionId===plan.data.productionId&&r.data.comparison?.sourceGroupId===group);
 const byHook=new Map<string,number[]>();
 for(const p of peers){const views=latestPostSignals(records,p).views;if(views!==null)byHook.set(p.data.variantId,[...(byHook.get(p.data.variantId)??[]),views]);}
 if(byHook.size>3)return null;
 const means=new Map([...byHook].map(([id,values])=>[id,values.reduce((sum,v)=>sum+v,0)/values.length]));
 const own=means.get(plan.data.variantId);if(own==null)return null;
 return 1+[...means.values()].filter(v=>v>own).length;
}
'''+s[b:];p.write_text(s,encoding='utf-8',newline='\n')
p=r/'components/lab/compact-results.tsx';s=p.read_text(encoding='utf-8').replace('Hạng hook cùng sản phẩm, tài khoản và lượt thử','Hạng lượt xem trung bình mỗi bài của ba hook cùng đợt; khác tài khoản, chỉ tham khảo');p.write_text(s,encoding='utf-8',newline='\n')

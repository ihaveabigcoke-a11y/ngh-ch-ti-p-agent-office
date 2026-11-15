from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
def write(p,s):p.write_text(s,encoding='utf-8',newline='\n')
p=r/'lib/lab/publish-board.ts';s=p.read_text(encoding='utf-8').replace('const data={...draft.data,name};','const data:Record<string,any>={...draft.data,name};');write(p,s)
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8').replace('<OperationsPanel view="social" records={records}', '<OperationsPanel onRecords={rows=>{if(demo)putMemory(rows);else setReal(prev=>[...rows,...prev.filter(r=>!rows.some(x=>x.id===r.id))]);}} view="social" records={records}',1);write(p,s)
p=r/'components/lab/compact-publish.tsx';s=p.read_text(encoding='utf-8').replace('new Date(posted).toISOString()',"new Date(posted+':00+07:00').toISOString()");write(p,s)
write(r/'tests/fixtures/publish-board.mjs','''import {emptyProduct} from '../../lib/lab/domain.ts';
import {renderFixture} from './render-plan.mjs';
export function publishFixture(now=Date.now()){
 const f=renderFixture();f.makeHooks();const product={id:'render_product',kind:'product',revision:1,createdAt:now,updatedAt:now,data:{...emptyProduct,name:'Đèn fixture',productKey:'DEN-THU',purchaseUrl:'https://shop.invalid/lamp',price:24,cost:4,shipping:2,ctaKeyword:'GLOW'}};
 const project={id:'render_project',kind:'production',revision:1,createdAt:now,updatedAt:now,data:f.production};
 const variants=project.data.variants.filter(v=>v.comparisonGroupId),assets=[];
 for(const [i,v] of variants.entries()){const plan=project.data.renderPlans.find(p=>p.variantId===v.id),assetId='export_'+i,sha256=String(i+6).repeat(64);project.data.exports.push({id:'export_record_'+i,variantId:v.id,filename:'fixture_'+i+'.mp4',assetId,createdAt:now,renderPlan:plan,sha256,verified:true,kind:'render'});assets.push({id:assetId,kind:'asset',revision:1,createdAt:now,updatedAt:now,data:{name:'fixture_'+i+'.mp4',key:'local-owner/'+assetId+'.mp4',type:'video/mp4',size:100,sha256,metadata:{width:720,height:1280,duration:4,verifiedBy:'container'}}});}
 const accounts=Array.from({length:5},(_,i)=>({id:'account_'+i,kind:'social_account',revision:1,createdAt:now,updatedAt:now,data:{name:'Kênh '+(i+1),handle:'fixture'+i,productId:product.id,contentAngle:'',bio:'',notes:'',archived:false}}));
 return {records:[product,project,...accounts,...assets],product,project,accounts,variants,input:{projectId:project.id,revision:1,sourceGroupId:variants[0].comparisonGroupId,batchId:'distribution_fixture',accountIds:accounts.map(a=>a.id),landingBaseUrl:product.data.purchaseUrl}};
}
''')
p=r/'tests/operations.test.mjs';write(p,p.read_text(encoding='utf-8')+'''
test('T-026g: five accounts get balanced hooks without duplicates; CTA price landing and UTM names remain aligned',async()=>{
 const {publishFixture}=await import('./fixtures/publish-board.mjs');const {planDistribution}=await import('../lib/lab/publish-board.ts');const f=publishFixture(),rows=planDistribution(f.records,f.input);
 assert.equal(rows.length,5);assert.equal(new Set(rows.map(r=>r.data.accountId)).size,5);assert.equal(new Set(rows.map(r=>r.data.variantId)).size,3);
 for(const r of rows){assert.equal(r.data.ctaKeyword,'GLOW');assert.equal(r.data.offerPrice,24);assert.equal(r.data.landingBaseUrl,f.product.data.purchaseUrl);assert.equal(new URL(r.data.utmLink).searchParams.get('utm_content'),r.data.name);assert.equal(new URL(r.data.utmLink).searchParams.get('utm_medium'),'organic');}
 assert.deepEqual(planDistribution([...f.records,...rows],{...f.input,batchId:'retry'}),rows);
 assert.throws(()=>planDistribution(f.records,{...f.input,accountIds:['account_0','account_0']}));
 assert.throws(()=>planDistribution(f.records,{...f.input,revision:99}),/thay đổi/);
 const changed=structuredClone(f.records);changed.find(r=>r.id==='render_project').data.exports[0].verified=false;assert.throws(()=>planDistribution(changed,f.input),/MP4/);
});
''')
write(r/'scripts/check-t026g-ui.mjs','''import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {officeUI} from './office-ui.mjs';
import {publishFixture} from '../tests/fixtures/publish-board.mjs';
const f=publishFixture();
const svg='<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400"><rect width="300" height="400" fill="#354737"/><path d="M100 90h100l35 95H65zM150 185v120m-60 0h120" stroke="#d4ff3a" fill="#d4ff3a" stroke-width="14"/></svg>';
for(const empty of [false,true])await officeUI('T-026g'+(empty?'-empty':''),empty?[]:f.records,async({page,origin,screenshot})=>{
 await page.route('**/api/assets/*?thumbnail=1',r=>r.fulfill({contentType:'image/svg+xml',body:svg}));await page.goto(origin+'/?view=social');await page.locator('[data-screen=publish]').waitFor();
 if(!empty){await page.getByRole('button',{name:'Chia đều',exact:true}).click();await page.waitForFunction(()=>document.querySelectorAll('[data-plan]').length===5);assert.equal(await page.locator('[data-account]').count(),5);assert.ok(await page.locator('[data-plan] img').first().evaluate(i=>i.complete&&i.naturalWidth>0));}
 for(const [width,height] of [[1366,768],[1920,1080]]){await page.setViewportSize({width,height});await screenshot('publish-'+(empty?'empty':'full')+'-'+width);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}
 if(!empty){await page.getByRole('button',{name:'Chia đều',exact:true}).click();await page.waitForTimeout(700);assert.equal(await page.locator('[data-plan]').count(),5);await page.locator('.compact-publish-tray article').nth(1).dragTo(page.locator('[data-account=account_0]'));await page.waitForFunction(()=>document.querySelectorAll('[data-plan]').length===6);
 const card=page.locator('[data-plan]').first();await card.locator('.compact-card-open').click();const d=page.getByRole('dialog');await d.getByLabel('URL bài đăng',{exact:true}).fill('https://www.instagram.com/reel/FIXTURE01/');await d.getByLabel('Đăng lúc · giờ Việt Nam').fill('2026-11-11T12:00');await d.getByRole('button',{name:'Lưu URL'}).click();await d.waitFor({state:'hidden'});const rows=await page.evaluate(async()=> (await(await fetch('/api/lab')).json()).records);const saved=rows.find(r=>r.kind==='content_plan'&&r.data.postUrl);assert.equal(saved.data.status,'published_manual');assert.equal(saved.data.postedAt,'2026-11-11T05:00:00.000Z');assert.match(saved.data.utmLink,/utm_content=/);assert.equal(new Set(rows.filter(r=>r.kind==='content_plan').map(r=>r.data.accountId+':'+r.data.variantId)).size,6);
 }
 return {empty,columns:empty?0:5,balanced:!empty,dragCreatesDraft:!empty,manualUrlSaved:!empty};
});
''')

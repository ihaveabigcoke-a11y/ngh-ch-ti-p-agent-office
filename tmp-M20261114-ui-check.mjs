export async function run({page,out,writeFile}){
 const shots=[];const id='job:f0634edd-0539-465e-b259-eb508e777b85';
 const selector='article[data-run-id="'+id+'"]';
 await page.goto(new URL(page.url()).origin+'/?view=signals');await page.locator(selector).waitFor();
 const summary=await page.evaluate(()=>({headings:document.querySelector('[data-screen="signals"] h1')?.textContent,groups:[...document.querySelectorAll('.compact-groups button')].map(b=>b.innerText),hasDemo:[...document.querySelectorAll('[role="status"]')].some(e=>/mô phỏng/.test(e.textContent))}));
 for(const [width,height] of [[1366,768],[1920,1080]]){
  await page.setViewportSize({width,height});await page.locator(selector).scrollIntoViewIfNeeded();
  await page.screenshot({path:out+'/active-card-'+width+'.png'});shots.push('active-card-'+width+'.png');
  await page.locator(selector+' .compact-card-open').click();
  const modal=page.getByRole('dialog');await modal.waitFor();await page.waitForTimeout(650);
  const text=await modal.innerText();
  if(!text.includes('muse')||!text.includes('Đang tạo')||!text.includes('Mở cảnh'))throw Error('Real job detail missing provider/history/navigation');
  await page.screenshot({path:out+'/active-history-'+width+'.png'});shots.push('active-history-'+width+'.png');
  await page.keyboard.press('Escape');await modal.waitFor({state:'hidden'});
 }
 const result={time:new Date().toISOString(),summary,detailPassed:true,shots};
 await writeFile(out+'/ui-real-check.json',JSON.stringify(result,null,2));return result;
}

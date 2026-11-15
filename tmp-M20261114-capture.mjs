export async function run({page,out,writeFile}){
 const origin=new URL(page.url()).origin;await page.goto(origin+'/?view=signals');await page.locator('[data-screen=signals]').waitFor();
 await page.waitForFunction(()=>document.querySelector('.compact-groups strong')?.textContent!=='—');
 const shotTime=Date.now(),shots=[];
 for(const [width,height] of [[1366,768],[1920,1080]]){await page.setViewportSize({width,height});const name='signals-'+shotTime+'-'+width+'.png';await page.screenshot({path:out+'/'+name,fullPage:true});shots.push(name);}
 const {run}=await import('./tmp-M20261114-poll.mjs');const state=await run({page,out,writeFile});return {shots,state};
}

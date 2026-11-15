export async function run({page}){await page.evaluate(()=>setTimeout(()=>window.close(),300));return {requested:'Normal renderer window.close; no force termination'};}

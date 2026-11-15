from pathlib import Path
r=Path(r'C:\Users\ADMIN\Downloads\Product-Lab-Local\Product-Lab-Local')
p=r/'components/lab/app.tsx';s=p.read_text(encoding='utf-8');old='<div style={visualStatusVariables as React.CSSProperties} className={`lab-shell';new='<div data-compact={["signals","overview","research","products","production","social","results"].includes(view)||undefined} style={visualStatusVariables as React.CSSProperties} className={`lab-shell';assert old in s;s=s.replace(old,new,1);p.write_text(s,encoding='utf-8',newline='\n')
p=r/'components/lab/compact-flow.css';s=p.read_text(encoding='utf-8')+'\n/* Compact screens have their own heading; remove duplicate breadcrumbs/footer. */\n.workbench-shell[data-compact=true] .topbar,.workbench-shell[data-compact=true] .app-footer{display:none}\n';p.write_text(s,encoding='utf-8',newline='\n')
p=r/'scripts/check-t026i-ui.mjs';s=p.read_text(encoding='utf-8').replace('fixedIncludingMenu:words(fixedText)+words(shellText)', 'fixedIncludingMenu:words(visibleText(document.body,true))');p.write_text(s,encoding='utf-8',newline='\n')
# Keep the old desktop acceptance script intact; add the T-026 seven-screen contract.
p=r/'scripts/check-t024b-desktop.mjs';s=p.read_text(encoding='utf-8').replace("outputs/T-024b-desktop-ui", "outputs/T-026-desktop-ui")
a=s.index(' const nav=page.locator(');b=s.index(' assert.equal((await page.evaluate(()=>window.productLabDesktop.status())).musePaused,true);',a)
s=s[:a]+''' assert.match(page.url(),/view=signals/);
 const labels=['Tín hiệu & Phòng chờ','Hôm nay','Săn sản phẩm','Sản phẩm','Video','Đăng','Kết quả','Cài đặt'];
 assert.deepEqual(await page.getByRole('navigation',{name:'Menu chính',exact:true}).getByRole('link').allTextContents(),labels);
 for(const view of ['signals','overview','research','products','production','social','results']){
  await page.goto(origin+'/?view='+view);await page.waitForFunction(()=>document.querySelector('[data-screen]'));await page.evaluate(()=>document.fonts.ready);
  for(const [width,height] of [[1366,768],[1920,1080]]){
   await page.setViewportSize({width,height});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),view+' overflow');
   await page.screenshot({path:join(out,view+'-'+width+'.png'),fullPage:true});screens.push({view,width});
  }
 }
''' +s[b:]
s=s.replace('tablePreferencePersists:true','defaultSignals:true');(r/'scripts/check-t026-desktop.mjs').write_text(s,encoding='utf-8',newline='\n')
print('Removed duplicate chrome; added full-page count and actual launcher QA')

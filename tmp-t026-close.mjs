// Close only the already identified Hermes Electron CDP listener. No page/DB reads.
const response = await fetch('http://127.0.0.1:9335/json/version');
const {webSocketDebuggerUrl} = await response.json();
const ws = new WebSocket(webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{
 const timer=setTimeout(()=>{ws.close();reject(Error('Close timeout'));},10000);
 ws.addEventListener('open',()=>ws.send(JSON.stringify({id:1,method:'Browser.close'})));
 ws.addEventListener('close',()=>{clearTimeout(timer);resolve();});
 ws.addEventListener('error',reject);
});
console.log('Graceful Browser.close delivered');

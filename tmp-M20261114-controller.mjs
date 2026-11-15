import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {writeFile,mkdir} from 'node:fs/promises';
const appRoot='C:/Users/ADMIN/Downloads/Product-Lab-Local/Product-Lab-Local';
const require=createRequire(appRoot+'/package.json');
const {chromium}=require('./desktop/node_modules/playwright');
const browser=await chromium.connectOverCDP('http://127.0.0.1:9237');
const page=browser.contexts().flatMap(c=>c.pages()).find(p=>p.url().startsWith('http://127.0.0.1'));
if(!page)throw Error('Hermes local page not found');
const out=appRoot+'/outputs/M-20261114';
try{
 const {run}=await import(pathToFileURL(resolve(process.argv[2])).href);
 const result=await run({page,browser,out,appRoot,writeFile,mkdir});
 console.log(JSON.stringify(result));
 process.exit(0);
}catch(error){console.error(error.message);process.exit(1);}

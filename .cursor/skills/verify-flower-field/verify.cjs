#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'../../..'),out=path.resolve(process.argv[2]||'/private/tmp/flower-field-verification/latest');
fs.mkdirSync(out,{recursive:true});
const results={checks:[],errors:[],unverified:['Actual hidden-tab pause/resume','Physical-device touch behavior','Human acceptance of visual fidelity'],cleanup:false};
let browser,server;
const allowed={'/':'index.html','/index.html':'index.html','/field.js':'field.js','/field.css':'field.css'};
const state=page=>page.locator('#art').evaluate(c=>({...c.dataset}));
const image=page=>page.locator('#art').evaluate(c=>c.toDataURL());
const settle=page=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
async function progress(page,value){await page.waitForFunction(v=>Math.abs(Number(document.querySelector('#art').dataset.progress)-v)<.00001,value);await settle(page)}
async function knob(page,id,key){await page.locator('#'+id).focus();await page.keyboard.press(key);await settle(page)}
async function check(name,fn){await fn();results.checks.push(name);console.log('PASS '+name)}
(async()=>{try{
 server=http.createServer((req,res)=>{const file=allowed[new URL(req.url,'http://localhost').pathname];if(!file){res.writeHead(404);res.end();return}res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(path.join(root,file)))});
 server.on('error',e=>console.error(e));await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
 browser=await chromium.launch({headless:true});const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce',acceptDownloads:true});const page=await context.newPage();
 page.on('pageerror',e=>results.errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)results.errors.push(r.status()+' '+r.url())});
 const url='http://127.0.0.1:'+server.address().port;await page.goto(url);await progress(page,1);
 await check('Doctor: artwork loaded with 11 fully grown procedural plants',async()=>{assert.equal((await state(page)).plants,'11');assert(JSON.parse((await state(page)).stages).every(x=>x===1))});
 const baseline=await image(page);await page.screenshot({path:path.join(out,'desktop.png')});await page.locator('#art').screenshot({path:path.join(out,'field-full.png')});
 await check('Reduced motion is static',async()=>{await page.waitForTimeout(300);assert.equal(await image(page),baseline)});
 await check('Horizontal wheel introduces plants and develops individual plants',async()=>{
  await knob(page,'growth','Home');await progress(page,0);assert.equal((await state(page)).plants,'0');await page.locator('#field').hover();
  for(let i=1;i<=4;i++){await page.mouse.wheel(350,0);await progress(page,i*.25);await page.locator('#art').screenshot({path:path.join(out,`growth-${i}.png`)});if(i===1){const s=await state(page);assert(Number(s.plants)>0&&Number(s.plants)<11);assert(JSON.parse(s.stages).some(x=>x>0&&x<1))}}
  assert.equal(await image(page),baseline);
 });
 await check('Wheel reversal restores identical geometry without rerandomizing',async()=>{await page.mouse.wheel(-700,0);await progress(page,.5);const halfway=await image(page);await page.mouse.wheel(350,0);await progress(page,.75);await page.mouse.wheel(-350,0);await progress(page,.5);assert.equal(await image(page),halfway);assert.equal((await state(page)).seed,'317')});
 await check('Pointer drag grows and reverses; endpoints clamp',async()=>{const b=await page.locator('#field').boundingBox();await page.mouse.move(b.x+350,b.y+220);await page.mouse.down();await page.mouse.move(b.x+550,b.y+220,{steps:6});await settle(page);assert(Number((await state(page)).progress)>.5);await page.mouse.move(b.x+350,b.y+220,{steps:6});await page.mouse.up();await progress(page,.5);await page.mouse.wheel(99999,0);await progress(page,1);await page.mouse.wheel(-99999,0);await progress(page,0)});
 await check('Keyboard and growth slider remain usable',async()=>{await page.locator('#field').focus();await page.keyboard.press('ArrowRight');await progress(page,.04);await page.keyboard.press('End');await progress(page,1);await knob(page,'growth','Home');await progress(page,0);await knob(page,'growth','End');await progress(page,1)});
 await page.locator('#study summary').click();
 await check('Each geometric control changes rendered artwork; reset reproduces baseline',async()=>{
  for(const id of ['seed','petalCount','openness','petalCurl','petalLength','centerDepth','yaw','pitch']){await knob(page,id,'Home');assert.notEqual(await image(page),baseline,id+' has no visible effect');await page.locator('#reset').click();await settle(page);assert.equal(await image(page),baseline,id+' reset not reproducible')}
 });
 await check('Combined extreme controls render without runtime failure',async()=>{for(const id of ['petalCount','petalLength','centerDepth','yaw','pitch'])await knob(page,id,'End');await knob(page,'petalCurl','Home');await knob(page,'openness','Home');await page.screenshot({path:path.join(out,'extreme.png')});await page.locator('#reset').click();await settle(page)});
 await check('Export contains actual generation parameters and progress',async()=>{const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;await download.saveAs(path.join(out,'parameters.json'));const data=JSON.parse(fs.readFileSync(path.join(out,'parameters.json'),'utf8'));assert.equal(data.parameters.seed,317);assert.equal(data.growth,1);assert.equal(data.parameters.petalCount,11)});
 await page.locator('#study summary').click();
 await check('390px and 320px: six plants, no overflow, full and partial renders',async()=>{for(const w of [390,320]){await page.setViewportSize({width:w,height:800});await settle(page);assert.equal((await state(page)).plants,'6');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:path.join(out,`mobile-${w}.png`)});await knob(page,'growth','Home');await page.locator('#field').hover();await page.mouse.wheel(700,0);await progress(page,.5);await page.screenshot({path:path.join(out,`mobile-${w}-partial.png`)});await knob(page,'growth','End')}});
 await check('Native browser touch swipe changes growth in both directions',async()=>{const touchContext=await browser.newContext({viewport:{width:390,height:800},hasTouch:true,isMobile:true,reducedMotion:'reduce'});try{const touch=await touchContext.newPage();await touch.goto(url);await progress(touch,1);const cdp=await touchContext.newCDPSession(touch);const b=await touch.locator('#field').boundingBox();const swipe=async(from,to)=>{await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:from,y:b.y+220}]});for(let i=1;i<=8;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:from+(to-from)*i/8,y:b.y+220}]})}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await settle(touch)};await swipe(290,90);const reverse=Number((await state(touch)).progress);assert(reverse<1);await swipe(90,290);await progress(touch,1);await touch.screenshot({path:path.join(out,'touch.png')})}finally{await touchContext.close()}});
 await page.setViewportSize({width:1280,height:900});await settle(page);
 await check('Wind advances; zero strength stops it; reduced motion stops it',async()=>{
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(150);const before=await image(page);await page.waitForTimeout(350);assert.notEqual(await image(page),before);
  await page.locator('#study summary').click();await knob(page,'windStrength','Home');const still=await image(page);await page.waitForTimeout(200);assert.equal(await image(page),still);await page.locator('#reset').click();await page.locator('#study summary').click();
  await page.emulateMedia({reducedMotion:'reduce'});await settle(page);const staticImage=await image(page);await page.waitForTimeout(200);assert.equal(await image(page),staticImage);
 });
 await check('Slowest available principal sway cycle and continuation captured',async()=>{await page.locator('#study summary').click();await knob(page,'windRate','Home');await page.locator('#study summary').click();await page.emulateMedia({reducedMotion:'no-preference'});for(let i=0;i<=44;i++){await page.locator('#art').screenshot({path:path.join(out,`wind-${String(i).padStart(2,'0')}.png`)});await page.waitForTimeout(500)}});
 assert.deepEqual(results.errors,[]);results.passed=true;
}catch(e){results.passed=false;results.errors.push(e.stack||String(e));process.exitCode=1;console.error(e)}finally{if(browser)await browser.close();if(server?.listening)await new Promise(r=>server.close(r));results.cleanup=true;fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));console.log('Evidence: '+out)}})();

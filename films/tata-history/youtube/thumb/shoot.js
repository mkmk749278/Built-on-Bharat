const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
for(const n of ['main','b','c','richlist']){await p.goto('file://'+__dirname+'/'+n+'.html');await p.waitForTimeout(400);await p.screenshot({path:__dirname+'/thumb_'+n+'.jpg',type:'jpeg',quality:92});}
await b.close();})();

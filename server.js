import {createServer} from "node:http";
import {readFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";

const root=resolve("public");
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml"};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url??"/","http://localhost");
  const pathname=decodeURIComponent(url.pathname);
  const file=resolve(root,"."+ (pathname==="/"?"/index.html":pathname));
  if(file!==root && !file.startsWith(root+sep)){res.writeHead(403);res.end("Forbidden");return;}
  const body=await readFile(file);
  res.writeHead(200,{"content-type":types[extname(file)]??"application/octet-stream","cache-control":"no-store"});
  res.end(body);
 }catch{res.writeHead(404);res.end("Not found");}
}).listen(4173,"127.0.0.1",()=>console.log("Dialog lab: http://127.0.0.1:4173"));

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const base=process.argv[2], local=JSON.parse(readFileSync('dist/release.json'));
if (!base?.startsWith('https://')) throw new Error('Pass the HTTPS deployment URL');
const read = async path => {
  const response=await fetch(`${base.replace(/\/$/,'')}/${path}`,{cache:'no-store',signal:AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response;
};
const live=await (await read('release.json')).json();
if (live.revision!==local.revision) throw new Error('Live revision differs from the release being deployed');
const files=Object.entries(local.files);
for(let i=0;i<files.length;i+=6) await Promise.all(files.slice(i,i+6).map(async ([file,hash])=>{
  const response=await read(file),type=response.headers.get('content-type')||'';
  if (/\.m?js$/.test(file)&&!type.includes('javascript')) throw new Error(`${file}: incorrect MIME ${type}`);
  if (/\.wasm$/.test(file)&&!type.includes('wasm')) throw new Error(`${file}: incorrect MIME ${type}`);
  const actual=createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
  if(actual!==hash) throw new Error(`${file}: live bytes differ from build`);
}));
const headers=await read('');
if(!/microphone=\(self\)/.test(headers.headers.get('permissions-policy')||'')) throw new Error('Microphone permissions policy is incorrect');
if(!/camera=\(self\)/.test(headers.headers.get('permissions-policy')||'')) throw new Error('Camera permissions policy is incorrect');
console.log(`Verified ${files.length} files, MIME types, permissions and release ${live.revision}`);

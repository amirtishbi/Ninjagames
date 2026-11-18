// Big Head Hunt service worker: the page always comes fresh from the network; sounds and images are kept on the phone.
const V='58ba1fcd96',SFXV='867e0f69',ASSET='bhh-sfx-'+SFXV;
const SFX=['link','sink','wind','click','exposed','flash','good','heartbeat','idswap','lamp','lose','mark','marked','music','smoke','sonar','step','stunned','swallow','win','wrong'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(ASSET).then(c=>c.addAll(SFX.map(n=>'sfx/'+n+'.mp3?v='+SFXV))).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==ASSET).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(u.pathname.includes('/sfx/')||/\/(icon|splash)-[^/]+\.png$/.test(u.pathname)){
    e.respondWith(caches.open(ASSET).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res;}))));return;}
  // page, version and manifest: always the network, never an old copy
  e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.match(r)));});

const CACHE='coach-chatty-shell-v2';
const ROOT=new URL('./',self.location).href;
const FILES=['./','index.html','styles.css','app.js','icon.svg','manifest.json','data/current-workout.json','data/exercise-library.json','data/equipment.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('coach-chatty-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(url.pathname.endsWith('/data/current-workout.json')&&url.search)return;if(event.request.method!=='GET'||!url.href.startsWith(ROOT))return;event.respondWith((async()=>{const cache=await caches.open(CACHE);const key=url.origin+url.pathname;try{const response=await fetch(event.request,{cache:'no-cache'});if(response.ok)await cache.put(key,response.clone());return response}catch{const cached=await cache.match(key);return cached||(event.request.mode==='navigate'?await cache.match(ROOT):null)||Response.error()}})())});

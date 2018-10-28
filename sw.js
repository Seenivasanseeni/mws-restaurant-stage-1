self.cacheName='cache-v1';

self.addEventListener('activate',function(event){
    console.log("sw: Activation of service worker")
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(
                keys.map(key=>{
                    if(key!=self.cacheName){
                        return caches.delete(key);
                    }
                })
            )
        })
    )
})

self.addEventListener('install',function(event){
    console.log("sw: install sw");
})


self.addEventListener('fetch',function(event){
    console.log("sw: Fetch event for url:",event.request.url);
    event.respondWith(
        caches.open(self.cacheName).then(cache=>{
            return cache.match(event.request).then(reponse=>{
                if(reponse){ 
                    console.log("sw: Available in cache for ",event.request.url);
                    return reponse;
                }
                console.log("sw: Fetching from network for ",event.request.url);
                return fetch(event.request).then(networkResponse=>{
                        cache.put(event.request,networkResponse.clone());
                        return networkResponse;
                }).catch(networkResponse=>{
                    console.log("sw: for url ",event.request.url,"netwrork error popped",networkResponse);
                    return "Network Error:"+networkResponse;
                })
            })
        })
    )
})

self.cacheName='cache-v1';

self.addEventListener('activate',function(event){
    console.log("sw: Activation of wervice worker")
    event.waitUntill(
        caches.keys().then(function(keys){
            return Promise.all(
                keys.map(key=>{
                    console.log(key);    
                    if(key!=self.cacheName){
                        return caches.delete(key);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch',function(event){
    console.log("sw: Fetch event for url:",event.request.url);
})

self.addEventListener('install',function(event){
    console.log("sw: install sw")
})

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

self.addEventListener('fetch',function(event){
    console.log("sw: Fetch event for url:",event.request.url);
})

self.addEventListener('install',function(event){
    console.log("sw: install sw");
    event.waitUntil(
        caches.open(self.cacheName).then(function(cache){
            return cache.addAll([
                '/index.html',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js'
            ])
        })
    )
})

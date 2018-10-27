self.addEventListener('fetch',function(event){
    console.log("Fetch event for url:",event.request.url);
    caches.open("cache-v1").then(function(cache){
            //use match function 
            cache.match(event.request).then(function(response){
                if(response){
                    console.log("Response was found in cache.");
                    return response;
                }
                console.log("Fetching Resource from Network");
                fetch(event.request).then(function(networkResponse){
                    cache.put(event.request,networkResponse);
                    return networkResponse;
                }).catch(function(){
                    console.log("Error in fetching the resource");
                })
            })
    }).catch(function(){
        console.log("Error in handling caches");
    })
})

self.addEventListener('install',function(event){
    console.log("install sw")
})
self.addEventListener('activate',function(event){
    console.log("Activation of sw")
})
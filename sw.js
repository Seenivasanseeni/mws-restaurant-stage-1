self.addEventListener('fetch',function(event){
    console.log("Fetch event for url:",event.request.url);
})
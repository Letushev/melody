self.addEventListener('fetch', e => {
  if (e.request.referrer.includes('/melody/')) {
    console.log('Trying to fetch ' + e.request.referrer);
    e.respondWith(
      fetch(e.request)
        .then(response => {
          return caches.open('melody-requests')
            .then((cache) => {
              console.log('Caching ' + e.request.referrer);
              cache.put(e.request.referrer, response.clone());
              return response;
            });
        })
        .catch(() => {
          console.log('Getting from cache ' + e.request.referrer);
          return caches.match(e.request.referrer).then(r => {
            return r;
          });
        })
    );
  }
});

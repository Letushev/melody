self.addEventListener('fetch', e => {
  if (e.request.url == "http://localhost:4000/" && e.request.referrer.includes('/melody/')) {
    console.log('Спроба завантажити:  ' + e.request.referrer);
    e.respondWith(
      fetch(e.request)
        .then(response => {
          return caches.open('melody-requests')
            .then((cache) => {
              console.log('Кешування: ' + e.request.referrer);
              cache.put(e.request.referrer, response.clone());
              return response;
            });
        })
        .catch(() => {
          console.log('Отримання із кешу: ' + e.request.referrer);
          return caches.match(e.request.referrer).then(r => {
            return r;
          });
        })
    );
  }
});

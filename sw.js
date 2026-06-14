// sw.js
self.addEventListener('fetch', (event) => {
    // Solo interceptamos peticiones que van a los servidores de video
    if (event.request.url.includes('cvattv.com.ar')) {
        event.respondWith(
            fetch(event.request, {
                headers: {
                    ...event.request.headers,
                    'Origin': 'https://portal.app.flow.com.ar',
                    'Referer': 'https://portal.app.flow.com.ar/'
                },
                mode: 'cors'
            })
        );
    }
});

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VideoPlayer VJS</title>
    <link href="https://vjs.zencdn.net/8.10.0/video-js.css" rel="stylesheet" />
    <link href="https://unpkg.com/@videojs/themes@1.0.1/dist/city/index.css" rel="stylesheet">
    <link href="https://unpkg.com/videojs-quality-selector@1.1.0/dist/videojs-quality-selector.css" rel="stylesheet">
    
    <style>
        body { margin: 0; padding: 0; background-color: #000; }
        .video-js { width: 100vw; height: 100vh; }
    </style>
</head>
<body>

    <video-js id="my-video" class="video-js vjs-theme-city" controls preload="auto">
        <source src="TU_URL_DEL_MANIFEST.mpd" type="application/dash+xml">
    </video-js>

    <script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>
    <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
    <script src="https://unpkg.com/videojs-contrib-dash@latest/dist/videojs-dash.min.js"></script>
    <script src="https://unpkg.com/videojs-chromecast@1.2.0/dist/videojs-chromecast.min.js"></script>
    <script src="https://unpkg.com/videojs-quality-selector@1.1.0/dist/videojs-quality-selector.min.js"></script>

    <script>
        var player = videojs('my-video', {
            techOrder: ['chromecast', 'html5'],
            chromecast: {
                appId: 'YOUR_CHROMECAST_APP_ID' // Opcional
            },
            plugins: {
                dash: {
                    // Configuración de ClearKey
                    protection: {
                        keySystems: {
                            'org.w3.clearkey': {
                                getLicense: (emeOptions, callback) => {
                                    // Aquí debes colocar tu KeyID y Key en formato JSON
                                    const keys = {
                                        "TU_KEY_ID_EN_BASE64": "TU_KEY_EN_BASE64"
                                    };
                                    callback(null, {
                                        "keys": Object.keys(keys).map(kid => ({
                                            "kty": "oct",
                                            "kid": kid,
                                            "k": keys[kid]
                                        })),
                                        "type": "temporary"
                                    });
                                }
                            }
                        }
                    }
                }
            }
        });

        // Habilitar selector de calidad
        player.qualitySelector();

        // Manejo de errores
        player.on('error', function() {
            console.error('Error en el reproductor:', player.error());
        });
    </script>
</body>
</html>

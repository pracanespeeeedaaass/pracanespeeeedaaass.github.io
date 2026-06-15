// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send('URL requerida');
    try {
        const response = await axios({
            method: 'get',
            url: targetUrl,
            headers: {
                'Referer': 'https://portal.app.flow.com.ar/',
                'Origin': 'https://portal.app.flow.com.ar',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'stream'
        });
        response.data.pipe(res);
    } catch (e) {
        res.status(500).send('Error en el Proxy');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy activo en puerto ${PORT}`));

const http = require('http');
const url = require('url'); // Importa o módulo para manipular URLs

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log('📩 Webhook recebido:', body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Webhook recebido com sucesso!' }));
        });

    } else if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true); // Faz o parsing da URL
        const email = parsedUrl.query.email; // Captura o parâmetro "email"
        const id = parsedUrl.query.id; // Captura o parâmetro "id"

        console.log(`🔍 Parâmetros recebidos: email=${email}, id=${id}`);

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        console.log('📩 Webhook recebido:', body);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            message: 'Webhook recebido com sucesso!',
            email: email || 'Não informado',
            id: id || 'Não informado'
        }));

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint não encontrado' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

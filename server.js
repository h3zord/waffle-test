const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';

        // Captura os dados recebidos
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log('📩 Webhook recebido:', body);
            
            // Retorna uma resposta para confirmar o recebimento
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Webhook recebido com sucesso!' }));
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint não encontrado' }));
    }
});

// O servidor será executado na porta 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

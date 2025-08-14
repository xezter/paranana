const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    const ext = path.extname(req.url);
    
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    if (MIME_TYPES[ext]) {
        fs.readFile(path.join(__dirname, req.url), (err, data) => {
            if (err) {
                console.error(`Error reading file: ${req.url}`, err);
                res.writeHead(404);
                res.end(`File not found`);
                return;
            }
            res.writeHead(200, { 
                'Content-Type': MIME_TYPES[ext],
                'Cache-Control': 'max-age=86400' // 24 hour cache
            });
            res.end(data);
        });
        return;
    }

    // Serve index.html by default
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            console.error('Error loading index.html:', err);
            res.writeHead(500);
            res.end('Internal Server Error');
            return;
        }
        res.writeHead(200, { 
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache' // Don't cache the main page
        });
        res.end(data);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('Server error:', err);
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    }
});

// Handle process termination
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server terminated');
        process.exit(0);
    });
});
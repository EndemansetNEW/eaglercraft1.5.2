// classes_server.js
// A class-based HTTP server implementation in Node.js

const http = require('http');

class Server {
    /**
     * @param {number} port - The port number to listen on
     * @param {function} requestHandler - Function to handle incoming requests
     */
    constructor(port = 3000, requestHandler = null) {
        if (typeof port !== 'number' || port <= 0 || port > 65535) {
            throw new Error('Invalid port number.');
        }
        this.port = port;
        this.requestHandler = requestHandler || this.defaultHandler;
        this.server = http.createServer(this.requestHandler);
    }

    // Default request handler
    defaultHandler(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello from class-based server!' }));
    }

    // Start the server
    start() {
        this.server.listen(this.port, () => {
            console.log(`✅ Server is running on http://localhost:${this.port}`);
        });

        // Handle server errors
        this.server.on('error', (err) => {
            console.error('❌ Server error:', err.message);
        });
    }

    // Stop the server
    stop() {
        this.server.close(() => {
            console.log('🛑 Server stopped.');
        });
    }
}

module.exports = Server;

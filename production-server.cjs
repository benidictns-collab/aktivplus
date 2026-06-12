const { createServer } = require('http');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Set NODE_ENV
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = '0.0.0.0';

// Ensure DATABASE_URL is set with absolute path
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:./')) {
  const absoluteDbPath = path.join(process.cwd(), 'db', 'custom.db');
  process.env.DATABASE_URL = `file:${absoluteDbPath}`;
  console.log('[server] DATABASE_URL set to:', process.env.DATABASE_URL);
}

console.log('[server] Starting Актив Плюс...');
console.log('[server] Port:', port, 'Hostname:', hostname, 'PID:', process.pid);
console.log('[server] Node:', process.version, 'ENV:', process.env.NODE_ENV);

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('[server] Next.js prepared');

  const server = createServer(async (req, res) => {
    // Health check
    if (req.url === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString(), service: 'aktivplus' }));
      return;
    }

    try {
      await handle(req, res);
    } catch (err) {
      console.error('[server] Error:', err.message);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  });

  server.listen(port, hostname, () => {
    console.log('[server] ✅ Ready on http://' + hostname + ':' + port);
  });

  server.on('error', (err) => {
    console.error('[server] Server error:', err);
    process.exit(1);
  });

  server.timeout = 300000;
  server.keepAliveTimeout = 120000;
  server.headersTimeout = 121000;

}).catch((err) => {
  console.error('[server] Prepare error:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('uncaughtException', (err) => {
  console.error('[server] Uncaught:', err.message, err.stack?.slice(0, 500));
});

process.on('unhandledRejection', (err) => {
  console.error('[server] Unhandled rejection:', err);
});

process.on('SIGTERM', () => {
  console.log('[server] SIGTERM received, shutting down...');
  process.exit(0);
});
process.on('SIGINT', () => {
  console.log('[server] SIGINT received, shutting down...');
  process.exit(0);
});
process.on('exit', (code) => {
  console.log('[server] Process exiting with code:', code);
});

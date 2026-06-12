const { createServer } = require('http');
const next = require('next');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Ensure DATABASE_URL is set with absolute path
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:./')) {
  const absoluteDbPath = path.join(process.cwd(), 'db', 'custom.db');
  process.env.DATABASE_URL = `file:${absoluteDbPath}`;
  console.log('[server] DATABASE_URL set to:', process.env.DATABASE_URL);
}

console.log('[server] Starting Актив Плюс production server...');
console.log('[server] Port:', port, 'Hostname:', hostname, 'PID:', process.pid);
console.log('[server] Node:', process.version, 'ENV:', process.env.NODE_ENV);
console.log('[server] CWD:', process.cwd());

// ============================================================
// CRITICAL: Start the HTTP server IMMEDIATELY
// Timeweb Cloud health check will kill the container if the
// server doesn't start listening within ~30 seconds.
// Database setup is done AFTER the server is listening.
// ============================================================

let dbReady = false;

// Prepare Next.js FIRST, then start listening, THEN do DB setup
console.log('[server] Preparing Next.js...');
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('[server] Next.js prepared successfully');

  const server = createServer(async (req, res) => {
    // Health check endpoint - always available, even before DB is ready
    if (req.url === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'ok',
        db: dbReady ? 'ready' : 'initializing',
        timestamp: new Date().toISOString()
      }));
      return;
    }

    try {
      await handle(req, res);
    } catch (err) {
      console.error('[server] Request error:', err.message);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }
  });

  // Start listening IMMEDIATELY - before any DB setup
  server.listen(port, hostname, () => {
    console.log('[server] ✅ Ready on http://' + hostname + ':' + port);
    console.log('[server] Health check: http://' + hostname + ':' + port + '/api/health');

    // Now do database setup in the background
    setupDatabase();
  });

  server.on('error', (err) => {
    console.error('[server] Server error:', err);
    process.exit(1);
  });

  server.timeout = 120000;
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

}).catch((err) => {
  console.error('[server] Next.js prepare error:', err);
  process.exit(1);
});

// ============================================================
// Database setup - runs AFTER the server is already listening
// ============================================================
function setupDatabase() {
  try {
    // Ensure database directory exists
    const dbDir = path.join(process.cwd(), 'db');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log('[db] Created db directory');
    }

    // Check if database exists
    const dbPath = path.join(process.cwd(), 'db', 'custom.db');
    const dbExists = fs.existsSync(dbPath);
    console.log('[db] Database file exists:', dbExists);

    if (!dbExists) {
      console.log('[db] Database not found, running prisma db push...');
      try {
        execSync('npx prisma db push --accept-data-loss', {
          stdio: 'pipe',
          cwd: process.cwd(),
          timeout: 60000,
        });
        console.log('[db] Database created successfully');

        // Seed the database
        console.log('[db] Running database seed...');
        runDirectSeed();
      } catch (err) {
        console.error('[db] Database setup failed:', err.message);
        console.error('[db] The server is running but the database may not be initialized');
      }
    } else {
      console.log('[db] Database found, syncing schema...');
      try {
        execSync('npx prisma db push --accept-data-loss', {
          stdio: 'pipe',
          cwd: process.cwd(),
          timeout: 30000,
        });
        console.log('[db] Schema synced');
      } catch (err) {
        console.log('[db] Schema sync failed, continuing with existing schema...');
      }
    }

    dbReady = true;
    console.log('[db] ✅ Database initialization complete');
  } catch (err) {
    console.error('[db] Unexpected error during database setup:', err.message);
    // Don't exit - server is already running
  }
}

function runDirectSeed() {
  const seedCode = `
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({ where: { email: 'admin@aktivplus-agency.ru' } });
  if (existingAdmin) { console.log('Admin exists, skip seed'); return; }

  const adminPw = await bcrypt.hash('24345678Fe', 12);
  await prisma.user.create({ data: { name: 'Администратор', email: 'admin@aktivplus-agency.ru', password: adminPw, role: 'admin' } });
  console.log('Admin created');

  const managerPw = await bcrypt.hash('manager123456', 12);
  await prisma.user.create({ data: { name: 'Менеджер', email: 'manager@aktivplus-agency.ru', password: managerPw, role: 'manager' } });
  console.log('Manager created');

  const manager = await prisma.user.findFirst({ where: { role: 'manager' } });

  const properties = [
    { title: 'Люкс-квартира в центре Ростова', description: 'Роскошная квартира с панорамным видом на Дон', price: '12500000', area: '120', rooms: '3', district: 'Центр', type: 'Квартира', dealType: 'sale', status: 'Продажа', images: '[]', address: 'ул. Большая Садовая, 100', managerId: manager.id },
    { title: 'Современная студия на Западном', description: 'Стильная студия с европейской отделкой', price: '4500000', area: '45', rooms: '1', district: 'Западный', type: 'Квартира', dealType: 'sale', status: 'Продажа', images: '[]', address: 'ул. Доватора, 50', managerId: manager.id },
    { title: 'Коттедж в Пригородном', description: 'Просторный коттедж с участком 15 соток', price: '28000000', area: '350', rooms: '6', district: 'Пригородный', type: 'Дом', dealType: 'sale', status: 'Продажа', images: '[]', address: 'Посёлок Пригородный, ул. Лесная, 5', managerId: manager.id },
    { title: 'Офисное помещение на Ворошиловском', description: 'Помещение свободного назначения', price: '85000', area: '200', rooms: '5', district: 'Ворошиловский', type: 'Офис', dealType: 'rent', status: 'Аренда', images: '[]', address: 'пр. Ворошиловский, 60', managerId: manager.id },
    { title: 'Двухкомнатная квартира в Советском районе', description: 'Уютная квартира после ремонта', price: '6800000', area: '72', rooms: '2', district: 'Советский', type: 'Квартира', dealType: 'sale', status: 'Продажа', images: '[]', address: 'ул. Социалистическая, 180', managerId: manager.id },
    { title: 'Аренда квартиры на Левенцовке', description: 'Светлая квартира с новой мебелью', price: '35000', area: '65', rooms: '2', district: 'Левенцовка', type: 'Квартира', dealType: 'rent', status: 'Аренда', images: '[]', address: 'ул. Левенцовская, 25', managerId: manager.id },
  ];

  for (const p of properties) {
    await prisma.property.create({ data: p });
  }
  console.log('Properties seeded');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
`;
  const seedPath = path.join(process.cwd(), 'prisma', 'seed-runtime.cjs');
  fs.writeFileSync(seedPath, seedCode);
  try {
    execSync('node prisma/seed-runtime.cjs', { stdio: 'inherit', cwd: process.cwd(), timeout: 30000 });
    console.log('[db] Seed completed');
  } catch (e) {
    console.error('[db] Seed failed:', e.message);
  }
  try { fs.unlinkSync(seedPath); } catch (e) {}
}

// Process event handlers
process.on('uncaughtException', (err) => {
  console.error('[server] Uncaught exception:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.error('[server] Unhandled rejection:', err);
});

process.on('SIGTERM', () => {
  console.log('[server] SIGTERM, shutting down');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[server] SIGINT, shutting down');
  process.exit(0);
});

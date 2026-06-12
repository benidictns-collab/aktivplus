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

// Ensure database directory exists
const dbDir = path.join(process.cwd(), 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('[server] Created db directory');
}

// Ensure database exists on first run
const dbPath = path.join(process.cwd(), 'db', 'custom.db');
const dbExists = fs.existsSync(dbPath);
console.log('[server] Database file exists:', dbExists);

if (!dbExists) {
  console.log('[server] Database not found, running prisma db push...');
  try {
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'inherit',
      cwd: process.cwd(),
      timeout: 60000,
    });
    console.log('[server] Database created successfully');

    // Seed the database using built-in seed (tsx may not be available in production)
    console.log('[server] Running database seed...');
    runDirectSeed();
  } catch (err) {
    console.error('[server] Database setup failed:', err.message);
  }
} else {
  console.log('[server] Database found, checking migrations...');
  try {
    execSync('npx prisma migrate deploy', {
      stdio: 'pipe',
      cwd: process.cwd(),
      timeout: 30000,
    });
    console.log('[server] Migrations applied');
  } catch (err) {
    try {
      execSync('npx prisma db push --accept-data-loss', {
        stdio: 'pipe',
        cwd: process.cwd(),
        timeout: 30000,
      });
      console.log('[server] Database schema synced');
    } catch (pushErr) {
      console.log('[server] Could not sync schema, continuing...');
    }
  }
}

function runDirectSeed() {
  const seedCode = `
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findFirst({ where: { email: 'admin@aktivplus-agency.ru' } });
  if (existingAdmin) { console.log('Admin exists, skip'); return; }

  const adminPw = await bcrypt.hash('24345678Fe', 12);
  await prisma.user.create({ data: { name: 'Администратор', email: 'admin@aktivplus-agency.ru', password: adminPw, role: 'admin' } });
  console.log('Admin created');

  const managerPw = await bcrypt.hash('manager123456', 12);
  await prisma.user.create({ data: { name: 'Менеджер', email: 'manager@aktivplus-agency.ru', password: managerPw, role: 'manager' } });
  console.log('Manager created');

  const properties = [
    { title: 'Люкс-квартира в центре Ростова', description: 'Роскошная квартира с панорамным видом на Дон', price: '12500000', area: '120', rooms: '3', district: 'Центр', type: 'Квартира', dealType: 'sale', status: 'Продажа', images: '[]', address: 'ул. Большая Садовая, 100', managerId: (await prisma.user.findFirst({ where: { role: 'manager' } })).id },
    { title: 'Современная студия на Западном', description: 'Стильная студия с европейской отделкой', price: '4500000', area: '45', rooms: '1', district: 'Западный', type: 'Квартира', dealType: 'sale', status: 'Продажа', images: '[]', address: 'ул. Доватора, 50', managerId: (await prisma.user.findFirst({ where: { role: 'manager' } })).id },
    { title: 'Коттедж в Пригородном', description: 'Просторный коттедж с участком 15 соток', price: '28000000', area: '350', rooms: '6', district: 'Пригородный', type: 'Дом', dealType: 'sale', status: 'Продажа', images: '[]', address: 'Посёлок Пригородный, ул. Лесная, 5', managerId: (await prisma.user.findFirst({ where: { role: 'manager' } })).id },
    { title: 'Офисное помещение на Ворошиловском', description: 'Помещение свободного назначения', price: '85000', area: '200', rooms: '5', district: 'Ворошиловский', type: 'Офис', dealType: 'rent', status: 'Аренда', images: '[]', address: 'пр. Ворошиловский, 60', managerId: (await prisma.user.findFirst({ where: { role: 'manager' } })).id },
    { title: 'Двухкомнатная квартира в Советском районе', description: 'Уютная квартира после ремонта', price: '6800000', area: '72', rooms: '2', district: 'Советский', type: 'Квартира', dealType: 'sale', status: 'Продажа', images: '[]', address: 'ул. Социалистическая, 180', managerId: (await prisma.user.findFirst({ where: { role: 'manager' } })).id },
    { title: 'Аренда квартиры на Левенцовке', description: 'Светлая квартира с новой мебелью', price: '35000', area: '65', rooms: '2', district: 'Левенцовка', type: 'Квартира', dealType: 'rent', status: 'Аренда', images: '[]', address: 'ул. Левенцовская, 25', managerId: (await prisma.user.findFirst({ where: { role: 'manager' } })).id },
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
    console.log('[server] Direct seed completed');
  } catch (e) {
    console.error('[server] Direct seed failed:', e.message);
  }
  try { fs.unlinkSync(seedPath); } catch (e) {}
}

// Start Next.js
console.log('[server] Preparing Next.js...');
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('[server] Next.js prepared successfully');

  const server = createServer(async (req, res) => {
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

  server.listen(port, hostname, () => {
    console.log('[server] ✅ Ready on http://' + hostname + ':' + port);
  });

  server.on('error', (err) => {
    console.error('[server] Server error:', err);
    process.exit(1);
  });

  server.timeout = 120000;
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;
}).catch((err) => {
  console.error('[server] Prepare error:', err);
  process.exit(1);
});

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

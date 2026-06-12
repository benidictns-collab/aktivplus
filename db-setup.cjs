const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set NODE_ENV
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Ensure DATABASE_URL is set with absolute path
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:./')) {
  const absoluteDbPath = path.join(process.cwd(), 'db', 'custom.db');
  process.env.DATABASE_URL = `file:${absoluteDbPath}`;
}

console.log('[setup] Initializing database...');
console.log('[setup] CWD:', process.cwd());
console.log('[setup] DATABASE_URL:', process.env.DATABASE_URL);

// Ensure database directory exists
const dbDir = path.join(process.cwd(), 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('[setup] Created db directory');
}

// Check if database exists
const dbPath = path.join(process.cwd(), 'db', 'custom.db');
const dbExists = fs.existsSync(dbPath);
console.log('[setup] Database file exists:', dbExists);

if (!dbExists) {
  console.log('[setup] Running prisma db push...');
  try {
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'inherit',
      cwd: process.cwd(),
      timeout: 60000,
    });
    console.log('[setup] Database created');

    // Seed the database
    console.log('[setup] Running seed...');
    runDirectSeed();
  } catch (err) {
    console.error('[setup] Database setup failed:', err.message);
    console.error('[setup] Continuing anyway - API routes may fail until DB is ready');
  }
} else {
  console.log('[setup] Database found, syncing schema...');
  try {
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'pipe',
      cwd: process.cwd(),
      timeout: 30000,
    });
    console.log('[setup] Schema synced');
  } catch (err) {
    console.log('[setup] Schema sync skipped');
  }
}

console.log('[setup] ✅ Database initialization complete');

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
    console.log('[setup] Seed completed');
  } catch (e) {
    console.error('[setup] Seed failed:', e.message);
  }
  try { fs.unlinkSync(seedPath); } catch (e) {}
}

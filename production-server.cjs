const { createServer } = require('http');
const { execSync } = require('child_process');
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

// Initialize database before starting Next.js
function initDatabase() {
  try {
    // Ensure database directory exists
    const dbDir = path.join(process.cwd(), 'db');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log('[server] Created db directory');
    }

    // Always push schema (creates DB if not exists, syncs if exists)
    console.log('[server] Syncing database schema...');
    execSync('npx prisma db push --accept-data-loss', {
      stdio: 'pipe',
      cwd: process.cwd(),
      timeout: 30000,
    });
    console.log('[server] Schema synced');

    // Seed if no users exist
    const { PrismaClient } = require('@prisma/client');
    const bcrypt = require('bcryptjs');
    const prisma = new PrismaClient();

    const adminCount = prisma.user ? prisma.user.count() : Promise.resolve(1);
    // Use async IIFE for seeding check
    return (async () => {
      try {
        const count = await prisma.user.count();
        if (count === 0) {
          console.log('[server] Seeding database...');
          const adminPw = await bcrypt.hash('24345678Fe', 12);
          await prisma.user.create({
            data: {
              name: 'Администратор',
              email: 'admin@aktivplus-agency.ru',
              phone: '+7 (900) 120-13-15',
              password: adminPw,
              role: 'admin',
            },
          });
          console.log('[server] Admin created');

          const managerPw = await bcrypt.hash('manager123456', 12);
          const manager = await prisma.user.create({
            data: {
              name: 'Менеджер',
              email: 'manager@aktivplus-agency.ru',
              password: managerPw,
              role: 'manager',
            },
          });
          console.log('[server] Manager created');

          // Seed properties
          const properties = [
            { title: 'Пентхаус на Набережной', price: '45 000 000 ₽', area: '180 м²', rooms: '4 комнаты', district: 'Ворошиловский', type: 'Квартира', dealType: 'sale', status: 'Продажа', description: 'Роскошный пентхаус с панорамным видом на реку Дон. Авторский дизайн, терраса с видом на набережную.', images: '["/images/sale-1.jpg","/images/buy-1.jpg","/images/interior-1.jpg"]', address: 'ул. Набережная, 45', floor: '25/25', parking: '2 машиноместа', renovation: 'Авторский', balcony: '3 лоджии', year: '2022', managerId: manager.id },
            { title: 'Коттедж в Западном', price: '65 000 000 ₽', area: '350 м²', rooms: '6 комнат', district: 'Западный', type: 'Дом', dealType: 'sale', status: 'Продажа', description: 'Элитный коттедж в закрытом посёлке. Бассейн, сауна, гараж на 3 авто.', images: '["/images/buy-1.jpg","/images/sale-1.jpg","/images/interior-1.jpg"]', address: 'Западный жилой массив, ул. Солнечная, 12', floor: '3 этажа', parking: 'Гараж на 3 авто', renovation: 'Под ключ', balcony: '2 террасы', year: '2021', managerId: manager.id },
            { title: 'Апартаменты в Центре', price: '28 000 000 ₽', area: '120 м²', rooms: '3 комнаты', district: 'Кировский', type: 'Квартира', dealType: 'sale', status: 'Продажа', description: 'Стильные апартаменты в историческом центре города. Высокие потолки, кирпичные стены.', images: '["/images/interior-1.jpg","/images/sale-1.jpg","/images/buy-1.jpg"]', address: 'ул. Большая Садовая, 78', floor: '8/12', parking: 'Подземный паркинг', renovation: 'Дизайнерский', balcony: 'Лоджия 8м²', year: '2020', managerId: manager.id },
            { title: 'Вилла на Левом берегу', price: '85 000 000 ₽', area: '420 м²', rooms: '7 комнат', district: 'Левенцовка', type: 'Дом', dealType: 'sale', status: 'Продажа', description: 'Эксклюзивная вилла с видом на реку. Винный погреб, кинозал, спа-зона.', images: '["/images/luxury-1.jpg","/images/sale-1.jpg","/images/buy-1.jpg"]', address: 'Левенцовка, ул. Речная, 5', floor: '3 этажа + цоколь', parking: 'Гараж на 4 авто', renovation: 'Премиум', balcony: 'Патио + 2 террасы', year: '2023', managerId: manager.id },
            { title: 'Таунхаус в Суворовском', price: '32 000 000 ₽', area: '200 м²', rooms: '4 комнаты', district: 'Суворовский', type: 'Таунхаус', dealType: 'sale', status: 'Продажа', description: 'Современный таунхаус в новом жилом комплексе. Свой сад, терраса для барбекю.', images: '["/images/apartment-1.jpg","/images/buy-1.jpg","/images/sale-1.jpg"]', address: 'Суворовский, ул. Парковая, 23', floor: '3 этажа', parking: 'Гараж на 2 авто', renovation: 'Чистовая отделка', balcony: '2 балкона + терраса', year: '2023', managerId: manager.id },
            { title: 'Студия с панорамным видом', price: '12 500 000 ₽', area: '65 м²', rooms: 'Студия', district: 'Советский', type: 'Квартира', dealType: 'sale', status: 'Продажа', description: 'Стильная студия в новом ЖК бизнес-класса. Панорамное остекление с видом на город.', images: '["/images/house-1.jpg","/images/interior-1.jpg","/images/sale-1.jpg"]', address: 'ул. Социалистическая, 112', floor: '18/24', parking: '1 машиноместо', renovation: 'White Box', balcony: 'Французский балкон', year: '2024', managerId: manager.id },
          ];

          for (const p of properties) {
            await prisma.property.create({ data: p });
          }
          console.log('[server] Properties seeded');
        } else {
          console.log('[server] Database has', count, 'users, skipping seed');
        }
      } catch (err) {
        console.error('[server] Seed error:', err.message);
      } finally {
        await prisma.$disconnect();
      }
    })();
  } catch (err) {
    console.error('[server] Database init error:', err.message);
    console.error('[server] Continuing startup - DB may be initialized later');
    return Promise.resolve();
  }
}

// Start server after database initialization
initDatabase().then(() => {
  console.log('[server] Database ready, starting Next.js...');

  const app = next({ dev: false, hostname, port });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    console.log('[server] Next.js prepared');

    const server = createServer(async (req, res) => {
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
}).catch((err) => {
  console.error('[server] Init error:', err);
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

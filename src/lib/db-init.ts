import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

let initialized = false;

export async function initDatabase() {
  if (initialized) return;

  // Ensure DATABASE_URL is set with absolute path
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:./')) {
    const absoluteDbPath = path.join(process.cwd(), 'db', 'custom.db');
    process.env.DATABASE_URL = `file:${absoluteDbPath}`;
    console.log('[db-init] DATABASE_URL set to:', process.env.DATABASE_URL);
  }

  // Ensure database directory exists
  const dbDir = path.join(process.cwd(), 'db');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('[db-init] Created db directory');
  }

  // Check if database exists
  const dbPath = path.join(process.cwd(), 'db', 'custom.db');
  const dbExists = fs.existsSync(dbPath);
  console.log('[db-init] Database file exists:', dbExists);

  if (!dbExists) {
    console.log('[db-init] Running prisma db push...');
    try {
      execSync('npx prisma db push --accept-data-loss', {
        stdio: 'pipe',
        cwd: process.cwd(),
        timeout: 60000,
      });
      console.log('[db-init] Database created');

      // Seed the database
      await seedDatabase();
    } catch (err: unknown) {
      console.error('[db-init] Database setup failed:', (err as Error).message);
    }
  } else {
    console.log('[db-init] Database found, syncing schema...');
    try {
      execSync('npx prisma db push --accept-data-loss', {
        stdio: 'pipe',
        cwd: process.cwd(),
        timeout: 30000,
      });
      console.log('[db-init] Schema synced');
    } catch (err) {
      console.log('[db-init] Schema sync skipped');
    }
  }

  initialized = true;
  console.log('[db-init] ✅ Database initialization complete');
}

async function seedDatabase() {
  const prisma = new PrismaClient();

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { email: 'admin@aktivplus-agency.ru' },
    });

    if (existingAdmin) {
      console.log('[db-init] Admin exists, skip seed');
      return;
    }

    // Create admin
    const adminPw = await bcrypt.hash('24345678Fe', 12);
    await prisma.user.create({
      data: {
        name: 'Администратор',
        email: 'admin@aktivplus-agency.ru',
        password: adminPw,
        role: 'admin',
      },
    });
    console.log('[db-init] Admin created');

    // Create manager
    const managerPw = await bcrypt.hash('manager123456', 12);
    await prisma.user.create({
      data: {
        name: 'Менеджер',
        email: 'manager@aktivplus-agency.ru',
        password: managerPw,
        role: 'manager',
      },
    });
    console.log('[db-init] Manager created');

    // Get manager for property relations
    const manager = await prisma.user.findFirst({ where: { role: 'manager' } });

    if (!manager) {
      console.error('[db-init] Manager not found, cannot seed properties');
      return;
    }

    // Create properties
    const properties = [
      {
        title: 'Люкс-квартира в центре Ростова',
        description: 'Роскошная квартира с панорамным видом на Дон',
        price: '12500000',
        area: '120',
        rooms: '3',
        district: 'Центр',
        type: 'Квартира',
        dealType: 'sale',
        status: 'Продажа',
        images: '[]',
        address: 'ул. Большая Садовая, 100',
        managerId: manager.id,
      },
      {
        title: 'Современная студия на Западном',
        description: 'Стильная студия с европейской отделкой',
        price: '4500000',
        area: '45',
        rooms: '1',
        district: 'Западный',
        type: 'Квартира',
        dealType: 'sale',
        status: 'Продажа',
        images: '[]',
        address: 'ул. Доватора, 50',
        managerId: manager.id,
      },
      {
        title: 'Коттедж в Пригородном',
        description: 'Просторный коттедж с участком 15 соток',
        price: '28000000',
        area: '350',
        rooms: '6',
        district: 'Пригородный',
        type: 'Дом',
        dealType: 'sale',
        status: 'Продажа',
        images: '[]',
        address: 'Посёлок Пригородный, ул. Лесная, 5',
        managerId: manager.id,
      },
      {
        title: 'Офисное помещение на Ворошиловском',
        description: 'Помещение свободного назначения',
        price: '85000',
        area: '200',
        rooms: '5',
        district: 'Ворошиловский',
        type: 'Офис',
        dealType: 'rent',
        status: 'Аренда',
        images: '[]',
        address: 'пр. Ворошиловский, 60',
        managerId: manager.id,
      },
      {
        title: 'Двухкомнатная квартира в Советском районе',
        description: 'Уютная квартира после ремонта',
        price: '6800000',
        area: '72',
        rooms: '2',
        district: 'Советский',
        type: 'Квартира',
        dealType: 'sale',
        status: 'Продажа',
        images: '[]',
        address: 'ул. Социалистическая, 180',
        managerId: manager.id,
      },
      {
        title: 'Аренда квартиры на Левенцовке',
        description: 'Светлая квартира с новой мебелью',
        price: '35000',
        area: '65',
        rooms: '2',
        district: 'Левенцовка',
        type: 'Квартира',
        dealType: 'rent',
        status: 'Аренда',
        images: '[]',
        address: 'ул. Левенцовская, 25',
        managerId: manager.id,
      },
    ];

    for (const p of properties) {
      await prisma.property.create({ data: p });
    }
    console.log('[db-init] Properties seeded');
  } catch (err: unknown) {
    console.error('[db-init] Seed error:', (err as Error).message);
  } finally {
    await prisma.$disconnect();
  }
}

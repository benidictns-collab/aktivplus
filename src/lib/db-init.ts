import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

let initialized = false;
let initPromise: Promise<void> | null = null;

export async function initDatabase() {
  if (initialized) return;
  if (initPromise) {
    await initPromise;
    return;
  }

  initPromise = _initDatabase();
  await initPromise;
}

async function _initDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('[db-init] DATABASE_URL is not set.');
    initialized = true;
    return;
  }

  const prisma = new PrismaClient({
    log: ['error'],
  });

  try {
    // Quick connectivity check (5 second timeout)
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), 5000)),
    ]);
    console.log('[db-init] Database is accessible');

    // ALWAYS push schema to ensure all tables exist (including new ones like ImageAsset)
    // This is safe — prisma db push only creates missing tables/columns
    let needsSeed = false;
    try {
      const userCount = await prisma.user.count();
      console.log('[db-init] User table exists, count:', userCount);
      if (userCount === 0) needsSeed = true;
    } catch {
      // User table doesn't exist yet — need full init
      console.log('[db-init] Tables do not exist yet');
      needsSeed = true;
    }

    // Check if ImageAsset table exists (critical for file upload)
    let imageAssetTableExists = false;
    try {
      await prisma.imageAsset.count();
      imageAssetTableExists = true;
      console.log('[db-init] ImageAsset table exists');
    } catch {
      console.log('[db-init] ImageAsset table does NOT exist — will push schema');
    }

    // Push schema if any table is missing
    if (!imageAssetTableExists || needsSeed) {
      console.log('[db-init] Running prisma db push to ensure all tables exist...');
      try {
        const { exec } = await import('child_process');
        await new Promise<void>((resolve, reject) => {
          const child = exec('./node_modules/.bin/prisma db push --accept-data-loss', {
            env: { ...process.env },
            timeout: 60000,
          }, (error) => {
            if (error) reject(error);
            else resolve();
          });
          child.stdout?.on('data', (data: Buffer) => process.stdout.write(data));
          child.stderr?.on('data', (data: Buffer) => process.stderr.write(data));
        });
        console.log('[db-init] Schema pushed successfully');
      } catch (pushError) {
        console.error('[db-init] Failed to push schema:', (pushError as Error).message);
        // Try creating ImageAsset table directly as fallback
        try {
          await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "ImageAsset" (
              "id" TEXT NOT NULL,
              "data" BYTEA NOT NULL,
              "mimeType" TEXT NOT NULL,
              "size" INTEGER NOT NULL,
              "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT "ImageAsset_pkey" PRIMARY KEY ("id")
            );
          `);
          console.log('[db-init] ImageAsset table created via fallback SQL');
        } catch (sqlError) {
          console.error('[db-init] Fallback SQL also failed:', (sqlError as Error).message);
        }
      }
    }

    if (needsSeed) {
      console.log('[db-init] No users found, seeding database...');
      await seedDatabase(prisma);
    } else {
      console.log('[db-init] Database already seeded, skipping');
    }
  } catch (error) {
    console.error('[db-init] Database connection failed:', (error as Error).message);
  } finally {
    await prisma.$disconnect();
  }

  initialized = true;
  console.log('[db-init] Initialization complete');
}

async function seedDatabase(prisma: PrismaClient) {
  try {
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
    console.log('[db-init] Admin created');

    const managerPw = await bcrypt.hash('manager123456', 12);
    const manager = await prisma.user.create({
      data: {
        name: 'Менеджер Анатолий',
        email: 'manager@aktivplus-agency.ru',
        phone: '+7 (900) 120-13-16',
        password: managerPw,
        role: 'manager',
      },
    });
    console.log('[db-init] Manager created');

    const properties = [
      {
        title: 'Пентхаус на Набережной',
        price: '45 000 000 ₽',
        area: '180 м²',
        rooms: '4 комнаты',
        district: 'Ворошиловский',
        type: 'Квартира',
        dealType: 'sale',
        status: 'Продажа',
        description: 'Роскошный пентхаус с панорамным видом на реку Дон. Авторский дизайн, терраса с видом на набережную. Два уровня, потолки 4.5 метра.',
        images: JSON.stringify(['/images/sale-1.jpg', '/images/buy-1.jpg', '/images/interior-1.jpg', '/images/apartment-1.jpg']),
        address: 'ул. Набережная, 45',
        floor: '25/25',
        parking: '2 машиноместа',
        renovation: 'Авторский',
        balcony: '3 лоджии',
        year: '2022',
        schools: 'Школа №5 — 500м',
        gardens: 'Детский сад «Солнышко» — 300м',
        shops: 'ТРЦ «Мега» — 800м',
        transport: 'Автобусная остановка — 100м',
        parks: 'Парк им. Горького — 600м',
        medicine: 'Городская больница №1 — 1.2км',
        managerId: manager.id,
      },
      {
        title: 'Коттедж в Западном',
        price: '65 000 000 ₽',
        area: '350 м²',
        rooms: '6 комнат',
        district: 'Западный',
        type: 'Дом',
        dealType: 'sale',
        status: 'Продажа',
        description: 'Элитный коттедж в закрытом посёлке. Бассейн, сауна, гараж на 3 авто. Участок 15 соток с ландшафтным дизайном.',
        images: JSON.stringify(['/images/buy-1.jpg', '/images/sale-1.jpg', '/images/interior-1.jpg', '/images/luxury-1.jpg']),
        address: 'Западный жилой массив, ул. Солнечная, 12',
        floor: '3 этажа',
        parking: 'Гараж на 3 авто',
        renovation: 'Под ключ',
        balcony: '2 террасы',
        year: '2021',
        schools: 'Гимназия №12 — 1км',
        gardens: 'Детский сад «Радуга» — 700м',
        shops: 'Супермаркет «Перекрёсток» — 500м',
        transport: 'Маршрутное такси — 200м',
        parks: 'Сосновый бор — 400м',
        medicine: 'Клиника «Здоровье» — 1.5км',
        managerId: manager.id,
      },
      {
        title: 'Апартаменты в Центре',
        price: '28 000 000 ₽',
        area: '120 м²',
        rooms: '3 комнаты',
        district: 'Кировский',
        type: 'Квартира',
        dealType: 'sale',
        status: 'Продажа',
        description: 'Стильные апартаменты в историческом центре города. Высокие потолки, кирпичные стены, вид на собор. Полностью меблированы.',
        images: JSON.stringify(['/images/interior-1.jpg', '/images/sale-1.jpg', '/images/buy-1.jpg', '/images/apartment-1.jpg']),
        address: 'ул. Большая Садовая, 78',
        floor: '8/12',
        parking: 'Подземный паркинг',
        renovation: 'Дизайнерский',
        balcony: 'Лоджия 8м²',
        year: '2020',
        schools: 'Школа №1 — 400м',
        gardens: 'Детский сад «Звёздочка» — 350м',
        shops: 'ТЦ «Горизонт» — 200м',
        transport: 'Метро (пл.) — 500м',
        parks: 'Сквер им. Фрунзе — 100м',
        medicine: 'Поликлиника №3 — 600м',
        managerId: manager.id,
      },
      {
        title: 'Вилла на Левом берегу',
        price: '85 000 000 ₽',
        area: '420 м²',
        rooms: '7 комнат',
        district: 'Левенцовка',
        type: 'Дом',
        dealType: 'sale',
        status: 'Продажа',
        description: 'Эксклюзивная вилла с видом на реку. Винный погреб, кинозал, спа-зона. Участок 25 соток с собственным причалом.',
        images: JSON.stringify(['/images/luxury-1.jpg', '/images/sale-1.jpg', '/images/buy-1.jpg', '/images/apartment-1.jpg']),
        address: 'Левенцовка, ул. Речная, 5',
        floor: '3 этажа + цоколь',
        parking: 'Гараж на 4 авто',
        renovation: 'Премиум',
        balcony: 'Патио + 2 террасы',
        year: '2023',
        schools: 'Частная школа — 1.2км',
        gardens: 'Частный детский сад — 800м',
        shops: 'Фермерский магазин — 300м',
        transport: 'Яхт-клуб — 200м',
        parks: 'Набережная — 100м',
        medicine: 'Медицинский центр — 2км',
        managerId: manager.id,
      },
      {
        title: 'Таунхаус в Суворовском',
        price: '32 000 000 ₽',
        area: '200 м²',
        rooms: '4 комнаты',
        district: 'Суворовский',
        type: 'Таунхаус',
        dealType: 'sale',
        status: 'Продажа',
        description: 'Современный таунхаус в новом жилом комплексе. Свой сад, терраса для барбекю. Охраняемая территория, детский городок.',
        images: JSON.stringify(['/images/apartment-1.jpg', '/images/buy-1.jpg', '/images/sale-1.jpg', '/images/interior-1.jpg']),
        address: 'Суворовский, ул. Парковая, 23',
        floor: '3 этажа',
        parking: 'Гараж на 2 авто',
        renovation: 'Чистовая отделка',
        balcony: '2 балкона + терраса',
        year: '2023',
        schools: 'Школа №45 — 600м',
        gardens: 'Детский сад «Аист» — 400м',
        shops: 'Магазин «Пятёрочка» — 300м',
        transport: 'Остановка автобуса — 150м',
        parks: 'Парк Дружбы — 500м',
        medicine: 'Аптека — 200м',
        managerId: manager.id,
      },
      {
        title: 'Студия с панорамным видом',
        price: '12 500 000 ₽',
        area: '65 м²',
        rooms: 'Студия',
        district: 'Советский',
        type: 'Квартира',
        dealType: 'sale',
        status: 'Продажа',
        description: 'Стильная студия в новом ЖК бизнес-класса. Панорамное остекление с видом на город. Современная планировка.',
        images: JSON.stringify(['/images/house-1.jpg', '/images/interior-1.jpg', '/images/sale-1.jpg', '/images/luxury-1.jpg']),
        address: 'ул. Социалистическая, 112',
        floor: '18/24',
        parking: '1 машиноместо',
        renovation: 'White Box',
        balcony: 'Французский балкон',
        year: '2024',
        schools: 'Школа №22 — 700м',
        gardens: 'Детский сад «Капелька» — 500м',
        shops: 'ТЦ «Золотой Вавилон» — 400м',
        transport: 'Станция метро — 300м',
        parks: 'Бульвар Космонавтов — 200м',
        medicine: 'Больница №2 — 800м',
        managerId: manager.id,
      },
    ];

    for (const p of properties) {
      await prisma.property.create({ data: p });
    }
    console.log('[db-init] Properties seeded:', properties.length);
  } catch (err) {
    console.error('[db-init] Seed error:', (err as Error).message);
  }
}

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const staticProperties = [
  {
    title: "Пентхаус на Набережной",
    price: "45 000 000 ₽",
    area: "180 м²",
    rooms: "4 комнаты",
    district: "Ворошиловский",
    type: "Квартира",
    dealType: "sale",
    status: "Продажа",
    description: "Роскошный пентхаус с панорамным видом на реку Дон. Авторский дизайн, терраса с видом на набережную. Два уровня, потолки 4.5 метра.",
    images: JSON.stringify([
      "/images/sale-1.jpg",
      "/images/buy-1.jpg",
      "/images/interior-1.jpg",
      "/images/apartment-1.jpg",
    ]),
    address: "ул. Набережная, 45",
    floor: "25/25",
    parking: "2 машиноместа",
    renovation: "Авторский",
    balcony: "3 лоджии",
    year: "2022",
    schools: "Школа №5 — 500м",
    gardens: "Детский сад «Солнышко» — 300м",
    shops: "ТРЦ «Мега» — 800м",
    transport: "Автобусная остановка — 100м",
    parks: "Парк им. Горького — 600м",
    medicine: "Городская больница №1 — 1.2км",
  },
  {
    title: "Коттедж в Западном",
    price: "65 000 000 ₽",
    area: "350 м²",
    rooms: "6 комнат",
    district: "Западный",
    type: "Дом",
    dealType: "sale",
    status: "Продажа",
    description: "Элитный коттедж в закрытом посёлке. Бассейн, сауна, гараж на 3 авто. Участок 15 соток с ландшафтным дизайном.",
    images: JSON.stringify([
      "/images/buy-1.jpg",
      "/images/sale-1.jpg",
      "/images/interior-1.jpg",
      "/images/luxury-1.jpg",
    ]),
    address: "Западный жилой массив, ул. Солнечная, 12",
    floor: "3 этажа",
    parking: "Гараж на 3 авто",
    renovation: "Под ключ",
    balcony: "2 террасы",
    year: "2021",
    schools: "Гимназия №12 — 1км",
    gardens: "Детский сад «Радуга» — 700м",
    shops: "Супермаркет «Перекрёсток» — 500м",
    transport: "Маршрутное такси — 200м",
    parks: "Сосновый бор — 400м",
    medicine: "Клиника «Здоровье» — 1.5км",
  },
  {
    title: "Апартаменты в Центре",
    price: "28 000 000 ₽",
    area: "120 м²",
    rooms: "3 комнаты",
    district: "Кировский",
    type: "Квартира",
    dealType: "sale",
    status: "Продажа",
    description: "Стильные апартаменты в историческом центре города. Высокие потолки, кирпичные стены, вид на собор. Полностью меблированы.",
    images: JSON.stringify([
      "/images/interior-1.jpg",
      "/images/sale-1.jpg",
      "/images/buy-1.jpg",
      "/images/apartment-1.jpg",
    ]),
    address: "ул. Большая Садовая, 78",
    floor: "8/12",
    parking: "Подземный паркинг",
    renovation: "Дизайнерский",
    balcony: "Лоджия 8м²",
    year: "2020",
    schools: "Школа №1 — 400м",
    gardens: "Детский сад «Звёздочка» — 350м",
    shops: "ТЦ «Горизонт» — 200м",
    transport: "Метро (пл.) — 500м",
    parks: "Сквер им. Фрунзе — 100м",
    medicine: "Поликлиника №3 — 600м",
  },
  {
    title: "Вилла на Левом берегу",
    price: "85 000 000 ₽",
    area: "420 м²",
    rooms: "7 комнат",
    district: "Левенцовка",
    type: "Дом",
    dealType: "sale",
    status: "Продажа",
    description: "Эксклюзивная вилла с видом на реку. Винный погреб, кинозал, спа-зона. Участок 25 соток с собственным причалом.",
    images: JSON.stringify([
      "/images/luxury-1.jpg",
      "/images/sale-1.jpg",
      "/images/buy-1.jpg",
      "/images/apartment-1.jpg",
    ]),
    address: "Левенцовка, ул. Речная, 5",
    floor: "3 этажа + цоколь",
    parking: "Гараж на 4 авто",
    renovation: "Премиум",
    balcony: "Патио + 2 террасы",
    year: "2023",
    schools: "Частная школа — 1.2км",
    gardens: "Частный детский сад — 800м",
    shops: "Фермерский магазин — 300м",
    transport: "Яхт-клуб — 200м",
    parks: "Набережная — 100м",
    medicine: "Медицинский центр — 2км",
  },
  {
    title: "Таунхаус в Суворовском",
    price: "32 000 000 ₽",
    area: "200 м²",
    rooms: "4 комнаты",
    district: "Суворовский",
    type: "Таунхаус",
    dealType: "sale",
    status: "Продажа",
    description: "Современный таунхаус в новом жилом комплексе. Свой сад, терраса для барбекю. Охраняемая территория, детский городок.",
    images: JSON.stringify([
      "/images/apartment-1.jpg",
      "/images/buy-1.jpg",
      "/images/sale-1.jpg",
      "/images/interior-1.jpg",
    ]),
    address: "Суворовский, ул. Парковая, 23",
    floor: "3 этажа",
    parking: "Гараж на 2 авто",
    renovation: "Чистовая отделка",
    balcony: "2 балкона + терраса",
    year: "2023",
    schools: "Школа №45 — 600м",
    gardens: "Детский сад «Аист» — 400м",
    shops: "Магазин «Пятёрочка» — 300м",
    transport: "Остановка автобуса — 150м",
    parks: "Парк Дружбы — 500м",
    medicine: "Аптека — 200м",
  },
  {
    title: "Студия с панорамным видом",
    price: "12 500 000 ₽",
    area: "65 м²",
    rooms: "Студия",
    district: "Советский",
    type: "Квартира",
    dealType: "sale",
    status: "Продажа",
    description: "Стильная студия в новом ЖК бизнес-класса. Панорамное остекление с видом на город. Современная планировка, высокий уровень finishes.",
    images: JSON.stringify([
      "/images/house-1.jpg",
      "/images/interior-1.jpg",
      "/images/sale-1.jpg",
      "/images/luxury-1.jpg",
    ]),
    address: "ул. Социалистическая, 112",
    floor: "18/24",
    parking: "1 машиноместо",
    renovation: "White Box",
    balcony: "Французский балкон",
    year: "2024",
    schools: "Школа №22 — 700м",
    gardens: "Детский сад «Капелька» — 500м",
    shops: "ТЦ «Золотой Вавилон» — 400м",
    transport: "Станция метро — 300м",
    parks: "Бульвар Космонавтов — 200м",
    medicine: "Больница №2 — 800м",
  },
];

async function main() {
  // Create superadmin
  const adminPassword = await bcrypt.hash('24345678Fe', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aktivplus-agency.ru' },
    update: {},
    create: {
      email: 'admin@aktivplus-agency.ru',
      name: 'Администратор',
      phone: '+7 (863) 000-00-00',
      password: adminPassword,
      role: 'admin',
    },
  });

  console.log('Superadmin created:', admin.email);

  // Create a demo manager for seed properties
  const managerPassword = await bcrypt.hash('manager123456', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@aktivplus-agency.ru' },
    update: {},
    create: {
      email: 'manager@aktivplus-agency.ru',
      name: 'Анатолий Волков',
      phone: '+7 (863) 000-00-01',
      password: managerPassword,
      role: 'manager',
    },
  });

  console.log('Demo manager created:', manager.email);

  // Seed properties
  for (const prop of staticProperties) {
    await prisma.property.create({
      data: {
        ...prop,
        managerId: manager.id,
      },
    });
  }

  console.log('Seeded', staticProperties.length, 'properties');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

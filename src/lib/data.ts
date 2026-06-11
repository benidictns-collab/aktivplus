export interface Property {
  id: number;
  title: string;
  price: string;
  area: string;
  rooms: string;
  district: string;
  type: string;
  status: string;
  description: string;
  images: string[];
  address: string;
  floor?: string;
  parking?: string;
  renovation?: string;
  balcony?: string;
  year?: string;
  infrastructure?: {
    schools: string;
    gardens: string;
    shops: string;
    transport: string;
    parks: string;
    medicine: string;
  };
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Пентхаус на Набережной",
    price: "45 000 000 ₽",
    area: "180 м²",
    rooms: "4 комнаты",
    district: "Ворошиловский",
    type: "Квартира",
    status: "Продажа",
    description: "Роскошный пентхаус с панорамным видом на реку Дон. Авторский дизайн, терраса с видом на набережную. Два уровня, потолки 4.5 метра.",
    images: [
      "/images/sale-1.jpg",
      "/images/buy-1.jpg",
      "/images/interior-1.jpg",
      "/images/apartment-1.jpg",
    ],
    address: "ул. Набережная, 45",
    floor: "25/25",
    parking: "2 машиноместа",
    renovation: "Авторский",
    balcony: "3 лоджии",
    year: "2022",
    infrastructure: {
      schools: "Школа №5 — 500м",
      gardens: "Детский сад «Солнышко» — 300м",
      shops: "ТРЦ «Мега» — 800м",
      transport: "Автобусная остановка — 100м",
      parks: "Парк им. Горького — 600м",
      medicine: "Городская больница №1 — 1.2км",
    },
  },
  {
    id: 2,
    title: "Коттедж в Западном",
    price: "65 000 000 ₽",
    area: "350 м²",
    rooms: "6 комнат",
    district: "Западный",
    type: "Дом",
    status: "Продажа",
    description: "Элитный коттедж в закрытом посёлке. Бассейн, сауна, гараж на 3 авто. Участок 15 соток с ландшафтным дизайном.",
    images: [
      "/images/buy-1.jpg",
      "/images/sale-1.jpg",
      "/images/interior-1.jpg",
      "/images/luxury-1.jpg",
    ],
    address: "Западный жилой массив, ул. Солнечная, 12",
    floor: "3 этажа",
    parking: "Гараж на 3 авто",
    renovation: "Под ключ",
    balcony: "2 террасы",
    year: "2021",
    infrastructure: {
      schools: "Гимназия №12 — 1км",
      gardens: "Детский сад «Радуга» — 700м",
      shops: "Супермаркет «Перекрёсток» — 500м",
      transport: "Маршрутное такси — 200м",
      parks: "Сосновый бор — 400м",
      medicine: "Клиника «Здоровье» — 1.5км",
    },
  },
  {
    id: 3,
    title: "Апартаменты в Центре",
    price: "28 000 000 ₽",
    area: "120 м²",
    rooms: "3 комнаты",
    district: "Кировский",
    type: "Квартира",
    status: "Продажа",
    description: "Стильные апартаменты в историческом центре города. Высокие потолки, кирпичные стены, вид на собор. Полностью меблированы.",
    images: [
      "/images/interior-1.jpg",
      "/images/sale-1.jpg",
      "/images/buy-1.jpg",
      "/images/apartment-1.jpg",
    ],
    address: "ул. Большая Садовая, 78",
    floor: "8/12",
    parking: "Подземный паркинг",
    renovation: "Дизайнерский",
    balcony: "Лоджия 8м²",
    year: "2020",
    infrastructure: {
      schools: "Школа №1 — 400м",
      gardens: "Детский сад «Звёздочка» — 350м",
      shops: "ТЦ «Горизонт» — 200м",
      transport: "Метро (пл.) — 500м",
      parks: "Сквер им. Фрунзе — 100м",
      medicine: "Поликлиника №3 — 600м",
    },
  },
  {
    id: 4,
    title: "Вилла на Левом берегу",
    price: "85 000 000 ₽",
    area: "420 м²",
    rooms: "7 комнат",
    district: "Левенцовка",
    type: "Дом",
    status: "Продажа",
    description: "Эксклюзивная вилла с видом на реку. Винный погреб, кинозал, спа-зона. Участок 25 соток с собственным причалом.",
    images: [
      "/images/luxury-1.jpg",
      "/images/sale-1.jpg",
      "/images/buy-1.jpg",
      "/images/apartment-1.jpg",
    ],
    address: "Левенцовка, ул. Речная, 5",
    floor: "3 этажа + цоколь",
    parking: "Гараж на 4 авто",
    renovation: "Премиум",
    balcony: "Патио + 2 террасы",
    year: "2023",
    infrastructure: {
      schools: "Частная школа — 1.2км",
      gardens: "Частный детский сад — 800м",
      shops: "Фермерский магазин — 300м",
      transport: "Яхт-клуб — 200м",
      parks: "Набережная — 100м",
      medicine: "Медицинский центр — 2км",
    },
  },
  {
    id: 5,
    title: "Таунхаус в Суворовском",
    price: "32 000 000 ₽",
    area: "200 м²",
    rooms: "4 комнаты",
    district: "Суворовский",
    type: "Таунхаус",
    status: "Продажа",
    description: "Современный таунхаус в новом жилом комплексе. Свой сад, терраса для барбекю. Охраняемая территория, детский городок.",
    images: [
      "/images/apartment-1.jpg",
      "/images/buy-1.jpg",
      "/images/sale-1.jpg",
      "/images/interior-1.jpg",
    ],
    address: "Суворовский, ул. Парковая, 23",
    floor: "3 этажа",
    parking: "Гараж на 2 авто",
    renovation: "Чистовая отделка",
    balcony: "2 балкона + терраса",
    year: "2023",
    infrastructure: {
      schools: "Школа №45 — 600м",
      gardens: "Детский сад «Аист» — 400м",
      shops: "Магазин «Пятёрочка» — 300м",
      transport: "Остановка автобуса — 150м",
      parks: "Парк Дружбы — 500м",
      medicine: "Аптека — 200м",
    },
  },
  {
    id: 6,
    title: "Студия с панорамным видом",
    price: "12 500 000 ₽",
    area: "65 м²",
    rooms: "Студия",
    district: "Советский",
    type: "Квартира",
    status: "Продажа",
    description: "Стильная студия в новом ЖК бизнес-класса. Панорамное остекление с видом на город. Современная планировка, высокий уровень finishes.",
    images: [
      "/images/house-1.jpg",
      "/images/interior-1.jpg",
      "/images/sale-1.jpg",
      "/images/luxury-1.jpg",
    ],
    address: "ул. Социалистическая, 112",
    floor: "18/24",
    parking: "1 машиноместо",
    renovation: "White Box",
    balcony: "Французский балкон",
    year: "2024",
    infrastructure: {
      schools: "Школа №22 — 700м",
      gardens: "Детский сад «Капелька» — 500м",
      shops: "ТЦ «Золотой Вавилон» — 400м",
      transport: "Станция метро — 300м",
      parks: "Бульвар Космонавтов — 200м",
      medicine: "Больница №2 — 800м",
    },
  },
];

export const services = [
  {
    id: 1,
    title: "Продажа недвижимости",
    description: "Профессиональная продажа вашей недвижимости на лучших условиях рынка",
    image: "/images/service-sale.jpg",
  },
  {
    id: 2,
    title: "Покупка недвижимости",
    description: "Подберём идеальный объект под ваши потребности и бюджет",
    image: "/images/service-buy.jpg",
  },
  {
    id: 3,
    title: "Аренда недвижимости",
    description: "Сдача и подбор арендной недвижимости быстро и надёжно",
    image: "/images/service-rent.jpg",
  },
  {
    id: 4,
    title: "Коммерческая недвижимость",
    description: "Решения для бизнеса: офисы, торговые площади, склады",
    image: "/images/service-commercial.jpg",
  },
  {
    id: 5,
    title: "Инвестиционная недвижимость",
    description: "Выгодные инвестиции в недвижимость с высокой доходностью",
    image: "/images/service-sale.jpg",
  },
  {
    id: 6,
    title: "Сопровождение сделок",
    description: "Полное юридическое сопровождение на всех этапах сделки",
    image: "/images/service-buy.jpg",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Александр Петров",
    role: "Предприниматель",
    text: "Благодаря агентству «Актив Плюс» мы нашли идеальный дом для нашей семьи. Профессиональный подход, внимание к деталям и полное сопровождение сделки. Рекомендую!",
    rating: 5,
    avatar: "АП",
  },
  {
    id: 2,
    name: "Елена Сидорова",
    role: "Главный бухгалтер",
    text: "Продала квартиру через «Актив Плюс» за 2 недели! Менеджер Анатолий нашёл покупателя быстро и провёл сделку безупречно. Очень благодарна за оперативность.",
    rating: 5,
    avatar: "ЕС",
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    role: "IT-директор",
    text: "Инвестировал в коммерческую недвижимость с помощью «Актив Плюс». Ребята подобрали отличный вариант с высокой доходностью. Профессионалы своего дела!",
    rating: 5,
    avatar: "ДК",
  },
  {
    id: 4,
    name: "Марина Волкова",
    role: "Дизайнер",
    text: "Снимала квартиру через агентство. Быстро подобрали вариант по моим критериям, всё оформили официально. Никаких проблем за всё время аренды.",
    rating: 4,
    avatar: "МВ",
  },
  {
    id: 5,
    name: "Игорь Новиков",
    role: "Владелец бизнеса",
    text: "Приобрёл офис для своей компании. «Актив Плюс» учли все пожелания и нашли помещение в идеальном месте. Сделка прошла гладко и в срок.",
    rating: 5,
    avatar: "ИН",
  },
  {
    id: 6,
    name: "Ольга Фёдорова",
    role: "Врач",
    text: "Покупали первую квартиру. Менеджер подробно объяснил все нюансы, помог с оформлением ипотеки. Очень довольны покупкой и сервисом!",
    rating: 5,
    avatar: "ОФ",
  },
];

export const advantages = [
  {
    title: "Надёжность",
    description: "15 лет на рынке недвижимости Ростова-на-Дону. Доверие тысяч клиентов.",
    icon: "Shield",
  },
  {
    title: "Проверенные объекты",
    description: "Каждый объект проходит тщательную юридическую и техническую проверку.",
    icon: "CheckCircle",
  },
  {
    title: "Юридическая безопасность",
    description: "Полное правовое сопровождение всех сделок. Гарантия чистоты.",
    icon: "Scale",
  },
  {
    title: "Персональный менеджер",
    description: "За вами закрепляется личный менеджер на всех этапах работы.",
    icon: "UserCheck",
  },
  {
    title: "Быстрое сопровождение",
    description: "Средний срок сделки — 14 дней. Ценим ваше время.",
    icon: "Clock",
  },
  {
    title: "Полный цикл сделки",
    description: "От подбора объекта до передачи ключей — всё в одном месте.",
    icon: "RotateCcw",
  },
];

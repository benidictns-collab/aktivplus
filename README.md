# Актив Плюс — Премиальная недвижимость в Ростове-на-Дону

Веб-сайт агентства премиальной недвижимости с каталогом объектов, личным кабинетом и панелью администратора.

## Технологии

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion
- **Backend:** Next.js API Routes, Prisma ORM
- **База данных:** SQLite
- **Аутентификация:** Cookie-based сессии (bcryptjs)

## Развертывание на Timeweb Cloud

### Вариант 1: Node.js приложение

1. Создайте Node.js проект в Timeweb Cloud
2. Подключите GitHub репозиторий
3. Настройте переменные окружения:
   ```
   DATABASE_URL=file:./db/custom.db
   NODE_ENV=production
   PORT=3000
   ```
4. Команда сборки: `npm run build`
5. Команда запуска: `npm run start`
6. Версия Node.js: 20+

### Вариант 2: Docker

1. Создайте Docker-проект в Timeweb Cloud
2. Подключите GitHub репозиторий
3. Dockerfile уже настроен в корне проекта

### Первый запуск (инициализация базы данных)

После первого развертывания выполните в терминале сервера:

```bash
npx prisma db push
npx prisma db seed
```

Будут созданы:
- **Администратор:** admin@aktivplus.ru / 24345678Fe
- **Менеджер:** manager@aktivplus.ru / manager123456
- **6 тестовых объектов** недвижимости

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Инициализация базы данных
npx prisma db push
npx prisma db seed

# Запуск dev-сервера
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
├── prisma/           # Схема БД и сиды
├── public/           # Статические файлы и загрузки
├── src/
│   ├── app/          # Next.js App Router (страницы и API)
│   ├── components/   # React компоненты
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Утилиты и Prisma клиент
│   └── store/        # Zustand хранилище
├── production-server.cjs  # Продакшн-сервер
├── Dockerfile        # Docker конфигурация
└── ecosystem.config.js    # PM2 конфигурация
```

## API Endpoints

| Метод | Путь | Описание |
|-------|------|----------|
| POST | /api/auth/login | Авторизация |
| POST | /api/auth/register | Регистрация |
| GET | /api/auth/me | Текущий пользователь |
| PATCH | /api/auth/profile | Обновление профиля |
| POST | /api/auth/logout | Выход |
| GET/POST | /api/properties | Каталог объектов |
| GET/PATCH/DELETE | /api/properties/[id] | Управление объектом |
| POST | /api/upload | Загрузка изображений |
| GET/POST | /api/favorites | Избранное |
| GET/POST | /api/applications | Заявки |
| GET/POST | /api/messages | Сообщения |
| GET/POST | /api/users | Управление пользователями (admin) |
| GET/POST/DELETE | /api/users/[id] | Управление пользователем (admin) |
| GET | /api/admin | Данные панели администратора |

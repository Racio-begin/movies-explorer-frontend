# План доработки: возобновление работы проекта без платного бэкенда

## Контекст

Собственный бэкенд проекта (`api.giga-movies.nomoreparties.co`) больше не доступен —
он работал во время учёбы в Я.Практикуме. Сторонний каталог фильмов
(`api.nomoreparties.co/beatfilm-movies`) жив и отвечает.

**Цель:** проект должен запускаться у любого человека командой
`npm install && npm start` без своего бэкенда — чтобы можно было оценить навыки
и кодовую базу.

**Что мёртво и требует замены:** авторизация, профиль пользователя,
CRUD сохранённых фильмов (всё, что шло через `MainApi` / `Auth`).

**Что трогать не нужно:** каталог фильмов (`MoviesApi` / beatfilm), роутинг,
вёрстка, существующие компоненты.

## Архитектура решения

Слой абстракции `backend`, выбирающий провайдера по наличию ключей Supabase в `.env`:

```
components/  →  Auth.js / MainApi.js (фасады, сигнатуры экспорта не меняются)
                        ↓
              backend/index.js  ← выбирает провайдера по .env
                   ↙        ↘
       mockProvider      supabaseProvider
       (localStorage)    (supabase-js)
```

Есть ключи Supabase → работает `supabaseProvider`. Нет → `mockProvider` на localStorage.
По умолчанию (без `.env`) проект работает на mock из коробки.

**Контракт провайдера** (одинаковый у обоих, все методы async):
`register`, `login`, `logout`, `checkToken`, `getUserData`, `updateUserData`,
`getSavedMovies`, `saveMovie`, `deleteMovie`.

При ошибке методы реджектятся **числовым HTTP-статусом** (400/401/409/500),
чтобы существующая обработка ошибок в `App.js` работала без изменений.

## Этапы

### 1. Слой абстракции `src/backend/`

- [ ] `src/backend/index.js` — проверяет `process.env.REACT_APP_SUPABASE_URL` и
  `process.env.REACT_APP_SUPABASE_ANON_KEY`; оба заданы → экспортирует
  `supabaseProvider`, иначе → `mockProvider`. В консоль — лог выбранного режима.
- [ ] Определить и задокументировать контракт провайдера (комментарий/JSDoc).

### 2. mock-провайдер `src/backend/mockProvider.js`

- [ ] Пользователи в localStorage-ключе `mock_users` — массив
  `{ id, name, email, password }`.
- [ ] `register({ name, email, password })`: валидация полей → reject `400`;
  email уже занят → reject `409`; иначе создать юзера, вернуть данные.
- [ ] `login({ email, password })`: нет совпадения → reject `401`;
  иначе вернуть `{ token }` (псевдо-JWT с зашитым `userId`).
- [ ] `checkToken(jwt)`: разобрать токен → вернуть юзера; невалидный → reject `401`.
- [ ] `logout()`: resolve (сессия чистится на клиенте).
- [ ] `getUserData` / `updateUserData`.
- [ ] Сохранённые фильмы: ключ `mock_savedMovies_<userId>` (у каждого юзера свой
  список). `getSavedMovies`, `saveMovie`, `deleteMovie`.
- [ ] Искусственная задержка (~300 мс) у всех методов — чтобы лоадеры/UX вели
  себя как с реальным API.
- Пароли хранятся в открытом виде — осознанное упрощение для демо-мока,
  отметить в README.

### 3. Supabase-провайдер `src/backend/supabaseProvider.js`

- [ ] Добавить зависимость `@supabase/supabase-js`.
- [ ] Создать клиент из ключей `.env`.
- [ ] Auth: `signUp` / `signInWithPassword` / `getUser` / `signOut`.
  Имя пользователя — в user metadata.
- [ ] Сохранённые фильмы — таблица `saved_movies` (поля как в текущем `saveMovie`).
- [ ] Маппинг ошибок Supabase в числовые статусы (409/401/400/500).
- [ ] SQL-схема таблицы `saved_movies` + RLS-политики «только свои записи» —
  оформить в README/отдельном файле.

### 4. Превращение `Auth.js` и `MainApi.js` в фасады

- [ ] `Auth.js`: `register`/`login`/`logout`/`checkToken` делегируют в `provider`,
  сигнатуры экспорта не меняются.
- [ ] `MainApi.js`: методы синглтона `mainApi` делегируют в `provider`.
  `setToken` сохранить (используется в `App.js`).
- [ ] Убедиться, что `App.js` и `Navigation.js` не требуют правок.

### 5. Чистка конфигурации

- [ ] Из `src/utils/Url.js` убрать мёртвый `BASE_URL`
  (`MOVIES_URL` / `BASE_MOVIES_URL` оставить).
- [ ] Добавить `.env.example` с `REACT_APP_SUPABASE_URL=` и
  `REACT_APP_SUPABASE_ANON_KEY=`. Файл `.env` не создаём и не трогаем.
- [ ] Проверить, что `.env` в `.gitignore`.

### 6. Документация

- [ ] README: раздел «Запуск» — `npm install && npm start` работает на mock
  из коробки; опционально Supabase по инструкции.
- [ ] README: инструкция по подключению Supabase (создание проекта, ключи в
  `.env`, SQL-схема, RLS).
- [ ] Обновить `CLAUDE.md` (секции про источники данных и `BASE_URL`).

### 7. Проверка

- [ ] `npm start` в режиме mock: регистрация, вход, выход, редактирование
  профиля, поиск, сохранение/удаление фильма, защищённые роуты, перезагрузка
  страницы (сессия сохраняется).
- [ ] Проверить ветки обработки ошибок UI (занятый email → 409, неверный
  пароль → 401).
- [ ] `npm test -- --watchAll=false`.
- [ ] `npm run build` — сборка без ошибок.

## Вне рамок

Каталог фильмов, роутинг, вёрстка, существующие компоненты. Реальный проект
Supabase заводит владелец репозитория — в рамках задачи только код адаптера,
SQL-схема и инструкция.

## Ветка

`feature/revive-without-backend`

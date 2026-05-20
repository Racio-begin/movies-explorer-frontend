# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## О проекте

Фронтенд дипломного проекта Я.Практикум — SPA-сервис поиска фильмов с регистрацией, поиском, фильтром короткометражек и сохранением фильмов в избранное. React 18 + react-router-dom 6, создан через Create React App (react-scripts 5).

## Команды

- `npm start` — запуск dev-сервера (localhost:3000)
- `npm run build` — production-сборка в `build/`
- `npm test` — запуск тестов в watch-режиме (Jest + React Testing Library)
- `npm test -- src/path/to/File.test.js` — запуск одного теста
- `npm test -- --watchAll=false` — однократный прогон без watch
- `npm run deploy` — деплой на GitHub Pages (выполняет `predeploy` → `build`)

## Архитектура

### Источники данных (два разных API)
- **MainApi** (`src/utils/MainApi.js`) — собственный бэкенд (`BASE_URL` в `src/utils/Url.js`): аутентификация по JWT, профиль пользователя, CRUD сохранённых фильмов. Экспортируется как синглтон `mainApi`; токен задаётся через `mainApi.setToken()`.
- **MoviesApi** (`src/utils/MoviesApi.js`) — сторонний beatfilm-movies API (`MOVIES_URL`): полный каталог фильмов. Создаётся как инстанс класса в компоненте `Movies`.
- **Auth** (`src/utils/Auth.js`) — функции `register`/`login`/`checkToken` для собственного бэкенда.

Все API при ошибке делают `Promise.reject(res.status)` — обработка ошибок в компонентах построена на сравнении с числовыми кодами (400, 401, 409, 500).

### Состояние и контексты
- Всё ключевое состояние (`loggedIn`, `currentUser`, `savedMovies` и т.д.) живёт в `src/components/App/App.js` и передаётся через пропсы и контексты.
- `CurrentUserContext` — данные текущего пользователя.
- `SavedMoviesContext` — массив сохранённых фильмов + хендлер `toggleSaveHandler` (сохранить/удалить фильм).

### Роутинг
В `App.js`: публичные роуты (`/`, `/signin`, `/signup`, `*`) и защищённые (`/movies`, `/saved-movies`, `/profile`) через обёртку `ProtectedRoute`, которая редиректит неавторизованных.

### localStorage (источник персистентности)
- `jwt` — токен авторизации
- `MoviesSearchData` — последний поиск: строка, флаг короткометражек, отфильтрованный результат (`searchResult`) и сырой ответ API (`apiResult`). Повторный поиск фильтрует уже закешированный `apiResult`, не дёргая API заново.
- `firstVisit` — флаг первого визита страницы `/movies`

### Поиск и фильтрация
- `src/utils/movieFilter.js` — фильтр по строке поиска (RU/EN) и флагу короткометражек.
- `SHORT_MOVIE_DURATION` и параметры пагинации (initial/adding count для разных ширин экрана) — в `src/utils/constants.js`. Количество карточек зависит от `window.innerWidth` (точки 1280/768).

### Прочие утилиты
- `src/hooks/useFormWithValidation.js` — кастомный хук «живой» валидации форм.
- `src/utils/regex.js` — регулярки для валидации полей.
- `src/utils/informMessages.js` — все пользовательские сообщения (ошибки, подсказки).
- `src/utils/checkSavedMovies.js` — `isMovieSaved` / `getMovieMyId` для сопоставления фильма каталога с сохранённым.

## Коммиты

Формат сообщения: `<тип>: <короткое описание сути>`. Тип — `feat` (новая функциональность), `fix` (исправление бага), также допустимы `refactor`, `docs`, `style`, `test`, `chore`. Описание — короткое, по сути изменения.

Примеры: `feat: добавлен фильтр короткометражек`, `fix: исправлена пагинация на мобильных`.

## Конвенции

- Вёрстка по БЭМ; компоненты — папка на компонент (`Component.js` + `Component.css`).
- Отступы — табы.
- При смене окружения бэкенда переключать `BASE_URL` в `src/utils/Url.js` (закомментированный localhost-вариант присутствует).

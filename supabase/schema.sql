-- Схема БД для Supabase-режима проекта movies-explorer-frontend.
-- Выполнить в SQL Editor проекта Supabase (один раз).
-- Авторизация и профиль пользователя обеспечиваются встроенным Supabase Auth
-- (имя хранится в user_metadata.name), отдельная таблица для них не нужна.

-- Таблица сохранённых фильмов. Сам фильм хранится целиком в jsonb-поле movie.
create table if not exists public.saved_movies (
	id         uuid primary key default gen_random_uuid(),
	owner      uuid not null default auth.uid()
	             references auth.users (id) on delete cascade,
	movie      jsonb not null,
	created_at timestamptz not null default now()
);

-- Row Level Security: пользователь работает только со своими записями.
alter table public.saved_movies enable row level security;

create policy "saved_movies: владелец читает свои"
	on public.saved_movies for select
	using (auth.uid() = owner);

create policy "saved_movies: владелец добавляет свои"
	on public.saved_movies for insert
	with check (auth.uid() = owner);

create policy "saved_movies: владелец удаляет свои"
	on public.saved_movies for delete
	using (auth.uid() = owner);

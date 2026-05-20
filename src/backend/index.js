// Слой абстракции бэкенда.
// Выбирает провайдера по наличию ключей Supabase в .env:
//   оба ключа заданы  → supabaseProvider (реальный бэкенд)
//   ключей нет        → mockProvider (эмуляция на localStorage)
//
// Контракт провайдера (все методы async, при ошибке reject числовым статусом):
//   register({ name, email, password }) -> user
//   login({ email, password })          -> { token }
//   logout()                            -> {}
//   checkToken(token)                   -> user
//   getUserData()                       -> user
//   updateUserData(name, email)         -> user
//   getSavedMovies()                    -> movie[]
//   saveMovie(movie)                    -> movie
//   deleteMovie(movieId)                -> {}
//   setToken(token)                     -> void

import mockProvider from './mockProvider';
import supabaseProvider from './supabaseProvider';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const useSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const provider = useSupabase ? supabaseProvider : mockProvider;

console.info(
	`[backend] режим: ${useSupabase ? 'Supabase' : 'mock (localStorage)'}`
);

export default provider;

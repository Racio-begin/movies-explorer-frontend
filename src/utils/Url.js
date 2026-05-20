//*	API-константы	*//

// Авторизация, профиль и сохранённые фильмы обслуживает слой src/backend/
// (mock или Supabase) — отдельный BASE_URL для них больше не нужен.

// API-адрес для получения фильмов
export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

// База API-адреса для получения содержимого фильмов
export const BASE_MOVIES_URL = "https://api.nomoreparties.co";

export function getFullImageURL(urlSuffix) {
	return `${BASE_MOVIES_URL}${urlSuffix}`;
};
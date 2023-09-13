//*	API-константы	*//

// API-адрес для получения данных пользователя с моего сервера (локальная машина, тестирование)
export const BASE_URL = "http://localhost:3000"

// API-адрес для получения данных , тестирование
// export const BASE_URL = "https://api.mattino13-movies-explorer.nomoredomains.rocks"

// API-адрес для получения данных пользователя с моего сервера
// export const BASE_URL = "https://api.giga-movies.nomoreparties.co";

// API-адрес для получения фильмов
export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

// База API-адреса для получения содержимого фильмов
export const BASE_MOVIES_URL = "https://api.nomoreparties.co";

export function getFullImageURL(urlSuffix) {
	return `${BASE_MOVIES_URL}${urlSuffix}`;
};
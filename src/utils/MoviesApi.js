// import { MOVIES_URL } from "../utils/Url";

// function getResponseData(res) {
// 	if (res.ok) {
// 		return res.json();
// 	}
// 	return Promise.reject(`Ошибка: ${res.status}`);
// };

// Получение фильмов //
// export function getMovies() {
// 	return fetch({MOVIES_URL}, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 	})
// 		.then(res => getResponseData(res));
// };

// Получение фильмов (отработка в лоб) //
// export const getMovies = () => {
//   return fetch('https://api.nomoreparties.co/beatfilm-movies', {
//     method: "GET",
//   }).then((res) => getResponseData(res));
// }

class MoviesApi {
  constructor(url) {
    this._url = url;
  }

  getInitialMovies() {
    return fetch(this._url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(
          new Error(`Ошибка получения фильмов с сервера: ${res.status}`)
        );
      })
  }
}

export default MoviesApi;

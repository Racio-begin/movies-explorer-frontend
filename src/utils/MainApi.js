import { BASE_URL } from "./Url";

class MainApi {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
		this._token = config.token;
	};

	_request(urlEndpoint, options) {
		return fetch(this._url + urlEndpoint, options)
			.then(this._getResponseData)
	};

	_getResponseData(res) {
		if (res.ok) {
			return res.json();
		};
		// return Promise.reject(`Ошибка: ${res.status}`);
		return Promise.reject(res.status);
	};

	// getInitialCards() {
	// 	return this._request('/cards', {
	// 		method: "GET",
	// 		headers: this._headers
	// 	});
	// };

	getUserData() {
		return this._request('/users/me', {
			method: "GET",
			headers: this._headers
		});
	};

	updateUserData(name, email) {
		return this._request('/users/me', {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				name,
				email,
			})
		});
	};

	getMovies() {
		return this._request('/movies/', {
			method: 'GET',
			headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
		});
	};

	saveMovie(movie) {
		return this._request('/movies/', {
			method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
			body: JSON.stringify({
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				image: movie.image,
				trailerLink: movie.trailerLink,
				thumbnail: movie.thumbnail,
				movieId: movie.id,
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
			}),
		});
	};

	deleteMovie(id) {
		return this._request(`/movies/${id}/`, {
			method: 'DELETE',
			headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
		});
	};

	setToken(token) {
		this._headers = {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		};
	};

};

const token = localStorage.getItem("jwt");

const mainApi = new MainApi({
	url: BASE_URL,
	headers: {
		'Authorization': `Bearer ${token}`,
		'Content-Type': 'application/json'
	}
});

export default mainApi;
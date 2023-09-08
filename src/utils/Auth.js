import { BASE_URL } from "../utils/Url";

function getResponseData(res) {
	if (res.ok) {
		return res.json();
	}
	// return Promise.reject(`Ошибка: ${res.status}`);
	return Promise.reject(res.status);
};

// Регистрация //
export function register({ name, email, password }) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, password }),
	})
		.then(res => getResponseData(res));
};

// Вход //
export function login({ email, password }) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then((res) => getResponseData(res));
};

// Выход //
export function logout() {
	return fetch(`${BASE_URL}/signout`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then((res) => getResponseData(res));
}

// Проверка токена //
export function checkToken(jwt) {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${jwt}`
		},
	})
		.then((res) => getResponseData(res));
};
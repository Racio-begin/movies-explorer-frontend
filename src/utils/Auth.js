import { BASE_URL } from "../utils/Url";
import request from "./request";

// Регистрация //
export function register({ name, email, password }) {
	return request(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email, password }),
	});
};

// Вход //
export function login({ email, password }) {
	return request(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});
};

// Выход //
export function logout() {
	return request(`${BASE_URL}/signout`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
}

// Проверка токена //
export function checkToken(jwt) {
	return request(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${jwt}`
		},
	});
};

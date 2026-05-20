// Mock-провайдер бэкенда: эмулирует авторизацию, профиль и сохранённые фильмы
// поверх localStorage. Используется по умолчанию, когда не заданы ключи Supabase.
// Все методы async и при ошибке реджектятся числовым HTTP-статусом —
// чтобы обработка ошибок в компонентах совпадала с поведением реального API.

const STORAGE_USERS = 'mock_users';
const TOKEN_PREFIX = 'mock-token.';
const DELAY = 300;

const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY));

function readJSON(key, fallback) {
	try {
		return JSON.parse(localStorage.getItem(key)) || fallback;
	} catch {
		return fallback;
	}
}

function readUsers() {
	return readJSON(STORAGE_USERS, []);
}

function writeUsers(users) {
	localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function savedKey(userId) {
	return `mock_savedMovies_${userId}`;
}

function readSaved(userId) {
	return readJSON(savedKey(userId), []);
}

function writeSaved(userId, movies) {
	localStorage.setItem(savedKey(userId), JSON.stringify(movies));
}

function genId() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function userIdFromToken(token) {
	if (typeof token === 'string' && token.startsWith(TOKEN_PREFIX)) {
		return token.slice(TOKEN_PREFIX.length);
	}
	return null;
}

function currentUserId() {
	return userIdFromToken(localStorage.getItem('jwt'));
}

function publicUser(user) {
	return { _id: user.id, name: user.name, email: user.email };
}

function isValidProfile(name, email) {
	return Boolean(name) && Boolean(email) && name.length >= 2 && name.length <= 30;
}

const mockProvider = {
	async register({ name, email, password }) {
		await delay();
		if (!password || !isValidProfile(name, email)) {
			return Promise.reject(400);
		}
		const users = readUsers();
		if (users.some((user) => user.email === email)) {
			return Promise.reject(409);
		}
		const user = { id: genId(), name, email, password };
		users.push(user);
		writeUsers(users);
		return publicUser(user);
	},

	async login({ email, password }) {
		await delay();
		if (!email || !password) {
			return Promise.reject(400);
		}
		const user = readUsers().find(
			(item) => item.email === email && item.password === password
		);
		if (!user) {
			return Promise.reject(401);
		}
		return { token: TOKEN_PREFIX + user.id };
	},

	async logout() {
		await delay();
		return {};
	},

	async checkToken(token) {
		await delay();
		const id = userIdFromToken(token);
		const user = id && readUsers().find((item) => item.id === id);
		if (!user) {
			return Promise.reject(401);
		}
		return publicUser(user);
	},

	async getUserData() {
		await delay();
		const id = currentUserId();
		const user = id && readUsers().find((item) => item.id === id);
		if (!user) {
			return Promise.reject(401);
		}
		return publicUser(user);
	},

	async updateUserData(name, email) {
		await delay();
		const id = currentUserId();
		const users = readUsers();
		const user = users.find((item) => item.id === id);
		if (!user) {
			return Promise.reject(401);
		}
		if (!isValidProfile(name, email)) {
			return Promise.reject(400);
		}
		if (users.some((item) => item.email === email && item.id !== id)) {
			return Promise.reject(409);
		}
		user.name = name;
		user.email = email;
		writeUsers(users);
		return publicUser(user);
	},

	async getSavedMovies() {
		await delay();
		const id = currentUserId();
		if (!id) {
			return Promise.reject(401);
		}
		return readSaved(id);
	},

	async saveMovie(movie) {
		await delay();
		const id = currentUserId();
		if (!id) {
			return Promise.reject(401);
		}
		const saved = readSaved(id);
		const record = { ...movie, _id: genId(), owner: id };
		saved.unshift(record);
		writeSaved(id, saved);
		return record;
	},

	async deleteMovie(movieId) {
		await delay();
		const id = currentUserId();
		if (!id) {
			return Promise.reject(401);
		}
		const saved = readSaved(id);
		const next = saved.filter((item) => item._id !== movieId);
		if (next.length === saved.length) {
			return Promise.reject(404);
		}
		writeSaved(id, next);
		return {};
	},

	// Токен в mock-режиме хранится в localStorage('jwt'); метод оставлен
	// для совместимости интерфейса с реальным API.
	setToken() {},
};

export default mockProvider;

// Supabase-провайдер бэкенда: авторизация, профиль и сохранённые фильмы
// поверх Supabase. Подключается, когда в .env заданы ключи Supabase.
// Все методы async и при ошибке реджектятся числовым HTTP-статусом —
// чтобы обработка ошибок в компонентах совпадала с поведением реального API.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Клиент создаётся только при наличии ключей, чтобы импорт модуля
// не падал в mock-режиме (createClient требует непустой URL).
const supabase =
	SUPABASE_URL && SUPABASE_ANON_KEY
		? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
		: null;

function publicUser(user) {
	return {
		_id: user.id,
		name: user.user_metadata?.name || '',
		email: user.email,
	};
}

// Приводит ошибку Supabase к числовому HTTP-статусу.
function mapAuthError(error) {
	const message = (error?.message || '').toLowerCase();
	const status = error?.status;
	if (status === 422 || message.includes('already')) {
		return 409;
	}
	if (status === 400 || message.includes('invalid')) {
		return 401;
	}
	return status || 500;
}

const supabaseProvider = {
	async register({ name, email, password }) {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { name } },
		});
		if (error) {
			return Promise.reject(mapAuthError(error));
		}
		// Supabase при существующем email возвращает пользователя без identities.
		if (
			data.user &&
			Array.isArray(data.user.identities) &&
			data.user.identities.length === 0
		) {
			return Promise.reject(409);
		}
		return publicUser(data.user);
	},

	async login({ email, password }) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			return Promise.reject(mapAuthError(error));
		}
		return { token: data.session.access_token };
	},

	async logout() {
		await supabase.auth.signOut();
		return {};
	},

	async checkToken(token) {
		const { data, error } = await supabase.auth.getUser(token);
		if (error || !data.user) {
			return Promise.reject(401);
		}
		return publicUser(data.user);
	},

	async getUserData() {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) {
			return Promise.reject(401);
		}
		return publicUser(data.user);
	},

	async updateUserData(name, email) {
		const { data, error } = await supabase.auth.updateUser({
			email,
			data: { name },
		});
		if (error) {
			return Promise.reject(mapAuthError(error));
		}
		return publicUser(data.user);
	},

	async getSavedMovies() {
		const { data, error } = await supabase
			.from('saved_movies')
			.select('id, movie')
			.order('created_at', { ascending: false });
		if (error) {
			return Promise.reject(500);
		}
		return data.map((row) => ({ ...row.movie, _id: row.id }));
	},

	async saveMovie(movie) {
		const { data, error } = await supabase
			.from('saved_movies')
			.insert({ movie })
			.select('id, movie')
			.single();
		if (error) {
			return Promise.reject(500);
		}
		return { ...data.movie, _id: data.id };
	},

	async deleteMovie(movieId) {
		const { error } = await supabase
			.from('saved_movies')
			.delete()
			.eq('id', movieId);
		if (error) {
			return Promise.reject(500);
		}
		return {};
	},

	// Сессию хранит сам клиент Supabase; метод оставлен для совместимости
	// интерфейса с реальным API.
	setToken() {},
};

export default supabaseProvider;

// Фасад авторизации. Делегирует в выбранный провайдер бэкенда
// (mock или Supabase) — см. src/backend/index.js.
// Сигнатуры экспорта сохранены ради совместимости с компонентами.

import provider from "../backend";

// Регистрация //
export function register({ name, email, password }) {
	return provider.register({ name, email, password });
};

// Вход //
export function login({ email, password }) {
	return provider.login({ email, password });
};

// Выход //
export function logout() {
	return provider.logout();
};

// Проверка токена //
export function checkToken(jwt) {
	return provider.checkToken(jwt);
};

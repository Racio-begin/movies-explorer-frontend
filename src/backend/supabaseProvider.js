// Supabase-провайдер бэкенда — заглушка.
// Реальная реализация добавляется на этапе 3 (см. REVIVAL_PLAN.md).
// Этот модуль подключается только когда в .env заданы ключи Supabase.

const notImplemented = () => {
	console.error('[backend] Supabase-провайдер ещё не реализован');
	return Promise.reject(500);
};

const supabaseProvider = {
	register: notImplemented,
	login: notImplemented,
	logout: notImplemented,
	checkToken: notImplemented,
	getUserData: notImplemented,
	updateUserData: notImplemented,
	getSavedMovies: notImplemented,
	saveMovie: notImplemented,
	deleteMovie: notImplemented,
	setToken() {},
};

export default supabaseProvider;

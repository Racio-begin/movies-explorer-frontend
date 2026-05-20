// Фасад собственного бэкенда (профиль, сохранённые фильмы).
// Делегирует в выбранный провайдер — см. src/backend/index.js.
// Экспортируется синглтоном `mainApi`; сигнатуры методов сохранены
// ради совместимости с компонентами.

import provider from "../backend";

const mainApi = {
	getUserData() {
		return provider.getUserData();
	},

	updateUserData(name, email) {
		return provider.updateUserData(name, email);
	},

	getMovies() {
		return provider.getSavedMovies();
	},

	saveMovie(movie) {
		return provider.saveMovie(movie);
	},

	deleteMovie(id) {
		return provider.deleteMovie(id);
	},

	setToken(token) {
		provider.setToken(token);
	},
};

export default mainApi;

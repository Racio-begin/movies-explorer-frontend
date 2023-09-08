//* Информационные сообщения *//
const UPDATE_SUCCESS_MESSAGE = 'Профиль успешно обновлен!';
const MOVIES_NOT_FOUND_MESSAGE = 'По вашему запросу совпадений не найдено.';
const EMPTY_INPUT_MESSAGE = 'Введите ключевое слово поиска.';
const EMPTY_SAVED_SHORTS_MOVIES = 'У вас еще нет сохранённых короткометражных фильмов';
const EMPTY_SAVED_MOVIES = 'У вас еще нет сохранённых фильмов';

//* Сообщения об ошибке *//
const SIGNIN_BAD_DATA_MESSAGE = 'Вы ввели неправильный e-mail или пароль.';
const SIGNIN_DEFAULT_ERROR = 'При авторизации произошла ошибка.';
const SIGNUP_BAD_DATA_MESSAGE = 'Переданы некоректные данные при регистрации.';
const SIGNUP_CONFLICT_MESSAGE = 'Пользователь с указанным email уже зарегестрирован.';
const SIGNUP_DEFAULT_ERROR = 'При регистрации пользователя произошла ошибка.';
const USER_BAD_DATA_ERROR = 'При обновлении профиля произошла ошибка.';
const UPDATE_DEFAULT_ERROR = 'При обновлении профиля произошла ошибка.';
const SERVER_ERROR_500 = '500: На сервере произошла ошибка. Повторите попытку позже.';
const SERVER_ERROR_404 = '404: Страница по указанному маршруту не найдена.';


export {
	SIGNIN_BAD_DATA_MESSAGE,
	SIGNIN_DEFAULT_ERROR,
	SIGNUP_BAD_DATA_MESSAGE,
	SIGNUP_CONFLICT_MESSAGE,
	SIGNUP_DEFAULT_ERROR,
	USER_BAD_DATA_ERROR,
	UPDATE_DEFAULT_ERROR,
	UPDATE_SUCCESS_MESSAGE,
	MOVIES_NOT_FOUND_MESSAGE,
	EMPTY_INPUT_MESSAGE,
	EMPTY_SAVED_SHORTS_MOVIES,
	EMPTY_SAVED_MOVIES,
	SERVER_ERROR_500,
	SERVER_ERROR_404
};
import mockProvider from './mockProvider';

const credentials = {
	name: 'Тест Тестов',
	email: 'tester@example.com',
	password: 'password123',
};

// Регистрирует пользователя, логинит его и кладёт токен в localStorage —
// как это делает App после успешного входа.
async function signInFreshUser() {
	await mockProvider.register(credentials);
	const { token } = await mockProvider.login(credentials);
	localStorage.setItem('jwt', token);
	return token;
}

beforeEach(() => {
	localStorage.clear();
});

describe('mockProvider — регистрация', () => {
	it('создаёт пользователя и возвращает публичные поля', async () => {
		const user = await mockProvider.register(credentials);
		expect(user).toEqual({
			_id: expect.any(String),
			name: credentials.name,
			email: credentials.email,
		});
	});

	it('отклоняет регистрацию на занятый email со статусом 409', async () => {
		await mockProvider.register(credentials);
		await expect(mockProvider.register(credentials)).rejects.toBe(409);
	});

	it('отклоняет некорректные данные со статусом 400', async () => {
		await expect(
			mockProvider.register({ ...credentials, name: 'A' })
		).rejects.toBe(400);
	});
});

describe('mockProvider — вход', () => {
	it('возвращает токен при верных учётных данных', async () => {
		await mockProvider.register(credentials);
		const result = await mockProvider.login(credentials);
		expect(result.token).toEqual(expect.any(String));
	});

	it('отклоняет вход с неверным паролем со статусом 401', async () => {
		await mockProvider.register(credentials);
		await expect(
			mockProvider.login({ ...credentials, password: 'wrong' })
		).rejects.toBe(401);
	});
});

describe('mockProvider — проверка токена', () => {
	it('возвращает пользователя по валидному токену', async () => {
		await mockProvider.register(credentials);
		const { token } = await mockProvider.login(credentials);
		const user = await mockProvider.checkToken(token);
		expect(user.email).toBe(credentials.email);
	});

	it('отклоняет невалидный токен со статусом 401', async () => {
		await expect(mockProvider.checkToken('мусор')).rejects.toBe(401);
	});
});

describe('mockProvider — сохранённые фильмы', () => {
	const movie = { movieId: 1, nameRU: 'Фильм', duration: 90 };

	it('сохраняет фильм и возвращает его в списке', async () => {
		await signInFreshUser();
		const saved = await mockProvider.saveMovie(movie);
		expect(saved._id).toEqual(expect.any(String));

		const list = await mockProvider.getSavedMovies();
		expect(list).toHaveLength(1);
		expect(list[0].nameRU).toBe('Фильм');
	});

	it('удаляет фильм из списка сохранённых', async () => {
		await signInFreshUser();
		const saved = await mockProvider.saveMovie(movie);
		await mockProvider.deleteMovie(saved._id);

		const list = await mockProvider.getSavedMovies();
		expect(list).toHaveLength(0);
	});

	it('отклоняет доступ к сохранённым без авторизации со статусом 401', async () => {
		await expect(mockProvider.getSavedMovies()).rejects.toBe(401);
	});
});

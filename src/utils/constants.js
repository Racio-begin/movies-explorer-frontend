// Информационное сообщниие для E-mail //
export const EMAIL_TITLE_TEXT = 'Электронный адрес должен состоять из имени пользователя, знака @ и доменного имени. Имена пользователей должны начинаться с буквы, могут содержать: буквы (a-z, A-Z), цифры (0-9). Пример: test01@test.ru';

export const filter = (movies, search, isShort) => {
  return movies.filter((movie) => {
    const matchedSearch =
      movie.nameRU.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
      movie.nameEN.trim().toLowerCase().includes(search.trim().toLowerCase());

    return isShort ? movie.duration <= 40 && matchedSearch : matchedSearch;
  });
};
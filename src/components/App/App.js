import React, { useState, useEffect } from 'react';
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import {
	SIGNIN_BAD_DATA_MESSAGE,
	SIGNUP_BAD_DATA_MESSAGE,
	SIGNIN_DEFAULT_ERROR,
	SIGNUP_CONFLICT_MESSAGE,
	SIGNUP_DEFAULT_ERROR,
} from '../../utils/informMessages';

import mainApi from '../../utils/MainApi';
import MoviesApi from '../../utils/MoviesApi';
import * as Auth from '../../utils/Auth';

import {
	BASE_MOVIES_URL,
	MOVIES_URL,
} from '../../utils/Url';

import './App.css';

function App() {

	const moviesApi = new MoviesApi(MOVIES_URL);

	const token = localStorage.getItem("jwt");

	//* Стейты *//

	// Состояние залогирования пользователя
	const [loggedIn, setLoggedIn] = useState(!!token);

	const [currentUser, setCurrentUser] = useState({});

	const [isLocked, setIsLocked] = useState(false);

	const [serverResponseError, setServerResponseError] = useState('');

	const [combinedMoviesArray, setCombinedMoviesArray] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			Auth.checkToken(token)
				.then((res) => {
					if (!res) {
						return
					};
					setLoggedIn(true);
					mainApi.setToken(token);
					setCurrentUser(res);
				})
				.catch(() => {
					setLoggedIn(false)
					console.error(`Получение информации профиля, App`);
				})
		};
	}, []);

	const handleUpdateUser = (name, email) => {
		setIsLocked(true);
		return (
			mainApi.updateUserData(name, email)
				.then((currentUser) => {
					setCurrentUser(currentUser);
				})
				.catch((err) => console.log(err))
				.finally(() => setIsLocked(false))
		);
	};

	const handleRegister = (name, email, password) => {
		Auth.register({ name, email, password })
			.then(res => {
				handleLogin(email, password)
			})
			.catch((err) => {
				if (err === 400) {
					setServerResponseError(SIGNUP_BAD_DATA_MESSAGE);
				};

				if (err === 409) {
					setServerResponseError(SIGNUP_CONFLICT_MESSAGE);
				} else {
					setServerResponseError(SIGNUP_DEFAULT_ERROR);
				};

				console.error(`Регистрация нового пользователя, App`);
			})
	};

	const handleLogin = (email, password) => {
		Auth.login({ email, password })
			.then((data) => {
				localStorage.setItem('jwt', data.token);
				mainApi.setToken(data.token);
				setLoggedIn(true);
				navigate('/movies');
			})
			.catch((err) => {
				if (err === 401) {
					setServerResponseError(SIGNIN_BAD_DATA_MESSAGE);
				} else {
					setServerResponseError(SIGNIN_DEFAULT_ERROR);
				}
				console.error(`Войти в аккаунт, App`);
			})
	};

	function handleSignOut() {
		localStorage.removeItem('jwt');
		localStorage.removeItem('combinedMoviesArray');
		localStorage.removeItem('isShortMovies');
		localStorage.removeItem('lastSearchString');
		setLoggedIn(false);
		navigate('/');
	};

	const handleSubmitSearch = () => {
		if (
			localStorage.getItem('combinedMoviesArray') &&
			JSON.parse(localStorage.getItem('combinedMoviesArray'))?.length !== 0
		) {
			return Promise.resolve(
				JSON.parse(localStorage.getItem('combinedMoviesArray'))
			);
		}
		return Promise.all([
			moviesApi.getInitialMovies(),
			mainApi.getMovies()
		])
			.then(([initialMovies, savedMovies]) => {
				const combinedMoviesArray = initialMovies.map((initialMovie) => {
					const savedMovie = savedMovies.find((savedMovieItem) => {
						return savedMovieItem.movieId === initialMovie.id;
					});

					initialMovie.thumbnail =
						BASE_MOVIES_URL + initialMovie.image.formats.thumbnail.url;
					initialMovie.image = BASE_MOVIES_URL + initialMovie.image.url;

					if (savedMovie !== undefined) {
						initialMovie._id = savedMovie._id;
					} else {
						initialMovie._id = '';
					}

					return initialMovie;
				});
				localStorage.setItem(
					'combinedMoviesArray',
					JSON.stringify(combinedMoviesArray)
				);
				setServerResponseError('');
				setCombinedMoviesArray(combinedMoviesArray);
				return combinedMoviesArray;
			})
			.catch((err) => {
				setServerResponseError(err.message);
				console.log(`Ошибка при получении фильмов, App: ${err.message}`);
			});
	};

	const handleSaveMovie = (movie) => {
		return mainApi
			.saveMovie(movie)
			.then((savedMovie) => {
				const updatedMoviesArray = combinedMoviesArray.map((serverMovie) => {
					if (serverMovie.id === savedMovie.movieId) {
						serverMovie._id = savedMovie._id;
						serverMovie.thumbnail = savedMovie.thumbnail;
						serverMovie.image = savedMovie.image;
					}
					return serverMovie;
				});
				setCombinedMoviesArray(updatedMoviesArray);
				localStorage.setItem(
					'combinedMoviesArray',
					JSON.stringify(updatedMoviesArray)
				);
			})
			.catch((err) => console.log(err));
	};

	const handleDeleteMovie = (id) => {
		return mainApi
			.deleteMovie(id)
			.then((deletedMovie) => {
				const updatedMoviesArray = combinedMoviesArray.map((serverMovie) => {
					if (serverMovie._id === deletedMovie._id) {
						serverMovie._id = '';
					}
					return serverMovie;
				});
				setCombinedMoviesArray(updatedMoviesArray);
				localStorage.setItem(
					'combinedMoviesArray',
					JSON.stringify(updatedMoviesArray)
				);
			})
			.catch((err) => console.log(err));
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="app">
				<Routes>

					{/* Доступные роуты */}
					<Route
						path='/'
						element={<Main
							loggedIn={loggedIn}
							setMenuActive={setLoggedIn}
						/>}
					/>

					<Route
						path='/signin'
						element={<Login
							onLogin={handleLogin}
							serverResponseError={serverResponseError}
							setServerResponseError={setServerResponseError}
						/>}
					/>

					<Route
						path='signup'
						element={<Register
							onRegister={handleRegister}
							serverResponseError={serverResponseError}
							setServerResponseError={setServerResponseError}
						/>}
					/>

					<Route path="*" element={<PageNotFound />} />

					{/* Защищенные роуты */}
					<Route
						path='/movies'
						element={<ProtectedRoute
							element={Movies}
							loggedIn={loggedIn}
							onSearch={handleSubmitSearch}
							onSaveMovie={handleSaveMovie}
							onDeleteMovie={handleDeleteMovie}
							setCombinedMoviesArray={setCombinedMoviesArray}
							serverResponseError={serverResponseError}
						/>}

					/>
					<Route
						path='/saved-movies'
						element={<ProtectedRoute
							element={SavedMovies}
							loggedIn={loggedIn}
							onSearch={handleSubmitSearch}
							onDeleteMovie={handleDeleteMovie}
							combinedMoviesArray={combinedMoviesArray}
							setCombinedMoviesArray={setCombinedMoviesArray}
						/>}
					/>

					<Route
						path='/profile'
						element={<ProtectedRoute
							element={Profile}
							loggedIn={loggedIn}
							onUpdateUser={handleUpdateUser}
							onSignOut={handleSignOut}
							isLocked={isLocked}
						/>}
					/>

				</Routes>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

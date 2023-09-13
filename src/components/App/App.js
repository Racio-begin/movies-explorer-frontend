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
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

import {
	SIGNIN_BAD_DATA_MESSAGE,
	SIGNUP_BAD_DATA_MESSAGE,
	SIGNIN_DEFAULT_ERROR,
	SIGNUP_CONFLICT_MESSAGE,
	SIGNUP_DEFAULT_ERROR,
	SERVER_ERROR_500,
} from '../../utils/informMessages';

import {
	isMovieSaved,
	getMovieMyId,
} from '../../utils/checkSavedMovies';

import mainApi from '../../utils/MainApi';
import * as Auth from '../../utils/Auth';

import './App.css';

function App() {

	const token = localStorage.getItem("jwt");

	//* Стейты *//
	const [loggedIn, setLoggedIn] = useState(!!token);

	const [currentUser, setCurrentUser] = useState({});

	const [isLockedButton, setIsLockedButton] = useState(false);

	const [serverResponseError, setServerResponseError] = useState('');

	const [combinedMoviesArray, setCombinedMoviesArray] = useState([]);

	const [savedMovies, setSavedMovies] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		handleCheckToken()
		loadSavedMovies()
	}, [loggedIn]);

	const handleCheckToken = () => {
		if (token) {
			Auth
				.checkToken(token)
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
	};

	// получаем сохраненные фильмы для авторизованного пользователя
	function loadSavedMovies() {
		mainApi.getMovies()
			.then((moviesResponse) => {
				setSavedMovies(moviesResponse);
			})
			.catch((err) => console.log(err));
	}

	const handleUpdateUser = (name, email) => {
		setIsLockedButton(true);
		return (
			mainApi
				.updateUserData(name, email)
				.then((currentUser) => {
					setCurrentUser(currentUser);
				})
				.catch((err) => {
					console.log(err)
					if (err === 500) {
						setServerResponseError(SERVER_ERROR_500)
					};
				})
				.finally(() => setIsLockedButton(false))
		);
	};

	const handleRegister = (name, email, password) => {
		setIsLockedButton(true);
		return (
			Auth
				.register({ name, email, password })
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
				.finally(() => setIsLockedButton(false))
		)
	};

	const handleLogin = (email, password) => {
		return (
			Auth
				.login({ email, password })
				.then((data) => {
					localStorage.setItem('jwt', data.token);
					mainApi.setToken(data.token);
					setLoggedIn(true);
					navigate('/movies', { replace: true });
				})
				.catch((err) => {
					if (err === 401) {
						setServerResponseError(SIGNIN_BAD_DATA_MESSAGE);
					} else {
						setServerResponseError(SIGNIN_DEFAULT_ERROR);
					}
					console.error(`Войти в аккаунт, App`);
				})
				.finally(() => setIsLockedButton(false))
		)
	};

	function handleToggleSave(movie) {
		if (!isMovieSaved(movie, savedMovies)) {
			// сохраняем фильм
			const movieDataForApiCall = {
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				image: movie.imageFull,
				trailerLink: movie.trailerLink,
				thumbnail: movie.thumbnailFull,
				movieId: movie.id,
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
			};

			mainApi.saveMovie(movieDataForApiCall)
				.then((result) => setSavedMovies([result, ...savedMovies]))
				.catch((err) => console.log(err));
		}
		else {
			const myId = getMovieMyId(movie, savedMovies);
			// удаляем фильм
			mainApi.deleteMovie(myId)
				.then(() => setSavedMovies(savedMovies.filter((item) => { return item._id !== myId })))
				.catch((err) => console.log(err));
		}
	};

	function handleSignOut() {
		localStorage.removeItem('jwt');
		localStorage.removeItem('MoviesSearchData');
		localStorage.removeItem('firstVisit');
		setCurrentUser({});
		setLoggedIn(false);
		navigate('/');
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<SavedMoviesContext.Provider value={{
				savedMovies: savedMovies,
				toggleSaveHandler: handleToggleSave
			}}>

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
								setCombinedMoviesArray={setCombinedMoviesArray}
								serverResponseError={serverResponseError}
							/>}

						/>
						<Route
							path='/saved-movies'
							element={<ProtectedRoute
								element={SavedMovies}
								loggedIn={loggedIn}
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
								isLockedButton={isLockedButton}
								serverResponseError={serverResponseError}
							/>}
						/>

					</Routes>
				</div>
			</SavedMoviesContext.Provider>
		</CurrentUserContext.Provider>
	);
}

export default App;

import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

// import ProtectedRoute from '../ProtectedRoute';

import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import api from '../../utils/Api';
import * as Auth from '../../utils/Auth';

import './App.css';

function App() {

	// Стейты
	const [userData, setUserData] = useState({ name: "", email: "", password: "" });
	// Состояние залогирования пользователя
	const [loggedIn, setLoggedIn] = useState(false);

	const [currentUser, setCurrentUser] = useState({});

	const navigate = useNavigate();

	const token = localStorage.getItem("jwt");

	useEffect(() => {
		handleCheckToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	useEffect(() => {
		loggedIn &&
			api.getUserData()
				.then((userData) => {
					setCurrentUser(userData);
				})
				.catch(() => console.error(`Получение информации профиля, App`))
	}, [loggedIn]);

	const handleRegister = (name, email, password) => {
		// const { name, email, password } = userData;
		Auth.register({ name, email, password })
			.then(res => {
				handleLogin(email, password)
				// navigate('/movies');
			})
			.catch(() => {
				console.error(`Зарегистрировать аккаунт, App`);
			})
	};

	const handleLogin = (email, password) => {
		Auth.login({ email, password })
			.then((data) => {
				localStorage.setItem('jwt', data.token);
				api.setToken(data.token);
				setLoggedIn(true);
				// setUserData({ email, password });
				// setCurrentUser(data.user);
				navigate('/movies');
			})
			.catch(() => {
				console.error(`Войти в аккаунт, App`);
			})
	};

	const handleCheckToken = () => {
		if (token) {
			Auth.checkToken(token)
				.then((res) => {
					if (!res) {
						return
					};

					setLoggedIn(true);
					api.setToken(token);
					setUserData({ name: res.name, email: res.email });
					// navigate("/movies", { replace: true });
				})
				.catch(() => {
					setLoggedIn(false)
					console.error(`Проверить jwt-токен на валидность, App`);
				})
		};
	};

	function handleSignOut() {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		navigate('/');
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="app">
				<Routes>

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
						/>}
					/>

					<Route
						path='signup'
						element={<Register
							onRegister={handleRegister}
						/>}
					/>

					<Route
						path='/movies'
						element={<Movies
							loggedIn={loggedIn}
						/>}
					// 		<ProtectedRoute element={Movies}
					// 		/>}
					/>

					<Route
						path='/saved-movies'
						element={<SavedMovies
							loggedIn={loggedIn}
						/>}
					// <ProtectedRoute element={SavedMovies}
					// />}
					/>

					<Route
						path='/profile'
						element={<Profile
							loggedIn={loggedIn}
							onSignOut={handleSignOut}
						/>}
					// <ProtectedRoute element={Profile}
					// />}
					/>

					<Route path="*" element={<PageNotFound />} />

				</Routes>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;

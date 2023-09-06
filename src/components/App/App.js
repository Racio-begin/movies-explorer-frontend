import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import api from '../../utils/Api';
import * as Auth from '../../utils/Auth';

import './App.css';

function App() {

	const token = localStorage.getItem("jwt");

	//* Стейты *//
	// const [userData, setUserData] = useState({ name: "", email: "", password: "" });

	// Состояние залогирования пользователя
	// const [loggedIn, setLoggedIn] = useState(true);
	const [loggedIn, setLoggedIn] = useState(!!token);

	const [currentUser, setCurrentUser] = useState({});

	const [isLocked, setIsLocked] = useState(false);

	const [serverResponseError, setServerResponseError] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			Auth.checkToken(token)
				.then((res) => {
					if (!res) {
						return
					};
					setLoggedIn(true);
					api.setToken(token);
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
      api.updateUserData(name, email)
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
				setServerResponseError(err);
				console.error(`Регистрация нового пользователя, App`);
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

	// const handleCheckToken = () => {
	// 	if (token) {
	// 		Auth.checkToken(token)
	// 			.then((res) => {
	// 				if (!res) {
	// 					return
	// 				};

	// 				setLoggedIn(true);
	// 				api.setToken(token);
	// 				setUserData({ name: res.name, email: res.email });
	// 				// navigate("/movies", { replace: true });
	// 			})
	// 			.catch(() => {
	// 				setLoggedIn(false)
	// 				console.error(`Проверить jwt-токен на валидность, App`);
	// 			})
	// 	};
	// };

	function handleSignOut() {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		navigate('/');
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
						/>}

					/>
					<Route
						path='/saved-movies'
						element={<ProtectedRoute
							element={SavedMovies}
							loggedIn={loggedIn}
						/>}
					/>

					<Route
						path='/profile'
						element={<ProtectedRoute
							element={Profile}
							loggedIn={loggedIn}
							// userData={userData}
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

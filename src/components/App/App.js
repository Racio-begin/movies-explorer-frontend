import React,
{
	useState,
	// useEffect
} from 'react';

import { Route, Routes } from 'react-router-dom';

// import ProtectedRoute from '../ProtectedRoute';

import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

import './App.css';

function App() {

	const [loggedIn, setLoggedIn] = useState(true);
	// const [loggedIn, setLoggedIn] = useState(false);

	const [menuActive, setMenuActive] = useState(false);

	return (
		<div className="app">
			<Routes>
				<Route
					path='/'
					element={<Main
						className={menuActive ? "app menu-open" : "app"}
						loggedIn={loggedIn}
						menuActive={menuActive}
						setMenuActive={setMenuActive}
					/>}
				/>
				<Route
					path='/signin'
					element={<Login />}
				/>
				<Route
					path='signup'
					element={<Register />}
				/>
				<Route
					path='/movies' element={<Movies
						menuActive={menuActive}
						setMenuActive={setMenuActive}
					/>}
				// 		<ProtectedRoute element={Movies}
				// 		/>}
				/>
				<Route
					path='/saved-movies' element={<SavedMovies
						menuActive={menuActive}
						setMenuActive={setMenuActive}
					/>}
				// <ProtectedRoute element={SavedMovies}
				// />}
				/>
				<Route
					path='/profile' element={<Profile />}
				// <ProtectedRoute element={Profile}
				// />}
				/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</div>
	);
}

export default App;

import React from 'react';
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
	return (
		<div className="app">
			<Routes>
				<Route
					path='/'
					element={Main}
				/>
				{/* <Route
					path='/sign-in'
					element={Login}
				/> */}
				{/* <Route
					path='sign-up'
					element={Register}
				/> */}
				{/* <Route
					path='/movies' element={Movies} 
						<ProtectedRoute element={Movies}
						/>}
				/> */}
				{/* <Route
					path='/saved-movies' element={SavedMovies}
						<ProtectedRoute element={SavedMovies}
						/>}
				/> */}
				{/* <Route
					path='/profile' element={Profile}
						<ProtectedRoute element={Profile}
						/>}
				/> */}
				{/* <Route path="*" element={<PageNotFound />} /> */}
			</Routes>
			<Main />
		</div>
	);
}

export default App;

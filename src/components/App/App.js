import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute';

import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
	return (
		<div className="app">
			<Routes>
				<Route
					path='/'
					element={Main}
				/>
				<Route
					path='/sign-in'
					element={Login}
				/>
				<Route
					path='sign-up'
					element={Register}
				/>
				<Route
					path='/movies' element={
						<ProtectedRoute element={Movies}
						/>}
				/>
				<Route
					path='/saved-movies' element={
						<ProtectedRoute element={SavedMovies}
						/>}
				/>
				<Route
					path='/profile' element={
						<ProtectedRoute element={Profile}
						/>}
				/>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Main />
		</div>
	);
}

export default App;

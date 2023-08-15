import { Link, Route, Routes } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';

function Header({ handleLogin, handleProfile }) {

	return (
		<div className="header">

			<img
				className="header__logo"
				src={logo}
				alt="Логотип сайта Giga-movies"
			/>

			<Routes>

				<Route path="/" element={
					<div className="header__landing">

						<Link className="header__link" to="/sign-up">Регистрация</Link>

						<button
							className="header__login-button"
							type="button"
							onClick={handleLogin}>
							Войти
						</button>

					</div>
				}>
				</Route>

				<Route path="/movies" element={
					<div className="header__movies">

						<div className="header__navbar">
							<Link className="header__link" to="/movies">Фильмы</Link>
							<Link className="header__link" to="/movies">Сохранённые фильмы</Link>
						</div>

						<button
							className="header__profile"
							type="button"
							onClick={handleProfile}>
						</button>

					</div>
				}>
				</Route>

			</Routes>
		</div>
	);
};

export default Header;
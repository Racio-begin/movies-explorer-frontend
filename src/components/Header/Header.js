import { Link, Route, Routes } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';

function Header({ handleLogin, handleProfile }) {

	return (
		<div className="header">

			<Logo/>

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
				}></Route>

				<Route path="/movies" element={
					<div className="header__movies">
						<div>
						</div>

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
				}></Route>

			</Routes>

		</div>
	);

};

export default Header;
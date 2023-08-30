import {
	Link,
	// Route,
	// Routes,
	useNavigate
} from 'react-router-dom';

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ProfileButton from '../ProfileButton/ProfileButton';
import './Navigation.css';

function Navigation({ loggedIn, menuActive, setMenuActive }) {

	const navigate = useNavigate();

	function handleLogin() {
		navigate('/sign-in');
	};

	function handleNavigation() {
		if (loggedIn) {
			return (
				<div className="navigation__landing">

					<Link className="navigation__link link" to="/sign-up">Регистрация</Link>

					<button
						className="navigation__login-button button"
						type="button"
						onClick={handleLogin}>
						Войти
					</button>

				</div>
			)
		} else {
			return (
				// <div className="header__movies">
				<>
					<div className="navigation__navbar">
						<Link className="navigation__link navigation__link_active link" to="/movies">Фильмы</Link>
						<Link className="navigation__link link" to="/saved-movies">Сохранённые фильмы</Link>
					</div>

					<ProfileButton />

					<BurgerMenu
						setMenuActive={setMenuActive}
					/>

					<button
						className="header__burger-button button"
						onClick={() => setMenuActive(!menuActive)}
					>

						<span></span>
						<span></span>
						<span></span>

					</button>
				</>
				// {/* </div> */ }
			);
		}
	};

	return handleNavigation();
};

export default Navigation;
	// return (
	// 	<div className="navigation">
	// 		<Routes>

	// 			<Route path="/" element={
	// 				<div className="header__landing">

	// 					<Link className="header__link" to="/sign-up">Регистрация</Link>

	// 					<button
	// 						className="header__login-button"
	// 						type="button"
	// 						onClick={handleLogin}>
	// 						Войти
	// 					</button>

	// 				</div>
	// 			} />

	// 			<Route path="movies" element={
	// 				<div className="header__movies">

	// 					<div className="header__navbar">
	// 						<Link className="header__link" to="/movies">Фильмы</Link>
	// 						<Link className="header__link" to="/saved-movies">Сохранённые фильмы</Link>
	// 					</div>

	// 					<button
	// 						className="header__profile"
	// 						type="button"
	// 						onClick={handleProfile}>
	// 					</button>

	// 				</div>
	// 			} />

	// 		</Routes>
	// 	</div>
	// );

import { Link, NavLink, useNavigate } from 'react-router-dom';

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ProfileButton from '../ProfileButton/ProfileButton';
import './Navigation.css';

function Navigation({ loggedIn, menuActive, setMenuActive }) {

	const navigate = useNavigate();

	function handleLogin() {
		navigate('/signin');
	};

	function handleNavigation() {
		if (!loggedIn) {
			return (
				<nav className="navigation">
					<div className="navigation__landing">

						<Link className="navigation-link link" to="/signup">Регистрация</Link>

						<button
							className="navigation__login-button button"
							type="button"
							onClick={handleLogin}>
							Войти
						</button>

					</div>
				</nav>
			)
		} else {
			return (
				<>
					<nav className="navigation-navbar">
						<NavLink
							className="navigation-link link"
							activeClassName="active"
							to="/movies">
							
							Фильмы
						</NavLink>
						<NavLink
							className="navigation-link link"
							activeClassName="active"
							to="/saved-movies">
							Сохранённые фильмы
						</NavLink>
					</nav>

					<ProfileButton />

					<BurgerMenu
						setMenuActive={setMenuActive}
					/>

					<button
						className="header__burger-button button"
						onClick={() => setMenuActive(!menuActive)}
						type="button"
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</>
			);
		}
	};

	return handleNavigation();
};

export default Navigation;

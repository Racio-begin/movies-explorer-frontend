import { useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

import './Header.css';

function Header({ loggedIn }) {

	const [menuActive, setMenuActive] = useState(false);

	return (
		// <div className="header open">
		<div className={menuActive ? 'header open' : 'header'}>
			<Logo />
			<Navigation loggedIn={loggedIn} />
			<BurgerMenu />

			<button
				className="header__burger-button"
				onClick={() => setMenuActive(!menuActive)}
			>

				<span></span>
				<span></span>
				<span></span>

			</button>
		</div>
	);
};

export default Header;
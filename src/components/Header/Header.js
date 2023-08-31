import { useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';


import './Header.css';

function Header({ loggedIn, menuActive, setMenuActive }) {

	return (
		// <div className="header open">
		<header className={menuActive ? "header open menu-opened" : "header"}>
			<Logo />
			<Navigation
				loggedIn={loggedIn}
				menuActive={menuActive}
				setMenuActive={setMenuActive}
			/>
		</header>
	);
};

export default Header;
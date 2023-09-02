import { useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';


import './Header.css';

function Header({ loggedIn, setLoggedIn }) {

	const [menuActive, setMenuActive] = useState(false);

	return (
		// <div className="header open">
		<header className={menuActive ? "header open" : "header"}>
			<Logo />
			<Navigation
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				menuActive={menuActive}
				setMenuActive={setMenuActive}
			/>
		</header>
	);
};

export default Header;
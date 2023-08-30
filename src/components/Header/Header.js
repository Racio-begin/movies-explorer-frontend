import { useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';


import './Header.css';

function Header({ loggedIn }) {

	const [menuActive, setMenuActive] = useState(false);

	return (
		// <div className="header open">
		<div className={menuActive ? 'header open' : 'header'}>
			<Logo />
			<Navigation loggedIn={loggedIn} />
		</div>
	);
};

export default Header;
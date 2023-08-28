import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
	return (
		<div className="header">
			<Logo />
			<Navigation loggedIn={loggedIn}/>
		</div>
	);
};

export default Header;
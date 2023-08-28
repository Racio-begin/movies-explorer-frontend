import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header() {
	return (
		<div className="header">
			<Logo />
			<Navigation />
		</div>
	);
};

export default Header;
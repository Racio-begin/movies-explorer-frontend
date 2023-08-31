import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";
import Techs from "../Techs/Techs";
import AboutProjects from "../AboutProjects/AboutProjects";

import './Main.css';

function Main({ loggedIn, menuActive, setMenuActive }) {

	return (
		<div className="main">
			<Header
				loggedIn={loggedIn}
				menuActive={menuActive}
				setMenuActive={setMenuActive}
			/>
			<main>
				<Promo />
				<AboutProjects />
				<Techs />
				<AboutMe />
			</main >
			<Footer />
		</div >
	);
};

export default Main;
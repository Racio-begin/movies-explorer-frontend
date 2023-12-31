import Header from "../Header/Header";
import Promo from "../Promo/Promo";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";
import Techs from "../Techs/Techs";
import AboutProjects from "../AboutProjects/AboutProjects";

import './Main.css';

function Main({ loggedIn }) {

	return (
		<div className="main">
			<Header
				loggedIn={loggedIn}
			/>
			<main className="main__container">
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
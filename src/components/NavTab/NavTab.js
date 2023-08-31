import React from "react";
import './NavTab.css';

function NavTab() {

	return (
		<nav className="navtab">
			<ul className="navtab__links">

				<li>
					<a
						href="#about-projects"
						className="navtab__link link"
					>О проекте
					</a>
				</li>

				<li>
					<a
						href="#techs"
						className="navtab__link link"
					>Технологии
					</a>
				</li>

				<li>
					<a
						href="#about-me"
						className="navtab__link link"
					>Студент
					</a>
				</li>

			</ul>
		</nav>
	);

};

export default NavTab;
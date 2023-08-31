import './Portfolio.css';
import ProjectLink from '../ProjectLink/ProjectLink';

function Portfolio() {

	return (
		<ul className="portfolio">
			<h3 className="portfolio__title">Портфолио</h3>
			<div className="portfolio__projects">
				<ProjectLink
					linkName="Статичный сайт"
					linkProject="https://github.com/Racio-begin/how-to-learn"
				/>
				<ProjectLink
					linkName="Адаптивный сайт"
					linkProject="https://giga-mesto.nomoredomains.xyz"
				/>
				<ProjectLink
					linkName="Одностраничное приложение"
					linkProject="https://github.com/Racio-begin/russian-travel"
				/>
			</div>
		</ul>
	);
};

export default Portfolio;
import './Techs.css';

function Techs() {

	return (
		<section className="techs" id="techs">
			<h2 className="techs__title">Технологии</h2>

			<div className="techs__description">

				<div className="techs__description-title">
					7 технологий
				</div>

				<div className="techs__description-subtitle">
					На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
				</div>

				<ul className="techs__decription-web-techs">
					<li className="techs__decription-web-techs_item">HTML</li>
					<li className="techs__decription-web-techs_item">CSS</li>
					<li className="techs__decription-web-techs_item">JS</li>
					<li className="techs__decription-web-techs_item">React</li>
					<li className="techs__decription-web-techs_item">Git</li>
					<li className="techs__decription-web-techs_item">Express.js</li>
					<li className="techs__decription-web-techs_item">mongoDB</li>
				</ul>

			</div>

		</section>
	);
};

export default Techs;
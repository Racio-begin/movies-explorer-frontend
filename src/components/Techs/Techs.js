import './Techs.css';

function Techs() {

	return (
		<div className="techs">
			<h2 className="techs__title">Технологии</h2>

			<div className="techs__description">

				<div className="techs__description-title">
					7 технологий
				</div>

				<div className="techs__description-subtitle">
					На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
				</div>

				<div className="techs__decription-web-techs">
					<div className="techs__decription-web-techs_item">HTML</div>
					<div className="techs__decription-web-techs_item">CSS</div>
					<div className="techs__decription-web-techs_item">JS</div>
					<div className="techs__decription-web-techs_item">React</div>
					<div className="techs__decription-web-techs_item">Git</div>
					<div className="techs__decription-web-techs_item">Express.js</div>
					<div className="techs__decription-web-techs_item">mongoDB</div>
				</div>

			</div>

		</div>
	);
};

export default Techs;
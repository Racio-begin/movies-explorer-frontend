import './Techs.css';

function Techs() {

	return (
		<section className="techs" id="techs">
			<h2 className="techs__title">Технологии</h2>

			<div className="techs__description">

				<h3 className="techs__description-title">
					7 технологий
				</h3>

				<p className="techs__description-subtitle">
					На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
				</p>

				<ul className="techs__decription-list ul">
					<li className="techs__decription-item">HTML</li>
					<li className="techs__decription-item">CSS</li>
					<li className="techs__decription-item">JS</li>
					<li className="techs__decription-item">React</li>
					<li className="techs__decription-item">Git</li>
					<li className="techs__decription-item">Express.js</li>
					<li className="techs__decription-item">mongoDB</li>
				</ul>

			</div>

		</section>
	);
};

export default Techs;
import './Footer.css';

function Footer({ }) {

	const setCurrentYear = () => {
		return new Date().getFullYear()
	};

	return (
		<footer className="footer">

			<div className="footer__title">
				Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
			</div>

			<div className="footer__container">

				<p className="footer__copyright footer__text-style">
					© {setCurrentYear()}
				</p>

				<ul className="footer__links">

					<li>
						<a
							className="footer__link footer__text-style link"
							href="https://practicum.yandex.ru"
							lang="ru"
							target="_blank"
							rel="noreferrer"
						>Яндекс.Практикум
						</a>
					</li>

					<li>
						<a
							className="footer__link footer__text-style link"
							href="https://github.com/Racio-begin"
							lang="en"
							target="_blank"
							rel="noreferrer"
						>Github
						</a>
					</li>

				</ul>

			</div>

		</footer>
	);
};

export default Footer;
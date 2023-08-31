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

				<div className="footer__links">

					<a
						className="footer__link footer__text-style link"
						href="https://practicum.yandex.ru"
						lang="ru"
						target="_blank"
						rel="noreferrer"
					>Яндекс.Практикум
					</a>
					<a
						className="footer__link footer__text-style link"
						href="https://github.com/Racio-begin"
						lang="en"
						target="_blank"
						rel="noreferrer"
					>Github
					</a>

				</div>

			</div>

		</footer>
	);
};

export default Footer;
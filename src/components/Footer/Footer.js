import './Footer.css';

function Footer({ }) {

	const setCurrentYear = () => {
		return new Date().getFullYear()
	};

	return (
		<div className="footer">

			<div className="footer__title">
				Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
			</div>

			<div className="footer__container">

				<p className="footer__copyright footer__text-style">
					© {setCurrentYear()}
				</p>

				<div className="footer__links">

					<a
						className="footer__link footer__text-style"
						href="https://practicum.yandex.ru"
						lang="ru"
					>Яндекс.Практикум
					</a>
					<a
						className="footer__link footer__text-style"
						href="https://github.com/Racio-begin"
						lang="en"
					>Github
					</a>

				</div>

			</div>

		</div>
	);
};

export default Footer;
import './Footer.css';

import { MY_GITHUB } from '../../utils/links';

function Footer() {

	const setCurrentYear = () => {
		return new Date().getFullYear()
	};

	return (
		<footer className="footer">

			<p className="footer__title">
				Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
			</p>

			<div className="footer__container">

				<p className="footer__copyright footer__text-style">
					© {setCurrentYear()}
				</p>

				<ul className="footer__links ul">

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
							href={MY_GITHUB}
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
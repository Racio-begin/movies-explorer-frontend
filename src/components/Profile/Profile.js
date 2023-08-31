import { Link } from "react-router-dom";
import Header from '../Header/Header';
import './Profile.css'

function Profile() {

	return (
		<section className="profile">

			<Header />

			<main className="profile__container">

				<h1 className="profile__title">Привет, сосед!</h1>

				<div className="profile__form">
					<div className="profile__form_input">

						<div
							className="profile__span"
						>Имя
						</div>
						<input
							className="profile__input"
							placeholder="Имя"
							minLength={2}
							maxLength={20}>
						</input>
					</div>

					<span></span>

					<div className="profile__form_input">
						<div
							className="profile__span"
						>E-mail
						</div>
						<input
							className="profile__input"
							placeholder="E-mail">
						</input>
					</div>

				</div>

				<div className="profile__footer">

					<button
						className="profile__edit button">
						Редактировать
					</button>

					<Link to="/" className="profile__logout link">
						Выйти из аккаунта
					</Link>
				</div>

			</main>

		</section>
	);
};

export default Profile;
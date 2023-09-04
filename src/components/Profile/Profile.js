import { Link } from "react-router-dom";
import Header from '../Header/Header';
import './Profile.css'

function Profile({ onSignOut, loggedIn }) {

	return (
		<div className="profile">

			<Header
				loggedIn={loggedIn}
			/>

			<section className="profile__container">

				<h1 className="profile__title">Привет, сосед!</h1>

				<form className="profile__form">
					<div className="profile__form-container profile__form-container_active-border">

						<div
							className="profile__label"
						>
							Имя
						</div>

						<input
							className="profile__input"
							placeholder="Имя"
							minLength={2}
							maxLength={20}>
						</input>

					</div>

					<div className="profile__form-container">

						<div
							className="profile__label"
						>E-mail
						</div>

						<input
							className="profile__input"
							placeholder="E-mail">
						</input>

					</div>
				</form>

				<div className="profile__footer">

					<button
						className="profile__edit button"
						type="button">
						Редактировать
					</button>

					<Link
						to="/"
						className="profile__logout link"
						onClick={onSignOut}
					>
						Выйти из аккаунта
					</Link>
				</div>

			</section>

		</div>
	);
};

export default Profile;
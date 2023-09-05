import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from '../Header/Header';
import './Profile.css'

function Profile({ loggedIn, userData, onUpdateUser, onSignOut }) {

	const currentUser = useContext(CurrentUserContext);

	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');

	useEffect(() => {
		setUserName(currentUser.userName);
		setUserEmail(currentUser.userEmail);
	}, [currentUser]);

	function handleChangeUserName(e) {
		setUserName(e.target.value)
	};

	function handleChangeEmail(e) {
		setUserEmail(e.target.value)
	};

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name: userName,
			email: userEmail,
		});
	};

	return (
		<div className="profile">

			<Header
				loggedIn={loggedIn}
			/>

			<section
				className="profile__container"
				onSubmit={handleSubmit}
			>

				<h1 className="profile__title">Привет, {userData.name}!</h1>

				<form className="profile__form">
					<div className="profile__form-container profile__form-container_active-border">

						<div className="profile__label">
							Имя
						</div>

						<input
							className="profile__input"
							placeholder="Имя"
							value={userName || ''}
							minLength={2}
							maxLength={20}
							onChange={handleChangeUserName}
						>
						</input>

					</div>

					<div className="profile__form-container">

						<div className="profile__label">
							E-mail
						</div>

						<input
							className="profile__input"
							placeholder="E-mail"
							value={userEmail || ''}
							onChange={handleChangeEmail}
						>
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
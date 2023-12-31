import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';

import { REGEX_EMAIL, REGEX_NAME } from '../../utils/regex';
import { EMAIL_INFO_MESSAGE } from '../../utils/informMessages';
import {
	UPDATE_SUCCESS_MESSAGE,
	USER_BAD_DATA_ERROR,
} from '../../utils/informMessages';

import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Profile.css';

function Profile({
	loggedIn,
	onUpdateUser,
	onSignOut,
	isLockedButton,
	serverResponseError,
}) {

	const currentUser = useContext(CurrentUserContext);

	const [readyToSave, setReadyToSave] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const { values, setValues, isValid, setIsValid, handleChange, errors } =
		useFormWithValidation();

	const handleSubmit = (e) => {
		e.preventDefault();

		const name = values.name;
		const email = values.email;

		onUpdateUser(name, email)
			.then(() => {
				setSuccessMessage(UPDATE_SUCCESS_MESSAGE);
			})
			.catch((err) => {
				if (err) {
					setErrorMessage(serverResponseError)
				}
				setErrorMessage(USER_BAD_DATA_ERROR);
			})
	};

	useEffect(() => {
		if (
			values.name === currentUser.name &&
			values.email === currentUser.email
		) {
			return setIsValid(false);
		}
	}, [values, currentUser]);

	useEffect(() => {
		setErrorMessage('');
	}, [values]);

	const handleEditProfile = () => {
		setReadyToSave(true);
	};

	useEffect(() => {
		setValues((prevState) => {
			return {
				...prevState,
				name: currentUser.name,
				email: currentUser.email
			};
		});
	}, [currentUser]);

	const handleFocus = () => {
		setSuccessMessage('');
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

				<h1 className="profile__title">Привет, {currentUser.name}!</h1>

				<form className="profile__form">
					<div className="profile__form-container profile__form-container_active-border">

						<div
							className="profile__label"
						// htmlFor="name"
						>
							Имя
						</div>

						<input
							className="profile__input"
							placeholder="Имя"
							name="name"
							required={true}
							value={values.name || ''}
							minLength={2}
							maxLength={30}
							pattern={REGEX_NAME}
							onChange={handleChange}
							onFocus={handleFocus}
						/>


					</div>
					<span className='profile__input-error'>{errors.name}</span>

					<div className="profile__form-container">

						<div
							className="profile__label"
						// htmlFor="email"
						>
							E-mail
						</div>

						<input
							className="profile__input"
							placeholder="E-mail"
							name="email"
							required={true}
							value={values.email || ''}
							pattern={REGEX_EMAIL}
							titleText={EMAIL_INFO_MESSAGE}
							onChange={handleChange}
							onFocus={handleFocus}
						/>


					</div>
					<span className='profile__input-error'>{errors.email}</span>

					<div className="profile__footer">
						{readyToSave ? (
							<>
								<p
									className={`profile__submit-message
										${successMessage && 'profile__submit-message_type-succsess'}
										${serverResponseError && errorMessage && 'profile__submit-message_type-error'}
									`}
								>
									{errorMessage || successMessage}
								</p>
								<button
									className='profile__submit-button button'
									type='submit'
									onClick={() => { }}
									disabled={!isValid || errorMessage || isLockedButton}
								>
									Сохранить
								</button>
							</>
						) : (
							<>
								<button
									className="profile__edit-button button"
									type="button"
									onClick={handleEditProfile}
								>
									Редактировать
								</button>

								<Link
									to="/"
									className="profile__logout link"
									onClick={onSignOut}
								>
									Выйти из аккаунта
								</Link>
							</>
						)}
					</div>
				</form>

			</section>

		</div>
	);
};

export default Profile;
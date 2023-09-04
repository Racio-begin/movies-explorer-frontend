import { useState } from "react";
import './Login.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

function Login({ onLogin }) {

	const [formValue, setFormValue] = useState({
		email: '',
		password: ''
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValue({
			...formValue,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		onLogin(formValue);
	};

	return (
		<main>
			<Form
				title="Рады видеть!"
				buttonText="Войти"
				questionText="Ещё не зарегистрированы?"
				link="/signup"
				linkText=" Регистрация"
				onSubmit={handleSubmit}
			>

				<FormLabel
					labelName="E-mail"
					type="email"
					inputName="email"
					id="email"
					value={formValue.email || ''}
					onChange={handleChange}
					placeholder="Введите e-mail"
					minLength={5}
					maxLength={40}
					required={true}
					spanMessage='Адрес электронной почты должен содержать символ "@".'
				/>

				<FormLabel
					labelName="Пароль"
					type="password"
					inputName="password"
					id="password"
					value={formValue.password || ''}
					onChange={handleChange}
					placeholder="Введите пароль"
					minLength={5}
					maxLength={40}
					required={true}
					spanMessage='Заполните поле "Пароль"'
				/>

			</Form>
		</main>
	);
};

export default Login;
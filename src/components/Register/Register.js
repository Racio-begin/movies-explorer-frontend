import { useState } from "react";
import './Register.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

function Register({ onRegister }) {

	const [formValue, setFormValue] = useState({
		name: '',
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

		onRegister(formValue.name, formValue.email, formValue.password);
	};

	return (
		<main>
			<Form
				title="Добро пожаловать!"
				buttonText="Зарегистрироваться"
				questionText="Уже зарегистрированы?"
				link="/signin"
				linkText=" Войти"
				onSubmit={handleSubmit}
			>

				<FormLabel
					labelName="Имя"
					type="text"
					inputName="name"
					id="name"
					value={formValue.name}
					onChange={handleChange}
					placeholder="Введите имя"
					minLength={2}
					maxLength={40}
					required={true}
					spanMessage='Заполните поле "Имя"'
				/>

				<FormLabel
					labelName="E-mail"
					type="email"
					inputName="email"
					id="email"
					value={formValue.email}
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
					value={formValue.password}
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

export default Register;
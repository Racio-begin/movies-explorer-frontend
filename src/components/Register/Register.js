import './Register.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

function Register({ }) {

	return (
		<Form
			title="Добро пожаловать!"
			buttonText="Зарегистрироваться"
			questionText="Уже зарегистрированы?"
			link="/sign-in"
			linkText=" Войти"
		>

			<FormLabel
				labelName="Имя"
				spanMessage='Заполните поле "Имя"'
			/>

			<FormLabel
				labelName="E-mail"
				spanMessage='Адрес электронной почты должен содержать символ "@".'
			/>

			<FormLabel
				labelName="Пароль"
				spanMessage='Заполните поле "Пароль"'
			/>

		</Form>
	);
};

export default Register;
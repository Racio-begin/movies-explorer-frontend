import './Register.css';
import Form from '../Form/Form';

function Register({}) {

	return(
		<Form
		title="Добро пожаловать!"
		buttonText="Зарегистрироваться"
		question="Уже зарегистрированы?"
		linkText=" Войти"
		link="/sign-up"
		>
			
		{/* <div className="register">
			<div className="register__title"></div>
			<div className="register__form"></div>
			<div className="register__join">
				<div className="register__submit"></div>
				<div className="register__redirect"></div>
			</div>
		</div> */}
		</Form>
	);
};

export default Register;
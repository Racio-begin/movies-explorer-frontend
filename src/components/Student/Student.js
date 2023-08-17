import './Student.css';
import avatar from '../../images/user/my-avatar_wev-developer.jpg'

function Student() {

	return (
		<div className="student">
			<div className="student__info">
				<p className="student__title">Никита</p>
				<p className="student__subtitle">Фронтенд-разработчик, 30&nbsp;лет</p>
				<p className="student__about">Я&nbsp;крутой дядя. Уже не&nbsp;молод, новсё еще понимаю эти ваши мемы.
					Умею жать на&nbsp;клавиши так, чтобы ваши задумки, даже не&nbsp;самые приятные, мог увидеть весь мир. Даже против его воли.</p>
				<a className="student__github-link"></a>
			</div>
			<img
				className="student__avatar"
				src={avatar}
				alt="Моя фотография. А я хорош!"
			/>
		</div>
	);
};

export default Student;
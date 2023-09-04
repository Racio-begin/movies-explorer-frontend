import './Student.css';
import avatar from '../../images/user/my-avatar_wev-developer_2.jpg'
// import avatar from '../../images/user/pic__COLOR_pic.svg'

function Student() {

	return (
		<div className="student">
			<div className="student__container">
				<div className="student__info">
					<h3 className="student__title">Никита</h3>
					<p className="student__subtitle">Фронтенд-разработчик, 30&nbsp;лет</p>
					<p className="student__about">Я&nbsp;крутой дядя. Уже не&nbsp;молод, но всё еще понимаю эти ваши мемы.
						Умею жать на&nbsp;клавиши так, чтобы ваши задумки, даже не&nbsp;самые приятные, мог увидеть весь мир. Даже против его воли.</p>
				</div>
				<a
					className="student__github-link link"
					href="https://github.com/Racio-begin"
					target="_blank" rel="noreferrer"
				>Github</a>
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
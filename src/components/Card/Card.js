import './Card.css';

function Card({ link, alt, title, time }) {
	return (
		<li className="card">
			<div className="card__image-container">
				<img
					className="card__image"
					src={link}
					alt={alt}
				/>
				<button
					className="card__like"
				/>
			</div>
			<div className="card__title-container">
				<h3 className="card__title" >
					{title}
				</h3>
				<div className="card__time">
					{time}
				</div>
			</div>
		</li>
	)
};

export default Card;
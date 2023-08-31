import { useState } from 'react';
import './Card.css';

function Card({ link, alt, title, time }) {

	const [ilLiked, setIsLiked] = useState(false);

	return (
		<li className="card">
			<div className="card__image-container">
				<img
					className="card__image"
					src={link}
					alt={alt}
				/>
				<button
					// className="card__like"
					className={ilLiked ? "card__like_active" : "card__like button"}
					onClick={() => setIsLiked(!ilLiked)}
				/>
			</div>
			<div className="card__title-container">
				<h2 className="card__title" >
					{title}
				</h2>
				<div className="card__time">
					{time}
				</div>
			</div>
		</li>
	)
};

export default Card;
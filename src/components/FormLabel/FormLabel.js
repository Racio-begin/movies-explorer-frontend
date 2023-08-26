// import { Link } from 'react-router-dom';
import './FormLabel.css';

function FormLabel({ labelName, spanMessage }) {
	return (
		<label className="form-label">
			{labelName}

			<input className="form-label__input">
			</input>

			<span className="form-label__input-error">
				{spanMessage}
			</span>

		</label>
	)
};

export default FormLabel;
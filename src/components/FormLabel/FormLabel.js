// import { Link } from 'react-router-dom';
import './FormLabel.css';

function FormLabel({
	labelName,
	type,
	inputName,
	id,
	placeholder,
	minLength,
	maxLength,
	required,
	spanMessage
}) {
	return (
		<label className="form-label">
			{labelName}

			<input
				className="form-label__input"
				type={type}
				name={inputName}
				id={id}
				// value={formValue.email || ''}
				// onChange={handleChange}
				placeholder={placeholder}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
			>
			</input>

			<span className="form-label__input-error">
				{spanMessage}
			</span>

		</label>
	)
};

export default FormLabel;
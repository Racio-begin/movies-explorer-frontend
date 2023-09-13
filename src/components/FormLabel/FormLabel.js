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
	spanError,
	onChange
}) {
	return (
		<label className="form-label">
			{labelName}

			<input
				className="form-label__input"
				type={type}
				name={inputName}
				id={id}
				placeholder={placeholder}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
				onChange={onChange}
			>
			</input>

			<span className="form-label__input-error">
				{spanError}
			</span>

		</label>
	)
};

export default FormLabel;
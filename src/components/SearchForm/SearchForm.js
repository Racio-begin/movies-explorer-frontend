import './SearchForm.css';

function SearchForm() {

	return (
		<section className="search">
			<form>

				<div className="search__container">
					<input
						className="search__input"
						type="search"
						placeholder="Фильм"
						required={true}
					/>
					<button
						className="search__find-button button"
						type="submit"
					/>
				</div>

				<div className="search__filter">
					<input
						className="search__check-box button"
						type="checkbox"
					/>
					<p className="search__span">Короткометражки</p>
				</div>

			</form>

		</section>
	);
};

export default SearchForm;
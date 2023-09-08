import { useEffect } from 'react';

import useFormWithValidation from '../../hooks/useFormWithValidation';

import './SearchForm.css';

function SearchForm({
	onSearch,
	onCheck,
	isShortMovies,
	searchString,
}) {

	const { values, handleChange, isValid, setValues } =
		useFormWithValidation();

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(values.searchInput, isShortMovies);
	};

	const handleCheck = (e) => {
		onCheck(e)
	}

	useEffect(() => {
		setValues((prevState) => {
			return { ...prevState, searchInput: searchString };
		});
	}, [searchString]);

	useEffect(() => {
		setValues((prevState) => {
			return { ...prevState, searchInput: searchString };
		});
	}, []);

	return (
		<section className="search">
			<form
				// className='search-form__form'
				name='searchForm'
				noValidate
				onSubmit={handleSubmit}
			>

				<div className="search__container">
					<input
						className="search__input"
						// type="search"
						type="text"
						placeholder="Фильм"
						required={true}
						onChange={handleChange}
					// value={values.searchInput}
					/>
					<button
						className="search__find-button button"
						type="submit"
						disabled={!isValid}
					/>
				</div>

				{/* <div className="search__filter">
					<input
						className="search__check-box button"
						type="checkbox"
					/>
					<p className="search__span">Короткометражки</p>
				</div> */}
				<label
					className='search__filter'
					htmlFor='checkbox'>

					<input
						className='search__check-box button'
						id='checkbox'
						name='checkbox'
						type='checkbox'
						checked={isShortMovies}
						onChange={handleCheck}
					/>
					
					<span className='search__span'>Короткометражки</span>
				</label>

			</form>

		</section>
	);
};

export default SearchForm;
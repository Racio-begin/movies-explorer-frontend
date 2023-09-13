import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';

function SearchForm({
	onSearch,
	viewMode,
	onEmptyInput,
	isFirstVisit,
}) {

	const [searchString, setSearchString] = useState('');
	const [onlyShortMovies, setOnlyShortMovies] = useState(false);

	const location = useLocation();

	useEffect(() => {
		if (viewMode === "allMovies") {
			const moviesSearchData = localStorage.getItem('MoviesSearchData');

			if (moviesSearchData) {
				const parsedSearchData = JSON.parse(moviesSearchData)
				setSearchString(parsedSearchData.searchString);
				setOnlyShortMovies(parsedSearchData.onlyShortMovies);
			}
		}
	}, []);

	function handleSubmit(e) {
		e.preventDefault();
		onSearch(searchString, onlyShortMovies);
		onEmptyInput(false)

		if (searchString === "") {
			onEmptyInput(true)
		};
	};

	function handleCheckbox(e) {
		if (location.pathname === '/movies' && !isFirstVisit) {
			return
		} else {
			setOnlyShortMovies(e.target.checked);
			onSearch(searchString, e.target.checked);
		}
	};

	function handleTextInputChange(e) {
		setSearchString(e.target.value);
	};

	return (
		<section className="search">
			<form
				className="search__form"
				name="searchForm"
				noValidate
				onSubmit={handleSubmit}
			>

				<div className="search__container">
					<input
						className="search__input"
						name="searchInput"
						type="search"
						placeholder="Фильм"
						required={true}
						onChange={handleTextInputChange}
						value={searchString}
					/>
					<button
						className="search__find-button button"
						type="submit"
					/>
				</div>

				<label
					className="search__filter"
					htmlFor="checkbox">

					<input
						className="search__check-box button"
						id="checkbox"
						name="checkbox"
						type="checkbox"
						checked={onlyShortMovies}
						onChange={handleCheckbox}
					/>

					<span className="search__span">Короткометражки</span>
				</label>

			</form>
		</section>
	);

};

export default SearchForm;
import "./GitList.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GifItem from "../GifItem/GifItem";
import "./GifList.css";

function GifList() {
	const dispatch = useDispatch();
	const [newCategoryInput, setNewCategoryInput] = useState("");
	const categories = useSelector((store) => store.categories);
	const gif = useSelector((store) => store.galleryGifs);

	useEffect(() => {
		dispatch({ type: "GET_FAVORITES" });
		dispatch({ type: "GET_CATEGORY" });
	}, []);

	const deleteGifs = (id) => {
		dispatch({ type: "DELETE_GIFS", payload: id });
	};

	const handleCategoryFilter = (e) => {
		const filterValue = e.target.value;

		dispatch({
			type: "GET_BY_CATEGORY",
			payload: filterValue,
		});
	};

	const handleAddNewCategory = () => {
		dispatch({ type: "ADD_CATEGORY", payload: { name: newCategoryInput } });
		setNewCategoryInput("");
	};

	return (
		<div className="gif-list">
			<select
				className="filter-category-dropdown"
				onChange={handleCategoryFilter}
			>
				<option key="null" value="">
					FILTER BY CATEGORY
				</option>
				{categories.map(({ id, name }) => {
					return (
						<option key={id} value={name}>
							{name.toUpperCase()}
						</option>
					);
				})}
			</select>
			<input
				className="add-new-category__input"
				type="text"
				placeholder="Add New Category"
				onChange={(e) => setNewCategoryInput(e.target.value)}
				value={newCategoryInput}
			/>
			<button onClick={handleAddNewCategory} className="add-button">
				Add
			</button>

			<h1>Favorites Go Here 👇</h1>
			<section className="favorited-gif__section">
				{gif.map((gif, i) => {
					return <GifItem key={i} gif={gif} />;
				})}
			</section>
		</div>
	);
}

export default GifList;

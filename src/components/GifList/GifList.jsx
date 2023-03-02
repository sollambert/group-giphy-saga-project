import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GifItem from "../GifItem/GifItem";

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

		if (filterValue) {
			dispatch({
				type: "GET_CATEGORY",
				payload: filterValue,
			});
		}
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
					Filter By Category
				</option>
				{categories.map(({ id, name }) => {
					return (
						<option key={id} value={name}>
							{name}
						</option>
					);
				})}
			</select>
			<input
				type="text"
				placeholder="Add New Category"
				onChange={(e) => setNewCategoryInput(e.target.value)}
				value={newCategoryInput}
			/>
			<button onClick={handleAddNewCategory}>Add</button>

			<h3>Favorites Go Here 👇</h3>
			{gif.map((gif) => {
				return <GifItem key={gif.id} gif={gif} />;
			})}
		</div>
	);
}

export default GifList;

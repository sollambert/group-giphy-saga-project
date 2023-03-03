import React from "react";
import { useSelector, useDispatch } from "react-redux";

function GifItem({ gif }) {
	const dispatch = useDispatch();
	const categories = useSelector((store) => store.categories);

	const handleAddCategoryToFav = (e) => {
		if (!e.target.value) {
			return;
		}

		const linkIds = { category_id: Number(e.target.value), gif_id: gif.id };
		dispatch({ type: "ADD_CATEGORY_TO_FAVORITE", payload: linkIds });
	};

	const deleteGifs = (id) => {
		dispatch({type: 'DELETE_GIFS', payload: id})
	}

	return (
		<div className="gif-item">
			<img src={gif.url} />
			<select
				className="add-new-category-dropdown"
				onChange={handleAddCategoryToFav}
			>
				<option key="null" value="">
					Add New Category
				</option>
				{categories.map(({ id, name }) => {
					return (
						<option key={id} value={id}>
							{name}
						</option>
					);
				})}
			</select>
			<button onClick={() => deleteGifs(gif.id)}> Delete </button>
		</div>
	);
}

export default GifItem;

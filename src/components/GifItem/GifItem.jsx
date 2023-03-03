import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./GifItem.css"

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

	return (
		<div className="gif-item">
			<div>
				<img className='gif-image' src={gif.url} />
			</div>
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
		</div>
	);
}

export default GifItem;

import "./GitItem.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

function GifItem({ gif }) {
	const dispatch = useDispatch();
	const categories = useSelector((store) => store.categories);
	const galleryGifs = useSelector((store) => store.galleryGifs);
	const currentCategories = galleryGifs.find(
		(galleryGif) => galleryGif.id === gif.id
	).categories;

	const handleAddCategoryToFav = (e) => {
		const linkIds = { category_id: Number(e.target.value), gif_id: gif.id };
		dispatch({ type: "ADD_CATEGORY_TO_FAVORITE", payload: linkIds });
	};

	return (
		<div className="gif-item">
			<img className="gif-item__image" src={gif.url} />
			<ul className="current-category__list">
				{currentCategories.map((category, i) => {
					return (
						<li key={i} className="current-category__item">
							{category.toUpperCase()}
						</li>
					);
				})}
			</ul>
			<div className="gif-card-divider"></div>
			<select
				className="add-new-category-dropdown"
				onChange={handleAddCategoryToFav}
			>
				<option key="null" value="">
					ADD NEW CATEGORY
				</option>
				{categories.map(({ id, name }) => {
					return (
						<option key={id} value={id}>
							{name.toUpperCase()}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default GifItem;

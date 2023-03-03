import React from "react";
import { useDispatch } from "react-redux";
import './FoundGif.css'

function FoundGifItem(item) {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({
            type: "ADD_FAVORITE",
            payload: { url: item?.item?.images?.original?.url },
        });
    };

    return (
        <div className="found-gif-item">
            {
                <img
                    className='gif-image'
                    src={item?.item?.images?.original?.url}
                ></img>
            }
            <div>
                <button className='favorites-button-style' onClick={handleClick}>Add to Favorites</button>
            </div>
        </div>
    );
}

export default FoundGifItem;

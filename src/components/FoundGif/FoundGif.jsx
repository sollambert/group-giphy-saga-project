import React from 'react';
import { useDispatch } from 'react-redux';

function FoundGifItem (item) {


    const dispatch = useDispatch();

    console.log('gif item', item?.item?.original?.url);


    const handleClick = () => {
        dispatch({
            type : 'ADD_FAVORITE',
            payload : { url : item?.item?.images?.original?.url }
        })
    }

    return (
        <div className = 'found-gif-item'>
        {<img width='300px' height='auto' src={item?.item?.images?.original?.url}></img>}
        <div><button onClick={handleClick}>Favorite</button></div>
        </div>
    )
}

export default FoundGifItem;
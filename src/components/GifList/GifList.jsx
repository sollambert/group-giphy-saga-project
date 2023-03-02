import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function GifList() {
    const dispatch = useDispatch();

    const gif = useSelector(store => store.galleryGifs);

    useEffect(() => {
        getGifs();
    }, []);

    const getGifs = () => {
        dispatch({type: 'GET_FAVORITES'})
    }

    const deleteGifs = (id) => {
        dispatch({type: 'DELETE_GIFS', payload: id})
    }

    return (
        <div id='gif-list'>
        <h3>Favorites Go Here 👇</h3>
        {gif.map(gif => {
            return <GifItem id={gif.id}/>
        })}
        
        </div>

    )

}

export default GifList;


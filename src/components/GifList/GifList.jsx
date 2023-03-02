import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GifItem from '../GifItem/GifItem';

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
        <div className='gif-list'>
        <h3>Favorites Go Here 👇</h3>
        {gif.map(gif => {
            return <GifItem key={gif.id} gif={gif}/>
        })}
        
        </div>

    )

}

export default GifList;


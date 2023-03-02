import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoundGifItem from '../FoundGif/FoundGif';
import './FoundList.css'

function FoundList() {
    const dispatch = useDispatch();

    const foundGifList = useSelector(store => store.foundGifs);

    useEffect(() => {
        console.log('component did mount');
        dispatch({
            type: 'GET_SEARCH',
            payload: 'Bruce Willis'
        })
    }, []);

    return (
        <>
            <h3>Found Gifs:</h3>
            <section className = 'found-gif-grid'>
                {foundGifList.map(item => {
                    return (
                        < FoundGifItem key={item?.item?.id} item={item}  />
                    )
                })}
            </section>
        </>
    )
}

export default FoundList;
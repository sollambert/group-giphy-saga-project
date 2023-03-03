import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoundGifItem from '../FoundGif/FoundGif';
import './FoundList.css'

function FoundList() {
    const dispatch = useDispatch();

    const foundGifList = useSelector(store => store.foundGifs);
    const search = useSelector(store => store.searchReducer)

    useEffect(() => {
        console.log('component did mount');
        dispatch({
            type: 'GET_SEARCH'
        })
    }, []);

    return (
        <>
            <h3>Found Gifs:</h3>
            <button  disabled={ search.offset <= 0 ? "true" : ''} onClick={() => {
                dispatch({type: "UPDATE_OFFSET", payload: search.offset - 9});
                }}>Prev 9</button>
            <button onClick={() => {
                dispatch({type: "UPDATE_OFFSET", payload: search.offset + 9});
                }}>Next 9</button>
            <section className = 'found-gif-grid'>
                {foundGifList.map(item => {
                    return (
                        < FoundGifItem key={item?.id} item={item}  />
                    )
                })}
            </section>
        </>
    )
}

export default FoundList;
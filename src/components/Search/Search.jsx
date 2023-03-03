import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './Search.css'

function Search() {
    let [newSearch, setNewSearch] = useState ('')
    const dispatch = useDispatch();

    let search = useSelector(store => store.searchReducer);


    const clearInput = () => {
        setNewSearch('');
    }

    const handleClick = () => {
        dispatch({
            type : 'GET_SEARCH',
            payload : {q: newSearch, offset: 0},
            callback : clearInput 
        })
    }

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value )
    }

    return (
        <div className="search-form">
            <span>
                <h1>Search: {search.q}</h1>
                <input value={newSearch} onChange={handleSearchChange} type="text"/>
                <button onClick={handleClick}>Search</button>
            </span>
        </div>
    )
}

export default Search;
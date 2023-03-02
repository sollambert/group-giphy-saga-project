import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

function Search() {
    let [newSearch, setNewSearch] = useState ('')
    const dispatch = useDispatch();
    
    const handleClick = () => {
        dispatch({
            type : 'GET_SEARCH',
            payload : newSearch
        })
    }

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value )
    }

    return (
        <>
            <div>
                {/* todo : Search IMAGE List  */}
            </div>
            <div>
                <input value={newSearch} onChange={handleSearchChange} type="text"/>
                <button onClick={handleClick}>Search</button>
            </div>
        </>
    )
}

export default Search;

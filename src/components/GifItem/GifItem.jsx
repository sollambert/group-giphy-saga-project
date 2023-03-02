import React from 'react';

function GifItem({gif}) {

    return (
        <div className='gif-item'>
        <img src={gif.url} />
        </div>

    )
}

export default GifItem;
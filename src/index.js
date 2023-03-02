import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

import axios from 'axios';

//redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

//sagas
import createSagaMiddleware from '@redux-saga/core';
import { takeEvery, put } from 'redux-saga/effects';


function* getSearch(action) {
    const params = {
        q : action.payload
    }

    try {
        let response = yield axios.get('/api/search', {params} )

        yield put ({
            type : 'SET_GALLERY',
            payload : response.data
        })

    } catch (error) {
        console.log(error);
    }
}
//gallery reducer
function galleryGifs(state = [], action) {
    switch(action.type) {
        case "SET_GALLERY":
            return action.payload;
        case "CLEAR_GALLERY":
            return [];
        default:
            return state;
    }
}

//get favorites saga
function* getFavorites() {
    try {
        let response = yield axios.get('/favorite');
        put({type: "SET_GALLERY", payload: response.data})
    } catch (error) {
        console.error(error);
    }
}

//get category saga
function* getCategory(action) {
    try {
        let response = yield axios.get('/category', { category: action.payload });
        put({type: "SET_GALLERY", payload: response.data})
    } catch (error) {
        console.error(error);
    }
}

function* watcherSaga() {
    yield takeEvery('GET_SEARCH', getSearch)
    yield takeEvery("GET_FAVORITES", getFavorites);
    yield takeEvery("GET_CATEGORY", getCategory);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
        galleryGifs
    }),
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(watcherSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

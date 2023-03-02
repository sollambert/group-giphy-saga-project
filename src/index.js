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

    console.log('action', action)

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

function* watcherSaga() {
    yield takeEvery('GET_SEARCH', getSearch)
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({

    }),
    applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(watcherSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

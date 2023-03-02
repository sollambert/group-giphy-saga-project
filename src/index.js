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

function* watcherSaga() {
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({

    }),
    applyMiddleware(sagaMiddleware, logger)
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

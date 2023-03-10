import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

import axios from "axios";

//redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

//sagas
import createSagaMiddleware from "@redux-saga/core";
import { takeEvery, put, select } from "redux-saga/effects";

//search selector
const searchSelector = (state) => state.searchReducer;

//search reducer
function searchReducer(state = {q: "Bruce Willis", limit: 9, offset: 0, rating: 'r'}, action) {
	switch(action.type) {
		case "UPDATE_SEARCH":
			console.log("IN SEARCH REDUCER",state, action.payload)
			return {...state, ...action.payload};
		default:
			return state;
	}
}

//offset updater
function* updateOffset(action) {
    try {
        yield put({type: "UPDATE_SEARCH", payload: {offset: action.payload}})
		yield put({type: "GET_SEARCH"});
    } catch (error) {
        console.error(error);
    }
}

//search worker
function* getSearch(action) {
	yield put({type: "UPDATE_SEARCH", payload: action.payload})
	console.log(action.payload)
	const params = yield select(searchSelector);
	try {
		let response = yield axios.get("/api/search", { params });
		yield put({type: "UPDATE_SEARCH", payload: {offset: response.data.data.pagination.offset}})
		console.log(response.data.data.pagination)
		yield put({
			type: "SET_FOUND",
			payload: response.data.data.data,
		});
		action.callback ? action.callback() : '';
	} catch (error) {
		console.log(error);
	}
}

//found Gifs from search reducer
function foundGifs(state = [], action) {
	switch (action.type) {
		case "SET_FOUND":
			return action.payload;
		case "CLEAR_FOUND":
			return [];
		default:
			return state;
	}
}

//gallery reducer
function galleryGifs(state = [], action) {
	switch (action.type) {
		case "SET_GALLERY":
			return action.payload;
		case "CLEAR_GALLERY":
			return [];
		default:
			return state;
	}
}

//categories reducer
function categories(state = [], action) {
	switch (action.type) {
		case "SET_CATEGORIES":
			return action.payload;
		case "CLEAR_CATEGORIES":
			return action.payload;
		default:
			return state;
	}
}

//get favorites saga
function* getFavorites(action) {
	try {
		let params = { category: action.payload ? action.payload : undefined };
		let response = yield axios.get("/api/favorite", { params });
		let favoritesWithCategories = yield getCategoriesOfFavorites(response);
		yield put({ type: "SET_GALLERY", payload: favoritesWithCategories });
	} catch (error) {
		console.error(error);
	}
}

//helper function for favorites getFavorites function
async function getCategoriesOfFavorites(response) {
	return await Promise.all(
		response.data.map(async (gif) => {
			const response = await axios.get(`api/category/${gif.id}`);
			const categories = await response.data.reduce((array, category) => {
				return [...array, Object.values(category)[0]];
			}, []);
			return { ...gif, categories };
		})
	);
}

//get category saga
function* getCategory() {
	try {
		let response = yield axios.get("/api/category");
		yield put({ type: "SET_CATEGORIES", payload: response.data });
	} catch (error) {
		console.error(error);
	}
}

// post favorite
function* addFavorite(action) {
	console.log("addFAV", action.payload);
	try {
		yield axios.post("/api/favorite", action.payload);
		yield put({ type: "GET_FAVORITES" });
	} catch (error) {
		console.log("Error addFavorite", error);
	}
}

// post category
function* addCategory(action) {
	console.log("addCAT", action.payload);
	try {
		yield axios.post("/api/category", action.payload);
		yield put({ type: "GET_CATEGORY" });
	} catch (error) {
		console.log("Error addCategory", error);
	}
}

// delete favorited gif
function* deleteGifs(action) {
	try {
		yield axios.delete(`/api/favorite/${action.payload}`);
		console.log("in delete axios", action.payload);
		yield put({ type: "GET_FAVORITES" });
	} catch (error) {
		console.error("error deleting gif", error);
	}
}

function* addCategoryToFavorite(action) {
	const { gif_id, category_id } = action.payload;
	try {
		yield axios.post(`/api/favorite/${gif_id}`, { category_id });
		yield put({ type: "GET_FAVORITES" });
	} catch (error) {
		console.log("Error addCategoryToFavorite", error);
	}
}

function* watcherSaga() {
    yield takeEvery("UPDATE_OFFSET", updateOffset)

	// gets
	yield takeEvery("GET_SEARCH", getSearch);
	yield takeEvery("GET_FAVORITES", getFavorites);
	yield takeEvery("GET_CATEGORY", getCategory);
	yield takeEvery("GET_BY_CATEGORY", getFavorites);

	// posts
	yield takeEvery("ADD_FAVORITE", addFavorite);
	yield takeEvery("ADD_CATEGORY", addCategory);
	yield takeEvery("ADD_CATEGORY_TO_FAVORITE", addCategoryToFavorite);

	// deletes
	yield takeEvery("DELETE_GIFS", deleteGifs);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	combineReducers({
		foundGifs,
		galleryGifs,
		categories,
		searchReducer,
	}),
	applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

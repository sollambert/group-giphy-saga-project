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
import { takeEvery, put } from "redux-saga/effects";

function* getSearch(action) {
	const params = {
		q: action.payload,
	};
	try {
		let response = yield axios.get("/api/search", { params });
		yield put({
			type: "SET_FOUND",
			payload: response.data.data,
		});
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
		yield put({ type: "SET_GALLERY", payload: response.data });
	} catch (error) {
		console.error(error);
	}
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

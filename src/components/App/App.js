import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import GifList from "../GifList/GifList";
import Search from "../Search/Search";
import Navbar from "../Navbar/Navbar";

function App(props) {
	return (
		<div>
			<Router>
				<Navbar />
				<Route exact path="/">
					< Search />
				</Route>
				<Route exact path="/gallery">
        <GifList />
				</Route>
			</Router>
		</div>
	);
}

export default App;

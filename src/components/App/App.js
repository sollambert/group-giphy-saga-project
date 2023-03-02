import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import GifList from "../GifList/GifList";

import Navbar from "../Navbar/Navbar";

function App(props) {
	return (
		<div>
			<Router>
				<Navbar />
				<Route exact path="/">
					<h1>Replace Search</h1>
				</Route>
				<Route exact path="/gallery">
        <GifList />
				</Route>
			</Router>
		</div>
	);
}

export default App;

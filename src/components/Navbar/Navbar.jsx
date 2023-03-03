import "./Navbar.css";
import { useHistory } from "react-router-dom";

function Navbar() {
	const history = useHistory();

	const handleGoToSearchPage = () => {
		history.push("/");
	};

	const handleGoToGalleryPage = () => {
		history.push("/gallery");
	};

	return (
		<header className="navbar__header">
			<nav className="navbar__navbar">
				<h1 className="navbar__title-primary">Jiphee</h1>
				<div className="navbar__button-box">
					<button
						className="navbar__search-btn"
						onClick={handleGoToSearchPage}
					>
						Search
					</button>
					<button
						className="navbar__gallery-btn"
						onClick={handleGoToGalleryPage}
					>
						Favorites
					</button>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;

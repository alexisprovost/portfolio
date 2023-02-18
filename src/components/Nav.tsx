import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
	const [toggled, setToggled] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const toggleNav = () => {
		setToggled(!toggled);
	};

	useEffect(() => {	
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", changeWidth);

		return () => {
			window.removeEventListener("resize", changeWidth);
		};
	}, []);

	return (
		<nav>
			{screenWidth <= 768 && (
				<div className={`menu-btn ${toggled ? "toggled": ""}`} onClick={toggleNav}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			)}

			{(toggled || (screenWidth > 768)) && (
				<ul>
					<li>
						<Link to="/" onClick={toggleNav}>Accueil</Link>
					</li>
					<li>
						<Link to="/projects" onClick={toggleNav}>Mes Projets</Link>
					</li>
					<li>
						<Link to="/contact" onClick={toggleNav}>Me Contacter</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Nav;

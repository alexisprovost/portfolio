import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
	const [toggled, setToggled] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const updateAnimation = () => {
		if (toggled) {
			document.querySelector(".menu-btn")?.classList.remove("toggled");
		} else {
			document.querySelector(".menu-btn")?.classList.add("toggled");
		}
	};

	const toggleNav = () => {
		setToggled(!toggled);
		updateAnimation();
	};

	useEffect(() => {	
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
			updateAnimation();
		};

		window.addEventListener("resize", changeWidth);

		return () => {
			window.removeEventListener("resize", changeWidth);
		};
	}, []);

	return (
		<nav>
			{screenWidth <= 768 && (
				<div className="menu-btn" onClick={toggleNav}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			)}

			{(toggled && screenWidth < 768) && (
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

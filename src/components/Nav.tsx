import { Link } from "react-router-dom";

const Nav = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Accueil</Link>
				</li>
				<li>
					<Link to="/projects">Mes Projets</Link>
				</li>
				<li>
					<Link to="/contact">Me Contacter</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;

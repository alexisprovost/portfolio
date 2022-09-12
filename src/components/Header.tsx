import Nav from "./Nav";
import Bonjour from "./Bonjour";
import HeaderTitle from "./HeaderTitle";

import { Routes, Route } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Nav />

			<Routes>
				<Route path="/" element={<Bonjour />} />
				<Route path="/projects" element={<HeaderTitle title="Mes Projets" />} />
				<Route path="/contact" element={<HeaderTitle title="Me Contacter" />} />

				<Route path="*" element={<HeaderTitle title="404" />} />
			</Routes>
		</header>
	);
}

export default Header;

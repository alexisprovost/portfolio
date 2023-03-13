import Nav from "./Nav";
import Bonjour from "./Bonjour";
import HeaderTitle from "./HeaderTitle";

import { Routes, Route } from "react-router-dom";

import translate from "../i18n/translate";

const Header = () => {
	return (
		<header>
			<Nav />

			<Routes>
				<Route path="/" element={<Bonjour />} />
				<Route path="/projects" element={<HeaderTitle title={translate("app.nav.projects")} />} />
				<Route path="/contact" element={<HeaderTitle title={translate("app.nav.contact")} />} />

				<Route path="*" element={<HeaderTitle title="404" />} />
			</Routes>
		</header>
	);
}

export default Header;

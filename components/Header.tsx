import Nav from "./Nav";
import Bonjour from "./Bonjour";
import HeaderTitle from "./HeaderTitle";

import translate from "../i18n/translate";

const Header = ({ currentLocal, localeChanger }) => {
	return (
		<header>
			<Nav currentLocal={currentLocal} localeChanger={localeChanger} />

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

import useDocumentTitle from "../hooks/useDocumentTitle";

import translate from "../i18n/translate";

const Home = () => {
	useDocumentTitle("Portfolio");

	return (
		<div className="about">
			<div className="about-container">
				<h2 className="section-title">{translate("app.home.about.title")}</h2>
				<p className="section-content">{translate("app.home.about.description", { br: <br /> })}</p>
			</div>
		</div>
	);
};

export default Home;

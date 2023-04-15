import useDocumentTitle from "../hooks/useDocumentTitle";

import translate from "../i18n/translate";

import FutureButton from "../components/FutureButton";

const Home = () => {
	useDocumentTitle("Portfolio");

	return (
		<div className="about">
			<div className="about-container">
				<h2 className="section-title">{translate("app.home.about.title")}</h2>
				<p className="section-content">{translate("app.home.about.description", { br: <br /> })}</p>
				<FutureButton text={translate("app.home.about.viewProjects")} to="/projects" />
			</div>
		</div>
	);
};

export default Home;

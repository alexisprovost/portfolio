import translate from "../i18n/translate";

const Bonjour = () => {
	return (
		<section className="bonjour-section">
			<div className="animate__animated animate__fadeInUp animate__faster hero-container">
				<h1 className="hero-title">{translate("app.header.jumbotron.title")}</h1>
				<p className="hero-subtitle">{translate("app.header.jumbotron.slogan")}</p>
			</div>
		</section>
	);
}

export default Bonjour;

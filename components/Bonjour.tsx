import { useTranslations } from "next-intl";

const Bonjour = () => {
	const t = useTranslations("header");

	return (
		<section className="bonjour-section">
			<div className="animate__animated animate__fadeInUp animate__faster hero-container">
				<h1 className="hero-title">{t("jumbotron.title")}</h1>
				<p className="hero-subtitle">{t("jumbotron.slogan")}</p>
			</div>
		</section>
	);
};

export default Bonjour;

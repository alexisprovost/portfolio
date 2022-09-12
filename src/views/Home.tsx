import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
	useDocumentTitle("Portfolio");

	return (
		<div className="about">
			<div className="about-container">
				<h2 className="section-title">À Propos</h2>
				<p className="section-content">
					Je conçois des sites Web et j'essaie d'apprendre de nouvelles choses tous les jours. Je suis curieux de
					connaître l'avenir de la technologie et j'essaie toujours de me tenir informé des designs et des tendances
					actuelles. <br />
					<br />
					Vous pouvez me contacter à tout moment pour discuter de vos projets.
					<br />
					Ça me fera plaisir de vous aider résoudre vos problèmes.
				</p>
			</div>
		</div>
	);
};

export default Home;

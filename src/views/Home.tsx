import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
	useDocumentTitle("Portfolio");

	return (
		<div className="about">
			<div className="about-container">
				<h2 className="section-title">À Propos</h2>
				<p className="section-content"></p>
			</div>
		</div>
	);
};

export default Home;

import jeucplusplus from "../assets/images/jeu-cplusplus.png";
import managebiblio from "../assets/images/manage-biblio.png";
import m19insta1 from "../assets/images/m19.ca-20191008.jpg";
import m19insta2 from "../assets/images/m19.ca-20201130.jpg";

const Projects = () => {
	return (
		<div className="gallery">
			<div className="gallery-container">
				<h2 className="section-title">Cette Session</h2>
				<ul>
					<li>
						<img src={jeucplusplus} alt="Jeu de C++" loading="lazy" />
					</li>
					<li>
						<img src={managebiblio} alt="Manage Biblio" loading="lazy" />
					</li>
				</ul>

				<h2 className="section-title right">Autre Projets</h2>
				<ul>
					<li>
						<img src={m19insta1} alt="M19 Instagram" loading="lazy" />
					</li>
					<li>
						<img src={m19insta2} alt="M19 Instagram" loading="lazy" />
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Projects;

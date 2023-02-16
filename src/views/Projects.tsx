import useDocumentTitle from "../hooks/useDocumentTitle";
import { useEffect, useState } from "react";
import Axios from "axios";

import Project from "../components/Project";

const Projects = () => {
	useDocumentTitle("Mes Projets");

	const [projects, setProjects] = useState([] as any);

	const getProjects = () => {
		Axios.get("https://api.alexisprovost.com/projects").then((res) => {
			setProjects(res.data);
		});
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className="gallery">
			<div className="gallery-container">
				<ul>
					{projects.map((project) => (
						<Project p={project} key={project.id} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Projects;

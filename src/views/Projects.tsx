import useDocumentTitle from "../hooks/useDocumentTitle";
import { useEffect, useState } from "react";

import Axios from "axios";
import { Oval } from "react-loading-icons";

import Project from "../components/Project";
import translate from "../i18n/translate";

const Projects = ({ currentLocal }) => {
	useDocumentTitle("Mes Projets");

	const [projects, setProjects] = useState([] as any);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const getProjects = () => {
		setLoading(true);
		Axios.get("https://api.alexisprovost.com/" + currentLocal.split("-")[0] + "/projects")
			.then((res) => {
				setProjects(res.data);
			})
			.catch((error) => {
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getProjects();
	}, [currentLocal]);

	return (
		<div className="gallery">
			<div className="gallery-container">
				{loading ? (
					<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<Oval strokeWidth="4" stroke="#fff" />
							<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>{translate("app.loading")}</p>
						</div>
					</div>
				) : error ? (
					<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>{translate("app.loading.error", { br: <br /> })}</p>
						</div>
					</div>
				) : (
					<ul>
						{projects.map((project) => (
							<Project p={project} key={project.id} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Projects;

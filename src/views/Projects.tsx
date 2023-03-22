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

	const getProjects = (apiUrl: string) => {
		setError(false);
		setLoading(true);
		Axios.get(apiUrl + currentLocal.split("-")[0] + "/projects", {
			headers: {
				"Content-Type": "application/json",
			},
			timeout: 5000,
		})
			.then((res) => {
				setProjects(res.data);
			})
			.catch((error) => {
				//Handle request if api is down
				setError(true);
				Axios.get("https://ap.m19.workers.dev/" + currentLocal.split("-")[0] + "/projects", {
					headers: {
						"Content-Type": "application/json",
					},
				}).then((res) => {
						setError(false);
						setProjects(res.data);
				}).catch((error) => {
					setError(true);
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		getProjects("https://api.alexisprovost.com/");
	}, [currentLocal]);

	return (
		<div className="gallery">
			<div className="gallery-container">
				{loading ? (
					<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<Oval strokeWidth="4" stroke="#fff" />
							<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>
								{translate("app.loading")}
							</p>
						</div>
					</div>
				) : error ? (
					<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>
								{translate("app.loading.error", { br: <br /> })}
							</p>
						</div>
					</div>
				) : (
					<ul>
						{projects.map((project) => (
							<Project p={project} key={project.id} currentLocal={currentLocal} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Projects;

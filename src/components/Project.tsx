import moment from "moment";

const Project = ({ p }: any) => {
	const { img, name, date, technologies, description, url } = p;

	return (
		<div className="project animate__animated animate__fadeIn">
			<div className="project-container">
				<div className="project-image">
					<img src={img} alt="Project" />
				</div>
				<div className="project-content">
					<h3 className="project-title">{name}</h3>
					<h4 className="project-date">{moment(date).format("MMMM YYYY")}</h4>
					<h6 className="project-technologies">
						{Array.from(technologies).map((technology: any) => (
							<span key={technology.id}>{technology.name}</span>
						))}
					</h6>
					<p className="project-description">{description}</p>
					<div className="project-links">
						<a href={url} target="_blank" rel="noreferrer">
							Voir le projet
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Project;

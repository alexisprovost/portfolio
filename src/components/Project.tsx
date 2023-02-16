import moment from "moment";

const Project = ({ p }: any) => {
	const { img, name, date, technologies, description, url } = p;

	let element = <p></p>;
	if (url)
		element = (
			<a href={url} target="_blank" rel="noreferrer">
				View Project
			</a>
		);

	return (
		<div className="project animate__animated animate__fadeIn">
			<div className="project-container">
				<div className="project-image">
					<div
						style={{
							backgroundImage: `url(${img})`,
						}}
					></div>
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

					<div className="project-links">{element}</div>
				</div>
			</div>
		</div>
	);
};

export default Project;

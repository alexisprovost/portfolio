import moment from "moment";
import 'moment/dist/locale/fr';

import ShowMoreText from "react-show-more-text";

import { LOCALES } from "../i18n/locales";
import translate from "../i18n/translate";

const Project = ({ p, currentLocal }) => {
	const { img, name, date, technologies, description, url } = p;

	let momentDate = moment(date);
	momentDate.locale(currentLocal);

	let element;
	const datePassed = moment(date).isBefore(moment());

	if (url) {
		const youtubeRegex = /youtu\.be|youtube\.com/;
		let linkClass: string, linkText: any;

		switch (true) {
			case youtubeRegex.test(url):
				linkClass = "project-link-youtube";
				linkText = translate("app.project.viewProjectVideo");
				break;
			case url.indexOf("github") > -1:
				linkClass = "project-link-github";
				linkText = translate("app.project.viewProjectGithub");
				break;
			default:
				linkClass = "";
				linkText = translate("app.project.viewProject");
		}

		if (!datePassed) {
			linkClass += " project-link-disabled";
			linkText = translate("app.project.projectNotReleased", { date: momentDate.format("LL") });
		}

		element = (
			<a href={url} className={linkClass} target="_blank" rel="noreferrer">
				{linkText}
			</a>
		);
	}

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
					<h4 className="project-date">{momentDate.format("MMMM YYYY")}</h4>
					<h6 className="project-technologies">
						{Array.from(technologies).map((technology: any) => (
							<span key={technology.id}>{technology.name}</span>
						))}
					</h6>
					<div className="project-description">
						<ShowMoreText
							lines={6}
							more={translate("app.project.showMore", { br: <br /> })}
							less={translate("app.project.showLess", { br: <br /> })}
							anchorClass="project-description-anchor"
						>
							{description}
						</ShowMoreText>
					</div>

					<div className="project-links">{element}</div>
				</div>
			</div>
		</div>
	);
};

export default Project;

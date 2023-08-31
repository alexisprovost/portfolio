import moment from "moment";
import "moment/dist/locale/fr";

import ShowMoreText from "react-show-more-text";

import { useTranslations } from "next-intl";

const Project = ({ p }) => {
	const t = useTranslations("project");

	const { img, name, date, technologies, description, url } = p;
	let video = img + "?autoplay=1&loop=1&autopause=0&muted=1&background=1";

	let momentDate = moment(date);
	const datePassed = momentDate.isBefore(moment());

	let elementButton, elementMedia;

	function getLinkProperties(url: string, datePassed: boolean) {
		const youtubeRegex = /youtu\.be|youtube\.com/;
		const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

		if (youtubeRegex.test(url)) {
			return {
				linkClass: "project-link-youtube",
				linkText: t("viewProjectVideo"),
			};
		}

		if (url.includes("github")) {
			return {
				linkClass: "project-link-github",
				linkText: t("viewProjectGithub"),
			};
		}

		if (imageRegex.test(url)) {
			return {
				linkClass: "project-link-image",
				linkText: t("viewProjectImage"),
			};
		}

		return {
			linkClass: "",
			linkText: t("viewProject"),
		};
	}

	if (url) {
		let { linkClass, linkText } = getLinkProperties(url, datePassed);

		if (!datePassed) {
			linkClass += " project-link-disabled";
			linkText = t("projectNotReleased", { date: momentDate.format("LL") });
		}

		elementButton = (
			<a href={url} className={linkClass} target="_blank" rel="noreferrer">
				{linkText}
			</a>
		);
	}

	if (img) {
		//check if image is a video from vimeo
		const vimeoRegex = /vimeo\.com/;
		if (vimeoRegex.test(img)) {
			elementMedia = (
				<div>
					<iframe src={video} allow="autoplay; fullscreen; picture-in-picture" title={name} className="project-video"></iframe>
				</div>
			);
		} else {
			elementMedia = (
				<div
					style={{
						backgroundImage: `url(${img})`,
					}}
				></div>
			);
		}
	} else {
		elementMedia = <div className="project-no-image"></div>;
	}

	return (
		<div className="project animate__animated animate__fadeIn">
			<div className="project-container">
				<div className="project-image">{elementMedia}</div>
				<div className="project-content">
					<h3 className="project-title">{name}</h3>
					<h4 className="project-date">{momentDate.format("MMMM YYYY")}</h4>
					<h6 className="project-technologies">
						{Array.from(technologies).map((technology: any) => (
							<span key={technology.id}>{technology.name}</span>
						))}
					</h6>
					<div className="project-description">
						<ShowMoreText lines={6} more={t("showMore", { br: <br /> })} less={t("showLess", { br: <br /> })} anchorClass="project-description-anchor">
							{description}
						</ShowMoreText>
					</div>

					<div className="project-links">{elementButton}</div>
				</div>
			</div>
		</div>
	);
};

export default Project;

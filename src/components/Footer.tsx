import { FaTwitter, FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope, FaCodepen, FaVimeo } from "react-icons/fa";
import { SiGithubsponsors } from "react-icons/si";
import { GrStatusUnknown } from "react-icons/gr";
import { ReactComponent as DevToLogo } from "../assets/icons/devto.svg";

import { LOCALES } from "../i18n/locales";
import translate from "../i18n/translate";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-content">
					<ul className="footer-list">
						<li>Copyright Alexis Provost {new Date().getFullYear()}</li>
						<li className="spacer"></li>
						<li>
							{translate("app.footer.madeWith")}{" "}
							<a href="https://react.dev/" target="_blank">
								React
							</a>
						</li>
						<li className="spacer"></li>
						<div className="socials">
							<a href="https://github.com/alexisprovost" target="_blank" aria-label="Github">
								<FaGithub />
							</a>

							<a href="https://dev.to/alexisprovost" target="_blank" aria-label="Dev.to">
								<DevToLogo />
							</a>

							<a href="https://codepen.io/alexisprovost" target="_blank" aria-label="Codepen">
								<FaCodepen />
							</a>

							<a href="https://www.linkedin.com/in/alexisprovost/" target="_blank" aria-label="LinkedIn">
								<FaLinkedin />
							</a>

							<a href="https://twitter.com/_alexisprovost" target="_blank" aria-label="Twitter">
								<FaTwitter />
							</a>

							<a href="https://www.instagram.com/alexis.provost/" target="_blank" aria-label="Instagram">
								<FaInstagram />
							</a>

							<a href="https://stats.uptimerobot.com/Q8nALtXWnk" target="_blank" aria-label="Uptime">
								<GrStatusUnknown />
							</a>

							<a href="https://vimeo.com/alexisprovost" target="_blank" aria-label="Vimeo">
								<FaVimeo />
							</a>

							<a href="https://github.com/sponsors/alexisprovost" target="_blank" aria-label="Sponsor">
								<SiGithubsponsors />
							</a>

							<a href="mailto:alexis@provost.cloud" target="_blank" aria-label="Email">
								<FaEnvelope />
							</a>
						</div>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

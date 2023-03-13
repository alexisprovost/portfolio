import { FaTwitter, FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope, FaCodepen, FaVimeo } from "react-icons/fa";
import { ReactComponent as DevToLogo } from "../assets/icons/devto.svg";

import { LOCALES } from "../i18n/locales";
import translate from "../i18n/translate";

const Footer = ({ currentLocal, localeChanger }) => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-content">
					<ul className="footer-list">
						<li>Copyright Alexis Provost {new Date().getFullYear()}</li>
						<li className="spacer"></li>
						<li>
							{translate("app.footer.madeWith")}{" "}
							<a href="https://reactjs.org/" target="_blank">
								React
							</a>
						</li>
						<li className="spacer"></li>
						<div className="socials">
							<li>
								<a href="https://github.com/alexisprovost" target="_blank" aria-label="Whats up!">
									<FaGithub />
								</a>
							</li>
							<li>
								<a href="https://dev.to/alexisprovost" target="_blank">
									<DevToLogo />
								</a>
							</li>
							<li>
								<a href="https://codepen.io/alexisprovost" target="_blank">
									<FaCodepen />
								</a>
							</li>
							<li>
								<a href="https://www.linkedin.com/in/alexisprovost/" target="_blank" aria-label="LinkedIn">
									<FaLinkedin />
								</a>
							</li>
							<li>
								<a href="https://twitter.com/_alexisprovost" target="_blank">
									<FaTwitter />
								</a>
							</li>
							<li>
								<a href="https://www.instagram.com/alexis.provost/" target="_blank">
									<FaInstagram />
								</a>
							</li>
							<li>
								<a href="https://www.youtube.com/@alexisprovost" target="_blank">
									<FaYoutube />
								</a>
							</li>
							<li>
								<a href="https://vimeo.com/alexisprovost" target="_blank">
									<FaVimeo />
								</a>
							</li>
							<li>
								<a href="mailto:alexis@provost.cloud" target="_blank">
									<FaEnvelope />
								</a>
							</li>
						</div>
					</ul>
					<ul className="footer-lang">
						{currentLocal === LOCALES.ENGLISH ? (
							<li onClick={() => localeChanger(LOCALES.FRENCH)}>{translate("app.footer.french")}</li>
						) : (
							<li onClick={() => localeChanger(LOCALES.ENGLISH)}>{translate("app.footer.english")}</li>
						)}
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

import { Twitter, Linkedin, Github, Instagram } from "react-bootstrap-icons";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-content">
					<ul className="footer-list">
						<li>Copyright Alexis Provost 2022</li>
						<li className="spacer">|</li>
						<li>Fait avec ReactJS</li>
						<li className="spacer">|</li>
						<li>
							<a href="https://twitter.com/_alexis_provost" target="_blank">
								<Twitter />
							</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/in/alexisprovost/" target="_blank">
								<Linkedin />
							</a>
						</li>
						<li>
							<a href="https://github.com/alexisprovost" target="_blank">
								<Github />
							</a>
						</li>
						<li>
							<a href="https://www.instagram.com/m19.ca/" target="_blank">
								<Instagram />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

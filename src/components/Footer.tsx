import { Twitter, Linkedin, Github, Instagram } from "react-bootstrap-icons";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-content">
					<ul className="footer-list">
						<li>Copyright Alexis Provost {new Date().getFullYear()}</li>
						<li className="spacer">|</li>
						<li>Fait avec ReactJS</li>
						<li className="spacer">|</li>
						<li>
							<a href="https://twitter.com/_alexisprovost" target="_blank">
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
							<a href="https://www.instagram.com/alexis.provost/" target="_blank">
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

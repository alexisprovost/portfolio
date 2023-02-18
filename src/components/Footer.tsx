import { Twitter, Linkedin, Github, Instagram } from "react-bootstrap-icons";

const Footer = () => {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-content">
					<ul className="footer-list">
						<li>Copyright Alexis Provost {new Date().getFullYear()}</li>
						<li className="spacer">|</li>
						<li>Made with <a href="https://reactjs.org/" target="_blank">React</a></li>
						<li className="spacer">|</li>
						<div className="socials">
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
						</div>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

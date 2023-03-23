import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoLanguage } from "react-icons/io5";

import translate from "../i18n/translate";
import Dropdown from "./Dropdown";

import { LOCALES } from "../i18n/locales";

const Nav = ({ currentLocal, localeChanger }) => {
	const [toggled, setToggled] = useState(false);
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	const toggleNav = () => {
		setToggled(!toggled);
	};

	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth);
		};

		window.addEventListener("resize", changeWidth);

		return () => {
			window.removeEventListener("resize", changeWidth);
		};
	}, []);

	return (
		<nav>
			{screenWidth <= 768 && (
				<div className={`menu-btn ${toggled ? "toggled" : ""}`} onClick={toggleNav}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			)}

			{(toggled || screenWidth > 768) && (
				<ul className={screenWidth <= 768 ? "animate__animated animate__fadeInDown animate__faster" : ""}>
					<li>
						<Link to="/" onClick={toggleNav}>
							{translate("app.nav.home")}
						</Link>
					</li>
					<li>
						<Link to="/projects" onClick={toggleNav}>
							{translate("app.nav.projects")}
						</Link>
					</li>
					<li>
						<Link to="/contact" onClick={toggleNav}>
							{translate("app.nav.contact")}
						</Link>
					</li>
					<li>
						{(currentLocal === LOCALES.FRENCH && (
							<Dropdown
								options={[{ text: "English", function: () => localeChanger(LOCALES.ENGLISH) }]}
								label={<IoLanguage />}
							/>
						)) || (
							<Dropdown
								options={[{ text: "Français Canadien", function: () => localeChanger(LOCALES.FRENCH) }]}
								label={<IoLanguage />}
							/>
						)}
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Nav;

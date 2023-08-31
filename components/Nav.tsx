"use client";
import Dropdown from "./Dropdown";
import Link from "next/link";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Nav = () => {
	const t = useTranslations("nav");

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
						<Link href="/" onClick={toggleNav}>
							{t("home")}
						</Link>
					</li>
					<li>
						<Link href="/projects" onClick={toggleNav}>
							{t("projects")}
						</Link>
					</li>
					<li>
						<Link href="/contact" onClick={toggleNav}>
							{t("contact")}
						</Link>
					</li>
				</ul>
			)}
		</nav>
	);
};

export default Nav;

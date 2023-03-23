import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "animate.css";
import "@fontsource/krona-one";

import Header from "./components/Header";
import Home from "./views/Home";
import Projects from "./views/Projects";
import Contact from "./views/Contact";
import Footer from "./components/Footer";

import { I18nProvider } from "./i18n";

import getBrowserLocale from "./hooks/getBrowserLocale";
import WaveContainer from "./components/WaveContainer";

const App = () => {
	const [locale, setLocale] = useState(getBrowserLocale());

	useEffect(() => {
		localStorage.setItem("locale", locale);
	}, [locale]);

	return (
		<I18nProvider locale={locale}>
			<div className="App">
				<Header currentLocal={locale} localeChanger={setLocale} />
				<main>
					<Routes>
						<Route path="/" element={<WaveContainer page={<Home />} />} />
						<Route path="/projects" element={<WaveContainer page={<Projects currentLocal={locale} />} />} />
						<Route path="/contact" element={<WaveContainer page={<Contact />} />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</I18nProvider>
	);
};

export default App;

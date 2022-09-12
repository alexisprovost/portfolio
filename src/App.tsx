import { Routes, Route } from "react-router-dom";

import "./App.css";
import "animate.css";
import "@fontsource/krona-one";

import Header from "./components/Header";
import Home from "./views/Home";
import Projects from "./views/Projects";
import Contact from "./views/Contact";
import Footer from "./components/Footer";

const App = () => {
	return (
		<div className="App">
			<Header />
			<main>
				<section>
					<svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
						<path
							fill="#141b20"
							fillOpacity="1"
							d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,96C672,85,768,75,864,96C960,117,1056,171,1152,170.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
						></path>
					</svg>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/contact" element={<Contact />} />
					</Routes>
					<svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
						<path
							fill="#141b20"
							fillOpacity="1"
							d="M0,32L48,58.7C96,85,192,139,288,154.7C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
						></path>
					</svg>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export default App;

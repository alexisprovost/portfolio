import Nav from "@/components/Nav";
import "@/styles/globals.css";
import { Krona_One } from "next/font/google";

import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";

const kronaOne = Krona_One({ weight: "400", subsets: ["latin"] });

export const metadata = {
	title: {
		default: "Alexis Provost - Portfolio",
		template: "Alexis Provost - %s",
	},
	description: "Welcome to Alexis Provost's portfolio! I'm a creative professional with a passion for design and innovation. Check out my work and let's work together.",
	keywords: ["Alexis Provost", "portfolio", "programming languages", "data structures", "algorithms", "artificial intelligence", "machine learning", "computer vision", "design", "innovation", "graphic design", "user experience", "user interface", "branding", "creative strategy", "digital marketing", "visual communication", "product design", "web design", "art direction", "illustration", "animation", "photography", "typography"],
	author: "Alexis Provost",
	url: "https://alexisprovost.com",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
	const locale = useLocale();

	if (params.locale !== locale) {
		notFound();
	}

	let messages;
	try {
		messages = (await import(`../../messages/${locale}.json`)).default;
	} catch (error) {
		notFound();
	}

	return (
		<html lang={locale}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				<body className={kronaOne.className}>
					<div className="App">
						<main>{children}</main>
						<Footer />
					</div>
				</body>
			</NextIntlClientProvider>
		</html>
	);
}

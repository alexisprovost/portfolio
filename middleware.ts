import createMiddleware from "next-intl/middleware";

export default createMiddleware({
	locales: ["en", "fr"],
	defaultLocale: "fr",
	localeDetection: true,
});

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
};

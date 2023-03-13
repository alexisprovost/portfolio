import { LOCALES } from "../i18n/locales";

const getBrowserLocale = () : string => {
    //check if the language has been changed previously
    const localeLocalStorage = localStorage.getItem("locale"); 
    if (localeLocalStorage) {
        return localeLocalStorage;
    } else if (navigator.language.startsWith("fr")) {
		return LOCALES.FRENCH;
	} else {
		return LOCALES.ENGLISH;
	}
};

export default getBrowserLocale;

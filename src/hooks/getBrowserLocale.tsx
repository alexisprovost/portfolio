import { LOCALES } from "@/i18n/locales";

const getBrowserLocale = (): string => {
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

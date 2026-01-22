import { Fragment, ReactNode } from "react";
import { IntlProvider } from "react-intl";

import { LOCALES } from "./locales";
import messages from "./messages";

interface ProviderProps {
  children: ReactNode;
  locale?: string;
}

const Provider = ({ children, locale = LOCALES.ENGLISH }: ProviderProps) => {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

export default Provider;

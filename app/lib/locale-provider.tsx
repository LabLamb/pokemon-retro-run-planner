import { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { type Locale, defaultLocale } from "./i18n";

type LocaleProviderProps = {
  children: React.ReactNode;
  locale: Locale;
};

type LocaleProviderState = {
  locale: Locale;
};

const initialState: LocaleProviderState = {
  locale: defaultLocale,
};

const LocaleProviderContext = createContext<LocaleProviderState>(initialState);

export function LocaleProvider({
  children,
  locale,
  ...props
}: LocaleProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update i18next language when locale changes
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  const value = {
    locale,
  };

  return (
    <LocaleProviderContext.Provider {...props} value={value}>
      {children}
    </LocaleProviderContext.Provider>
  );
}

export const useLocale = () => {
  const context = useContext(LocaleProviderContext);

  if (context === undefined)
    throw new Error("useLocale must be used within a LocaleProvider");

  return context;
};

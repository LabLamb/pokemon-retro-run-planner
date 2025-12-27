import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { type Locale, isValidLocale, defaultLocale } from "./i18n";

type LocaleProviderProps = {
  children: React.ReactNode;
  initialLocale?: Locale;
  storageKey?: string;
};

type LocaleProviderState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const initialState: LocaleProviderState = {
  locale: defaultLocale,
  setLocale: () => null,
};

const LocaleProviderContext = createContext<LocaleProviderState>(initialState);

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
  storageKey = "pokemon-planner-locale",
  ...props
}: LocaleProviderProps) {
  const { i18n } = useTranslation();
  
  const [locale, setLocale] = useState<Locale>(() => {
    // Check if we're in browser environment
    if (typeof window === "undefined") {
      return initialLocale;
    }
    
    // Try to get locale from localStorage
    const stored = localStorage.getItem(storageKey);
    if (stored && isValidLocale(stored)) {
      return stored;
    }
    
    // Fall back to browser language preference
    const browserLang = navigator.language.split("-")[0];
    if (isValidLocale(browserLang)) {
      return browserLang;
    }
    
    return initialLocale;
  });

  useEffect(() => {
    // Update i18next language when locale changes
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  const value = {
    locale,
    setLocale: (newLocale: Locale) => {
      localStorage.setItem(storageKey, newLocale);
      setLocale(newLocale);
    },
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

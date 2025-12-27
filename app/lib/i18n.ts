import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../messages/en.json";
import es from "../messages/es.json";
import fr from "../messages/fr.json";

// Translation resources
export const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
} as const;

export const supportedLocales = ["en", "es", "fr"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isValidLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: defaultLocale,
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../messages/en.json";
import es from "../messages/es.json";
import fr from "../messages/fr.json";
import de from "../messages/de.json";
import it from "../messages/it.json";
import ja from "../messages/ja.json";
import ko from "../messages/ko.json";
import pt from "../messages/pt.json";
import zhHans from "../messages/zh-Hans.json";
import zhHant from "../messages/zh-Hant.json";

// Translation resources
export const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  ja: { translation: ja },
  ko: { translation: ko },
  pt: { translation: pt },
  "zh-Hans": { translation: zhHans },
  "zh-Hant": { translation: zhHant },
} as const;

export const supportedLocales = ["en", "es", "fr", "de", "it", "ja", "ko", "pt", "zh-Hans", "zh-Hant"] as const;
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

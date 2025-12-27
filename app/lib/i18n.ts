import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
export const resources = {
  en: {
    translation: {
      welcome: {
        title: "Welcome to Pokémon Retro Run Planner",
        description: "Plan your perfect retro Pokémon run",
        getStarted: "Get Started",
        learnMore: "Learn More",
      },
      nav: {
        home: "Home",
        planner: "Planner",
        pokemon: "Pokémon",
        about: "About",
      },
    },
  },
  es: {
    translation: {
      welcome: {
        title: "Bienvenido al Planificador de Pokémon Retro",
        description: "Planifica tu aventura perfecta de Pokémon retro",
        getStarted: "Comenzar",
        learnMore: "Aprender Más",
      },
      nav: {
        home: "Inicio",
        planner: "Planificador",
        pokemon: "Pokémon",
        about: "Acerca de",
      },
    },
  },
  fr: {
    translation: {
      welcome: {
        title: "Bienvenue au Planificateur Pokémon Rétro",
        description: "Planifiez votre aventure Pokémon rétro parfaite",
        getStarted: "Commencer",
        learnMore: "En Savoir Plus",
      },
      nav: {
        home: "Accueil",
        planner: "Planificateur",
        pokemon: "Pokémon",
        about: "À Propos",
      },
    },
  },
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

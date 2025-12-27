import type { Route } from "./+types/$locale._index";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Welcome } from "../welcome/welcome";
import { isValidLocale, defaultLocale, type Locale } from "../lib/i18n";
import { useEffect } from "react";
import i18n from "../lib/i18n";

export function meta({ params }: Route.MetaArgs) {
  const locale = (params.locale as Locale) || defaultLocale;
  const titles = {
    en: "Pokémon Retro Run Planner",
    es: "Planificador de Pokémon Retro",
    fr: "Planificateur Pokémon Rétro",
  };
  
  const descriptions = {
    en: "Plan your perfect retro Pokémon adventure",
    es: "Planifica tu aventura perfecta de Pokémon retro",
    fr: "Planifiez votre aventure Pokémon rétro parfaite",
  };

  return [
    { title: titles[locale] || titles[defaultLocale] },
    { name: "description", content: descriptions[locale] || descriptions[defaultLocale] },
    { property: "og:title", content: titles[locale] || titles[defaultLocale] },
    { property: "og:description", content: descriptions[locale] || descriptions[defaultLocale] },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale as string;
  
  // Set language synchronously during prerender
  if (locale && isValidLocale(locale)) {
    await i18n.changeLanguage(locale);
  }
  
  return { locale };
}

export default function LocaleHome({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const { i18n } = useTranslation();

  // Update i18n language when locale changes (for client-side navigation)
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return <Welcome />;
}

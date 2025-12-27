import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Welcome } from "../welcome/welcome";
import { defaultLocale } from "../lib/i18n";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokémon Retro Run Planner" },
    { name: "description", content: "Plan your perfect retro Pokémon adventure" },
  ];
}

export default function Home() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set language to English for the fallback page
    if (i18n.language !== defaultLocale) {
      i18n.changeLanguage(defaultLocale);
    }
  }, [i18n]);

  return <Welcome />;
}

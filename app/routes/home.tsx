import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { defaultLocale, isValidLocale } from "../lib/i18n";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pokémon Retro Run Planner" },
    { name: "description", content: "Plan your perfect retro Pokémon adventure" },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect browser language or use default
    let targetLocale = defaultLocale;
    
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.split("-")[0];
      if (isValidLocale(browserLang)) {
        targetLocale = browserLang;
      }
    }
    
    // Redirect to locale-prefixed path
    navigate(`/${targetLocale}`, { replace: true });
  }, [navigate]);

  return null;
}

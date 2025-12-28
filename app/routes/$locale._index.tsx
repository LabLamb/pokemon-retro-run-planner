import type { Route } from "./+types/$locale._index";
import { useTranslation } from "react-i18next";
import { Welcome } from "../welcome/welcome";
import { isValidLocale, defaultLocale, type Locale } from "../lib/i18n";
import { useEffect } from "react";
import i18n from "../lib/i18n";

export function meta({ params }: Route.MetaArgs) {
  const locale = (params.locale as Locale) || defaultLocale;
  const titles: Record<Locale, string> = {
    en: "Pokémon Retro Run Planner",
    es: "Planificador de Pokémon Retro",
    fr: "Planificateur Pokémon Rétro",
    de: "Pokémon Retro Run Planner",
    it: "Pianificatore Pokémon Retro",
    ja: "ポケモンレトロランプランナー",
    ko: "포켓몬 레트로 런 플래너",
    pt: "Planejador Pokémon Retro",
    "zh-Hans": "宝可梦复古跑步规划器",
    "zh-Hant": "寶可夢復古跑步規劃器",
  };

  const descriptions: Record<Locale, string> = {
    en: "Plan your perfect retro Pokémon adventure",
    es: "Planifica tu aventura perfecta de Pokémon retro",
    fr: "Planifiez votre aventure Pokémon rétro parfaite",
    de: "Plane dein perfektes Pokémon-Retro-Abenteuer",
    it: "Pianifica la tua perfetta avventura Pokémon retro",
    ja: "完璧なレトロポケモンアドベンチャーを計画しよう",
    ko: "완벽한 레트로 포켓몬 모험을 계획하세요",
    pt: "Planeje sua aventura perfeita de Pokémon retro",
    "zh-Hans": "规划您完美的复古宝可梦冒险",
    "zh-Hant": "規劃您完美的復古寶可夢冒險",
  };

  return [
    { title: titles[locale] || titles[defaultLocale] },
    {
      name: "description",
      content: descriptions[locale] || descriptions[defaultLocale],
    },
    { property: "og:title", content: titles[locale] || titles[defaultLocale] },
    {
      property: "og:description",
      content: descriptions[locale] || descriptions[defaultLocale],
    },
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

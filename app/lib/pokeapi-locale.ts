/**
 * PokeAPI locale mapping utilities
 * Maps our i18n locale codes to PokeAPI language codes
 */

import type { Locale } from "./i18n";

/**
 * Map our locale codes to PokeAPI language codes
 * PokeAPI uses ISO 639-1 codes with some variations
 */
export const POKEAPI_LANGUAGE_MAP: Record<Locale, string> = {
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  ja: "ja-Hrkt", // Japanese with Hiragana/Katakana
  ko: "ko",
  pt: "pt-BR", // Brazilian Portuguese (PokeAPI doesn't have pt-PT)
  "zh-Hans": "zh-Hans", // Simplified Chinese
  "zh-Hant": "zh-Hant", // Traditional Chinese
};

/**
 * Get PokeAPI language code from our locale
 */
export function getPokeAPILanguage(locale: Locale): string {
  return POKEAPI_LANGUAGE_MAP[locale];
}

/**
 * Extract localized name from PokeAPI names array
 * Falls back to English if the requested language is not available
 */
export function getLocalizedName(
  names: Array<{ name: string; language: { name: string } }>,
  locale: Locale
): string {
  const pokeapiLang = getPokeAPILanguage(locale);
  
  // Try to find the name in the requested language
  const localizedName = names.find((n) => n.language.name === pokeapiLang);
  if (localizedName) {
    return localizedName.name;
  }
  
  // Fallback to English
  const englishName = names.find((n) => n.language.name === "en");
  if (englishName) {
    return englishName.name;
  }
  
  // Last resort: return the first available name
  return names[0]?.name || "";
}

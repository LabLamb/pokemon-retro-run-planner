/**
 * Global theme and locale switchers
 * Layer 1: UI component
 */

import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router";
import { Languages } from "lucide-react";
import { ThemeToggle } from "~/components/ui/theme-toggle";
import { useLocale } from "~/lib/locale-provider";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const locales = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "pt", label: "Português" },
  { code: "zh-Hans", label: "简体中文" },
  { code: "zh-Hant", label: "繁體中文" },
];

export function GlobalSwitchers() {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocaleLabel = locales.find((l) => l.code === locale)?.label || "English";

  const handleLocaleChange = (newLocale: string) => {
    // Replace the current locale in the path with the new one
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      // Replace first segment (current locale) with new locale
      pathParts[0] = newLocale;
      navigate("/" + pathParts.join("/"));
    } else {
      // If at root, navigate to new locale
      navigate("/" + newLocale);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Locale Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLocaleLabel}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {locales.map(({ code, label }) => (
            <DropdownMenuItem
              key={code}
              onClick={() => handleLocaleChange(code)}
              className={locale === code ? "bg-accent" : ""}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
}

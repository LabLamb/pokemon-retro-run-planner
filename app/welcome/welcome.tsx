import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import type { Locale } from "../lib/i18n";
import { Button } from "../components/ui/button";

export function Welcome() {
  const { t } = useTranslation();
  const params = useParams();
  const currentLocale = (params.locale as Locale) || "en";

  return (
    <main className="h-screen flex items-center justify-center overflow-hidden">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0 max-h-full overflow-y-auto py-8">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4"></div>
          <h1 className="text-4xl font-bold text-center px-4">
            {t("welcome.title")}
          </h1>
          <p className="text-xl text-center px-4 text-muted-foreground">
            {t("welcome.description")}
          </p>
          <div className="max-w-2xl px-4">
            <p className="text-base text-center text-muted-foreground leading-relaxed">
              {t("welcome.longDescription")}
            </p>
          </div>
          <Link to={`/${currentLocale}/planner`}>
            <Button size="lg" className="text-lg px-8 py-6">
              {t("welcome.goToPlanner")}
            </Button>
          </Link>
        </header>
      </div>
    </main>
  );
}

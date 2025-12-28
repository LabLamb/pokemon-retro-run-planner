import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Flame, Search, ArrowRight } from "lucide-react";
import type { Locale } from "../lib/i18n";

export default function Planner() {
  const { t } = useTranslation();
  const params = useParams();
  const currentLocale = (params.locale as Locale) || "en";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Tools Section */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            {t("planner.tools.title", "Planning Tools")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t(
              "planner.tools.description",
              "Choose a tool to help plan your perfect Pokémon run"
            )}
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Field Moves Search Tool */}
            <Card className="hover:scale-[1.02] transition-transform">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    {t(
                      "planner.tools.fieldMovesSearch.title",
                      "Field Skills Search"
                    )}
                  </CardTitle>
                  <Badge variant="default">
                    {t("planner.tools.available", "Available")}
                  </Badge>
                </div>
                <CardDescription>
                  {t(
                    "planner.tools.fieldMovesSearch.description",
                    "Find Pokémon that can learn specific HMs and field moves for your adventure"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={`/${currentLocale}/planner/field-moves-based-search`}>
                  <Button className="w-full" size="lg">
                    {t("planner.tools.open", "Open Tool")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Placeholder for future tools */}
            <Card className="hover:scale-[1.02] transition-transform opacity-75">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-muted-foreground" />
                    {t("planner.tools.moreTools", "More Tools")}
                  </CardTitle>
                  <Badge variant="outline">
                    {t("planner.tools.comingSoon", "Coming Soon")}
                  </Badge>
                </div>
                <CardDescription>
                  {t(
                    "planner.tools.moreToolsDescription",
                    "Team builder, route planner, and more coming soon!"
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  variant="secondary"
                  disabled
                >
                  {t("planner.tools.comingSoon", "Coming Soon")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

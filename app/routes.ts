import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Redirect root to default locale
  index("routes/home.tsx"),
  // Locale-based routes (SSG for index, SPA for planner)
  layout("routes/planner._layout.tsx", [
    route(":locale", "routes/$locale._index.tsx"),
    route(":locale/planner", "routes/planner.tsx"),
    route(":locale/planner/field-moves-based-search", "routes/planner.field-move-based-search.tsx"),
  ]),
] satisfies RouteConfig;

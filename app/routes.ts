import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Redirect root to default locale
  index("routes/home.tsx"),
  // Locale homepage (SSG)
  route(":locale", "routes/$locale._index.tsx"),
  // Planner routes with shared layout
  layout("routes/planner._layout.tsx", [
    route(":locale/planner", "routes/planner.tsx"),
    route(":locale/planner/field-moves-based-search", "routes/planner.field-move-based-search.tsx"),
  ]),
] satisfies RouteConfig;

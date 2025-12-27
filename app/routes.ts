import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Redirect root to default locale
  index("routes/home.tsx"),
  // Planner route (SPA only)
  route("planner", "routes/planner.tsx"),
  // Locale-based routes (SSG)
  route(":locale", "routes/$locale._index.tsx"),
] satisfies RouteConfig;

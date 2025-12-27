import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Redirect root to default locale
  index("routes/home.tsx"),
  // Locale-based routes
  route(":locale", "routes/$locale._index.tsx"),
] satisfies RouteConfig;

import type { Config } from "@react-router/dev/config";
import { supportedLocales } from "./app/lib/i18n";

export default {
  // Disable SSR to enable SPA mode for client-side navigation
  ssr: false,
  // Prerender the home page at build time (SSG)
  async prerender() {
    // Prerender root and all locale paths
    return ["/", ...supportedLocales.map((locale) => `/${locale}`)];
  },
} satisfies Config;

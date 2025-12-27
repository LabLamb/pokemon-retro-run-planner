import type { Config } from "@react-router/dev/config";

export default {
  // Disable SSR to enable SPA mode for client-side navigation
  ssr: false,
  // Prerender the home page at build time (SSG)
  async prerender() {
    return ["/"];
  },
} satisfies Config;

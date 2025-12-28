/// <reference types="vitest" />

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
    // Disable React Router plugin during tests to avoid preamble detection issues
    mode !== "test" && reactRouter(),
    tsconfigPaths(),
  ].filter(Boolean),
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./test.setup.ts",
  },
}));

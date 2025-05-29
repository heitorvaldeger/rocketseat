import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

import type { UserConfig } from "vite";
import type { InlineConfig } from "vitest/node";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    environment: "happy-dom",
  },
} as UserConfig & {
  test: InlineConfig;
});

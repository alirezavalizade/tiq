import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

import type { Adapter } from "vite-plugin-mix";
import mixPlugin from "vite-plugin-mix";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

interface MixConfig {
  handler: string;
  adapter?: Adapter | undefined;
}

type MixPlugin = (config: MixConfig) => Plugin;

interface Mix {
  default: MixPlugin;
}

const mix = (mixPlugin as unknown as Mix).default;

export default defineConfig({
  plugins: [
    mix({
      handler: "./db/server.js",
    }),
    svgr({
      svgrOptions: { exportType: "named", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) }],
  },
  server: {
    port: 9090,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
});

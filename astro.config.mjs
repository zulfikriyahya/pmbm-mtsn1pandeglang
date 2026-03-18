import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://daftar.mtsn1pandeglang.sch.id",
  integrations: [react(), tailwind({ applyBaseStyles: false }), sitemap()],
  output: "static",
  build: {
    assets: "_assets",
  },
  vite: {
    resolve: {
      alias: {
        "@components": "/src/components",
        "@data": "/src/data",
        "@config": "/src/config",
        "@layouts": "/src/layouts",
        "@styles": "/src/styles",
      },
    },
  },
});

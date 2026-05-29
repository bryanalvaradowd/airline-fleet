import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bryanalvaradowd.github.io",
  base: "/airline-fleet",
  output: "static",
  server: { host: true },
});

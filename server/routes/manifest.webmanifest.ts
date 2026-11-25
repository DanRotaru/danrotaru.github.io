// /manifest.webmanifest (web app manifest)
import { site } from "@/lib/site";

export default defineEventHandler((event) => {
  setResponseHeader(event, "Content-Type", "application/manifest+json; charset=utf-8");
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/static/favicon/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/static/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/static/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
});

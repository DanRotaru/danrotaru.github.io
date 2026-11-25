// /robots.txt
import { site } from "@/lib/site";

export default defineEventHandler((event) => {
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return ["User-Agent: *", "Allow: /", "", `Host: ${site.url}`, `Sitemap: ${site.url}/sitemap.xml`, ""].join("\n");
});

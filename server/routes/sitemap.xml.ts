// /sitemap.xml, generated from the same data as the pages at build time.
import { legalUpdated } from "@/content/legal/updated";
import { posts } from "@/data/posts";
import { latestProjects } from "@/data/projects";
import { site } from "@/lib/site";

type ChangeFrequency = "weekly" | "monthly";
type SitemapEntry = { url: string; lastModified?: Date; changeFrequency: ChangeFrequency; priority: number };

function url(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

function date(iso: string): Date {
  return new Date(`${iso.slice(0, 10)}T00:00:00.000Z`);
}

function latest(dates: string[]): Date | undefined {
  const sorted = [...dates].sort();
  const last = sorted[sorted.length - 1];
  return last ? date(last) : undefined;
}

function entries(): SitemapEntry[] {
  const lastPost = latest(posts.map((post) => post.updated ?? post.date));
  const newest = latestProjects[0]?.project.launched;
  const lastProject = newest ? date(`${newest}-01`) : undefined;

  const pages: SitemapEntry[] = [
    { url: url("/"), lastModified: lastPost, changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/projects"), lastModified: lastProject, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/blog"), lastModified: lastPost, changeFrequency: "weekly", priority: 0.8 },
    ...["/contact", "/coffee", "/toolbox", "/links"].map((path) => ({
      url: url(path),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    { url: url("/legal/privacy"), lastModified: date(legalUpdated.privacy), changeFrequency: "weekly", priority: 0.2 },
    { url: url("/legal/terms"), lastModified: date(legalUpdated.terms), changeFrequency: "weekly", priority: 0.2 },
  ];

  const blog: SitemapEntry[] = posts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: date(post.updated ?? post.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...pages, ...blog];
}

export default defineEventHandler((event) => {
  const body = entries()
    .map((entry) =>
      [
        "<url>",
        `<loc>${entry.url}</loc>`,
        entry.lastModified ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>` : "",
        `<changefreq>${entry.changeFrequency}</changefreq>`,
        `<priority>${entry.priority}</priority>`,
        "</url>",
      ].join("\n"),
    )
    .join("\n");

  setResponseHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
});

// RSS 2.0 feed of the blog (/blog/rss.xml), generated from data/posts.ts at build time.
import { posts } from "@/data/posts";
import { site } from "@/lib/site";

const FEED_TITLE = `${site.name} — Blog`;
const FEED_DESCRIPTION = `Notes on building software, from the interface to the AI behind it, by ${site.name}.`;

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

const rfc822 = (iso: string) => new Date(`${iso}T00:00:00Z`).toUTCString();

const imageType = (path: string) => {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "avif") return "image/avif";
  return "image/webp";
};

export default defineEventHandler((event) => {
  const blogUrl = `${site.url}/blog`;
  const lastBuild = posts.reduce((latest, post) => (post.date > latest ? post.date : latest), posts[0]?.date ?? "");
  const year = new Date().getUTCFullYear();

  const items = posts
    .map((post) => {
      const url = `${blogUrl}/${post.slug}`;
      const categories = post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n");
      return `    <item>
      <title>${cdata(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="false">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${cdata(`${post.description} (${post.readingTime} min read)`)}</description>
      <author>${escapeXml(`${site.email} (${site.name})`)}</author>
${categories}
      <enclosure url="${escapeXml(`${site.url}${post.cover}`)}" length="0" type="${imageType(post.cover)}"/>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <lastBuildDate>${lastBuild ? rfc822(lastBuild) : new Date().toUTCString()}</lastBuildDate>
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
    <generator>Nuxt</generator>
    <language>en</language>
    <atom:link href="${blogUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <title>${escapeXml(FEED_TITLE)}</title>
      <url>${site.url}/opengraph-image</url>
      <link>${blogUrl}</link>
    </image>
    <copyright>${escapeXml(`All rights reserved ${year}, ${site.name}`)}</copyright>
${items}
  </channel>
</rss>
`;

  setResponseHeader(event, "Content-Type", "application/rss+xml; charset=utf-8");
  return xml;
});

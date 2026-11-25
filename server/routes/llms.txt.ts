// /llms.txt — a Markdown overview of the site for AI assistants, generated
// from the same data as the pages (posts, projects, site config).

import { posts } from "@/data/posts";
import { sideProjects } from "@/data/projects";
import { site } from "@/lib/site";

const pages: { title: string; path: string; description: string }[] = [
  { title: "Home", path: "/", description: "Home — overview, curated work, and recent writing" },
  { title: "About", path: "/about", description: `About ${site.name} — bio, experience, and links` },
  { title: "Projects", path: "/projects", description: "Projects — web apps, tools, Chrome extensions and libraries" },
  { title: "Blog", path: "/blog", description: "Blog — articles on web development and engineering" },
  { title: "Contact", path: "/contact", description: "Contact — get in touch" },
  { title: "Toolbox", path: "/toolbox", description: "Toolbox — my favorite software and the dev tools I use daily" },
];

function absolute(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

function buildLlmsTxt(): string {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Website: ${site.url}`,
    `Email: ${site.email}`,
    "",
    "## Contact",
    "",
    "Taking on freelance projects and open to full-time roles.",
    `Reach out at ${absolute("/contact")}.`,
    "",
    "## Docs",
    "",
    `- [Sitemap](${absolute("/sitemap.xml")})`,
    `- [RSS](${absolute("/blog/rss.xml")})`,
    "",
    "## Pages",
    "",
    ...pages.map((page) => `- [${page.title}](${absolute(page.path)}): ${page.description}`),
    "",
    "## Blog Posts",
    "",
    ...posts.map((post) => `- [${post.title}](${absolute(`/blog/${post.slug}`)}): ${post.description}`),
    "",
    "## Projects",
    "",
    ...sideProjects.map(
      ({ project }) => `- [${project.title}](${project.liveUrl ?? project.repoUrl ?? absolute("/projects")}): ${project.description}`,
    ),
    "",
  ];
  return lines.join("\n");
}

export default defineEventHandler((event) => {
  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return buildLlmsTxt();
});

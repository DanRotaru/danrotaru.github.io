// Blog post index — metadata for every post. The post body lives in
// src/content/blog/<slug>.mdx. Used by /blog, /blog/[slug], the home page,
// search, RSS and the sitemap. Newest first.

export type PostMeta = {
  slug: string;
  title: string;
  /** Full <title> (defaults to `${title} - Dan Rotaru`). */
  seoTitle?: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  updated?: string;
  cover: string;
  coverAlt?: string;
  tags: string[];
  /** Minutes. */
  readingTime: number;
  wordCount: number;
  featured?: boolean;
  /** Short line printed over the cover image on blog cards. */
  coverLabel?: string;
  /** <meta name="description"> when it differs from `description` (the lead). */
  seoDescription?: string;
};

export const posts: PostMeta[] = [
  {
    slug: "hello-world",
    coverLabel: "Hello, World",
    title: "Hello World: A New dan13.me",
    seoTitle: "Hello World: Rebuilding dan13.me From Scratch - Dan Rotaru",
    description:
      "The first post on the new dan13.me: why I rebuilt the site, what's inside it, and how it compares to the old one, with screenshots side by side.",
    date: "2026-11-24",
    updated: "2026-11-24",
    cover: "/static/blog/hello-world/cover.webp",
    coverAlt: "The old dan13.me homepage next to the new one",
    tags: ["personal", "nuxt", "web-design"],
    readingTime: 4,
    wordCount: 832,
    featured: true,
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string, style: "long" | "short" = "long"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
}

/** "Oct 07, 2026" — two-digit day, as on the blog cards. */
export function formatCardDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

/** Full <title> of a post page. */
export function postSeoTitle(post: PostMeta): string {
  return post.seoTitle ?? `${post.title} - Dan Rotaru`;
}

/** Unique tags, most used first (ties keep first-appearance order) — blog filter chips. */
export function allPostTags(): string[] {
  const counts = new Map<string, number>();
  for (const tag of posts.flatMap((post) => post.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.keys()].sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
}

const tagLabels: Record<string, string> = {
  nextjs: "Next.js",
  "claude-code": "Claude Code",
  ai: "AI",
  "web-vitals": "Web Vitals",
  mdx: "MDX",
};

/** Human label for a tag slug ("developer-tools" => "developer tools"). */
export function tagLabel(tag: string): string {
  return tagLabels[tag] ?? tag.replace(/-/g, " ");
}

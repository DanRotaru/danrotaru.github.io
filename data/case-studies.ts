// Case-study template: types and helpers for /projects/[slug] pages (no route or
// content yet). The body of each case study would live in `content/projects/<slug>.mdx`;
// everything around it (hero, meta, stack, next link) comes from `caseStudy` below.

export type ProjectImage = {
  src: string;
  alt: string;
  /** Intrinsic size (used by next/image). */
  width?: number;
  height?: number;
};

/**
 * How the screenshots are arranged on the gradient card (/projects):
 * - `single` / `single-left`: one browser screenshot, slightly tilted right / left
 * - `duo`: two overlapping desktop screenshots (second fans out on hover)
 * - `phones`: three phone screenshots fanned out
 * - `stack`: two screenshots stacked diagonally
 */
export type ProjectCardLayout = "single" | "single-left" | "duo" | "phones" | "stack";

export type ProjectCard = {
  /** Card background (CSS `background` value). */
  gradient: string;
  layout: ProjectCardLayout;
};

/** Icon shown in front of a meta link on the case study. */
export type CaseStudyLinkIcon = "globe" | "download" | "github";

export type CaseStudyLink = {
  /** Small label above the link, e.g. "Visit", "Source", "Download". */
  label: string;
  href: string;
  text: string;
  icon: CaseStudyLinkIcon;
};

export type CaseStudyTech = {
  name: string;
  /** View id in `/static/icons/sprite.svg` (e.g. "nextjs"). Omit for a blank slot. */
  icon?: string;
  /** Invert the icon in dark mode (monochrome logos). */
  invert?: boolean;
};

export type CaseStudy = {
  role: string;
  /** e.g. "Q2 2026". */
  built: string;
  updated: string;
  links: CaseStudyLink[];
  stack: CaseStudyTech[];
  /** Screen-reader-only summary rendered before the body. */
  tldr: string;
  /** Hero backdrop: photo (light theme) and glyph pattern (dark theme). */
  heroImage: string;
  heroGlyph: string;
  /** Screenshot used by the "Up next" link pointing at this project. */
  cover: ProjectImage;
};

export type Project = {
  slug: string;
  title: string;
  /** Category label, e.g. "Web App". */
  category: string;
  /** Short one-liner shown on the image overlay. */
  tagline: string;
  /** Card / meta description. */
  description: string;
  /** Key technologies shown on cards. */
  tech: string[];
  /** One or more screenshots (first one is the cover). */
  images: ProjectImage[];
  /** Full <title> of the case study page. */
  seoTitle: string;
  datePublished: string;
  dateModified: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Short bullet points (home page detail panel). */
  highlights?: string[];
  /** Gradient card on /projects. */
  card: ProjectCard;
  /** Case study shell for /projects/[slug]. */
  caseStudy: CaseStudy;
};

/** Case studies (none yet). Add entries here and a body in `content/projects/<slug>.mdx`. */
export const projects: Project[] = [];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}


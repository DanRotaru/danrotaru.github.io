// Projects shown on /projects: everything from https://dan13.me/projects
// (web apps, tools, Chrome extensions, a desktop app, a library), in the same
// order. Rendered with the "Curated work" layout; cards are static previews
// and the links open the live app. Screenshots: /public/projects/<slug>/.
//
// `launched` ("YYYY-MM") comes from the GitHub repo creation date where there
// is one. Otherwise: Cepret.md / Movie Shuffle = first HTTPS certificate of the
// domain; QuickCConverter / JSON & Code Viewer = when they were added to the
// previous site. Adjust if you remember better.

import type { HomeWorkAccent, HomeWorkLayout, WorkItem } from "@/data/home";

export type ProjectImage = {
  src: string;
  alt: string;
  /** Intrinsic size. */
  width?: number;
  height?: number;
};

/** A project as the "Curated work" layout shows it. */
export type WorkProject = {
  slug: string;
  title: string;
  /** e.g. "Chrome extension". */
  category: string;
  /** One-liner on the card. */
  tagline: string;
  description: string;
  /** Tags: shown on the project and used by the filter on /projects. */
  tech: string[];
  /** Screenshots (first one is the cover). */
  images: ProjectImage[];
  liveUrl?: string;
  repoUrl?: string;
  /** Launch month as "YYYY-MM", shown as "November, 2026". */
  launched?: string;
};

/** "2026-11" -> "November, 2026". */
export function formatLaunched(value: string): string {
  const [year, month] = value.split("-").map(Number);
  const name = new Date(Date.UTC(year!, (month ?? 1) - 1, 1)).toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  return `${name}, ${year}`;
}

const chromeStore = "https://chromewebstore.google.com/detail";

const gradients: Record<HomeWorkAccent, string> = {
  pink: "linear-gradient(145deg, #831843 0%, #DB2777 40%, #f472b6 75%, #fbcfe8 100%)",
  blue: "linear-gradient(145deg, #1e2a78 0%, #2932CB 40%, #5a6aef 75%, #a0b0ff 100%)",
  gray: "linear-gradient(145deg, #1f2937 0%, #4b5563 40%, #9ca3af 75%, #d1d5db 100%)",
  purple: "linear-gradient(145deg, #4a1d8e 0%, #7E22CE 40%, #a855f7 75%, #d8b4fe 100%)",
};

type SideProjectInput = {
  slug: string;
  title: string;
  category: "Web app" | "Web tool" | "Chrome extension" | "Desktop app" | "Library";
  /** "YYYY-MM". */
  launched: string;
  tagline: string;
  description: string;
  /** Tags: shown on the project and used by the filter on /projects. */
  tech: string[];
  highlights: string[];
  /** Screenshot file names in /public/projects/<slug>/ (first is the cover). */
  shots: string[];
  /** Intrinsic [width, height] of the screenshots. */
  size: [number, number];
  accent: HomeWorkAccent;
  /** Defaults to "slides" with several screenshots, "single" with one. */
  layout?: HomeWorkLayout;
  liveUrl?: string;
  repoUrl?: string;
  linkLabel: string;
};

const sideProject = (input: SideProjectInput): WorkItem => ({
  project: {
    slug: input.slug,
    title: input.title,
    category: input.category,
    launched: input.launched,
    tagline: input.tagline,
    description: input.description,
    tech: input.tech,
    images: input.shots.map((shot, i) => ({ src: `/static/projects/${input.slug}/${shot}`, alt: `${input.title} screenshot ${i + 1}` })),
    liveUrl: input.liveUrl,
    repoUrl: input.repoUrl,
  },
  config: {
    slug: input.slug,
    accent: input.accent,
    gradient: gradients[input.accent],
    layout: input.layout ?? (input.shots.length > 1 ? "slides" : "single"),
    imageSizes: input.shots.map(() => input.size),
    highlights: input.highlights,
    linkLabel: input.linkLabel,
  },
});

export const sideProjects: WorkItem[] = [
  sideProject({
    slug: "eihai",
    title: "EiHAI",
    category: "Desktop app",
    launched: "2026-05",
    tagline: "One desktop workspace for all your AI coding agents",
    description:
      "EiHAI runs your local CLI agents, like Claude Code and Codex, in one desktop workspace: parallel agents, split-pane terminals, an infinite canvas, a Monaco editor, a built-in browser, Git with AI commit messages, and one-click session resume.",
    tech: ["Desktop app", "Windows", "Electron"],
    highlights: [
      "Run Claude, Codex and your own CLI agents side by side",
      "Split-pane terminals and an infinite, zoomable canvas",
      "Git, worktrees and AI-written commit messages",
      "Resume any past session in one click",
    ],
    // Animated WebP clips cut from the feature videos on eihai.cc.
    shots: [
      "team-of-agents.webp",
      "split-pane.webp",
      "freeform-canvas.webp",
      "git.webp",
      "git-commit.webp",
      "one-click-resume.webp",
    ],
    size: [1200, 793],
    accent: "blue",
    liveUrl: "https://eihai.cc/?utm_source=dan13.me",
    linkLabel: "Visit eihai.cc",
  }),
  sideProject({
    slug: "cepret",
    title: "Cepret.md",
    category: "Web app",
    launched: "2026-05",
    tagline: "Compare prices across Moldova's online stores",
    description:
      "Compare prices of products from online stores in Moldova to quickly find the best deal, all in one search.",
    tech: ["Web app"],
    highlights: [
      "One search across Moldova's online stores",
      "Spot the best deal at a glance",
      "Built for shoppers in Moldova",
    ],
    shots: ["cepret.webp", "cepret-2.webp", "cepret-3.webp"],
    size: [1600, 907],
    accent: "blue",
    liveUrl: "https://cepret.md/?utm_source=dan13.me",
    linkLabel: "Open Cepret.md",
  }),
  sideProject({
    slug: "movie-shuffle",
    title: "Movie Shuffle",
    category: "Web app",
    launched: "2026-03",
    tagline: "Can't pick a movie? Shuffle one",
    description:
      "Discover a random movie. Set filters by year, genre and country, then shuffle to find something new to watch.",
    tech: ["Web app"],
    highlights: ["Filter by year, genre and country", "One click to shuffle", "Find something new to watch"],
    shots: ["movie-shuffle.webp"],
    size: [1600, 853],
    accent: "pink",
    liveUrl: "https://movie-shuffle.dan13.me/",
    linkLabel: "Open the app",
  }),
  sideProject({
    slug: "material-design-icons",
    title: "Material Design Icons",
    category: "Web tool",
    launched: "2020-09",
    tagline: "7,000+ open-source icons, the fastest way to grab the one you need",
    description:
      "An open-source icon viewer for designers and developers. Search 7,000+ Material Design icons and take the one you need: copy it as HTML, CSS, a data path or encoded, or just download it.",
    tech: ["Web tool", "JavaScript", "SVG", "CSS", "Open source"],
    highlights: [
      "7,000+ icons with instant keyword and tag search",
      "Copy as HTML tag, CSS, data path or encoded SVG",
      "Recolour before copying or downloading",
      "Just icons, nothing else",
    ],
    shots: ["material-design-icons.webp"],
    size: [1600, 900],
    accent: "purple",
    liveUrl: "https://dan13.me/icons",
    linkLabel: "Open the app",
  }),
  sideProject({
    slug: "quickcconverter",
    title: "QuickCConverter",
    category: "Chrome extension",
    launched: "2024-07",
    tagline: "Lightning-fast currency conversions right in the browser",
    description:
      "Quick Currency Converter is the fastest currency converter extension: select an amount on any page or open the popup with a shortcut, convert into several currencies at once and make it yours with themes.",
    tech: ["Chrome extension", "JavaScript"],
    highlights: [
      "Convert a selected amount on any page",
      "Several currencies side by side",
      "Alt + Q keyboard shortcut",
      "Themes and customisation",
    ],
    shots: ["main.webp", "shortcut.webp", "multiple-currency-converter.webp", "customization.webp", "theme.webp", "selecting.webp"],
    size: [1400, 930],
    accent: "blue",
    liveUrl: `${chromeStore}/quickcconverter-quick-cur/ajgaihokdfdjgephfaibpdjbogepckgd`,
    linkLabel: "Chrome Web Store",
  }),
  sideProject({
    slug: "clickup-track",
    title: "ClickUp Track",
    category: "Chrome extension",
    launched: "2024-07",
    tagline: "Time tracking built straight into your ClickUp workflow",
    description:
      "ClickUp Track is a Chrome extension that boosts productivity by integrating time tracking directly into ClickUp, so you can start, stop and review time without leaving the task you're on.",
    tech: ["Chrome extension", "JavaScript", "Open source"],
    highlights: [
      "Start and stop timers from any task",
      "Review tracked time at a glance",
      "Syncs with the ClickUp API",
      "Lives where you already work",
    ],
    shots: ["page.webp", "page-1.webp", "page-2.webp", "page-3.webp", "page-4.webp", "page-5.webp"],
    size: [1280, 800],
    accent: "pink",
    liveUrl: `${chromeStore}/clickup-track/lmjdappfabcipedkfgjccefgjdgcgglb`,
    linkLabel: "Chrome Web Store",
  }),
  sideProject({
    slug: "json-code-viewer",
    title: "JSON & Code Viewer",
    category: "Chrome extension",
    launched: "2024-11",
    tagline: "A beautiful code editor for raw JSON, CSS and JavaScript",
    description:
      "JSON & Code Viewer replaces the browser's plain-text view of JSON, CSS and JavaScript files with a beautifully styled code editor: syntax highlighting, folding, themes and options.",
    tech: ["Chrome extension", "JavaScript"],
    highlights: [
      "Pretty-prints JSON, CSS and JavaScript",
      "Syntax highlighting and code folding",
      "Monokai, light and other themes",
      "Configurable options page",
    ],
    shots: ["main.webp", "monokai-theme.webp", "options.webp", "options-2.webp", "js-code-viewer.webp", "light-theme.webp"],
    size: [1280, 800],
    accent: "gray",
    liveUrl: `${chromeStore}/json-code-viewer/miahlkanimkomfiiecemmdmjgenckamn`,
    linkLabel: "Chrome Web Store",
  }),
  sideProject({
    slug: "svg-tools",
    title: "SVG Tools",
    category: "Web tool",
    launched: "2022-06",
    tagline: "Encode any SVG for CSS, HTML, inline tags or <img>",
    description: "The simple way to get an SVG encoded for CSS backgrounds, HTML, an inline tag, an <img> source and so on.",
    tech: ["Web tool", "JavaScript", "SVG", "CSS", "Open source"],
    highlights: ["Encode for CSS url()", "Ready-to-paste HTML and <img> snippets", "Runs in the browser"],
    shots: ["svgtools.webp"],
    size: [1600, 910],
    accent: "blue",
    layout: "single-left",
    liveUrl: "https://dan13.me/svgtools/",
    linkLabel: "Open the tool",
  }),
  sideProject({
    slug: "freezeit",
    title: "FreezeIt",
    category: "Chrome extension",
    launched: "2025-12",
    tagline: "Freeze inactive tabs in one click and save memory",
    description:
      "FreezeIt is a Chrome extension that freezes inactive Chrome tabs in one click to save memory, with smart exclusions and full control.",
    tech: ["Chrome extension", "JavaScript", "Open source"],
    highlights: ["One-click tab freezing", "Smart exclusions for tabs you need", "Less memory, faster browser"],
    shots: ["freezeit.webp"],
    size: [1280, 800],
    accent: "purple",
    liveUrl: `${chromeStore}/lpkjccggcoeennbdknjicaeojbnkidah`,
    linkLabel: "Chrome Web Store",
  }),
  sideProject({
    slug: "colorname",
    title: "ColorName",
    category: "Web tool",
    launched: "2022-12",
    tagline: "Get a colour's name from its HEX code",
    description: "Paste a HEX code, get a human name for the colour. Don't waste time naming colours.",
    tech: ["Web tool", "JavaScript", "Open source"],
    highlights: ["HEX to nearest named colour", "Handy for design tokens and variables", "Instant, no sign-up"],
    shots: ["colorname.webp"],
    size: [1600, 856],
    accent: "pink",
    liveUrl: "https://dan13.me/colorname/",
    linkLabel: "Open the tool",
  }),
  sideProject({
    slug: "css-color-filter",
    title: "CSS Color Filter",
    category: "Web tool",
    launched: "2023-06",
    tagline: "Turn black into any colour with a CSS filter",
    description:
      "A CSS filter generator that converts black into any target HEX colour, handy for recolouring icons and SVGs you can't edit.",
    tech: ["Web tool", "JavaScript", "CSS", "Open source"],
    highlights: ["Black to any HEX colour", "Copy-ready filter value", "Great for icons and images"],
    shots: ["cssfilter.webp"],
    size: [1600, 855],
    accent: "purple",
    layout: "single-left",
    liveUrl: "https://dan13.me/css-filter/",
    linkLabel: "Open the tool",
  }),
  sideProject({
    slug: "refresh-rate-switcher",
    title: "Refresh Rate Switcher",
    category: "Desktop app",
    launched: "2026-02",
    tagline: "Change your monitor's refresh rate in one click",
    description:
      "An open-source, lightweight Windows desktop app for quickly changing your monitor's refresh rate.",
    tech: ["Desktop app", "Windows", "Open source"],
    highlights: ["Switch refresh rate from the tray", "Lightweight, no bloat", "Open source on GitHub"],
    shots: ["refresh-rate-switcher.webp"],
    size: [1280, 720],
    accent: "gray",
    repoUrl: "https://github.com/DanRotaru/refresh-rate-switcher",
    linkLabel: "View on GitHub",
  }),
  sideProject({
    slug: "storage-js",
    title: "Storage.js",
    category: "Library",
    launched: "2020-08",
    tagline: "A lightweight wrapper around the LocalStorage API",
    description: "Storage.js is a lightweight JavaScript library for working with the LocalStorage API.",
    tech: ["Library", "JavaScript", "Open source"],
    highlights: ["Tiny, dependency-free", "Simple get / set / remove API", "Open source on GitHub"],
    shots: ["storage-js.svg"],
    size: [1920, 1080],
    accent: "blue",
    repoUrl: "https://github.com/DanRotaru/storage.js",
    linkLabel: "View on GitHub",
  }),
];

/** Icon (id in /static/icons/sprite.svg) shown on a tag chip, where one exists. */
export const tagIcons: Record<string, { icon: string; invert?: boolean }> = {
  CSS: { icon: "css" },
  "Open source": { icon: "github", invert: true },
};

/** Every tag, most used first (ties keep first-seen order). */
export const projectTags: string[] = (() => {
  const counts = new Map<string, number>();
  for (const { project } of sideProjects) for (const tag of project.tech) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
})();

/** Newest first, by launch month. */
export const latestProjects = [...sideProjects].sort((a, b) =>
  (b.project.launched ?? "").localeCompare(a.project.launched ?? ""),
);

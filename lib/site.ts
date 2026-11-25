// Global site configuration. Change personal details here.

export const site = {
  name: "Dan Rotaru",
  shortName: "Dan",
  title: "Dan Rotaru – a full-stack web developer with a creative edge",
  description:
    "AI full-stack engineer building production web apps end to end, from polished interfaces to LLM features. Remote from Chisinau, Moldova, 3+ years shipping.",
  url: "https://dan13.me",
  locale: "en_US",
  email: "hello@dan13.me",
  timezone: "Europe/Chisinau",
  timezoneLabel: "· Chisinau, Moldova",
  location: "Remote · Chisinau, Moldova",
  socials: {
    github: "https://github.com/DanRotaru",
    linkedin: "https://linkedin.com/in/dan-rotaru",
    instagram: "https://instagram.com/dan.rotaru13",
    telegram: "https://t.me/danrotaru",
    cal: "https://cal.com/danrotaru/30min",
  },
} as const;

type NavLink = { label: string; href: string };

/** Footer link columns. */
export const footerNav: { title: string; links: (NavLink & { external?: boolean })[] }[] = [
  {
    title: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Toolbox", href: "/toolbox" },
    ],
  },
  {
    title: "Site",
    links: [
      { label: "Links", href: "/links" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "GitHub", href: site.socials.github, external: true },
      { label: "LinkedIn", href: site.socials.linkedin, external: true },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "RSS", href: "/blog/rss.xml" },
  { label: "llms.txt", href: "/llms.txt" },
];

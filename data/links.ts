// Link-in-bio page (/links) content. Edit the text here.

import { site } from "@/lib/site";

export const linksProfile = {
  name: site.name,
  role: "AI full-stack engineer",
  location: "Chisinau, Moldova · Remote",
  photo: "/static/images/dan-rotaru-avatar.jpg",
  bio: "I build production web apps end to end, from the interface to the AI systems behind it.",
};

export const linksResume = { href: "/static/resume.pdf", label: "Resume", value: "View PDF" };

/** "On the site" cards. Counts and featured items are filled in from data at render time. */
export const linksSite = {
  about: { href: "/about", eyebrow: "3+ years building", title: "About", kicker: "Read", text: "Journey, skills & experience" },
  projects: { href: "/projects", title: "Projects", kicker: "Featured", featuredSlug: "cepret" },
  blog: { href: "/blog", title: "Blog" },
  toolbox: {
    href: "/toolbox",
    title: "Toolbox",
    kicker: "Daily",
    text: "Zed, Claude Code, Ghostty",
    image: "/static/tools/hardware-macbook.jpg",
  },
};

export type ConnectTile = {
  href: string;
  label: string;
  title: string;
  handle: string;
  icon: "github" | "linkedin" | "telegram" | "instagram" | "calendar";
};

export const linksConnect: ConnectTile[] = [
  { href: site.socials.github, label: "GitHub", title: "See the code", handle: "@DanRotaru", icon: "github" },
  {
    href: site.socials.linkedin,
    label: "LinkedIn",
    title: "Connect",
    handle: "in/dan-rotaru",
    icon: "linkedin",
  },
  {
    href: site.socials.telegram,
    label: "Telegram",
    title: "Write me in Telegram",
    handle: "@danrotaru",
    icon: "telegram",
  },
  {
    href: site.socials.instagram,
    label: "Instagram",
    title: "Life off-screen",
    handle: "@dan.rotaru13",
    icon: "instagram",
  },
  {
    href: site.socials.cal,
    label: "Cal.com",
    title: "Book a call",
    handle: "30 min intro",
    icon: "calendar",
  },
];

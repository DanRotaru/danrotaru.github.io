// Header navigation (desktop pill nav + "More" dropdown).
// Edit labels, hrefs, descriptions and colours here.

import type { Component } from "vue";

import ChatTextDuotone from "@/components/icons/ChatTextDuotone.vue";
import LinkSquareFill from "@/components/icons/LinkSquareFill.vue";
import ToolboxFill from "@/components/icons/ToolboxFill.vue";

/** An SVG icon component (see components/icons). */
export type IconComponent = Component;

/** Gradient tints used by the coloured icon tiles (More menu). */
export const navTints = {
  blue: { from: "#6aa6ff", to: "#2563eb" },
  violet: { from: "#b49cff", to: "#6d28d9" },
  orange: { from: "#ffb877", to: "#ea580c" },
  green: { from: "#5be08b", to: "#16a34a" },
  teal: { from: "#5ee9d5", to: "#0f8f84" },
  amber: { from: "#ffd666", to: "#d97706" },
  rose: { from: "#ffa3b1", to: "#e11d48" },
  sky: { from: "#86d8ff", to: "#0284c7" },
  pink: { from: "#ffa6d6", to: "#db2777" },
  slate: { from: "#9aa6b8", to: "#4b5567" },
  graphite: { from: "#5a5a5f", to: "#1c1c1f" },
  linkedin: { from: "#3f95e6", to: "#0a66c2" },
} as const;

export type NavTint = keyof typeof navTints;

type PrimaryNavItem = { id: string; href: string; label: string };

export type MoreNavItem = {
  href: string;
  title: string;
  description: string;
  icon: IconComponent;
  tint: NavTint;
};

/** Links shown directly in the pill nav. */
export const primaryNav: PrimaryNavItem[] = [
  { id: "/", href: "/", label: "Home" },
  { id: "/about", href: "/about", label: "About" },
  { id: "/projects", href: "/projects", label: "Projects" },
  { id: "/blog", href: "/blog", label: "Blog" },
];

/** The "More" dropdown. */
export const moreNav: { id: string; label: string; items: MoreNavItem[] } = {
  id: "more-dropdown",
  label: "More",
  items: [
    {
      href: "/contact",
      title: "Contact",
      description: "Say hi or book a call",
      icon: ChatTextDuotone,
      tint: "blue",
    },
    {
      href: "/links",
      title: "Links",
      description: "Every profile in one place",
      icon: LinkSquareFill,
      tint: "sky",
    },
    {
      href: "/toolbox",
      title: "Toolbox",
      description: "Software, dev tools and CLI I use",
      icon: ToolboxFill,
      tint: "amber",
    },
  ],
};

/** Call-to-action button at the end of the pill nav. */
export const navCta = { href: "/coffee", label: "Buy me a coffee" };

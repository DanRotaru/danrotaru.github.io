// Contact page (/contact) content. Edit the text here.

import { site } from "@/lib/site";

export type ContactPanelId = "book-call" | "fill-form";

type ContactIntent = {
  id: string;
  label: string;
  /** Handwritten hint shown under the chips once picked. */
  hint: string;
};

export const contactIntents: ContactIntent[] = [
  {
    id: "project",
    label: "Project",
    hint: "Scoping a build? A call is quickest.",
  },
  {
    id: "role",
    label: "Role",
    hint: "Hiring? Let's talk it through.",
  },
  {
    id: "hey",
    label: "Just a hey",
    hint: "Leave a note, I read every one.",
  },
];

export const contactProfile = {
  name: site.name,
  photo: "/static/images/dan-rotaru-avatar.jpg",
  city: "Chisinau",
  timeZone: site.timezone,
};

/** Cal.com event used by the "Book a call" tab. */
export const calLink = "danrotaru/30min";

export const contactSocials = [
  { href: site.socials.linkedin, label: "LinkedIn", icon: "linkedin" },
  { href: site.socials.github, label: "GitHub", icon: "github" },
] as const;

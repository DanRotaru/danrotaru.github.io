// Contact form submission for the static site.
//
// If NUXT_PUBLIC_CONTACT_ENDPOINT is set (runtimeConfig.public.contactEndpoint) (e.g. a Formspree form URL such as
// https://formspree.io/f/xxxxxxx), the message is POSTed there as JSON.
// Otherwise the visitor's mail app opens with the fields pre-filled.

import { useRuntimeConfig } from "#imports";

import { site } from "@/lib/site";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactResult = { ok: true; via: "endpoint" | "mailto" } | { ok: false; error: string };


/** Basic client-side validation; returns an error message or null. */
export function validateContact(data: ContactMessage): string | null {
  if (data.name.trim().length < 2) return "Please tell me your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return "That email doesn't look right.";
  if (data.subject.trim().length < 2) return "Please add a subject.";
  if (data.message.trim().length < 10) return "Your message needs at least 10 characters.";
  if (data.message.length > 2000) return "Please keep it under 2000 characters.";
  return null;
}

function contactMailtoUrl(data: ContactMessage): string {
  const subject = `${data.subject.trim()} — from ${data.name.trim()}`;
  const body = `${data.message.trim()}\n\n— ${data.name.trim()} (${data.email.trim()})`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitContact(data: ContactMessage): Promise<ContactResult> {
  const invalid = validateContact(data);
  if (invalid) return { ok: false, error: invalid };

  const ENDPOINT = useRuntimeConfig().public.contactEndpoint as string;
  if (!ENDPOINT) {
    window.location.href = contactMailtoUrl(data);
    return { ok: true, via: "mailto" };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        _replyto: data.email.trim(),
      }),
    });
    if (!response.ok) {
      return { ok: false, error: "Couldn't send your message. Please try again or email me directly." };
    }
    return { ok: true, via: "endpoint" };
  } catch {
    return { ok: false, error: "Network error. Please try again or email me directly." };
  }
}

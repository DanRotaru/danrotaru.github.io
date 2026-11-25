import type { Component } from "vue";

export type LegalListItem = {
  /** Plain text or inline HTML. */
  term: string;
  /** Plain text or inline HTML. */
  description: string;
  /** Small uppercase note under the description (e.g. retention period). */
  note?: string;
};

export type LegalSummaryItem = {
  icon: Component;
  title: string;
  text: string;
};

type LegalSection = {
  /** Serif heading (HTML); wrap the emphasised words in <em>. */
  heading: string;
  /** Paragraphs (HTML, rendered in the text block). */
  body?: string;
  /** Optional definition list under the paragraphs. */
  list?: LegalListItem[];
};

export type LegalDocument = {
  /** ISO date (YYYY-MM-DD) shown as "Last updated" and used by the sitemap. */
  updated: string;
  summary: LegalSummaryItem[];
  sections: LegalSection[];
};

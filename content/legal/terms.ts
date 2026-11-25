// Terms of Use content (/legal/terms). Edit the text here.
// `heading`, `body` and list `description` are HTML strings.
import CodeDuotone from "@/components/icons/CodeDuotone.vue";
import HandshakeDuotone from "@/components/icons/HandshakeDuotone.vue";
import PencilSimpleDuotone from "@/components/icons/PencilSimpleDuotone.vue";
import ShieldCheckDuotone from "@/components/icons/ShieldCheckDuotone.vue";
import { site } from "@/lib/site";

import type { LegalDocument } from "./types";
import { legalUpdated } from "./updated";

export const terms: LegalDocument = {
  updated: legalUpdated.terms,
  summary: [
    {
      icon: HandshakeDuotone,
      title: "Using it is agreeing",
      text: "Browsing the site means you accept these terms.",
    },
    {
      icon: CodeDuotone,
      title: "Learn, don't clone",
      text: "Take inspiration freely. Don't copy the site wholesale.",
    },
    {
      icon: PencilSimpleDuotone,
      title: "Credit is kind",
      text: "If something here helped you, a link back means a lot.",
    },
    {
      icon: ShieldCheckDuotone,
      title: "Provided as is",
      text: "I do my best, but there are no guarantees.",
    },
  ],
  sections: [
    {
      heading: "The <em>agreement</em>,<br />in brief.",
      body: `<p>This site belongs to <strong>${site.name}</strong>. By using it, you agree to these terms and to the
        <a href="/legal/privacy">privacy policy</a>. If you don't agree, please don't use the site.</p>`,
    },
    {
      heading: "What's <em>mine</em>,<br />what's <em>fair game</em>.",
      body: `<p>The writing, design, code and images here are my work unless credited otherwise. Third-party logos and
        trademarks belong to their owners.</p>`,
      list: [
        {
          term: "Welcome",
          description:
            "Studying how something works, borrowing ideas for your own projects, and quoting short excerpts with a link back.",
        },
        {
          term: "Not okay",
          description:
            "Copying the site or large parts of it, rebranding it as your own, or using its content commercially without asking.",
        },
        {
          term: "Appreciated",
          description: `If something here helped you, a credit link to <a href="/">dan13.me</a> means a lot.`,
        },
      ],
    },
    {
      heading: "The <em>usual</em><br />limits.",
      list: [
        {
          term: "No warranty",
          description:
            "The site is provided as is. I aim for accuracy, but articles and code samples may contain mistakes, and nothing here is professional advice.",
        },
        {
          term: "Liability",
          description:
            "To the extent the law allows, I'm not liable for any loss or damage from using, or being unable to use, this site.",
        },
        {
          term: "Other sites",
          description: "Links lead to sites I don't control, and their own terms apply there.",
        },
      ],
    },
    {
      heading: "Changes and<br /><em>contact</em>.",
      body: `<p>I may update these terms. The date at the top always shows the latest version, and continuing to use the
        site means you accept it. These terms are governed by the laws of the Republic of Moldova.</p>
        <p>Questions? Email <a href="mailto:${site.email}">${site.email}</a>.</p>`,
    },
  ],
};

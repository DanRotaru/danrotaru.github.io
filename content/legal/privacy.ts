// Privacy Policy content (/legal/privacy). Edit the text here.
// `heading`, `body` and list `description` are HTML strings.
import ChartBarDuotone from "@/components/icons/ChartBarDuotone.vue";
import CookieDuotone from "@/components/icons/CookieDuotone.vue";
import ProhibitDuotone from "@/components/icons/ProhibitDuotone.vue";
import TrashDuotone from "@/components/icons/TrashDuotone.vue";
import { site } from "@/lib/site";

import type { LegalDocument } from "./types";
import { legalUpdated } from "./updated";

export const privacy: LegalDocument = {
  updated: legalUpdated.privacy,
  summary: [
    {
      icon: ProhibitDuotone,
      title: "No ads, no selling",
      text: "Nothing here is sold, rented or used for advertising.",
    },
    {
      icon: ChartBarDuotone,
      title: "Two analytics tools",
      text: "Google Analytics and Microsoft Clarity. Nothing else tracks you.",
    },
    {
      icon: CookieDuotone,
      title: "Minimal cookies",
      text: "Only what analytics and your theme need.",
    },
    {
      icon: TrashDuotone,
      title: "Delete anytime",
      text: "Email me to see or erase anything I hold about you.",
    },
  ],
  sections: [
    {
      heading: "What I <em>collect</em>,<br />and <em>why</em>.",
      body: `<p>Most of this site works without you giving me anything. I only receive personal data when you choose to send
        a message or book a call.</p>`,
      list: [
        {
          term: "Contact form",
          description: "The name, email and message you send, delivered to my inbox so I can reply.",
          note: "Kept in my email",
        },
        {
          term: "Bookings",
          description: `Calls are booked through Cal.com, which collects what its form asks for under
            <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">its own policy</a>.`,
        },
      ],
    },
    {
      heading: "How I <em>measure</em><br />the site.",
      body: `<p>I use two analytics tools, and only these two:</p>
        <p><strong>Google Analytics</strong> counts page views and shows where visits come from (for example a search
        engine or a link's campaign tags), along with your approximate location, device and browser.</p>
        <p><strong>Microsoft Clarity</strong> shows how pages are used through heatmaps and session recordings of
        clicks, scrolling and mouse movement, so I can spot what's confusing or broken. Text you type into forms is
        masked and never recorded.</p>
        <p>Neither is used for advertising, and I don't use any other analytics, tracking or ad libraries.</p>`,
    },
    {
      heading: "Who <em>else</em><br />is involved.",
      body: "<p>A few trusted services do the heavy lifting. Each only gets what it needs for its job.</p>",
      list: [
        {
          term: "Google Analytics",
          description: `Analytics, as described above, under
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's policy</a>.`,
        },
        {
          term: "Microsoft Clarity",
          description: `Heatmaps and session recordings, under
            <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft's policy</a>.`,
        },
        { term: "Resend", description: "Sends the emails behind the contact form." },
        { term: "Cal.com", description: "Runs call bookings." },
      ],
    },
    {
      heading: "Cookies and<br /><em>local storage</em>.",
      list: [
        {
          term: "Analytics",
          description:
            "Google Analytics (<code>_ga</code>) and Clarity (<code>_clck</code>, <code>_clsk</code>) store random IDs so repeat visits are counted once.",
        },
        {
          term: "Preferences",
          description: "Your light or dark theme and recent searches in the command menu, saved only on your device.",
        },
      ],
    },
    {
      heading: "Your data,<br /><em>your call</em>.",
      body: `<p>To see, correct or permanently erase everything I hold about you, email me at
        <a href="mailto:${site.email}">${site.email}</a>. I'll handle it within 7 days.</p>
        <p>If this policy changes, the date at the top changes with it. Questions are welcome at the same address.</p>`,
    },
  ],
};

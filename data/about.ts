// Content for the About page intro (/about).

/**
 * Rich text for a paragraph: plain strings, bold runs and external links.
 * A bold run may itself contain links.
 */
export type RichText = Array<string | { strong: RichText | string } | RichLink>;

/** External link. With `logo`, the logo image replaces the text (the text stays as alt text). */
type RichLink = {
  href: string;
  text: string;
  /** Logo for dark mode (or both modes when `logoLight` is omitted). */
  logo?: string;
  /** Logo for light mode. */
  logoLight?: string;
};

export type AboutSocial = {
  label: string;
  href: string;
  icon: "linkedin" | "github";
};

type AboutPhoto = {
  src: string;
  alt: string;
  /** Handwritten caption under the polaroid. */
  caption: string;
};

export const aboutIntro = {
  eyebrow: "More About Me",
  title: "I'm DanRotaru, a Full-Stack",
  highlight: "engineer",
  /** Intro bio. Each paragraph is RichText: plain strings, bold runs and external links. */
  paragraphs: [
    [
      "I'm Dan Rotaru, a full-stack engineer, creative coder and self-proclaimed designer based in Chișinău, Moldova. I like building things that run fast 🚀, look clean and stay easy to maintain.",
    ],
    [
      "My passion for programming started a long time ago, back in 2014. At first it was just a hobby and a curiosity, and over time it became my career. Over the years JavaScript became my main language, and today I spend most of my time in JavaScript/TypeScript, Vue, React, Nuxt.js, Next.js and Node.js. My strongest side is the front end, but I'm comfortable owning a project across the whole stack.",
    ],
    [
      "I'm mostly self-taught, and I also hold a Bachelor's degree in IT from the ",
      { href: "https://utm.md/en/", text: "Technical University of Moldova" },
      " (2023). While studying, from 2019 to 2023, I freelanced on Kwork and completed more than 100 orders. That meant a lot of different clients, projects and problems, and it taught me to handle a product end to end: development, design and the maintenance that comes after launch.",
    ],
    [
      "Lately I've been focused on where the industry is heading: working with large language models, agentic tools like Claude Code and MCP, and finding practical ways to put them into real products. The tools change fast, so I keep learning, but the fundamentals never stop mattering.",
    ],
    [
      "My biggest project outside the office right now is ",
      {
        href: "https://eihai.cc",
        text: "EiHAI",
        logo: "/static/icons/eihai-logo-text.svg",
        // Same logo with dark text: the original's white text is invisible on the light theme.
        logoLight: "/static/icons/eihai-logo-text-dark.svg",
      },
      ", a desktop workspace for AI coding agents. It brings CLI agents like Claude Code, their sessions, Git and a built-in browser together in one window. I use it every day, and I even use EiHAI to build EiHAI 🔥",
    ],
    [
      "Away from the keyboard you'll usually find me on a bike, running a 10 km race or in the gym, always with a good coffee, and with 🎶",
      { href: "https://www.youtube.com/watch?v=sqxFW3RXGdo", text: "progressive house" },
      " playing in the background.",
    ],
  ] satisfies RichText[],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/dan-rotaru", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/DanRotaru", icon: "github" },
  ] satisfies AboutSocial[],
  /** Rotating polaroid stack. The second photo starts in front. */
  photos: [
    { src: "/static/images/dan-rotaru-avatar.jpg", alt: "Coding image", caption: "I Code" },
    { src: "/static/images/travel.webp", alt: "Travel image", caption: "I Travel" },
    { src: "/static/images/gym.webp", alt: "GYM image", caption: "I Lift" },
  ] satisfies AboutPhoto[],
};

/** "How I build things" principles (below the intro on /about). Icons are keys of the icon map in AboutPrinciples.vue. */
export type AboutPrinciple = {
  icon: "lightbulb" | "code" | "shield" | "chart" | "handshake" | "compass";
  title: string;
  text: string;
};

export const aboutPrinciples = {
  eyebrow: "Principles",
  title: "How I",
  highlight: "build things",
  items: [
    {
      icon: "lightbulb",
      title: "Start with the problem",
      text: "Before a single line of code, I want to know who it's for and what hurts. The best feature is often the one you don't have to build.",
    },
    {
      icon: "compass",
      title: "Design is how it works",
      text: "Pixels matter, but so do loading states, empty states, error messages and the keyboard. Polish is the sum of the small things.",
    },
    {
      icon: "code",
      title: "Typed end to end",
      text: "From the database to the button, types are the documentation that can't go stale. Fewer surprises in production, faster refactors.",
    },
    {
      icon: "chart",
      title: "Performance is a feature",
      text: "Fast is a feeling users notice before they can name it. I measure, ship less JavaScript and keep the critical path lean.",
    },
    {
      icon: "shield",
      title: "Accessible by default",
      text: "Semantic HTML, focus states and reduced motion aren't extras. If someone can't use it, it isn't finished.",
    },
    {
      icon: "handshake",
      title: "Ship small, talk often",
      text: "Short loops beat big reveals. Frequent releases, clear updates and honest trade-offs keep everyone pointed the same way.",
    },
  ] satisfies AboutPrinciple[] as AboutPrinciple[],
};

/** Header of the "How I work" bento block on /about (cards come from data/home.ts). */
export const aboutWorkflow = {
  eyebrow: "How I Work",
  title: "Short loops and",
  highlight: "sharp tools",
};

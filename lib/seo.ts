// SEO and analytics: keywords, tracking IDs and JSON-LD (schema.org) builders.
import { site } from "./site";

/** Analytics IDs, same as the old site (dev/nuxt.config.ts). */
export const analytics = {
  /** Google Analytics 4 (gtag.js). */
  gaId: "G-Y14P7SCC0F",
  /** Microsoft Clarity project. */
  clarityId: "h7m4aqhro4",
} as const;

/** Default share image when a page has none (square, so it gets the "summary" Twitter card). */
export const defaultImage = { url: "/static/images/dan-rotaru-avatar.jpg", width: 500, height: 500 } as const;

/** <meta name="keywords">, carried over from the old site plus the current focus. */
export const keywords = [
  // Name and brand
  "Dan Rotaru", "DanRotaru", "dan13", "dan13.me", "dan13 dev", "dan 13", "Dan Rotaru 13", "DanRotaru 13", "DanR",
  "Dan Rotaru portfolio", "DanRotaru portfolio", "Dan Rotaru website", "DanRotaru website",
  "Dan Rotaru programmer", "DanRotaru programmer", "Dan Rotaru web developer", "DanRotaru web developer",
  "Dan Rotaru dev", "DanRotaru dev", "Dan Rotaru js", "DanRotaru js", "Dan Rotaru projects",
  "Dan Rotaru story", "DanRotaru story", "Dan Rotaru blog", "Dan Rotaru Lislex",
  // Role
  "personal website", "portfolio", "creative developer", "developer with a creative edge", "creative edge",
  "Software Engineer", "full-stack", "full-stack web developer", "full-stack engineer", "AI full-stack engineer",
  "AI engineer", "LLM features", "web developer", "frontend", "backend", "JavaScript developer", "JS developer",
  "TypeScript developer", "Vue developer", "Nuxt developer", "React developer", "Next.js developer", "Node.js developer",
  "technology enthusiast", "web developer Moldova", "software engineer Chisinau", "remote developer",
  // Sections
  "Home", "About", "Projects", "Toolbox", "Blog", "Contact",
  // Topics
  "Personal story", "development experience", "Career journey", "Projects and achievements", "Programming languages",
  "Tech innovations", "Career path", "Software engineering", "Problem solving", "Application development",
  "Code quality", "Responsive design", "Front-end development", "Back-end development", "API integration",
  "Web technologies", "JavaScript frameworks", "Front-end frameworks", "Back-end frameworks", "Database management",
  "Agile methodology", "Software testing", "Skills and expertise", "Coding skills", "Development portfolio",
  "User experience", "UI/UX design", "Web design", "Web performance", "DevOps practices", "Code optimization",
  "Project management", "Technical skills", "Digital solutions", "Creative solutions", "Tech career",
  "Professional growth", "Developer tools", "Personal growth", "Web solutions", "Web", "Programming",
].join(", ");

export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

/** Site-wide graph: who the site is about and the site itself. Rendered on every page. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        alternateName: ["DanRotaru", "dan13"],
        url: `${site.url}/`,
        image: absoluteUrl(defaultImage.url),
        email: `mailto:${site.email}`,
        jobTitle: "Full-Stack Engineer",
        description: site.description,
        worksFor: { "@type": "Organization", name: "Lislex" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Technical University of Moldova", url: "https://utm.md/en/" },
        address: { "@type": "PostalAddress", addressLocality: "Chisinau", addressCountry: "MD" },
        knowsAbout: [
          "Full-stack web development", "JavaScript", "TypeScript", "Vue.js", "Nuxt", "React", "Next.js",
          "Node.js", "Large language models", "Web performance", "UI/UX design",
        ],
        sameAs: [site.socials.github, site.socials.linkedin, site.socials.instagram, site.socials.telegram],
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: `${site.url}/`,
        name: site.name,
        alternateName: ["dan13.me", "dan13"],
        description: site.description,
        inLanguage: "en",
        author: { "@id": ids.person },
        publisher: { "@id": ids.person },
      },
    ],
  };
}

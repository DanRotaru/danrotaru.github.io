import { absoluteUrl, defaultImage, ids } from "@/lib/seo";
import { site } from "@/lib/site";

type PageMetaInput = {
  /** Full <title> text, exactly as it should appear. */
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used for canonical + og:url. */
  path: string;
  /** Short name for the breadcrumb trail (defaults to the capitalised last path segment). */
  label?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  /** Article tags (article:tag + BlogPosting keywords). */
  tags?: string[];
};

/** Parent pages that exist on their own, so they can appear mid-trail. */
const sections: Record<string, string> = { "/blog": "Blog" };

function capitalise(segment: string): string {
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
}

function breadcrumbs(path: string, label: string | undefined) {
  const trail = [{ name: "Home", url: `${site.url}/` }];
  if (path !== "/") {
    const segments = path.split("/").filter(Boolean);
    segments.slice(0, -1).forEach((_, index) => {
      const parent = `/${segments.slice(0, index + 1).join("/")}`;
      const name = sections[parent];
      if (name) trail.push({ name, url: absoluteUrl(parent) });
    });
    trail.push({ name: label ?? capitalise(segments[segments.length - 1] ?? ""), url: absoluteUrl(path) });
  }
  return trail;
}

/**
 * Consistent per-page metadata (title, canonical, Open Graph, Twitter card) plus JSON-LD
 * (WebPage / ProfilePage / BlogPosting and a BreadcrumbList). Call in a page's <script setup>.
 */
export function usePageMeta(input: PageMetaInput) {
  const { title, description, path, label, image, imageAlt, type = "website", publishedTime, modifiedTime, tags } =
    input;
  const url = absoluteUrl(path);
  const isArticle = type === "article";
  const imageUrl = absoluteUrl(image ?? defaultImage.url);
  // Page images are 1200x630 covers; the fallback is the square avatar.
  const imageSize = image ? { width: 1200, height: 630 } : { width: defaultImage.width, height: defaultImage.height };
  const alt = imageAlt ?? (image ? title : site.name);

  useHead({
    title,
    link: [{ rel: "canonical", href: url }],
  });

  useSeoMeta({
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogSiteName: site.name,
    ogLocale: site.locale,
    ogType: type,
    ogImage: { url: imageUrl, ...imageSize, alt },
    articlePublishedTime: isArticle ? publishedTime : undefined,
    articleModifiedTime: isArticle ? modifiedTime : undefined,
    articleAuthor: isArticle ? [site.name] : undefined,
    articleTag: isArticle ? tags : undefined,
    twitterCard: image ? "summary_large_image" : "summary",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterImageAlt: alt,
  });

  const trail = breadcrumbs(path, label);
  const breadcrumbId = `${url}#breadcrumb`;

  const page = isArticle
    ? {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: label ?? title,
        description,
        url,
        mainEntityOfPage: url,
        image: imageUrl,
        datePublished: publishedTime,
        dateModified: modifiedTime ?? publishedTime,
        keywords: tags?.join(", "),
        inLanguage: "en",
        author: { "@id": ids.person },
        publisher: { "@id": ids.person },
        isPartOf: { "@id": ids.website },
        breadcrumb: { "@id": breadcrumbId },
      }
    : {
        "@type": path === "/" || path === "/about" ? "ProfilePage" : "WebPage",
        "@id": `${url}#webpage`,
        name: title,
        description,
        url,
        inLanguage: "en",
        primaryImageOfPage: imageUrl,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.person },
        ...(path === "/" || path === "/about" ? { mainEntity: { "@id": ids.person } } : {}),
        breadcrumb: { "@id": breadcrumbId },
      };

  useHead({
    script: [
      {
        key: "page-jsonld",
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            page,
            {
              "@type": "BreadcrumbList",
              "@id": breadcrumbId,
              itemListElement: trail.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: crumb.url,
              })),
            },
          ],
        }),
      },
    ],
  });
}

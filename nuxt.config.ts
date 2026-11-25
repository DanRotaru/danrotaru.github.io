// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { posts } from "./data/posts";
import { analytics, keywords, siteJsonLd } from "./lib/seo";
import { site } from "./lib/site";

// Analytics only on production builds, so local dev visits are not tracked.
const isProd = process.env.NODE_ENV === "production";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-01",
  // Classic layout (no `app/` folder), same as the /dev project.
  srcDir: ".",
  serverDir: "server",
  devtools: { enabled: false },
  devServer: { port: 8105 },

  modules: ["@nuxtjs/color-mode"],

  // Same behaviour as next-themes in the Next version: class on <html>, dark by default, system aware.
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
    storageKey: "theme",
    // Same as next-themes `disableTransitionOnChange`.
    disableTransition: true,
  },

  components: [
    // <IconArrowRight />, <IconGithubMark /> ...
    { path: "~/components/icons", prefix: "Icon", extensions: [".vue"] },
    // Every other component is auto-imported by its file name (<HomeHero />, <SiteHeader /> ...).
    { path: "~/components", pathPrefix: false, extensions: [".vue"] },
  ],

  css: ["~/assets/styles/main.scss"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      bodyAttrs: { class: "site" },
      // Default title; pages set their full title through usePageMeta().
      title: site.title,
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { name: "color-scheme", content: "dark light" },
        { name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#0a0a0a" },
        { name: "theme-color", media: "(prefers-color-scheme: light)", content: "#F4F4F4" },
        { name: "application-name", content: site.name },
        { name: "keywords", content: keywords },
        { name: "author", content: site.name },
        { name: "creator", content: site.name },
        { name: "publisher", content: site.name },
        { name: "referrer", content: "strict-origin-when-cross-origin" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "robots",
          content: "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/static/favicon/favicon.svg" },
        { rel: "icon", href: "/static/favicon/favicon.ico", sizes: "48x48" },
        { rel: "icon", type: "image/png", sizes: "512x512", href: "/static/favicon/favicon-512x512.png" },
        { rel: "icon", type: "image/png", sizes: "128x128", href: "/static/favicon/favicon-128x128.png" },
        { rel: "icon", type: "image/png", sizes: "64x64", href: "/static/favicon/favicon-64x64.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/static/favicon/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/static/favicon/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/static/favicon/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "alternate", type: "application/rss+xml", href: "/blog/rss.xml" },
        { rel: "me", href: site.socials.github },
        { rel: "me", href: site.socials.linkedin },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800" +
            "&family=Caveat:wght@500&family=Geist+Mono:wght@100..900" +
            "&family=Instrument+Serif:ital@0;1&display=swap",
        },
      ],
      script: [
        // Person + WebSite structured data (each page adds its own WebPage/BlogPosting + breadcrumbs).
        { key: "site-jsonld", type: "application/ld+json", innerHTML: JSON.stringify(siteJsonLd()) },
        ...(isProd
          ? [
              // Google Analytics 4
              { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}` },
              {
                key: "gtag-init",
                innerHTML:
                  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
                  `gtag('js',new Date());gtag('config','${analytics.gaId}');`,
              },
              // Microsoft Clarity
              {
                key: "clarity-init",
                innerHTML:
                  '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};' +
                  't=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;' +
                  'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);' +
                  `})(window,document,"clarity","script","${analytics.clarityId}");`,
              },
            ]
          : []),
      ],
    },
  },

  runtimeConfig: {
    public: {
      // Optional form endpoint (e.g. Formspree) for the contact form: NUXT_PUBLIC_CONTACT_ENDPOINT.
      contactEndpoint: "",
    },
  },

  // Fully static output (`nuxt generate` -> .output/public).
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/",
        "/sitemap.xml",
        "/robots.txt",
        "/llms.txt",
        "/blog/rss.xml",
        "/manifest.webmanifest",
        ...posts.flatMap((post) => [`/blog/${post.slug}`, `/blog/${post.slug}/index.md`]),
      ],
    },
    // Raw MDX sources for the /blog/<slug>/index.md Markdown twins.
    serverAssets: [{ baseName: "blog", dir: fileURLToPath(new URL("./content/blog", import.meta.url)) }],
  },

  vite: {
    resolve: {
      alias: {
        // Custom JSX runtime for MDX -> Vue (lib/mdx-jsx-runtime.ts).
        "mdx-vue/jsx-runtime": fileURLToPath(new URL("./lib/mdx-jsx-runtime.ts", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Lets every SCSS file do `@use "abstracts" as *;`
          loadPaths: [fileURLToPath(new URL("./assets/styles", import.meta.url))],
        },
      },
    },
    plugins: [
      {
        enforce: "pre",
        ...mdx({
          jsxImportSource: "mdx-vue",
          // Always emit `mdx-vue/jsx-runtime` (the only aliased entry); in dev the plugin
          // would otherwise import `mdx-vue/jsx-dev-runtime`, which doesn't resolve.
          development: false,
          elementAttributeNameCase: "html",
          stylePropertyNameCase: "css",
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                // Dual theme via --shiki-light / --shiki-dark.
                theme: { light: "github-light-default", dark: "vesper" },
                keepBackground: false,
                defaultLang: { block: "plaintext" },
              },
            ],
          ],
        }),
      },
    ],
  },

  typescript: {
    strict: true,
  },
});

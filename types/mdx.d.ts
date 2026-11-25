// Type declarations for compiled MDX modules (see the `mdx()` Vite plugin in nuxt.config.ts).
declare module "*.mdx" {
  import type { Component } from "vue";

  const MDXContent: Component<{ components?: Record<string, unknown> }>;
  export default MDXContent;
  /** Optional FAQ exported by blog posts (`export const faq = [...]`). */
  export const faq: { question: string; answer: string }[] | undefined;
}

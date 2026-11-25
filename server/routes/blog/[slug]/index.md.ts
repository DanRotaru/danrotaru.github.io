// Markdown twin of a blog post (/blog/<slug>/index.md), used by the
// "Copy as Markdown" / "View as Markdown" actions in the post header.
// The MDX sources are bundled as server assets (see `nitro.serverAssets` in nuxt.config.ts).
import { getPost } from "@/data/posts";
import { site } from "@/lib/site";

/** Turn the MDX source into plain Markdown (drop ESM, flatten custom components). */
function toMarkdown(source: string): { body: string; faq: { question: string; answer: string }[] } {
  let faq: { question: string; answer: string }[] = [];
  const faqMatch = source.match(/export const faq = (\[[\s\S]*?\]);\n/);
  if (faqMatch) {
    try {
      faq = JSON.parse(faqMatch[1] ?? "[]");
    } catch {
      faq = [];
    }
  }

  const body = source
    .replace(/^import .*$/gm, "")
    .replace(/export const faq = \[[\s\S]*?\];\n/, "")
    .replace(/<Figure src="([^"]+)" alt=("[^"]*")[^>]*\/>/g, (_m, src: string, alt: string) => `![${JSON.parse(alt)}](${site.url}${src})`)
    .replace(/<Diagram [^>]*?caption=("[^"]*")[^>]*\/>/g, (_m, caption: string) => `*Diagram: ${JSON.parse(caption)}*`)
    .replace(/<Diagram [^>]*\/>/g, "")
    .replace(/<Callout tone="(\w+)"(?: title=("[^"]*"))?>/g, (_m, tone: string, title?: string) =>
      title ? `> **${JSON.parse(title)}**\n>` : `> **${tone}**\n>`,
    )
    .replace(/<\/Callout>/g, "")
    .replace(/<\/?Steps>/g, "")
    .replace(/<Step title=("[^"]*")>/g, (_m, title: string) => `**${JSON.parse(title)}**`)
    .replace(/<\/Step>/g, "")
    .replace(/<SerifEm>([\s\S]*?)<\/SerifEm>/g, "*$1*")
    .replace(/<Checklist\s+items=\{(\[[\s\S]*?\])\}\s*\/>/g, (_m, json: string) => {
      try {
        const items = JSON.parse(json) as { item: string; reason?: string }[];
        return items.map((entry) => `- [ ] ${entry.item}${entry.reason ? ` — ${entry.reason}` : ""}`).join("\n");
      } catch {
        return "";
      }
    })
    .replace(
      /<ComparisonTable\s+columns=\{(\[[\s\S]*?\])\}\s+rows=\{(\[[\s\S]*?\])\}\s*\/>/g,
      (_m, columnsJson: string, rowsJson: string) => {
        try {
          const columns = JSON.parse(columnsJson) as string[];
          // Rows are an array literal of string arrays; drop trailing commas so it parses as JSON.
          const rows = JSON.parse(rowsJson.replace(/,(\s*[\]}])/g, "$1")) as string[][];
          const line = (cells: string[]) => `| ${cells.map((cell) => cell.replace(/\|/g, "\\|")).join(" | ")} |`;
          return [line(columns), line(columns.map(() => "---")), ...rows.map(line)].join("\n");
        } catch {
          return "";
        }
      },
    )
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { body, faq };
}

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") ?? "";
  const post = getPost(slug);
  const source = post ? await useStorage("assets:blog").getItem<string>(`${slug}.mdx`) : null;
  if (!post || typeof source !== "string") {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }

  const { body, faq } = toMarkdown(source);

  const parts = [`# ${post.title}`, `> ${post.description}`, `${site.url}/blog/${post.slug}`, body];
  if (faq.length > 0) {
    parts.push("## Frequently asked questions", ...faq.map((item) => `### ${item.question}\n\n${item.answer}`));
  }

  setResponseHeader(event, "Content-Type", "text/markdown; charset=utf-8");
  return `${parts.join("\n\n")}\n`;
});

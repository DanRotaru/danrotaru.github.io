// Global MDX component map: `<Content :components="mdxComponents" />`.
// Markdown elements map to styled components; the named components below can be
// used directly in .mdx files without importing them.
import { h, type Component, type FunctionalComponent } from "vue";

import CodeBlock from "@/components/mdx/CodeBlock.vue";
import Diagram from "@/components/mdx/Diagram.vue";
import Faq from "@/components/mdx/Faq.vue";
import Figure from "@/components/mdx/Figure.vue";
import Heading from "@/components/mdx/Heading.vue";
import InlineCode from "@/components/mdx/InlineCode.vue";
import MdxLink from "@/components/mdx/MdxLink.vue";
import MdxList from "@/components/mdx/MdxList.vue";
import MdxOrderedList from "@/components/mdx/MdxOrderedList.vue";
import MdxQuote from "@/components/mdx/MdxQuote.vue";
import MdxRule from "@/components/mdx/MdxRule.vue";
import MdxTable from "@/components/mdx/MdxTable.vue";
import MdxTd from "@/components/mdx/MdxTd.vue";
import MdxTh from "@/components/mdx/MdxTh.vue";
import MdxThead from "@/components/mdx/MdxThead.vue";
import MdxTr from "@/components/mdx/MdxTr.vue";
// Case-study components used by content/projects/*.mdx without importing them.
import CaseMedia from "@/components/projects/CaseMedia.vue";
import CaseSection from "@/components/projects/CaseSection.vue";
import CaseVideo from "@/components/projects/CaseVideo.vue";
import ComparisonTable from "@/components/projects/ComparisonTable.vue";

/** MDX `h2`/`h3`/`h4` -> <Heading as="hN">; only the rehype-slug id is kept (like the React MdxH2...). */
function headingFor(as: "h2" | "h3" | "h4"): FunctionalComponent<{ id?: string }> {
  const component: FunctionalComponent<{ id?: string }> = (props, { slots }) =>
    h(Heading, { as, id: props.id }, { default: () => slots.default?.() });
  component.props = ["id"];
  component.inheritAttrs = false;
  component.displayName = `Mdx${as.toUpperCase()}`;
  return component;
}

export const mdxComponents: Record<string, Component> = {
  // Markdown elements
  a: MdxLink,
  blockquote: MdxQuote,
  code: InlineCode,
  figure: CodeBlock,
  h2: headingFor("h2"),
  h3: headingFor("h3"),
  h4: headingFor("h4"),
  hr: MdxRule,
  ol: MdxOrderedList,
  table: MdxTable,
  td: MdxTd,
  th: MdxTh,
  thead: MdxThead,
  tr: MdxTr,
  ul: MdxList,
  // Components available inside MDX
  Diagram,
  Faq,
  Figure,
  Heading,
  InlineCode,
  // Project case-study components
  CaseSection,
  CaseMedia,
  CaseVideo,
  ComparisonTable,
};

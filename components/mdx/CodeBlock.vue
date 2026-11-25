<script lang="ts">
import { defineComponent, h, isVNode, type VNode, type VNodeArrayChildren } from "vue";

import { cn } from "@/lib/cn";
import { flattenNodes, textOf } from "@/lib/mdx-vnodes";

import CopyButton from "./CopyButton.vue";

/**
 * MDX `figure`. rehype-pretty-code wraps every fenced block in
 * `<figure data-rehype-pretty-code-figure>` with an optional
 * `<figcaption data-rehype-pretty-code-title>` and the highlighted `<pre>`;
 * we re-wrap it in the original "tray" card with a title chip and copy button.
 * Other figures pass through untouched.
 * (Render function: the slot vnodes are inspected like React's Children API.)
 */
export default defineComponent({
  name: "CodeBlock",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      if (!("data-rehype-pretty-code-figure" in attrs)) {
        return h("figure", attrs, slots.default?.());
      }

      const items = flattenNodes(slots.default?.()).filter((node): node is VNode => isVNode(node));
      const title = items.find((el) => el.props != null && "data-rehype-pretty-code-title" in el.props);
      const pre = items.find((el) => el.type === "pre");
      const code = textOf(pre?.children).replace(/\n$/, "");

      return h("figure", { class: "code-block not-prose" }, [
        h("div", { class: "code-block__frame" }, [
          title ? h("span", { class: "code-block__title" }, title.children as VNodeArrayChildren) : null,
          h(CopyButton, { text: code, class: "code-block__copy" }),
          pre
            ? h(
                "pre",
                { ...pre.props, class: cn("code-block__pre", !title && "code-block__pre--untitled") },
                pre.children as VNodeArrayChildren,
              )
            : null,
        ]),
      ]);
    };
  },
});
</script>

<style lang="scss">
@use "abstracts" as *;
@use "./surface" as *;

// Highlighted code (rehype-pretty-code + Shiki dual themes: github-light-default / vesper).
.code-block {
  @include mdx-tray;
  position: relative;
  width: 100%;
  min-width: 0;
  margin-block: 24px;

  &__frame {
    @include mdx-panel;
    position: relative;
    overflow: hidden;
  }

  &__title {
    position: absolute;
    top: 10px;
    left: 16px;
    right: 48px;
    z-index: 10;
    width: fit-content;
    overflow: hidden;
    padding: 2px 8px;
    border-radius: var(--radius-md);
    background-color: color-mix(in oklab, oklch(92.2% 0 0) 80%, transparent);
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    color: oklch(26.9% 0 0);
    text-overflow: ellipsis;
    white-space: nowrap;

    @include dark {
      background-color: oklch(26.9% 0 0);
      color: oklch(92.2% 0 0);
    }
  }

  &__copy {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 10;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.2s var(--ease-default);

    &:focus-visible {
      opacity: 1;
    }

    @include parent-hover(".code-block") {
      opacity: 1;
    }

    @media (hover: none) {
      opacity: 1;
    }
  }

  &__pre {
    overflow-x: auto;
    padding-top: 44px;
    padding-bottom: 12px;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 24px;
    color: var(--shiki-light);

    &--untitled {
      padding-top: 12px;
    }

    @include dark {
      background-color: #101010;
      color: var(--shiki-dark);
    }

    // Token colours come from Shiki as CSS variables on each span.
    & code,
    & span {
      font-style: inherit;
      color: var(--shiki-light);
      background-color: transparent;
    }

    @include dark {
      & code,
      & span {
        color: var(--shiki-dark);
      }
    }

    // Slightly darker comments (light) / opaque comments (dark), as on the original.
    :root:not(.dark) & span[style*="--shiki-light:#6E7781" i] {
      color: #57606a;
    }

    :root.dark & span[style*="--shiki-dark:#8B8B8B94" i] {
      color: #8b8b8b;
    }

    & code {
      display: grid;
      min-width: max-content;
      padding: 1px 3.68px;
      font-family: var(--font-mono);
      font-size: 12.25px;
      font-weight: 400;
    }

    & [data-line] {
      padding-inline: 16px;
      border-left: 2px solid transparent;
    }

    & [data-highlighted-line] {
      border-left-color: #0003;
      background-color: #0000000a;

      @include dark {
        border-left-color: #ffffff40;
        background-color: #ffffff0f;
      }
    }

    // Diff lines: ```ts {3}#add {5}#remove
    & [data-highlighted-line-id="add"] {
      border-left-color: #10b98180;
      background-color: #10b9811a;

      @include dark {
        border-left-color: #10b98166;
      }
    }

    & [data-highlighted-line-id="remove"] {
      border-left-color: #ef444480;
      background-color: #ef44441a;
      opacity: 0.7;

      @include dark {
        border-left-color: #ef444466;
      }
    }
  }
}
</style>

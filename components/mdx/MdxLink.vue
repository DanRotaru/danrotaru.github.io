<script lang="ts">
import { defineComponent, h, type VNode } from "vue";

import ArrowUpRightLink from "@/components/icons/ArrowUpRightLink.vue";
import { flattenNodes } from "@/lib/mdx-vnodes";

import { NuxtLink } from "#components";

/**
 * Splits off the last word so it can stay glued to the external-link arrow
 * (`skills <nowrap>repo↗</nowrap>`), like the original.
 */
function splitLastWord(children: unknown): [Array<VNode | string>, VNode | string | undefined] {
  const items = flattenNodes(children);
  const last = items.at(-1);
  if (typeof last !== "string") return [items.slice(0, -1), last];
  const index = last.lastIndexOf(" ");
  if (index === -1) return [items.slice(0, -1), last];
  return [[...items.slice(0, -1), last.slice(0, index + 1)], last.slice(index + 1)];
}

/**
 * MDX link. External URLs open in a new tab and get a small arrow;
 * internal paths use NuxtLink; in-page anchors stay plain.
 * (Render function: the slot text is split like React's Children API did.)
 */
export default defineComponent({
  name: "MdxLink",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      // `class` from Markdown is dropped, like the React version.
      const { class: _className, href: rawHref, ...props } = attrs;
      void _className;
      const href = typeof rawHref === "string" ? rawHref : "";

      if (/^https?:\/\//.test(href)) {
        const [head, tail] = splitLastWord(slots.default?.());
        return h(
          "a",
          {
            ...props,
            href,
            class: "mdx-link",
            "data-mdx-link": "",
            target: "_blank",
            rel: "noopener noreferrer",
          },
          [
            ...head,
            h("span", { class: "mdx-link__tail" }, [
              tail,
              h("span", { "aria-hidden": "true", class: "mdx-link__icon-wrap" }, [
                h(ArrowUpRightLink, { class: "mdx-link__icon" }),
              ]),
            ]),
            h("span", { class: "visually-hidden" }, " (opens in new tab)"),
          ],
        );
      }
      if (href.startsWith("/")) {
        return h(NuxtLink, { ...props, to: href, class: "mdx-link", "data-mdx-link": "" }, () => slots.default?.());
      }
      return h("a", { ...props, href, class: "mdx-link", "data-mdx-link": "" }, slots.default?.());
    };
  },
});
</script>

<style lang="scss">
@use "abstracts" as *;

.mdx-link {
  &,
  .prose & {
    color: oklch(54.6% 0.245 262.881);
    text-decoration-line: underline;
    text-decoration-color: color-mix(in oklab, oklch(54.6% 0.245 262.881) 30%, transparent);
    text-decoration-thickness: 1px;
    text-underline-offset: 3.52px;
    transition: all 0.3s var(--ease-out-quint);

    @include hover {
      color: oklch(48.8% 0.243 264.376);
      text-decoration-color: oklch(54.6% 0.245 262.881);
    }

    @include dark {
      color: oklch(70.7% 0.165 254.624);
      text-decoration-color: color-mix(in oklab, oklch(70.7% 0.165 254.624) 30%, transparent);

      @include hover {
        color: oklch(80.9% 0.105 251.813);
        text-decoration-color: oklch(80.9% 0.105 251.813);
      }
    }
  }

  .prose--lg & {
    @include mq(md) {
      text-underline-offset: 3.96px;
    }
  }

  &__tail {
    white-space: nowrap;
  }

  &__icon-wrap {
    display: inline-block;
    margin-inline-start: 2px;
    line-height: 1;
    vertical-align: middle;
    user-select: none;
  }

  &__icon {
    display: block;
    width: 13.6px;
    height: 13.6px;

    .prose--lg & {
      @include mq(md) {
        width: 15.3px;
        height: 15.3px;
      }
    }

    stroke: currentColor;
    stroke-width: 0.75px;
    transition: translate 0.3s cubic-bezier(0.22, 1, 0.36, 1);

    @include parent-hover(".mdx-link") {
      translate: 1px -1px;
    }

    @include reduced-motion {
      transition: none;

      @include parent-hover(".mdx-link") {
        translate: none;
      }
    }
  }
}
</style>

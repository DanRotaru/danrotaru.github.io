<script setup lang="ts">
type HeadingTag = "h2" | "h3" | "h4";

/*
 * Section heading with a self-link. The `#` marker appears in the left gutter
 * on hover (lg and up). Ids come from rehype-slug (or are passed explicitly).
 */
withDefaults(defineProps<{ as?: HeadingTag; id?: string }>(), { as: "h2", id: undefined });
</script>

<template>
  <component :is="as" :id="id" class="mdx-heading">
    <a v-if="id" :href="`#${id}`" class="mdx-heading__anchor">
      <IconHashBold aria-hidden="true" class="mdx-heading__icon" />
      <slot />
    </a>
    <slot v-else />
  </component>
</template>

<style lang="scss">
@use "abstracts" as *;

.mdx-heading {
  position: relative;
  scroll-margin-top: 96px;

  &__anchor {
    &,
    .prose & {
      text-decoration-line: none;
    }
  }

  &__icon {
    position: absolute;
    top: 0.5lh;
    right: 100%;
    display: none;
    // h3 (20px) by default; h2/h4 sizes below.
    width: 16px;
    height: 16px;
    margin-right: 8px;
    color: oklch(70.8% 0 0);
    opacity: 0;
    translate: 4px -50%;
    transition: all 0.2s var(--ease-out-quint);

    @include mq(lg) {
      display: block;
    }

    @include dark {
      color: oklch(55.6% 0 0);
    }

    h2.mdx-heading & {
      width: 19.2px;
      height: 19.2px;
      margin-right: 9.6px;
    }

    // Blog article h2 is 36px at this breakpoint.
    .prose--article h2.mdx-heading & {
      width: 28.8px;
      height: 28.8px;
      margin-right: 14.4px;
    }

    h4.mdx-heading & {
      width: 12.8px;
      height: 12.8px;
      margin-right: 6.4px;
    }

    .mdx-heading:focus-within & {
      opacity: 1;
      translate: 0 -50%;
    }

    @include parent-hover(".mdx-heading") {
      opacity: 1;
      translate: 0 -50%;
    }
  }
}
</style>

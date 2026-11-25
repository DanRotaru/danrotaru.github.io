<script setup lang="ts">
/** MDX `>` blockquote: serif italic pull quote with a thin rule. */
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const rest = computed(() => {
  const { class: _class, ...other } = attrs;
  void _class;
  return other;
});
</script>

<template>
  <blockquote v-bind="rest" class="mdx-quote"><slot /></blockquote>
</template>

<style lang="scss">
@use "abstracts" as *;

.mdx-quote {
  &,
  .prose & {
    padding-left: 16px;
    border-left: 2px solid oklch(87% 0 0);
    font-family: var(--font-serif);
    font-size: 18.4px;
    font-style: italic;
    color: oklch(43.9% 0 0);

    @include dark {
      border-color: oklch(43.9% 0 0);
      color: oklch(70.8% 0 0);
    }
  }

  .prose--lg & {
    @include mq(md) {
      font-size: 20.7px;
    }
  }

  // No typographic quote marks around the paragraphs.
  & > p::before,
  & > p::after,
  .prose & > p::before,
  .prose & > p::after {
    content: none;
  }
}
</style>

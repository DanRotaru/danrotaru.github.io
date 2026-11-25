<script setup lang="ts">
/*
 * MDX `code`. Inline code gets the pill style; code inside highlighted blocks
 * (rehype-pretty-code sets `data-language`) is passed through untouched.
 */
const attrs = useAttrs();
const isBlock = computed(() => "data-language" in attrs || "data-theme" in attrs);
</script>

<template>
  <code :class="isBlock ? undefined : 'inline-code'"><slot /></code>
</template>

<style lang="scss">
@use "abstracts" as *;

// `.prose &` raises specificity above the typography rules it replaces.
.inline-code {
  &,
  .prose & {
    padding: 1px 4.2px;
    border: 1px solid oklab(15.9988% 0.00114696 -0.00402176 / 0.1);
    border-radius: 4px;
    background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.04);
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 400;
    color: color-mix(in oklab, oklch(55.3% 0.195 38.402) 75%, transparent);

    &::before,
    &::after {
      content: none;
    }

    @include dark {
      border-color: color-mix(in oklab, #fff 10%, transparent);
      background-color: color-mix(in oklab, #fff 6%, transparent);
      color: #edb98f;
    }
  }

  .prose--lg & {
    @include mq(md) {
      padding: 1px 4.8px;
      font-size: 16px;
    }
  }

  // Inside links the code takes the link colour.
  .mdx-link & {
    color: oklch(54.6% 0.245 262.881);

    @include dark {
      color: oklch(70.7% 0.165 254.624);
    }
  }
}
</style>

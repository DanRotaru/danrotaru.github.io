<!--
  One row of a long-form page (legal pages): sticky serif heading on the
  left from lg up, content on the right.
  Heading: the `heading` slot, or the `heading` prop as trusted HTML (legal content).
-->
<script setup lang="ts">
import { cn } from "@/lib/cn";

withDefaults(
  defineProps<{
    /** Serif heading as HTML; wrap the emphasised words in <em>. The `heading` slot takes precedence. */
    heading?: string;
    /** Bottom border under the row (all but the last one). */
    divided?: boolean;
  }>(),
  { heading: undefined, divided: true },
);
</script>

<template>
  <div :class="cn('legal-row', divided && 'legal-row--divided')">
    <div class="legal-row__aside">
      <div class="legal-row__sticky">
        <h2 v-if="$slots.heading" class="legal-row__heading"><slot name="heading" /></h2>
        <h2 v-else class="legal-row__heading" v-html="heading" />
      </div>
    </div>
    <div class="legal-row__content"><slot /></div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.legal-row {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @include mq(lg) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  &--divided {
    border-bottom: 1px solid var(--color-border);
  }

  &__aside {
    padding-inline: 20px;
    padding-top: 40px;

    @include mq(md) {
      padding-inline: 40px;
    }

    @include mq(lg) {
      grid-column: span 4 / span 4;
      padding-block: 64px;
      border-right: 1px solid var(--color-border);
    }
  }

  &__sticky {
    @include mq(lg) {
      position: sticky;
      top: 128px;
    }
  }

  &__heading {
    @include heading-serif(30px);
    font-size: 30px;
    line-height: 1.25;
    color: oklch(70.8% 0 0);

    @include dark {
      color: #777b84;
    }

    em {
      font-style: normal;
      color: oklch(20.5% 0 0);

      @include dark {
        color: oklch(97% 0 0);
      }
    }
  }

  &__content {
    padding: 24px 20px 48px;

    @include mq(md) {
      padding-inline: 40px;
    }

    @include mq(lg) {
      grid-column: span 8 / span 8;
      padding-block: 64px;
    }
  }

  // Paragraph copy (".prose-lite").
  &__text {
    max-width: 65ch;
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.625;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }

    > :not(:last-child) {
      margin-bottom: 16px;
    }

    a {
      color: var(--color-foreground);
      text-decoration-line: underline;
      text-decoration-color: color-mix(in oklab, var(--color-foreground) 30%, transparent);
      text-underline-offset: 4px;

      &:hover {
        text-decoration-color: var(--color-foreground);
      }
    }

    strong {
      font-weight: 500;
      color: var(--color-foreground);
    }
  }
}
</style>

<!-- "The short version" — four icon cards plus the last-updated date. -->
<script setup lang="ts">
import type { LegalSummaryItem } from "@/content/legal/types";

defineProps<{
  items: LegalSummaryItem[];
  /** ISO date (YYYY-MM-DD). */
  updated: string;
}>();

function formatUpdated(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <div class="legal-summary">
    <div class="legal-summary__header">
      <p class="legal-summary__label">
        <span aria-hidden="true" class="legal-summary__dot" />
        The short version
      </p>
      <p class="legal-summary__updated">
        Last updated <time :datetime="updated">{{ formatUpdated(updated) }}</time>
      </p>
    </div>
    <ul class="legal-summary__grid">
      <li v-for="item in items" :key="item.title" class="legal-summary__item">
        <component :is="item.icon" class="legal-summary__icon" />
        <p class="legal-summary__title">{{ item.title }}</p>
        <p class="legal-summary__text">{{ item.text }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.legal-summary {
  padding: 32px 20px;
  border-bottom: 1px solid var(--color-border);

  @include mq(md) {
    padding-inline: 40px;
  }

  &__header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 24px;
  }

  &__label,
  &__updated {
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__dot {
    width: 5px;
    height: 5px;
    background-color: oklch(62.3% 0.214 259.815);
  }

  &__grid {
    display: grid;
    gap: 1px;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: calc(var(--radius) + 4px);
    background-color: var(--color-border);

    @include mq(sm) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mq(lg) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    background-color: var(--color-background);
  }

  &__icon {
    width: 20px;
    height: 20px;
    color: oklch(54.6% 0.245 262.881);

    @include dark {
      color: oklch(70.7% 0.165 254.624);
    }
  }

  &__title {
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    color: var(--color-foreground);
  }

  &__text {
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.625;
    color: var(--color-muted-foreground);
  }
}
</style>

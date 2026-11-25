<!-- Definition list with hairlines between rows (term left, text right from sm). Term/description are HTML. -->
<script setup lang="ts">
import type { LegalListItem } from "@/content/legal/types";

defineProps<{ items: LegalListItem[] }>();
</script>

<template>
  <dl class="legal-list">
    <div v-for="(item, index) in items" :key="index" class="legal-list__row">
      <dt class="legal-list__term" v-html="item.term" />
      <dd class="legal-list__description">
        <div v-html="item.description" />
        <p v-if="item.note" class="legal-list__note">{{ item.note }}</p>
      </dd>
    </div>
  </dl>
</template>

<style lang="scss">
@use "abstracts" as *;

.legal-list {
  margin-top: 32px;
  border-block: 1px solid var(--color-border);

  &__row {
    display: grid;
    gap: 6px;
    padding-block: 16px;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border);
    }

    @include mq(sm) {
      grid-template-columns: 160px minmax(0, 1fr);
      gap: 24px;
    }
  }

  &__term {
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    color: var(--color-foreground);
  }

  &__description {
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.625;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }

    > :not(:last-child) {
      margin-bottom: 6px;
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
  }

  &__note {
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }
}
</style>

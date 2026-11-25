<!-- Grid of "quick facts" tiles on /about. -->
<script setup lang="ts">
import type { LifeFact } from "@/data/life";

defineProps<{ facts: LifeFact[] }>();
</script>

<template>
  <ul class="life-facts">
    <li v-for="fact in facts" :key="fact.label" class="life-facts__item">
      <span aria-hidden="true" class="life-facts__emoji">{{ fact.emoji }}</span>
      <div class="life-facts__body">
        <p class="life-facts__label">{{ fact.label }}</p>
        <p class="life-facts__value">{{ fact.value }}</p>
        <p v-if="fact.note" class="life-facts__note">{{ fact.note }}</p>
      </div>
    </li>
  </ul>
</template>

<style lang="scss">
@use "abstracts" as *;

.life-facts {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;

  @include mq(sm) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  &__item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 20px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl, 16px);
    background-color: var(--color-card);
    transition:
      translate 0.3s var(--ease-default),
      border-color 0.3s var(--ease-default);

    @include hover {
      translate: 0 -2px;
      border-color: color-mix(in oklab, var(--color-foreground) 25%, transparent);
    }
  }

  &__emoji {
    display: grid;
    flex: none;
    place-items: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background-color: var(--color-muted);
    font-size: 22px;
    line-height: 1;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__label {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__value {
    font-size: 17px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--color-foreground);
  }

  &__note {
    font-size: 14px;
    line-height: 1.45;
    color: var(--color-muted-foreground);
  }
}
</style>

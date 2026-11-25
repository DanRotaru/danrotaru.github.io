<!-- Tiny uppercase toggle tabs with a square indicator (bento tiles). -->
<script setup lang="ts" generic="T extends string">
withDefaults(
  defineProps<{
    /** Visually hidden legend of the fieldset. */
    legend: string;
    options: readonly T[];
    value: T;
    /** Colour of inactive tabs: `muted` (40%) or `soft` (60%). */
    tone?: "muted" | "soft";
  }>(),
  { tone: "muted" },
);

const emit = defineEmits<{ change: [value: T] }>();
</script>

<template>
  <fieldset class="home-filter-tabs">
    <legend class="visually-hidden">{{ legend }}</legend>
    <button
      v-for="option in options"
      :key="option"
      type="button"
      :aria-pressed="option === value"
      :class="[
        'home-filter-tabs__tab',
        option === value ? 'home-filter-tabs__tab--active' : `home-filter-tabs__tab--${tone}`,
      ]"
      @click="emit('change', option)"
    >
      <span aria-hidden="true" class="home-filter-tabs__dot" />{{ option }}
    </button>
  </fieldset>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);

.home-filter-tabs {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;

  @include mq(sm) {
    flex-wrap: nowrap;
    gap: 16px;
  }

  &__tab {
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 2px;
    white-space: nowrap;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s var(--ease-default);

    &:focus-visible {
      outline: 1px solid color-mix(in oklab, $blue 50%, transparent);
      outline-offset: 2px;
    }

    &--active {
      color: var(--color-foreground);
    }

    &--muted {
      color: color-mix(in oklab, var(--color-foreground) 40%, transparent);

      @include hover {
        color: color-mix(in oklab, var(--color-foreground) 75%, transparent);
      }
    }

    &--soft {
      color: color-mix(in oklab, var(--color-foreground) 60%, transparent);

      @include hover {
        color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
      }
    }
  }

  &__dot {
    width: 5px;
    height: 5px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 30%, transparent);
    transition: all 0.2s var(--ease-default);

    @include parent-hover(".home-filter-tabs__tab") {
      border-color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
    }

    .home-filter-tabs__tab--active & {
      border-color: $blue;
      background-color: $blue;
    }
  }
}
</style>

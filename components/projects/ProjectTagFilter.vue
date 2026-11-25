<!--
  Tag chips above the project list ("All" + every tag). Same look as the
  tech-stack chips: mono, uppercase, hairline border, optional sprite icon.
-->
<script setup lang="ts">
const props = defineProps<{
  tags: string[];
  /** Tag -> sprite icon (`/static/icons/sprite.svg#id`). */
  icons?: Record<string, { icon: string; invert?: boolean }>;
  /** Number of projects per tag (shown on each chip). */
  counts?: Record<string, number>;
  total?: number;
}>();

const model = defineModel<string | null>({ default: null });

const chips = computed(() => [
  { value: null, label: "All", count: props.total },
  ...props.tags.map((tag) => ({ value: tag, label: tag, count: props.counts?.[tag] })),
]);
</script>

<template>
  <div class="project-tags" role="group" aria-label="Filter projects by tag">
    <button
      v-for="chip in chips"
      :key="chip.label"
      type="button"
      :aria-pressed="model === chip.value"
      :class="['project-tags__chip shadow-border', { 'project-tags__chip--active': model === chip.value }]"
      @click="model = chip.value"
    >
      <img
        v-if="chip.value && icons?.[chip.value]"
        alt=""
        aria-hidden="true"
        :class="['project-tags__icon', { 'project-tags__icon--invert': icons[chip.value]!.invert }]"
        height="14"
        width="14"
        :src="`/static/icons/sprite.svg#${icons[chip.value]!.icon}`"
      />
      <span class="project-tags__label">{{ chip.label }}</span>
      <span v-if="chip.count !== undefined" class="project-tags__count">{{ chip.count }}</span>
    </button>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  @include mq(sm) {
    gap: 8px;
  }

  &__chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 8px;
    border-radius: calc(var(--radius) - 2px);
    background-color: color-mix(in oklab, var(--color-primary) 5%, transparent);
    cursor: pointer;
    font-family: var(--font-geist-mono);
    font-size: 12px;
    letter-spacing: 0.24px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    transition:
      background-color 0.2s var(--ease-default),
      color 0.2s var(--ease-default),
      scale 0.2s var(--ease-default);
    @include focus-ring;

    @include mq(sm) {
      letter-spacing: 0.26px;
      padding: 5px 10px;
      font-size: 13px;
    }

    @include hover {
      color: var(--color-foreground);
      background-color: color-mix(in oklab, var(--color-primary) 10%, transparent);
    }

    &:active {
      scale: 0.96;
    }

    &--active,
    &--active:hover {
      color: var(--color-background);
      background-color: var(--color-foreground);
    }
  }

  &__icon {
    width: 12px;
    height: 12px;

    @include mq(sm) {
      width: 14px;
      height: 14px;
    }

    &--invert {
      @include dark {
        filter: invert(100%);
      }
    }

    .project-tags__chip--active & {
      filter: invert(100%);
    }

    .project-tags__chip--active &--invert {
      @include dark {
        filter: none;
      }
    }
  }

  &__count {
    font-variant-numeric: tabular-nums;
    opacity: 0.5;
  }
}
</style>

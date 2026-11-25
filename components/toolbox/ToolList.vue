<!--
  Category filter (All / Dev / CLI / Apps) + grouped list of tools.
  Group headers are hidden while a single category is selected.
-->
<script setup lang="ts">
import type { ToolCategory, ToolGroup } from "@/data/toolbox";
import { cn } from "@/lib/cn";

type Filter = "All" | ToolCategory;

const props = defineProps<{
  groups: ToolGroup[];
}>();

const active = ref<Filter>("All");

const tabs = computed<Array<{ name: Filter; count: number }>>(() => {
  const total = props.groups.reduce((sum, group) => sum + group.tools.length, 0);
  return [
    { name: "All", count: total },
    ...props.groups.map((group) => ({ name: group.category, count: group.tools.length })),
  ];
});

const showAll = computed(() => active.value === "All");
</script>

<template>
  <div class="tool-list">
    <fieldset class="tool-list__filters">
      <legend class="visually-hidden">Filter tools by category</legend>
      <button
        v-for="tab in tabs"
        :key="tab.name"
        type="button"
        :aria-pressed="active === tab.name"
        :class="cn('tool-list__tab', active === tab.name && 'tool-list__tab--active')"
        @click="active = tab.name"
      >
        <span aria-hidden="true" class="tool-list__tab-dot" />
        {{ tab.name }}
        <span class="tool-list__tab-count">{{ tab.count }}</span>
      </button>
    </fieldset>

    <ul class="tool-list__items">
      <template v-for="(group, groupIndex) in groups" :key="group.category">
        <template v-if="showAll || group.category === active">
          <li
            v-if="showAll"
            :key="`${group.category}-header`"
            :class="cn('tool-list__group', groupIndex === 0 && 'tool-list__group--first')"
          >
            <span aria-hidden="true" class="tool-list__group-dot" />
            {{ group.title }}
            <span class="tool-list__group-count">{{ String(group.tools.length).padStart(2, "0") }}</span>
          </li>
          <li v-for="tool in group.tools" :key="tool.name" class="tool-list__item">
            <a class="tool-list__link" :href="tool.href" target="_blank" rel="noopener noreferrer">
              <span class="tool-list__logo">
                <img
                  class="tool-list__logo-image"
                  :src="tool.logo"
                  alt=""
                  width="20"
                  height="20"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span class="tool-list__main">
                <span class="tool-list__name">{{ tool.name }}</span>
                <span class="tool-list__summary">{{ tool.description }}</span>
              </span>
              <span class="tool-list__kind">{{ tool.kind }}</span>
              <span class="tool-list__description">{{ tool.description }}</span>
              <IconArrowUpRightSmall class="tool-list__arrow" />
            </a>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$accent: oklch(62.3% 0.214 259.815);

.tool-list {
  &__filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    min-width: 0;
    margin: 0;
    padding: 0 0 20px;
    border: 0;
  }

  &__tab {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-family: var(--font-bricolage);
    font-size: 11px;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 45%, transparent);
    border-radius: 2px;
    transition: all 0.2s var(--ease-default);

    &:focus-visible {
      outline: 1px solid color-mix(in oklab, #{$accent} 50%, transparent);
      outline-offset: 2px;
    }

    @include hover {
      color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    }

    &--active {
      color: var(--color-foreground);

      @include hover {
        color: var(--color-foreground);
      }
    }
  }

  &__tab-dot {
    width: 5px;
    height: 5px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 30%, transparent);
    transition: all 0.2s var(--ease-default);

    @include parent-hover(".tool-list__tab") {
      border-color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
    }

    .tool-list__tab--active & {
      border-color: $accent;
      background-color: $accent;
      box-shadow: 0 0 6px #3b82f699;
    }
  }

  &__tab-count,
  &__group-count {
    color: color-mix(in oklab, var(--color-foreground) 35%, transparent);
    font-variant-numeric: tabular-nums;
  }

  &__items {
    border-top: 1px solid var(--color-border);
  }

  &__group {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 32px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-border);
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);

    &--first {
      padding-top: 12px;
    }
  }

  &__group-dot {
    width: 4px;
    height: 4px;
    background-color: color-mix(in oklab, var(--color-foreground) 30%, transparent);
  }

  &__group-count {
    margin-left: auto;
  }

  &__item {
    border-bottom: 1px solid var(--color-border);
  }

  &__link {
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr) 16px;
    align-items: center;
    column-gap: 16px;
    padding: 12px 4px;
    transition: all 0.2s var(--ease-default);

    @include hover {
      background-color: color-mix(in oklab, var(--color-foreground) 2.5%, transparent);
    }

    @include mq(sm) {
      grid-template-columns: 36px 144px 112px minmax(0, 1fr) 16px;
    }
  }

  &__logo {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 8%, transparent);
    border-radius: var(--radius);
    background-color: color-mix(in oklab, var(--color-foreground) 2%, transparent);
    transition: all 0.2s var(--ease-default);

    @include parent-hover(".tool-list__link") {
      translate: 0 -2px;
      border-color: color-mix(in oklab, var(--color-foreground) 20%, transparent);
    }
  }

  &__logo-image {
    width: 20px;
    height: 20px;
    object-fit: contain;
    border-radius: 3px;
  }

  &__main {
    min-width: 0;
  }

  &__name {
    @include truncate;
    display: block;
    font-family: var(--font-bricolage);
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    color: color-mix(in oklab, var(--color-foreground) 85%, transparent);
    transition: color 0.2s var(--ease-default);

    @include parent-hover(".tool-list__link") {
      color: var(--color-foreground);
    }
  }

  &__summary {
    @include truncate;
    display: block;
    font-family: var(--font-bricolage);
    font-size: 12px;
    line-height: 1.33333;
    color: var(--color-muted-foreground);

    @include mq(sm) {
      display: none;
    }
  }

  &__kind {
    display: none;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);

    @include mq(sm) {
      display: block;
    }
  }

  &__description {
    @include truncate;
    display: none;
    font-family: var(--font-bricolage);
    font-size: 14px;
    line-height: 1.42857;
    color: var(--color-muted-foreground);

    @include mq(sm) {
      display: block;
    }
  }

  &__arrow {
    width: 14px;
    height: 14px;
    color: color-mix(in oklab, var(--color-foreground) 30%, transparent);
    transition: all 0.2s var(--ease-default);

    @include parent-hover(".tool-list__link") {
      translate: 2px -2px;
      color: $accent;
    }
  }
}
</style>

<script setup lang="ts">
import { motion } from "motion-v";

import type { MoreNavItem } from "@/data/navigation";

const ROW_SPRING = { type: "spring", stiffness: 520, damping: 42 } as const;

/** Contents of the "More" dropdown: a list of pages. */
const props = defineProps<{
  id: string;
  items: MoreNavItem[];
  currentHref?: string;
}>();

const emit = defineEmits<{
  /** Keep the dropdown open (cancel a pending close). */
  hold: [];
  /** A link is followed (closes the dropdown). */
  navigate: [];
}>();

const selected = ref(
  Math.max(
    0,
    props.items.findIndex((item) => item.href === props.currentHref),
  ),
);
</script>

<template>
  <motion.div
    :id="id"
    class="more-panel"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0, transition: { duration: 0.08 } }"
    :transition="{ duration: 0.16, delay: 0.1, ease: 'easeOut' }"
    @mouseenter="emit('hold')"
  >
    <ul class="more-panel__list">
      <li
        v-for="(item, index) in items"
        :key="item.href"
        class="more-panel__item"
      >
        <NuxtLink
          :aria-current="item.href === currentHref ? 'page' : undefined"
          class="more-panel__link"
          :to="item.href"
          @click="emit('navigate')"
          @focus="selected = index"
          @mouseenter="selected = index"
        >
          <motion.span
            v-if="index === selected"
            aria-hidden="true"
            class="more-panel__highlight"
            layout-id="more-row-highlight"
            :transition="ROW_SPRING"
          />
          <IconTile :tint="item.tint">
            <component :is="item.icon" class="icon-tile__icon" />
          </IconTile>
          <span class="more-panel__text">
            <span class="more-panel__title">{{ item.title }}</span>
            <span class="more-panel__description">{{
              item.description
            }}</span>
          </span>
          <span v-if="item.href === currentHref" class="more-panel__badge"
            >Current</span
          >
        </NuxtLink>
      </li>
    </ul>
  </motion.div>
</template>

<style lang="scss">
@use "abstracts" as *;

// Sits inside the expanded nav pill, directly under the link row. Positioned
// against the (centred) nav track and as wide as the expanded pill.
.more-panel {
  position: absolute;
  top: 100%;
  left: 50%;
  translate: -50% 0;
  width: var(--more-panel-width, 100%);
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  white-space: normal;

  &__list {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  &__item {
    list-style: none;
  }

  &__link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    height: 44px;
    padding-inline: 10px;
    border-radius: 10px;
    outline: none;

    &:focus-visible {
      box-shadow: 0 0 0 2px rgb(59 130 246 / 0.4);
    }
  }

  &__highlight {
    position: absolute;
    inset: 0;
    border-radius: 10px;
    background-color: rgb(0 0 0 / 0.07);
    box-shadow: inset 0 0 0 0.5px rgb(0 0 0 / 0.05);

    @include dark {
      background-color: rgb(255 255 255 / 0.09);
      box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
    }
  }

  &__text {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  &__title {
    font-size: 13.5px;
    font-weight: 500;
    line-height: 1.25;
    color: var(--color-foreground);
  }

  &__description {
    @include truncate;
    font-size: 12px;
    line-height: 1.25;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);

    @include dark {
      color: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    }
  }

  &__badge {
    position: relative;
    font-size: 11px;
    color: oklch(54.6% 0.245 262.881);

    @include dark {
      color: oklch(62.3% 0.214 259.815);
    }
  }
}
</style>

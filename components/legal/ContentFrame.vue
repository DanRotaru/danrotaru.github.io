<!--
  Full-width band with top/bottom borders and the vertical page rails —
  the frame every content section of the site sits in.
  `class`, `aria-label` and `aria-labelledby` fall through to the root element.
-->
<script setup lang="ts">
import { cn } from "@/lib/cn";

withDefaults(
  defineProps<{
    /** Drop the top border (when the section sits right under a borderless hero). */
    flushTop?: boolean;
    /** Square nodes where the rails meet the borders: all four corners, bottom only, or none. */
    nodes?: boolean | "bottom";
    /** Rendered element; use "div" when the frame is nested inside another section. */
    as?: "section" | "div";
    /** Extra classes for the bordered column (padding etc.). */
    innerClassName?: string;
  }>(),
  { flushTop: false, nodes: true, as: "section", innerClassName: undefined },
);
</script>

<template>
  <component :is="as" :class="cn('content-frame', flushTop && 'content-frame--flush-top')">
    <div class="container content-frame__container">
      <div :class="cn('content-frame__rails', innerClassName)">
        <slot />
        <template v-if="nodes === true">
          <span aria-hidden="true" class="rail-node rail-node--top-left" />
          <span aria-hidden="true" class="rail-node rail-node--top-right" />
        </template>
        <template v-if="nodes">
          <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
          <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
        </template>
      </div>
    </div>
  </component>
</template>

<style lang="scss">
@use "abstracts" as *;

.content-frame {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &--flush-top {
    border-top-width: 0;
  }

  &__container {
    height: 100%;
  }

  &__rails {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }
}
</style>

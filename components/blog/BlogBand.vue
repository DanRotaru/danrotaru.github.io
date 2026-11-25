<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: "section" | "div";
    label?: string;
    /** Drop the top border + top corner nodes (band directly under a hero/header). */
    flushTop?: boolean;
  }>(),
  { as: "div", label: undefined, flushTop: false },
);
</script>

<!--
  Full-width band with top/bottom borders and the page rails (left/right
  borders of the content column) with square nodes at each corner.
-->
<template>
  <component :is="as" :class="['blog-band', { 'blog-band--flush-top': flushTop }]" :aria-label="label">
    <div class="container blog-band__container">
      <div class="blog-band__rails">
        <slot />
        <template v-if="!flushTop">
          <span aria-hidden="true" class="rail-node rail-node--top-left" />
          <span aria-hidden="true" class="rail-node rail-node--top-right" />
        </template>
        <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </component>
</template>

<style lang="scss">
@use "abstracts" as *;

.blog-band {
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

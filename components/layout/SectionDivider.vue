<script setup lang="ts">
/**
 * Hatched horizontal band that separates page sections, with small square
 * "nodes" where it meets the vertical rails.
 */
withDefaults(
  defineProps<{
    /** Hide the top corner nodes (e.g. directly under a hero). */
    hideTopNodes?: boolean;
  }>(),
  { hideTopNodes: false },
);
</script>

<template>
  <div aria-hidden="true" class="section-divider">
    <div class="container section-divider__container">
      <div class="section-divider__frame">
        <template v-if="!hideTopNodes">
          <span class="rail-node rail-node--top-left" />
          <span class="rail-node rail-node--top-right" />
        </template>
        <span class="rail-node rail-node--bottom-left" />
        <span class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

// Corner nodes use the global `.rail-node` block (styles/_blocks.scss).

.section-divider {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);
  @include hatch;

  &__container {
    height: 100%;
  }

  &__frame {
    position: relative;
    height: 40px;
    border-inline: 1px solid var(--color-border);
    background-color: var(--color-canvas);
  }
}
</style>

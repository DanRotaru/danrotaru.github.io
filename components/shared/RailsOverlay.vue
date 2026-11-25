<!--
  Absolutely-positioned vertical rails (left/right borders of the page column),
  drawn over a section. The parent must be `position: relative`.
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Which corner nodes to draw where the rails meet horizontal borders. */
    nodes?: "none" | "top" | "bottom" | "both";
  }>(),
  { nodes: "both" },
);

const top = computed(() => props.nodes === "top" || props.nodes === "both");
const bottom = computed(() => props.nodes === "bottom" || props.nodes === "both");
</script>

<template>
  <div aria-hidden="true" class="rails-overlay">
    <div class="container rails-overlay__container">
      <div class="rails-overlay__rails">
        <template v-if="top">
          <span class="rail-node rail-node--top-left" />
          <span class="rail-node rail-node--top-right" />
        </template>
        <template v-if="bottom">
          <span class="rail-node rail-node--bottom-left" />
          <span class="rail-node rail-node--bottom-right" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.rails-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;

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

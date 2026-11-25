<!-- Hatched band with a small uppercase label, separating the link groups. -->
<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="links-band">
    <div class="container links-band__container">
      <div class="links-band__frame">
        <h2 class="links-band__title">{{ title }}</h2>
        <span aria-hidden="true" class="rail-node rail-node--top-left" />
        <span aria-hidden="true" class="rail-node rail-node--top-right" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.links-band {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);
  @include hatch;

  &__container {
    height: 100%;
  }

  &__frame {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 20px;
    border-inline: 1px solid var(--color-border);
    background-color: var(--color-canvas);
  }

  &__title {
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }
}
</style>

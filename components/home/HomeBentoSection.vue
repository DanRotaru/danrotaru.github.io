<!--
  Shared frame of a home bento section: bordered rails + hatched 12-column tray.
  Put `HomeBentoSection__cell`-style wrappers inside via the `cell` classes:
  `home-bento-section__cell--span-{3|4|5|6|7|8}` (lg), `--full-md` (full width on md).
-->
<script setup lang="ts">
defineProps<{ id?: string }>();
</script>

<template>
  <div :id="id" class="home-bento-section">
    <div class="container home-bento-section__container">
      <div class="home-bento-section__frame">
        <div class="home-bento-section__tray"><slot /></div>
        <span class="rail-node rail-node--bottom-left" />
        <span class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.home-bento-section {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__frame {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__tray {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 12px;
    padding: 12px;
    @include hatch;

    @include mq(md) {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  &__cell {
    min-height: 304px;

    @include mq(md) {
      grid-column: span 6 / span 6;
    }

    @each $span in (3, 4, 5, 6, 7, 8) {
      &--span-#{$span} {
        @include mq(lg) {
          grid-column: span $span / span $span;
        }
      }
    }

    &--full-md {
      @include mq(md) {
        grid-column: span 12 / span 12;
      }
    }

    // Keep the lg span when combined with --full-md.
    @each $span in (3, 4, 5, 6, 7, 8) {
      &--full-md#{&}--span-#{$span} {
        @include mq(lg) {
          grid-column: span $span / span $span;
        }
      }
    }
  }
}
</style>

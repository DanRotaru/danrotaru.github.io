<!--
  "Highlights" tile: a paragraph from a book on a paper sheet. Hover sweeps a
  highlighter across the marked sentences, one after another.
-->
<script setup lang="ts">
const props = defineProps<{
  segments: { text: string; mark: boolean }[];
  /** Book title, bottom-left. */
  source: string;
}>();

// Stagger index for each marked segment.
const parts = computed(() => {
  let m = 0;
  return props.segments.map((seg) => ({ ...seg, order: seg.mark ? m++ : -1 }));
});
</script>

<template>
  <div class="home-highlights">
    <div class="home-highlights__page">
      <p class="home-highlights__text">
        <template v-for="(part, i) in parts" :key="i">
          <mark
            v-if="part.mark"
            class="home-highlights__mark"
            :style="{ '--d': `${part.order * 450}ms` }"
          >{{ part.text }}</mark>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
    </div>
    <p class="home-highlights__source">{{ source }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$card: ".home-bento-card";
$marker: oklch(90.5% 0.182 98.111);

.home-highlights {
  position: absolute;
  inset: 0;

  &__page {
    position: absolute;
    left: 20px;
    right: 20px;
    top: 108px;
    bottom: 52px;
    overflow: hidden;
    padding: 14px 16px;
    border-radius: 8px;
    background-color: #fffdf7;
    box-shadow:
      0 0 0 1px var(--color-border),
      0 16px 30px -20px rgb(0 0 0 / 0.3);
    mask-image: linear-gradient(to bottom, #000 75%, transparent);

    @include dark {
      background-color: #17171a;
    }
  }

  &__text {
    font-family: var(--font-instrument-serif), ui-serif, Georgia, serif;
    font-size: 16px;
    line-height: 1.55;
    letter-spacing: 0.16px;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }

  // Highlighter: a background that grows left to right, wrapping across lines.
  &__mark {
    color: inherit;
    background-color: transparent;
    background-image: linear-gradient(
      100deg,
      color-mix(in oklab, $marker 75%, transparent),
      color-mix(in oklab, $marker 55%, transparent)
    );
    background-repeat: no-repeat;
    background-position: 0 60%;
    background-size: 0% 70%;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    border-radius: 2px;
    transition: background-size 0.3s ease-in;

    @include dark {
      color: var(--color-foreground);
      background-image: linear-gradient(
        100deg,
        color-mix(in oklab, $marker 35%, transparent),
        color-mix(in oklab, $marker 25%, transparent)
      );
    }

    @include parent-hover($card) {
      background-size: 100% 70%;
      transition: background-size 0.55s cubic-bezier(0.65, 0, 0.35, 1) var(--d);
    }

    @include reduced-motion {
      transition: none !important;
    }
  }

  &__source {
    pointer-events: none;
    position: absolute;
    inset-inline: 20px;
    bottom: 20px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    @include truncate;
  }
}
</style>

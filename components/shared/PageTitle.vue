<!--
  Eyebrow + large serif heading with an animated gradient highlight.
  <p class="page-title__eyebrow">The Gear</p>
  <h1 class="page-title__heading">What Powers <span class="page-title__highlight">My Work</span></h1>

  `title`, `highlight` and `titleAfter` accept a plain string prop or a same-named slot (slot wins).
-->
<script setup lang="ts">
import { cn } from "@/lib/cn";

withDefaults(
  defineProps<{
    eyebrow: string;
    title?: string;
    highlight?: string;
    titleAfter?: string;
    /** `left` aligns left from the lg breakpoint (About page). */
    align?: "center" | "left";
    as?: "h1" | "h2";
    /** Remove the bottom margin (used inside PageHero). */
    flush?: boolean;
  }>(),
  { align: "center", as: "h1", flush: false },
);

defineSlots<{ title?(): unknown; highlight?(): unknown; titleAfter?(): unknown }>();
</script>

<template>
  <div :class="cn('page-title', align === 'left' && 'page-title--left', flush && 'page-title--flush')">
    <p class="page-title__eyebrow">{{ eyebrow }}</p>
    <component :is="as" class="page-title__heading">
      <slot name="title">{{ title }}</slot>
      <template v-if="$slots.highlight || highlight">
        <template v-if="$slots.title || title">{{ " " }}</template>
        <span class="page-title__sweep">
          <span class="page-title__highlight text-gradient"><slot name="highlight">{{ highlight }}</slot></span>
        </span>
      </template>
      <template v-if="$slots.titleAfter || titleAfter">{{ " " }}<slot name="titleAfter">{{ titleAfter }}</slot></template>
    </component>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.page-title {
  position: relative;
  z-index: 2;
  max-width: 576px;
  margin-inline: auto;
  margin-bottom: var(--header-height);
  font-size: 48px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: -1.2px;
  text-align: center;
  text-wrap: balance;
  text-shadow:
    0 4px 8px rgb(255 255 255 / 0.05),
    0 8px 30px rgb(255 255 255 / 0.2);

  @include mq-down(sm) {
    padding-inline: 20px;
  }

  @include mq(md) {
    letter-spacing: -1.5px;
    font-size: 60px;
  }

  &--flush {
    margin-bottom: 0;
  }

  &--left {
    width: 100%;

    @include mq(lg) {
      margin-inline: 0;
      text-align: left;
    }
  }

  &__eyebrow {
    margin-bottom: 16px;
    font-family: var(--font-bricolage);
    font-size: 12px;
    line-height: 1.33333;
    font-weight: 400;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgb(13 13 15 / 0.8);

    @include dark {
      color: rgb(255 255 255 / 0.7);
    }
  }

  &__heading {
    display: inline-block;
    font-family: var(--font-instrument-serif);
  }

  // Wrapper that reveals the highlight with a sweeping mask.
  &__sweep {
    mask-image: linear-gradient(90deg, #000 70%, transparent);
    mask-position: 0;
    mask-size: 200% 100%;
    mask-repeat: no-repeat;
    animation: mask-sweep 1.8s var(--ease-smooth) backwards;
  }

  &__highlight {
    padding-inline: 4px;
    padding-bottom: 4px;
    font-style: italic;
    text-shadow: none;
    background-size: 200% 200%;
    animation: gradient-x 6s infinite;

    @include reduced-motion {
      animation-duration: 0s !important;
      animation-play-state: paused !important;
    }
  }
}
</style>

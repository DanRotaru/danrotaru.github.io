<!--
  "Hobby -> Career" tile: a handwritten sticky note ("2014 · for fun") and an
  ink stamp ("career") joined by an arrow. At rest the arrow is only a faint
  dotted guide; hover draws the shaft, then the head, then presses the stamp.
-->
<script setup lang="ts">
import type { HomeExpShift } from "@/data/home";

defineProps<{
  shift: HomeExpShift;
}>();
</script>

<template>
  <HomeExpShiftFrame :shift="shift">
    <div class="home-exp-hobby-career">
      <span class="home-exp-hobby-career__note">{{ shift.from }}</span>
      <svg aria-hidden="true" class="home-exp-hobby-career__arrow" viewBox="0 0 64 24">
        <path class="home-exp-hobby-career__guide" d="M3 15 C 18 4, 40 4, 56 12" />
        <path class="home-exp-hobby-career__shaft" d="M3 15 C 18 4, 40 4, 56 12" pathLength="1" />
        <path class="home-exp-hobby-career__head" d="m49 7 7 5-8 3" pathLength="1" />
      </svg>
      <span class="home-exp-hobby-career__stamp">
        <span class="home-exp-hobby-career__stamp-text">{{ shift.to }}</span>
      </span>
    </div>
  </HomeExpShiftFrame>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

.home-exp-hobby-career {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &__note {
    padding: 9.6px 11.2px;
    font-family: var(--font-caveat);
    font-size: 18.4px;
    line-height: 1;
    white-space: nowrap;
    color: oklch(37% 0.05 80);
    background-color: oklch(94% 0.09 95);
    box-shadow: 0 6px 12px -8px rgb(0 0 0 / 0.35);
    rotate: -4deg;
    transition: rotate 0.45s var(--ease-out-quint);

    @include dark {
      color: oklch(25% 0.04 80);
      background-color: oklch(86% 0.1 95);
    }

    @include parent-hover($card) {
      rotate: -9deg;
    }
  }

  // Hand-drawn curved arrow, drawn on hover (shaft first, then the head).
  &__arrow {
    flex: 1;
    min-width: 32px;
    max-width: 120px;
    height: 32px;
    overflow: visible;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &__guide {
    stroke: color-mix(in oklab, var(--color-foreground) 22%, transparent);
    stroke-dasharray: 0.5 4;
    transition: opacity 0.3s ease;

    @include parent-hover($card) {
      opacity: 0;
    }
  }

  &__shaft,
  &__head {
    stroke: $blue;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
  }

  &__shaft {
    transition: stroke-dashoffset 0.25s ease-in 0.1s;

    @include parent-hover($card) {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.5s var(--ease-out-quint);
    }
  }

  &__head {
    transition: stroke-dashoffset 0.15s ease-in;

    @include parent-hover($card) {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.25s ease-out 0.4s;
    }
  }

  // Ink stamp: double border, spaced capitals, slightly askew.
  &__stamp {
    display: grid;
    padding: 3px;
    border: 1.5px solid currentColor;
    border-radius: 6px;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    rotate: 5deg;
    transition:
      color 0.3s ease-in,
      scale 0.3s ease-in,
      rotate 0.3s ease-in;

    @include parent-hover($card) {
      color: $blue;
      animation: home-exp-hobby-career-stamp 0.4s var(--ease-out-quint) 0.55s both;
    }
  }

  &__stamp-text {
    padding: 5.6px 9.6px 4.8px;
    border: 1px solid currentColor;
    border-radius: 4px;
    font-family: var(--font-bricolage);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 2.64px;
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
  }

  @include reduced-motion {
    &__note,
    &__stamp,
    &__shaft,
    &__head {
      transition: none !important;
      animation: none !important;
    }
  }
}

// Pressed onto the page: drops in slightly larger, then settles.
@keyframes home-exp-hobby-career-stamp {
  0% {
    scale: 1.25;
    rotate: 0deg;
    opacity: 0.4;
  }

  60% {
    scale: 0.96;
    rotate: -6deg;
    opacity: 1;
  }

  100% {
    scale: 1;
    rotate: -5deg;
  }
}
</style>

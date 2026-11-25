<!--
  "Degree" tile: a diploma sheet with a seal and a graduation cap resting on
  its corner. Hover tosses the cap, swings its tassel and stamps the seal blue.
-->
<script setup lang="ts">
defineProps<{
  university: string;
  degree: string;
  years: string;
  caption: string;
}>();
</script>

<template>
  <div class="home-degree">
    <div class="home-degree__sheet">
      <span aria-hidden="true" class="home-degree__rule" />
      <span class="home-degree__university">{{ university }}</span>
      <span class="home-degree__degree">{{ degree }}</span>
      <span class="home-degree__years">{{ years }}</span>
      <span aria-hidden="true" class="home-degree__seal"><span>IT</span></span>
    </div>
    <svg aria-hidden="true" class="home-degree__cap" viewBox="0 0 64 48">
      <path class="home-degree__cap-base" d="M18 22 L18 32 Q32 40 46 32 L46 22 Z" />
      <path class="home-degree__cap-board" d="M32 6 L62 18 L32 30 L2 18 Z" />
      <g class="home-degree__tassel">
        <path d="M32 18 L52 22 L52 34" />
        <rect height="7" rx="1" width="4" x="50" y="33" />
      </g>
    </svg>
    <p class="home-degree__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

@keyframes home-degree-toss {
  0% {
    translate: 0 0;
    rotate: -12deg;
  }

  45% {
    translate: 4px -40px;
    rotate: 200deg;
  }

  80% {
    translate: 0 4px;
    rotate: 348deg;
  }

  100% {
    translate: 0 0;
    rotate: 348deg;
  }
}

@keyframes home-degree-swing {
  0%,
  100% {
    rotate: 0deg;
  }

  50% {
    rotate: 14deg;
  }
}

.home-degree {
  position: absolute;
  inset: 0;

  &__sheet {
    position: absolute;
    inset-inline: 20px;
    bottom: 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 16px 16px 18px;
    border-radius: 6px;
    background-color: #fffdf7;
    box-shadow:
      0 0 0 1px var(--color-border),
      inset 0 0 0 5px #fffdf7,
      inset 0 0 0 6px color-mix(in oklab, var(--color-foreground) 12%, transparent),
      0 14px 28px -18px rgb(0 0 0 / 0.35);
    text-align: center;

    @include dark {
      background-color: #18181b;
      box-shadow:
        0 0 0 1px var(--color-border),
        inset 0 0 0 5px #18181b,
        inset 0 0 0 6px color-mix(in oklab, var(--color-foreground) 14%, transparent),
        0 14px 28px -18px rgb(0 0 0 / 0.5);
    }
  }

  &__rule {
    width: 32px;
    height: 2px;
    margin-bottom: 4px;
    border-radius: 999px;
    background-color: color-mix(in oklab, var(--color-foreground) 18%, transparent);
  }

  &__university {
    font-family: var(--font-bricolage);
    font-size: 9px;
    letter-spacing: 1.08px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
  }

  &__degree {
    font-family: var(--font-instrument-serif), ui-serif, Georgia, serif;
    font-size: 22px;
    line-height: 1.15;
    color: var(--color-foreground);
  }

  &__years {
    font-family: var(--font-mono);
    font-size: 10px;
    color: color-mix(in oklab, var(--color-foreground) 50%, transparent);
  }

  &__seal {
    position: absolute;
    right: 12px;
    bottom: -14px;
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 999px;
    border: 1px dashed color-mix(in oklab, var(--color-foreground) 30%, transparent);
    background-color: #f7f7f8;
    font-family: var(--font-bricolage);
    font-size: 10px;
    font-weight: 600;
    color: color-mix(in oklab, var(--color-foreground) 45%, transparent);
    rotate: -12deg;
    transition: all 0.3s ease-in;

    @include dark {
      background-color: #0f0f10;
    }

    @include parent-hover($card) {
      border-style: solid;
      border-color: $blue;
      background-color: $blue;
      color: #fff;
      scale: 1.1;
      transition: all 0.3s ease-out 0.7s;
    }
  }

  &__cap {
    position: absolute;
    left: 8px;
    bottom: 144px;
    width: 56px;
    rotate: -12deg;
    overflow: visible;

    @include parent-hover($card) {
      animation: home-degree-toss 0.9s cubic-bezier(0.3, 0.7, 0.3, 1) both;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__cap-base {
    fill: color-mix(in oklab, var(--color-foreground) 70%, #000);
  }

  &__cap-board {
    fill: var(--color-foreground);
  }

  &__tassel {
    transform-origin: 32px 18px;
    transform-box: view-box;

    path {
      fill: none;
      stroke: oklch(76.9% 0.188 70.08);
      stroke-width: 1.5;
      stroke-linecap: round;
    }

    rect {
      fill: oklch(76.9% 0.188 70.08);
    }

    @include parent-hover($card) {
      animation: home-degree-swing 0.6s ease-in-out 0.9s 2;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__caption {
    pointer-events: none;
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }
}
</style>

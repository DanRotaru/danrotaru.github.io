<!--
  "Feedback Loop" tile: Build → Ship → Learn → Adjust around a ring with a
  dot orbiting slowly. Hover speeds the dot up and lights the steps in turn.
-->
<script setup lang="ts">
defineProps<{
  steps: string[];
  caption: string;
}>();

// Positions of the 4 step labels around the ring (top, right, bottom, left).
const spots = [
  { x: 50, y: 0 },
  { x: 100, y: 50 },
  { x: 50, y: 100 },
  { x: 0, y: 50 },
];
</script>

<template>
  <div class="home-feedback-loop">
    <div class="home-feedback-loop__stage">
      <svg aria-hidden="true" class="home-feedback-loop__ring" viewBox="0 0 100 100">
        <circle class="home-feedback-loop__track" cx="50" cy="50" r="40" />
        <circle class="home-feedback-loop__arc" cx="50" cy="50" r="40" pathLength="100" />
        <path class="home-feedback-loop__arrow" d="M86 38 L90 46 L94 38" />
      </svg>
      <span aria-hidden="true" class="home-feedback-loop__orbit"><span class="home-feedback-loop__dot" /></span>
      <ol class="home-feedback-loop__steps">
        <li
          v-for="(step, i) in steps.slice(0, 4)"
          :key="step"
          class="home-feedback-loop__step"
          :style="{ left: `${spots[i]!.x}%`, top: `${spots[i]!.y}%`, '--i': i }"
        >
          {{ step }}
        </li>
      </ol>
    </div>
    <p class="home-feedback-loop__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

@keyframes home-feedback-loop-orbit {
  to {
    rotate: 360deg;
  }
}

// Each step glows for a quarter of the 2s hover loop.
@keyframes home-feedback-loop-step {
  0%,
  25% {
    color: #fff;
    background-color: $blue;
    box-shadow: 0 0 0 1px $blue, 0 6px 16px -6px rgb(59 130 246 / 0.6);
  }

  30%,
  100% {
    color: var(--color-foreground);
  }
}

.home-feedback-loop {
  position: absolute;
  inset: 0;

  &__stage {
    position: absolute;
    left: 50%;
    bottom: 56px;
    width: 136px;
    aspect-ratio: 1;
    translate: -50% 0;
  }

  &__ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  &__track {
    fill: none;
    stroke: color-mix(in oklab, var(--color-foreground) 12%, transparent);
    stroke-width: 1.5;
    stroke-dasharray: 2 3;
  }

  &__arc {
    fill: none;
    stroke: $blue;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    rotate: -90deg;
    transform-origin: 50px 50px;
    transition: stroke-dashoffset 0.4s ease-in;

    @include parent-hover($card) {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  &__arrow {
    fill: none;
    stroke: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  // The orbiting dot: a full-size box rotating, with the dot at its top edge.
  &__orbit {
    position: absolute;
    inset: 10%;
    animation: home-feedback-loop-orbit 8s linear infinite;

    @include parent-hover($card) {
      animation-duration: 2s;
    }

    @include reduced-motion {
      animation: none;
    }
  }

  &__dot {
    position: absolute;
    top: -4px;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    border-radius: 999px;
    background-color: $blue;
    box-shadow: 0 0 10px 2px rgb(59 130 246 / 0.55);
  }

  &__steps {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__step {
    position: absolute;
    translate: -50% -50%;
    padding: 4px 8px;
    border-radius: 999px;
    background-color: #fff;
    box-shadow: 0 0 0 1px var(--color-border);
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
    color: var(--color-foreground);

    @include dark {
      background-color: #18181b;
    }

    @include parent-hover($card) {
      animation: home-feedback-loop-step 2s linear infinite;
      animation-delay: calc(var(--i) * 0.5s);
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

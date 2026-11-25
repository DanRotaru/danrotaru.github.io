<!--
  "Where The Hours Go" tile: two stacked bars (before / now) splitting a
  working day into typing, planning, reviewing and testing. Illustrative
  shares. Hover replays the "now" bar morphing from the old split.
-->
<script setup lang="ts">
import type { HomeAiTimeSlice } from "@/data/home";

defineProps<{
  slices: HomeAiTimeSlice[];
  rows: { before: string; now: string };
  /** Label bottom-left. */
  caption: string;
}>();
</script>

<template>
  <div class="home-ai-time-split">
    <div class="home-ai-time-split__chart">
      <div v-for="row in (['before', 'now'] as const)" :key="row" class="home-ai-time-split__row">
        <span class="home-ai-time-split__name">{{ rows[row] }}</span>
        <span :class="['home-ai-time-split__bar', `home-ai-time-split__bar--${row}`]">
          <span
            v-for="(slice, i) in slices"
            :key="slice.label"
            :class="['home-ai-time-split__seg', `home-ai-time-split__seg--${i}`]"
            :style="{ flexGrow: slice[row], '--b': slice.before, '--n': slice.now }"
          >
            <span class="home-ai-time-split__pct">{{ `${slice[row]}%` }}</span>
          </span>
        </span>
      </div>
      <ul class="home-ai-time-split__legend">
        <li v-for="(slice, i) in slices" :key="slice.label" :class="['home-ai-time-split__key', `home-ai-time-split__key--${i}`]">
          {{ slice.label }}
        </li>
      </ul>
    </div>
    <p class="home-ai-time-split__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";
$tones: (
  0: color-mix(in oklab, var(--color-foreground) 22%, transparent),
  1: color-mix(in oklab, #{$blue} 35%, transparent),
  2: $blue,
  3: color-mix(in oklab, #{$blue} 60%, transparent),
);

@keyframes home-ai-time-split-morph {
  from {
    flex-grow: var(--b);
  }

  to {
    flex-grow: var(--n);
  }
}

.home-ai-time-split {
  position: absolute;
  inset: 0;

  &__chart {
    position: absolute;
    inset-inline: 20px;
    bottom: 52px;
    display: flex;
    flex-direction: column;
    gap: 9.6px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__name {
    flex: none;
    width: 52px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
  }

  &__bar {
    display: flex;
    flex: 1;
    gap: 2px;
    height: 28px;
    overflow: hidden;
    border-radius: 7.2px;
  }

  &__seg {
    display: flex;
    align-items: center;
    flex-basis: 0;
    min-width: 0;
    padding-left: 6.4px;
    overflow: hidden;

    @each $i, $tone in $tones {
      &--#{$i} {
        background-color: $tone;
      }
    }

    .home-ai-time-split__bar--now & {
      @include parent-hover($card) {
        animation: home-ai-time-split-morph 1.2s var(--ease-out-quint) 0.15s both;
      }
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__pct {
    font-family: var(--font-mono);
    font-size: 10px;
    white-space: nowrap;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);

    .home-ai-time-split__seg--2 & {
      color: #fff;
    }
  }

  &__legend {
    display: flex;
    flex-wrap: wrap;
    gap: 5.6px 14.4px;
    margin: 2.4px 0 0 64px;
    padding: 0;
    list-style: none;
  }

  &__key {
    display: flex;
    align-items: center;
    gap: 5.6px;
    font-family: var(--font-bricolage);
    font-size: 12px;
    color: color-mix(in oklab, var(--color-foreground) 70%, transparent);

    &::before {
      content: "";
      width: 8.8px;
      height: 8.8px;
      border-radius: 2.4px;
    }

    @each $i, $tone in $tones {
      &--#{$i}::before {
        background-color: $tone;
      }
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

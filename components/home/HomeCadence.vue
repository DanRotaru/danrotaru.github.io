<!--
  "Shipping Cadence" tile: a contribution-style heatmap (weeks x days).
  Levels are deterministic (no hydration mismatch). Hover sweeps blue across the weeks.
-->
<script setup lang="ts">
const props = defineProps<{
  weeks: number;
  /** Label bottom-left. */
  caption: string;
}>();

// Cheap deterministic hash -> activity level 0..4 (weekends quieter).
function level(week: number, day: number) {
  // Integer hash: bit-exact on server and client (Math.sin is not).
  let x = Math.imul((week * 7 + day) ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  const r = (x >>> 0) / 4294967296;
  const weekend = day >= 5;
  if (weekend) return r > 0.75 ? 1 : 0;
  if (r > 0.82) return 4;
  if (r > 0.55) return 3;
  if (r > 0.25) return 2;
  return r > 0.08 ? 1 : 0;
}

const cells = computed(() =>
  Array.from({ length: props.weeks }, (_, w) => Array.from({ length: 7 }, (_, d) => level(w, d))),
);
</script>

<template>
  <div class="home-cadence">
    <div aria-hidden="true" class="home-cadence__grid" :style="{ '--weeks': weeks }">
      <div v-for="(week, w) in cells" :key="w" class="home-cadence__week" :style="{ '--d': `${w * 28}ms` }">
        <span v-for="(lvl, d) in week" :key="d" class="home-cadence__cell" :data-level="lvl" />
      </div>
    </div>

    <div class="home-cadence__foot">
      <p class="home-cadence__caption">{{ caption }}</p>
      <div aria-hidden="true" class="home-cadence__legend">
        <span>Less</span>
        <span v-for="lvl in 5" :key="lvl" class="home-cadence__cell home-cadence__cell--legend" :data-level="lvl - 1" />
        <span>More</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";
$mix: (0: 6%, 1: 18%, 2: 32%, 3: 50%, 4: 72%);
$mix-blue: (0: 8%, 1: 30%, 2: 50%, 3: 72%, 4: 100%);

.home-cadence {
  position: absolute;
  inset: 0;

  &__grid {
    position: absolute;
    inset-inline: 20px;
    bottom: 56px;
    display: grid;
    grid-template-columns: repeat(var(--weeks), minmax(0, 1fr));
    gap: 3px;
  }

  &__week {
    display: grid;
    grid-template-rows: repeat(7, auto);
    gap: 3px;
  }

  &__cell {
    display: block;
    aspect-ratio: 1;
    border-radius: 2px;
    transition: background-color 0.3s ease-in;

    @each $lvl, $pct in $mix {
      &[data-level="#{$lvl}"] {
        background-color: color-mix(in oklab, var(--color-foreground) $pct, transparent);
      }
    }

    @each $lvl, $pct in $mix-blue {
      .home-cadence__week &[data-level="#{$lvl}"] {
        @include parent-hover($card) {
          background-color: color-mix(in oklab, $blue $pct, transparent);
          transition: background-color 0.35s ease-out var(--d);
        }
      }
    }

    &--legend {
      width: 8px;
    }
  }

  &__foot {
    position: absolute;
    inset-inline: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__caption {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: 3px;
    font-family: var(--font-bricolage);
    font-size: 9px;
    letter-spacing: 0.72px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 40%, transparent);

    > span:first-child {
      margin-right: 4px;
    }

    > span:last-child {
      margin-left: 4px;
    }
  }
}
</style>

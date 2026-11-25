<!--
  "Rest Days" tile: a battery that rest days refill, above a week strip with
  the rest day marked. Hover drains it and charges it back cell by cell while
  the percentage counts up.
-->
<script setup lang="ts">
defineProps<{
  charge: number;
  caption: string;
}>();

const week = ["M", "T", "W", "T", "F", "S", "S"];
</script>

<template>
  <div class="home-life-recharge">
    <div class="home-life-recharge__row">
      <div aria-hidden="true" class="home-life-recharge__battery">
        <span v-for="n in 5" :key="n" class="home-life-recharge__cell" :style="{ '--d': n - 1 }" />
        <svg class="home-life-recharge__bolt" viewBox="0 0 12 20">
          <path d="M7 0 L0 11 H5 L4 20 L12 8 H7 Z" />
        </svg>
      </div>
      <p class="home-life-recharge__pct">
        <HomeCountUp :to="charge" :from="20" :duration="1500" suffix="%" />
      </p>
    </div>
    <ol aria-hidden="true" class="home-life-recharge__week">
      <li
        v-for="(day, i) in week"
        :key="i"
        :class="['home-life-recharge__day', { 'home-life-recharge__day--rest': i === week.length - 1 }]"
      >
        {{ day }}
      </li>
    </ol>
    <p class="home-life-recharge__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$green: oklch(66% 0.15 150);
$card: ".home-bento-card";

@keyframes home-life-recharge-cell {
  0%,
  20% {
    opacity: 0.12;
  }
  100% {
    opacity: 1;
  }
}

.home-life-recharge {
  position: absolute;
  inset: 0;

  &__row {
    position: absolute;
    inset-inline: 20px;
    top: 116px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__battery {
    position: relative;
    display: flex;
    gap: 3px;
    width: 144px;
    height: 56px;
    padding: 5px;
    border-radius: 10px;
    box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--color-foreground) 70%, transparent);

    // Terminal nub.
    &::after {
      content: "";
      position: absolute;
      right: -6.4px;
      top: 50%;
      width: 4.8px;
      height: 20px;
      border-radius: 0 3.2px 3.2px 0;
      background-color: color-mix(in oklab, var(--color-foreground) 70%, transparent);
      translate: 0 -50%;
    }
  }

  &__cell {
    flex: 1;
    border-radius: 4.8px;
    background-color: $green;
    transition: background-color 0.3s ease;

    @include parent-hover($card) {
      background-color: $blue;
      animation: home-life-recharge-cell 0.5s ease-out calc(var(--d) * 0.25s) both;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__bolt {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16px;
    height: 25.6px;
    translate: -50% -50%;
    fill: #fff;
    stroke: color-mix(in oklab, var(--color-foreground) 50%, transparent);
    stroke-width: 0.6;
    stroke-linejoin: round;
  }

  &__pct {
    font-family: var(--font-bricolage);
    font-size: 32px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -1.28px;
    color: var(--color-foreground);
    transition: color 0.3s ease;

    @include parent-hover($card) {
      color: $blue;
    }
  }

  &__week {
    position: absolute;
    inset-inline: 20px;
    bottom: 44px;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 4px;
    max-width: 256px;
  }

  &__day {
    padding: 3.2px 0;
    border-radius: 4.8px;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--color-foreground) 12%, transparent);

    &--rest {
      color: #fff;
      background-color: $green;
      box-shadow: none;
      transition: background-color 0.3s ease;

      @include parent-hover($card) {
        background-color: $blue;
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

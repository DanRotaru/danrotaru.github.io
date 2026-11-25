<!--
  "Bike Commute" tile: two lanes, bike lane and car lane, through rush hour.
  At rest the car leads; hover scrolls the road, the bike glides past the
  queued traffic and the "minutes saved" figure lights up.
-->
<script setup lang="ts">
defineProps<{
  /** Minutes saved figure. */
  saved: string;
  bikeLabel: string;
  carLabel: string;
  /** Label bottom-left. */
  caption: string;
}>();
</script>

<template>
  <div class="home-bike-commute">
    <div aria-hidden="true" class="home-bike-commute__road">
      <!-- Bike lane -->
      <div class="home-bike-commute__lane home-bike-commute__lane--bike">
        <span class="home-bike-commute__dashes" />
        <span class="home-bike-commute__lane-label">{{ bikeLabel }}</span>
        <span class="home-bike-commute__rider">
          <svg class="home-bike-commute__bike" viewBox="0 0 48 30">
            <circle cx="10" cy="22" r="7" />
            <circle cx="38" cy="22" r="7" />
            <path d="M10 22 L18 10 L32 10 L38 22 M18 10 L24 22 L32 10 M16 7 L21 7 M30 10 L31 5 L35 5" />
            <circle class="home-bike-commute__head" cx="26" cy="2.5" r="2.5" />
            <path d="M24 22 L22 14 L27 5 L32 9" />
          </svg>
        </span>
      </div>
      <!-- Car lane -->
      <div class="home-bike-commute__lane home-bike-commute__lane--car">
        <span class="home-bike-commute__dashes" />
        <span class="home-bike-commute__lane-label">{{ carLabel }}</span>
        <span class="home-bike-commute__car home-bike-commute__car--queue" style="--x: 8%" />
        <span class="home-bike-commute__car home-bike-commute__car--queue" style="--x: 28%" />
        <span class="home-bike-commute__car home-bike-commute__car--me" style="--x: 48%" />
        <span class="home-bike-commute__car home-bike-commute__car--queue" style="--x: 68%" />
        <span class="home-bike-commute__light"><span /><span /></span>
      </div>
    </div>

    <p class="home-bike-commute__caption">
      {{ caption }}<span class="home-bike-commute__saved">{{ saved }} min</span>
    </p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$red: oklch(63.7% 0.237 25.331);
$card: ".home-bento-card";

@keyframes home-bike-commute-road {
  to {
    background-position-x: -48px;
  }
}

@keyframes home-bike-commute-pedal {
  0%,
  100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -1px;
  }
}

@keyframes home-bike-commute-idle {
  0%,
  100% {
    translate: 0 0;
  }

  50% {
    translate: 2px 0;
  }
}

.home-bike-commute {
  position: absolute;
  inset: 0;
  container-type: inline-size;

  &__road {
    position: absolute;
    inset-inline: 20px;
    top: 108px;
    bottom: 52px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__lane {
    position: relative;
    flex: 1;
    overflow: hidden;
    border-radius: 10px;
    background-color: color-mix(in oklab, var(--color-foreground) 5%, transparent);
    box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--color-foreground) 7%, transparent);

    &--bike {
      background-color: color-mix(in oklab, $blue 6%, transparent);
    }
  }

  // Centre line: dashes that scroll on hover.
  &__dashes {
    position: absolute;
    inset-inline: 0;
    bottom: 6px;
    height: 2px;
    background-image: linear-gradient(
      to right,
      color-mix(in oklab, var(--color-foreground) 22%, transparent) 0 24px,
      transparent 24px 48px
    );
    background-size: 48px 2px;

    @include parent-hover($card) {
      animation: home-bike-commute-road 0.5s linear infinite;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__lane-label {
    position: absolute;
    top: 6px;
    left: 10px;
    font-family: var(--font-bricolage);
    font-size: 9px;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 50%, transparent);
  }

  // Bike: starts behind the car, glides ahead on hover.
  &__rider {
    position: absolute;
    left: 30%;
    bottom: 10px;
    width: 48px;
    transition: left 0.5s ease-in;

    @include parent-hover($card) {
      left: calc(100% - 64px);
      transition: left 2.2s cubic-bezier(0.45, 0, 0.2, 1);
    }

    @include reduced-motion {
      transition: none !important;
    }
  }

  &__bike {
    display: block;
    width: 100%;
    overflow: visible;
    fill: none;
    stroke: var(--color-foreground);
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.3s ease-in;

    @include parent-hover($card) {
      stroke: $blue;
      animation: home-bike-commute-pedal 0.35s ease-in-out infinite;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__head {
    fill: currentColor;
    stroke: none;
    color: var(--color-foreground);

    @include parent-hover($card) {
      color: $blue;
    }
  }

  // Cars: simple rounded bodies with two wheels.
  &__car {
    position: absolute;
    left: var(--x);
    bottom: 12px;
    width: 44px;
    height: 16px;
    border-radius: 8px 12px 4px 4px;
    background-color: color-mix(in oklab, var(--color-foreground) 18%, transparent);

    &::before,
    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background-color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    }

    &::before {
      left: 6px;
    }

    &::after {
      right: 6px;
    }

    // My car (for comparison): shaped the same, slightly darker, inches forward.
    &--me {
      background-color: color-mix(in oklab, var(--color-foreground) 35%, transparent);

      @include parent-hover($card) {
        animation: home-bike-commute-idle 1.4s ease-in-out infinite;
      }
    }

    // Brake lights glow while stuck in the queue.
    &--queue,
    &--me {
      box-shadow: inset -3px 0 0 transparent;
      transition: box-shadow 0.3s ease-in;

      @include parent-hover($card) {
        box-shadow: inset 4px 0 0 color-mix(in oklab, $red 75%, transparent);
      }
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  // Traffic light at the end of the car lane, turns red on hover.
  &__light {
    position: absolute;
    right: 10px;
    top: 50%;
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 3px;
    translate: 0 -50%;
    border-radius: 999px;
    background-color: color-mix(in oklab, var(--color-foreground) 70%, transparent);

    > span {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background-color: color-mix(in oklab, #fff 25%, transparent);
      transition: background-color 0.3s ease-in;
    }

    > span:last-child {
      background-color: oklch(72.3% 0.219 149.579);
    }

    @include parent-hover($card) {
      > span:first-child {
        background-color: $red;
        box-shadow: 0 0 6px $red;
      }

      > span:last-child {
        background-color: color-mix(in oklab, #fff 25%, transparent);
      }
    }
  }

  &__caption {
    pointer-events: none;
    position: absolute;
    left: 20px;
    bottom: 20px;
    display: flex;
    gap: 8px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }

  &__saved {
    font-variant-numeric: tabular-nums;
    color: color-mix(in oklab, var(--color-foreground) 45%, transparent);
    transition: color 0.3s ease-in;

    @include parent-hover($card) {
      color: $blue;
      transition: color 0.4s ease-out 1.6s;
    }
  }
}
</style>

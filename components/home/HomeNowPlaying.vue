<!--
  "Now Playing" tile: a vinyl record half out of its sleeve, track info and
  equalizer bars. Hover slides the record out, spins it and wakes the bars.
-->
<script setup lang="ts">
defineProps<{
  track: string;
  artist: string;
  /** Label bottom-left. */
  caption: string;
}>();
</script>

<template>
  <div class="home-now-playing">
    <div aria-hidden="true" class="home-now-playing__deck">
      <div class="home-now-playing__record">
        <span class="home-now-playing__label" />
      </div>
      <div class="home-now-playing__sleeve">
        <span class="home-now-playing__sleeve-art" />
      </div>
    </div>

    <div class="home-now-playing__meta">
      <p class="home-now-playing__track">{{ track }}</p>
      <p class="home-now-playing__artist">{{ artist }}</p>
    </div>

    <div class="home-now-playing__foot">
      <p class="home-now-playing__caption">{{ caption }}</p>
      <span aria-hidden="true" class="home-now-playing__eq">
        <span v-for="i in 5" :key="i" :style="{ '--i': i }" />
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

@keyframes home-now-playing-spin {
  to {
    rotate: 360deg;
  }
}

@keyframes home-now-playing-eq {
  0%,
  100% {
    scale: 1 0.3;
  }

  50% {
    scale: 1 1;
  }
}

.home-now-playing {
  position: absolute;
  inset: 0;
  container-type: inline-size;

  &__deck {
    position: absolute;
    right: 20px;
    bottom: 56px;
    width: min(152px, 42%);
    aspect-ratio: 1;
  }

  &__sleeve {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    box-shadow:
      0 0 0 1px var(--color-border),
      0 14px 30px -18px rgb(0 0 0 / 0.35);

    @include dark {
      background-color: #18181b;
    }
  }

  // Abstract cover: soft concentric gradient that turns blue on hover.
  &__sleeve-art {
    position: absolute;
    inset: 12%;
    border-radius: 4px;
    background:
      radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--color-foreground) 14%, transparent), transparent 60%),
      repeating-radial-gradient(
        circle at 70% 75%,
        color-mix(in oklab, var(--color-foreground) 10%, transparent) 0 1px,
        transparent 1px 7px
      );
    transition: filter 0.4s ease-in;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: radial-gradient(circle at 30% 30%, rgb(59 130 246 / 0.55), rgb(168 85 247 / 0.25) 55%, transparent 80%);
      opacity: 0;
      transition: opacity 0.5s ease-in;

      @include parent-hover($card) {
        opacity: 1;
        transition: opacity 0.6s ease-out;
      }
    }
  }

  &__record {
    position: absolute;
    inset: 4%;
    border-radius: 999px;
    background:
      repeating-radial-gradient(circle, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px),
      radial-gradient(circle, #2a2a2e 0 30%, #111113 31% 100%);
    box-shadow: 0 8px 20px -10px rgb(0 0 0 / 0.5);
    translate: -24% 0;
    transition: translate 0.6s var(--ease-out-quint);

    @include parent-hover($card) {
      translate: -40% 0;
      animation: home-now-playing-spin 2.4s linear infinite;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__label {
    position: absolute;
    inset: 36%;
    border-radius: 999px;
    background: conic-gradient(from 0deg, $blue, oklch(62.7% 0.265 303.9), $blue);

    &::after {
      content: "";
      position: absolute;
      inset: 42%;
      border-radius: 999px;
      background-color: #f7f7f8;

      @include dark {
        background-color: #0f0f10;
      }
    }
  }

  &__meta {
    position: absolute;
    left: 20px;
    bottom: 56px;
    max-width: 34%;
  }

  &__track {
    font-family: var(--font-bricolage);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.32px;
    color: var(--color-foreground);
    @include truncate;
  }

  &__artist {
    font-size: 13px;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    @include truncate;
  }

  &__foot {
    position: absolute;
    inset-inline: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__caption {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }

  &__eq {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 12px;

    > span {
      width: 3px;
      height: 100%;
      border-radius: 1px;
      background-color: color-mix(in oklab, var(--color-foreground) 35%, transparent);
      transform-origin: bottom;
      scale: 1 calc(0.25 + 0.15 * var(--i));
      transition: background-color 0.3s ease-in;

      @include parent-hover($card) {
        background-color: $blue;
        animation: home-now-playing-eq calc(0.5s + 0.12s * var(--i)) ease-in-out infinite;
      }

      @include reduced-motion {
        animation: none !important;
      }
    }
  }
}
</style>

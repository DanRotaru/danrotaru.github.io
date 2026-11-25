<!--
  "Freelance Orders" tile: 100+ counted up next to a 10x10 dot grid (one dot
  per order, illustrative). Hover refills the grid dot by dot.
-->
<script setup lang="ts">
defineProps<{
  count: number;
  caption: string;
}>();
</script>

<template>
  <div class="home-exp-orders">
    <div class="home-exp-orders__counter">
      <HomeCountUp class="home-exp-orders__number" :to="count" suffix="+" :duration="1600" />
      <span class="home-exp-orders__unit">orders</span>
    </div>
    <span aria-hidden="true" class="home-exp-orders__grid">
      <span
        v-for="i in count"
        :key="i"
        class="home-exp-orders__dot"
        :style="{ '--d': `${(i - 1) * 12}ms` }"
      />
    </span>
    <p class="home-exp-orders__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

@keyframes home-exp-orders-pop {
  from {
    scale: 0.2;
    opacity: 0.2;
  }
}

.home-exp-orders {
  position: absolute;
  inset: 0;

  &__counter {
    position: absolute;
    left: 20px;
    bottom: 52px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__number {
    font-family: var(--font-bricolage);
    font-size: 52px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -2.08px;
    color: var(--color-foreground);
    transition: color 0.3s ease-in;

    @include parent-hover($card) {
      color: $blue;
    }
  }

  &__unit {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 50%, transparent);
  }

  &__grid {
    position: absolute;
    right: 20px;
    bottom: 20px;
    display: grid;
    grid-template-columns: repeat(10, 8px);
    gap: 4.8px;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background-color: color-mix(in oklab, var(--color-foreground) 28%, transparent);
    transition: background-color 0.3s ease-in;

    @include parent-hover($card) {
      background-color: $blue;
      animation: home-exp-orders-pop 0.3s var(--d) ease-out both;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__caption {
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

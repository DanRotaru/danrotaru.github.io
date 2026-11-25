<!--
  "Questions Before Code" tile: a ruled notebook page with four questions.
  Hover ticks them one by one (hand-drawn check) and underlines each in blue.
-->
<script setup lang="ts">
defineProps<{
  items: string[];
  /** Label bottom-left. */
  caption: string;
}>();
</script>

<template>
  <div class="home-questions-first">
    <div class="home-questions-first__page">
      <span aria-hidden="true" class="home-questions-first__margin" />
      <ol class="home-questions-first__list">
        <li
          v-for="(item, i) in items"
          :key="item"
          class="home-questions-first__item"
          :style="{ '--d': `${i * 180}ms` }"
        >
          <span aria-hidden="true" class="home-questions-first__box">
            <svg class="home-questions-first__tick" viewBox="0 0 16 16">
              <path d="M3 8.6 L6.4 12 L13 4.2" pathLength="1" />
            </svg>
          </span>
          <span class="home-questions-first__text">{{ item }}</span>
        </li>
      </ol>
    </div>
    <p class="home-questions-first__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

@keyframes home-questions-first-tick {
  from {
    stroke-dashoffset: 1;
  }

  to {
    stroke-dashoffset: 0;
  }
}

.home-questions-first {
  position: absolute;
  inset: 0;

  // Notebook page with ruled lines.
  &__page {
    position: absolute;
    inset-inline: 20px;
    top: 104px;
    bottom: 52px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #fff;
    background-image: repeating-linear-gradient(
      to bottom,
      transparent 0 27px,
      color-mix(in oklab, $blue 14%, transparent) 27px 28px
    );
    background-position: 0 14px;
    box-shadow:
      0 0 0 1px var(--color-border),
      0 16px 32px -22px rgb(0 0 0 / 0.35);
    transition: translate 0.45s var(--ease-out-quint);

    @include dark {
      background-color: #161618;
      background-image: repeating-linear-gradient(
        to bottom,
        transparent 0 27px,
        color-mix(in oklab, $blue 22%, transparent) 27px 28px
      );
    }

    @include parent-hover($card) {
      translate: 0 -4px;
    }
  }

  &__margin {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 44px;
    border-left: 1px solid color-mix(in oklab, oklch(63.7% 0.237 25.331) 35%, transparent);
  }

  &__list {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 14px 16px 0 14px;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 18px;
    height: 28px;
  }

  &__box {
    display: grid;
    place-items: center;
    flex: none;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-foreground) 25%, transparent);
    transition: box-shadow 0.3s ease-in;

    @include parent-hover($card) {
      box-shadow: 0 0 0 1px $blue;
      transition: box-shadow 0.3s ease-out var(--d);
    }
  }

  &__tick {
    width: 14px;
    height: 14px;
    overflow: visible;

    path {
      fill: none;
      stroke: $blue;
      stroke-width: 2.25;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;

      @include parent-hover($card) {
        animation: home-questions-first-tick 0.4s ease-out var(--d) forwards;
      }

      @include reduced-motion {
        animation: none !important;

        @include parent-hover($card) {
          stroke-dashoffset: 0;
        }
      }
    }
  }

  // Text with an underline that sweeps in.
  &__text {
    min-width: 0;
    font-family: var(--font-caveat);
    font-size: 22px;
    // Room for Caveat's tall, slanted glyphs ("?") inside the truncating box.
    line-height: 1.25;
    padding-inline-end: 4.4px;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    background-image: linear-gradient($blue, $blue);
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 0% 2px;
    transition:
      background-size 0.3s ease-in,
      color 0.3s ease-in;
    @include truncate;

    @include parent-hover($card) {
      color: var(--color-foreground);
      background-size: 100% 2px;
      transition:
        background-size 0.5s var(--ease-out-quint) calc(var(--d) + 150ms),
        color 0.3s ease-out var(--d);
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

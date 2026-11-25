<!--
  Tile of the home bento grids ("How I Work", "Workstation"...):
  illustration underneath, eyebrow + title on top, a soft gradient and an
  arrow badge that appear on hover. Child illustrations can react to
  `.home-bento-card:hover`.
-->
<script setup lang="ts">
import { NuxtLink } from "#components";

const props = withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    /** Makes the whole card a link (adds the hover arrow + press effect). */
    href?: string;
    /**
     * `fill` (default): fills its grid area, at least 288px tall.
     * `fixed`: always 288px tall.
     */
    size?: "fill" | "fixed";
  }>(),
  { href: undefined, size: "fill" },
);
</script>

<template>
  <component
    :is="props.href ? NuxtLink : 'div'"
    :to="props.href || undefined"
    :class="['home-bento-card', `home-bento-card--${size}`, { 'home-bento-card--link': href }]"
  >
    <!-- Illustration layer(s), positioned by the child components. -->
    <div class="home-bento-card__body"><slot /></div>
    <div class="home-bento-card__head">
      <p class="home-bento-card__eyebrow">{{ eyebrow }}</p>
      <p class="home-bento-card__title">{{ title }}</p>
    </div>
    <div class="home-bento-card__overlay" />
    <div v-if="href" class="home-bento-card__arrow">
      <IconArrowRight class="home-bento-card__arrow-icon" />
    </div>
  </component>
</template>

<style lang="scss">
@use "abstracts" as *;

// Bento tile (original: `group relative ... rounded-xl in-data-tray:bg-[#F7F7F8] ring-1 ring-border`).
.home-bento-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-xl);
  background-color: #f7f7f8;
  box-shadow: 0 0 0 1px var(--color-border);
  transition: all 0.3s var(--ease-default);

  @include hover {
    background-color: #fff;
  }

  @include dark {
    background-color: #0f0f10;

    @include hover {
      background-color: #131314;
    }
  }

  &--fill {
    height: 100%;
    min-height: 288px;
  }

  &--fixed {
    height: 288px;
  }

  &--link {
    cursor: pointer;

    &:active {
      --chip-shadow-3: transparent;
      --chip-shadow-4: transparent;
      scale: 0.98;
    }

    &:focus-visible {
      outline: 2px solid color-mix(in oklab, oklch(62.3% 0.214 259.815) 45%, transparent);
      outline-offset: 2px;
    }
  }

  &__body {
    width: 100%;
    height: 100%;
  }

  &__head {
    pointer-events: none;
    position: absolute;
    inset-inline: 0;
    top: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 20px;
    text-align: left;
  }

  &__eyebrow {
    font-family: var(--font-bricolage);
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: oklch(70.8% 0 0);
    transition: color 0.5s var(--ease-default);

    @include parent-hover(".home-bento-card") {
      color: color-mix(in oklab, oklch(58.5% 0.233 277.117) 80%, transparent);

      @include dark {
        color: oklch(78.5% 0.115 274.713);
      }
    }
  }

  &__title {
    font-family: var(--font-bricolage);
    font-size: 20px;
    line-height: 1.375;
    font-weight: 500;
    letter-spacing: -0.5px;
    color: oklch(37.1% 0 0);

    @include dark {
      color: oklch(87% 0 0);
    }
  }

  &__overlay {
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 10;
    border-radius: var(--radius-xl);
    background-image: linear-gradient(
      to bottom right in oklab,
      transparent,
      transparent,
      color-mix(in oklab, oklch(67.3% 0.182 276.935) 20%, transparent)
    );
    opacity: 0;
    transition: opacity 0.3s var(--ease-out-quint);

    @include parent-hover(".home-bento-card") {
      opacity: 1;
    }

    @include dark {
      background-image: linear-gradient(
        to bottom right in oklab,
        transparent,
        transparent,
        color-mix(in oklab, #fff 5%, transparent)
      );
    }
  }

  &__arrow {
    position: absolute;
    right: 16px;
    bottom: 16px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-2xl);
    border-style: dashed;
    background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.1);
    translate: 0 -8px;
    opacity: 1;
    transition: all 0.3s var(--ease-out-quint);

    @include mq-down(md) {
      border-width: 1px;
    }

    @include mq(md) {
      translate: 0 0;
      opacity: 0;
    }

    @include dark {
      background-color: color-mix(in oklab, #fff 10%, transparent);
    }

    @include mq(md) {
      @include parent-hover(".home-bento-card") {
        translate: 0 -8px;
        opacity: 1;
      }
    }
  }

  &__arrow-icon {
    width: 18px;
    height: 18px;
    color: oklch(37.1% 0 0);

    @include dark {
      color: oklch(92.2% 0 0);
    }
  }
}
</style>

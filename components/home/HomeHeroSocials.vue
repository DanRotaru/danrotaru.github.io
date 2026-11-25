<!-- Row of social icon links under the hero CTA; each slides in after the previous one. -->
<script setup lang="ts">
import type { HeroSocial } from "@/data/home";

defineProps<{ socials: HeroSocial[] }>();

const isExternal = (href: string) => !href.startsWith("mailto:");
</script>

<template>
  <ul class="home-hero-socials">
    <li v-for="(social, i) in socials" :key="social.href" class="home-hero-socials__item" :style="{ '--i': i }">
      <a
        :href="social.href"
        :aria-label="social.label"
        :data-tooltip="social.label"
        class="home-hero-socials__link"
        :target="isExternal(social.href) ? '_blank' : undefined"
        :rel="isExternal(social.href) ? 'noopener noreferrer' : undefined"
      >
        <component :is="social.icon" aria-hidden="true" class="home-hero-socials__icon" />
      </a>
    </li>
  </ul>
</template>

<style lang="scss">
@use "abstracts" as *;

$ease-out: cubic-bezier(0.5, 1, 0.89, 1);

.home-hero-socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @include mq(lg) {
    justify-content: flex-start;
  }

  &__item {
    // Slide in one by one after the title and CTA (2s, then every 0.2s).
    animation: hero-slide-in 1s $ease-out backwards;
    animation-delay: calc(2s + 0.2s * var(--i, 0));

    @include reduced-motion {
      animation: none;
    }
  }

  &__link {
    position: relative;
    display: block;
    padding: 5px;
    line-height: 0;
    color: var(--color-foreground);
    border-radius: 8px;

    @include focus-ring;

    // Label tooltip (desktop only).
    &::before {
      pointer-events: none;
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 20;
      padding: 5px 7px;
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
      color: var(--color-canvas);
      content: attr(data-tooltip);
      opacity: 0;
      border-radius: 5px;
      background-color: var(--color-foreground);
      transform: translate(-50%, 24px);
      transition:
        transform 0.2s ease,
        opacity 0.2s ease;

      @include mq-down(md) {
        display: none;
      }
    }

    @include hover {
      &::before {
        opacity: 1;
        transform: translate(-50%, 20px);
        transition-delay: 0.3s;
      }
    }
  }

  &__icon {
    width: 35px;
    height: 35px;
    opacity: 0.8;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;

    @include parent-hover(".home-hero-socials__link") {
      opacity: 1;
      transform: scale(1.1);
    }

    .home-hero-socials__link:active & {
      transform: scale(0.95);
    }
  }
}
</style>

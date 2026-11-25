<!-- "Connect" — social / feed tiles with a big tilted logo watermark. -->
<script setup lang="ts">
import CalendarBlankDuotone from "@/components/icons/CalendarBlankDuotone.vue";
import GithubLogoDuotone from "@/components/icons/GithubLogoDuotone.vue";
import LinkedinLogoDuotone from "@/components/icons/LinkedinLogoDuotone.vue";
import InstagramOutline from "@/components/icons/InstagramOutline.vue";
import TelegramLogo from "@/components/icons/TelegramLogo.vue";
import type { ConnectTile } from "@/data/links";

const ICONS = {
  github: GithubLogoDuotone,
  linkedin: LinkedinLogoDuotone,
  telegram: TelegramLogo,
  instagram: InstagramOutline,
  calendar: CalendarBlankDuotone,
} as const;

defineProps<{ tiles: ConnectTile[] }>();
</script>

<template>
  <div class="links-connect-grid" data-tray="">
    <a
      v-for="tile in tiles"
      :key="tile.href"
      class="links-connect-grid__tile"
      :href="tile.href"
      target="_blank"
      rel="noopener noreferrer"
      data-arrow-host=""
    >
      <span class="links-connect-grid__media">
        <component :is="ICONS[tile.icon]" class="links-connect-grid__icon" />
      </span>
      <span class="links-connect-grid__body">
        <span class="links-connect-grid__top">
          <span class="links-connect-grid__label">{{ tile.label }}</span>
          <LinksArrow />
        </span>
        <span class="links-connect-grid__title">{{ tile.title }}</span>
        <span class="links-connect-grid__handle">{{ tile.handle }}</span>
      </span>
    </a>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$spring: cubic-bezier(0.34, 1.4, 0.64, 1);

.links-connect-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 12px;
  @include hatch;

  @include mq(md) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @include mq(xl) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  &__tile {
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-radius: calc(var(--radius) * 1.8);
    background-color: #f7f7f8;
    box-shadow: 0 0 0 1px var(--color-border);
    transition: all 0.3s var(--ease-out-quint);

    &:last-child:nth-child(odd) {
      grid-column: span 2 / span 2;
    }

    @include mq(lg) {
      &:last-child:nth-child(odd) {
        grid-column: span 1 / span 1;
      }
    }

    @include hover {
      background-color: #fff;
    }

    &:active {
      --chip-shadow-3: transparent;
      --chip-shadow-4: transparent;
      scale: 0.98;
    }

    @include dark {
      background-color: #0f0f10;

      @media (hover: hover) {
        &:hover {
          background-color: #131314;
        }
      }
    }
  }

  &__media {
    position: relative;
    display: block;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: calc(var(--radius) + 4px);
    background-color: color-mix(in oklab, var(--color-foreground) 3%, transparent);
    box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-foreground) 5%, transparent);
    @include hatch;
  }

  &__icon {
    position: absolute;
    right: -12px;
    bottom: -20px;
    width: 112px;
    height: 112px;
    color: color-mix(in oklab, var(--color-foreground) 10%, transparent);
    transition: all 0.3s var(--ease-out-quint);

    @include parent-hover(".links-connect-grid__tile") {
      translate: 0 -4px;
      rotate: -6deg;
      color: color-mix(in oklab, $blue 25%, transparent);
      transition-duration: 0.5s;
      transition-timing-function: $spring;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px 10px 10px;
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__title {
    font-family: var(--font-serif);
    font-size: 24px;
    line-height: 1.33333;
    letter-spacing: 0.6px;
    color: var(--color-foreground);
  }

  &__handle {
    font-size: 14px;
    line-height: 1.42857;
    overflow-wrap: anywhere;
    color: var(--color-muted-foreground);
  }
}
</style>

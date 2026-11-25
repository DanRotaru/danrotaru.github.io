<!--
  "How I build things": six principle cards under the About intro. A soft
  spotlight follows the pointer across the grid (lg+, pointer devices).
-->
<script setup lang="ts">
import type { Component } from "vue";

import ChartBarDuotone from "@/components/icons/ChartBarDuotone.vue";
import CodeDuotone from "@/components/icons/CodeDuotone.vue";
import CompassDuotone from "@/components/icons/CompassDuotone.vue";
import HandshakeDuotone from "@/components/icons/HandshakeDuotone.vue";
import LightbulbDuotone from "@/components/icons/LightbulbDuotone.vue";
import ShieldCheckDuotone from "@/components/icons/ShieldCheckDuotone.vue";
import { type AboutPrinciple, aboutPrinciples } from "@/data/about";

const ICONS: Record<AboutPrinciple["icon"], Component> = {
  lightbulb: LightbulbDuotone,
  code: CodeDuotone,
  shield: ShieldCheckDuotone,
  chart: ChartBarDuotone,
  handshake: HandshakeDuotone,
  compass: CompassDuotone,
};

const { eyebrow, title, highlight, items } = aboutPrinciples;

const grid = ref<HTMLElement | null>(null);

function onPointerMove(event: PointerEvent) {
  const el = grid.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
</script>

<template>
  <AboutSection id="principles" :eyebrow="eyebrow" :title="title" :highlight="highlight">
    <ol ref="grid" class="about-principles" @pointermove="onPointerMove">
      <li v-for="(item, index) in items" :key="item.title" class="about-principles__item">
        <div class="about-principles__top">
          <span class="about-principles__icon">
            <component :is="ICONS[item.icon]" aria-hidden="true" />
          </span>
          <span aria-hidden="true" class="about-principles__index">{{ String(index + 1).padStart(2, "0") }}</span>
        </div>
        <h3 class="about-principles__title">{{ item.title }}</h3>
        <p class="about-principles__text">{{ item.text }}</p>
      </li>
    </ol>
  </AboutSection>
</template>

<style lang="scss">
@use "abstracts" as *;

.about-principles {
  --mx: -100vw;
  --my: -100vh;
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  @include mq(md) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include mq(lg) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  // Pointer spotlight shared by the whole grid.
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0;
    background: radial-gradient(
      448px circle at var(--mx) var(--my),
      color-mix(in oklab, oklch(62.3% 0.214 259.815) 14%, transparent),
      transparent 60%
    );
    transition: opacity 0.4s var(--ease-default);
  }

  @media (hover: hover) {
    &:hover::before {
      opacity: 1;
    }
  }

  &__item {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 32px 20px;
    border-bottom: 1px solid var(--color-border);

    @include mq(md) {
      padding: 40px;

      &:nth-child(odd) {
        border-right: 1px solid var(--color-border);
      }

      &:nth-last-child(-n + 2) {
        border-bottom: 0;
      }
    }

    @include mq(lg) {
      &:nth-child(odd) {
        border-right: 0;
      }

      &:not(:nth-child(3n)) {
        border-right: 1px solid var(--color-border);
      }

      &:nth-last-child(-n + 3) {
        border-bottom: 0;
      }
    }

    &:last-child {
      border-bottom: 0;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background-color: var(--color-card);
    font-size: 22px;
    color: oklch(62.3% 0.214 259.815);
    transition:
      rotate 0.5s cubic-bezier(0.34, 1.4, 0.64, 1),
      scale 0.5s cubic-bezier(0.34, 1.4, 0.64, 1);

    svg {
      width: 22px;
      height: 22px;
    }

    @include parent-hover(".about-principles__item") {
      rotate: -8deg;
      scale: 1.08;
    }
  }

  &__index {
    font-family: var(--font-instrument-serif);
    font-size: 32px;
    line-height: 1;
    color: color-mix(in oklab, var(--color-foreground) 14%, transparent);
    transition: color 0.3s var(--ease-default);

    @include parent-hover(".about-principles__item") {
      color: color-mix(in oklab, var(--color-foreground) 35%, transparent);
    }
  }

  &__title {
    @include heading-serif(26px);
    font-size: 26px;
    line-height: 1.15;
    color: var(--color-foreground);
  }

  &__text {
    font-size: 15px;
    line-height: 1.65;
    color: var(--color-muted-foreground);
  }
}
</style>

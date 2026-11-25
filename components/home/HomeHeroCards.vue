<!-- Row of 4 quick-link cards under the hero (Featured projects / Connect / Writing / Reach out). -->
<script setup lang="ts">
import type { HeroNavCard } from "@/data/home";

defineProps<{ cards: HeroNavCard[] }>();
</script>

<template>
  <div class="home-hero-cards">
    <div
      v-for="card in cards"
      :key="card.label"
      :class="[
        'home-hero-cards__cell',
        { 'home-hero-cards__cell--desktop': card.desktopOnly, 'home-hero-cards__cell--cta': card.cta },
      ]"
    >
      <!-- Card with its own links: a plain box (links can't nest in a link). -->
      <div v-if="card.links" class="home-hero-cards__body">
        <div class="home-hero-cards__inner home-hero-cards__inner--static">
          <div class="home-hero-cards__head">
            <span aria-hidden="true" :class="['home-hero-cards__dot', `home-hero-cards__dot--${card.dot}`]" />
            <NuxtLink :to="card.href" class="home-hero-cards__label home-hero-cards__label-link">{{ card.label }}</NuxtLink>
          </div>
          <ul class="home-hero-cards__list">
            <li v-for="link in card.links" :key="link.href">
              <NuxtLink :to="link.href" class="home-hero-cards__item">
                <span class="home-hero-cards__item-text">{{ link.label }}</span>
                <IconArrowUpRightSmall aria-hidden="true" class="home-hero-cards__item-icon" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <NuxtLink v-else :to="card.href" class="home-hero-cards__link pill-cta-host">
        <div class="home-hero-cards__body">
          <div :class="['home-hero-cards__inner', { 'home-hero-cards__inner--cta': card.cta }]">
            <div :class="['home-hero-cards__head', { 'home-hero-cards__head--cta': card.cta }]">
              <span aria-hidden="true" :class="['home-hero-cards__dot', `home-hero-cards__dot--${card.dot}`]" />
              <span class="home-hero-cards__label">{{ card.label }}</span>
              <span v-if="!card.cta" aria-hidden="true" class="home-hero-cards__arrow">
                <IconArrowRight class="home-hero-cards__arrow-icon home-hero-cards__arrow-icon--out" />
                <IconArrowRight class="home-hero-cards__arrow-icon home-hero-cards__arrow-icon--in" />
              </span>
            </div>
            <div v-if="card.cta" class="home-hero-cards__cta-wrap">
              <PillCta stretch>{{ card.cta }}</PillCta>
            </div>
            <template v-else>
              <p class="home-hero-cards__title">{{ card.title }}</p>
              <div class="home-hero-cards__meta">{{ card.meta }}</div>
            </template>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$bounce: cubic-bezier(0.34, 1.4, 0.64, 1);

.home-hero-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-inline: -12px;
  border-top: 1px solid var(--color-border);

  @include mq(md) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-inline: -16px;
  }

  @include mq(lg) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__cell {
    position: relative;
    border-bottom: 1px solid var(--color-border);

    @include mq(md) {
      border-bottom-width: 0;
      border-right: 1px solid var(--color-border);
    }

    &:first-child {
      border-right: 1px solid var(--color-border);
    }

    &--desktop {
      display: none;

      @include mq(lg) {
        display: block;
      }
    }

    &--cta {
      grid-column: span 2 / span 2;
      border: 0;

      @include mq(md) {
        grid-column: span 1 / span 1;
        border: 0;
      }
    }
  }

  &__link {
    display: block;
    height: 100%;
  }

  &__body {
    position: relative;
    height: 100%;
    padding: 16px;
    transition: background-color 0.15s var(--ease-default);

    @include mq(lg) {
      padding: 20px;
    }

    @include parent-hover(".home-hero-cards__link") {
      background-color: color-mix(
        in oklab,
        var(--color-foreground) 2%,
        transparent
      );
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);

    @include parent-hover(".home-hero-cards__link") {
      translate: 0 -2px;
    }

    &--cta {
      align-items: center;

      @include mq(md) {
        align-items: stretch;
      }
    }
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;

    &--cta {
      display: none;

      @include mq(md) {
        display: flex;
      }
    }
  }

  &__dot {
    display: inline-block;
    flex-shrink: 0;
    width: 10px;
    height: 10px;

    &--emerald {
      background-color: oklch(69.6% 0.17 162.48);
    }

    &--orange {
      background-color: oklch(70.5% 0.213 47.604);
    }

    &--sky {
      background-color: oklch(68.5% 0.169 237.323);
    }

    &--rose {
      background-color: oklch(64.5% 0.246 16.439);
    }
  }

  &__label {
    font-family: var(--font-bricolage);
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
  }

  &__arrow {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-left: auto;
    overflow: hidden;
    color: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    transition: color 0.3s var(--ease-default);

    @include parent-hover(".home-hero-cards__link") {
      color: var(--color-foreground);
    }
  }

  &__arrow-icon {
    width: 16px;
    height: 16px;

    &--out {
      @include parent-hover(".home-hero-cards__link") {
        translate: 20px 0;
        transition: all 0.5s $bounce;
      }
    }

    &--in {
      position: absolute;
      inset: 0;
      translate: -20px 0;

      @include parent-hover(".home-hero-cards__link") {
        translate: 0 0;
        transition: all 0.5s $bounce;
      }
    }
  }

  &__title {
    margin-top: 16px;
    font-size: 16px;
    line-height: 1.25;
    font-weight: 500;
    color: var(--color-foreground);

    @include mq(lg) {
      font-size: 17px;
    }
  }

  &__meta {
    margin-top: auto;
    padding-top: 12px;
    font-size: 14px;
    line-height: 1.625;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
  }

  &__label-link {
    transition: color 0.2s var(--ease-default);

    @include hover {
      color: var(--color-foreground);
    }
  }

  // "Featured projects": project chips, several per row.
  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 16px;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 8px 3px 10px;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--color-foreground);
    transition:
      background-color 0.2s var(--ease-default),
      border-color 0.2s var(--ease-default);
    @include focus-ring;

    @include hover {
      border-color: color-mix(in oklab, var(--color-foreground) 30%, transparent);
      background-color: color-mix(in oklab, var(--color-foreground) 5%, transparent);
    }
  }

  &__item-text {
    white-space: nowrap;
  }

  &__item-icon {
    flex: none;
    width: 12px;
    height: 12px;
    color: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    transition:
      color 0.2s var(--ease-default),
      translate 0.3s $bounce;

    @include parent-hover(".home-hero-cards__item") {
      color: var(--color-foreground);
      translate: 1px -1px;
    }
  }

  // "Start a conversation" pill (see shared/pill-cta).
  &__cta-wrap {
    margin-top: auto;
    padding-block: 32px;

    @include mq(md) {
      padding-top: 12px;
      padding-bottom: 0;
    }
  }
}
</style>

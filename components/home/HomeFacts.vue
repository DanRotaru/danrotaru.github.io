<!--
  "Know about me" section: same frame, hatch and
  heading style as the about section, but mirrored: an interactive deck of
  fun-fact cards on the left, copy + social links on the right.
-->
<script setup lang="ts">
import type { Component } from "vue";

import GithubLogoDuotone from "@/components/icons/GithubLogoDuotone.vue";
import InstagramOutline from "@/components/icons/InstagramOutline.vue";
import LinkedinLogoDuotone from "@/components/icons/LinkedinLogoDuotone.vue";
import { type HomeFactsLink, homeFacts } from "@/data/home";

const ICONS: Record<HomeFactsLink["icon"], Component> = {
  linkedin: LinkedinLogoDuotone,
  github: GithubLogoDuotone,
  instagram: InstagramOutline,
};

const { eyebrow, title, highlight, paragraphs, links, more, deck } = homeFacts;
</script>

<template>
  <section id="facts" class="home-facts">
    <div class="container home-facts__container">
      <div class="home-facts__frame">
        <div class="home-facts__stage">
          <div class="home-facts__deck">
            <HomeFactDeck
              :cards="deck.cards"
              :draw-hint="deck.drawHint"
              :draw-label="deck.drawLabel"
              :counter-label="deck.counterLabel"
            />
          </div>
          <div class="home-facts__content">
            <PageTitle as="h2" align="left" :eyebrow="eyebrow" class="home-facts__title">
              <template #title>{{ title }}</template>
              <template #highlight>{{ highlight }}</template>
            </PageTitle>
            <div class="home-facts__copy">
              <p v-for="text in paragraphs" :key="text">{{ text }}</p>
            </div>
            <ul class="home-facts__quick">
              <li v-for="link in links" :key="link.label">
                <a class="home-facts__quick-item" :href="link.href" target="_blank" rel="noopener noreferrer">
                  <component :is="ICONS[link.icon]" aria-hidden="true" class="home-facts__quick-icon" />
                  <span class="home-facts__quick-text">
                    <span class="home-facts__quick-label">{{ link.label }}</span>
                    <span class="home-facts__quick-handle">{{ link.handle }}</span>
                  </span>
                </a>
              </li>
            </ul>
            <HomeArrowLink :href="more.href" class="home-facts__more">{{ more.label }}</HomeArrowLink>
          </div>
        </div>
        <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.home-facts {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__frame {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__stage {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 48px;
    padding-inline: 8px;
    padding-block: var(--header-height, 64px);
    overflow-x: clip;
    @include hatch;

    @include mq(lg) {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      align-items: center;
      gap: 32px;
      padding-inline: 32px;
    }
  }

  &__deck {
    display: grid;
    place-content: center;
    width: 100%;
  }

  &__content {
    width: 100%;
  }

  &__title {
    margin-bottom: 32px !important;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    max-width: 520px;
    margin-inline: auto;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 300;
    letter-spacing: 0.8px;
    text-align: center;
    color: rgb(13 13 15 / 0.8);

    @include mq(lg) {
      letter-spacing: 0.9px;
      margin-inline: 0;
      font-size: 18px;
      line-height: 1.55556;
      text-align: left;
    }

    @include dark {
      color: oklch(87% 0 0);
    }
  }

  // Quick facts: a 2x2 grid of small label/value pairs.
  &__quick {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1px;
    max-width: 520px;
    margin: 32px auto 0;
    padding: 0;
    list-style: none;

    @include mq(sm) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    overflow: hidden;
    border-radius: var(--radius-xl);
    background-color: var(--color-border);
    box-shadow: 0 0 0 1px var(--color-border);

    @include mq(lg) {
      margin-inline: 0;
    }
  }

  &__quick-item {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    padding: 12px 16px;
    background-color: #f7f7f8;
    transition: background-color 0.3s var(--ease-default);

    @include hover {
      background-color: #fff;
    }

    @include dark {
      background-color: #0f0f10;

      @include hover {
        background-color: #131314;
      }
    }
  }

  &__quick-icon {
    flex: none;
    width: 20px;
    height: 20px;
    color: oklch(70.8% 0 0);
    transition: color 0.3s var(--ease-default);

    .home-facts__quick-item:hover & {
      color: var(--color-foreground);
    }
  }

  &__quick-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__quick-label {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: oklch(70.8% 0 0);
  }

  &__quick-handle {
    font-family: var(--font-bricolage);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.3px;
    color: var(--color-foreground);
    @include truncate;
  }

  &__more {
    margin-top: 32px;
    margin-inline: auto;

    @include mq(lg) {
      justify-content: flex-start;
      margin-inline: 0;
    }
  }
}
</style>

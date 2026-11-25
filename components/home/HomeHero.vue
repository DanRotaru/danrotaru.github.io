<!-- Home hero: word-by-word headline, avatar, CTA, socials and quick-link cards. -->
<script setup lang="ts">
import { homeHero } from "@/data/home";

const { headline, avatar, cta, socials } = homeHero;
</script>

<template>
  <section id="hero-section" aria-label="Introduction" class="home-hero">
    <div aria-hidden="true" class="home-hero__glow">
      <div class="home-hero__blob home-hero__blob--left" />
      <div class="home-hero__blob home-hero__blob--right" />
    </div>
    <RailsOverlay nodes="bottom" class="home-hero__rails" />

    <div class="container home-hero__container">
      <div class="home-hero__content">
        <div class="home-hero__grid">
          <div class="home-hero__intro">
            <h1 class="home-hero__title">
              <span class="visually-hidden">{{ homeHero.srTitle }}</span>
              <span aria-hidden="true" class="home-hero__title-words"><template v-for="(word, i) in headline" :key="i">{{ i > 0 ? " " : "" }}<span class="home-hero__word" :style="{ '--i': i }"><span
                    :class="{
                      'home-hero__name-text': word.tone === 'name',
                      'home-hero__highlight': word.tone === 'highlight',
                    }"
                  >{{ word.text }}</span>{{ word.after }}</span></template></span>
            </h1>

            <div class="home-hero__actions">
              <div class="home-hero__cta">
                <PillCta :href="cta.href" size="lg">{{ cta.label }}</PillCta>
              </div>
              <HomeHeroSocials :socials="socials" />
            </div>
          </div>

          <div class="home-hero__avatar">
            <img
              :src="avatar.src"
              :alt="avatar.alt"
              width="500"
              height="500"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              class="home-hero__avatar-img"
            />
          </div>
        </div>

        <HomeHeroCards :cards="homeHero.navCards" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.home-hero {
  position: relative;
  isolation: isolate;
  contain: layout;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: min(100svh, 896px);
  padding-top: 80px;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);

  @include mq(md) {
    padding-top: 72px;
  }

  @include mq(lg) {
    overflow: visible;
  }

  // Soft blurred blobs behind everything.
  &__glow {
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }

  &__blob {
    position: absolute;
    border-radius: 9999px;
    background-color: color-mix(in oklab, oklch(70.8% 0 0) 10%, transparent);
    filter: blur(64px);

    &--left {
      top: 12%;
      left: -18%;
      width: min(42vw, 420px);
      height: min(42vw, 420px);

      @include dark {
        background-color: color-mix(in oklab, oklch(92.2% 0 0) 4%, transparent);
      }
    }

    &--right {
      right: -12%;
      bottom: 18%;
      width: min(36vw, 360px);
      height: min(36vw, 360px);

      @include dark {
        background-color: color-mix(in oklab, oklch(92.2% 0 0) 5%, transparent);
      }
    }
  }

  &__rails {
    z-index: 10;
  }

  &__container {
    position: relative;
    z-index: 10;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-inline: 12px;

    @include mq(md) {
      padding-inline: 16px;
    }
  }

  &__grid {
    display: grid;
    flex: 1;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    align-content: center;
    align-items: flex-start;
    row-gap: 24px;
    padding-block: 24px 40px;

    @include mq(md) {
      padding-inline: 32px;
    }

    @include mq(lg) {
      grid-template-columns: minmax(0, 1fr) auto;
      column-gap: 48px;
      padding-block: 40px 64px;
      padding-inline: 80px;
    }
  }

  &__intro {
    text-align: center;

    @include mq(lg) {
      grid-column: 1;
      grid-row-start: 1;
      text-align: left;
    }
  }

  // Intro timeline (from the previous dan13.me site): words fade in 0.1s apart while the whole
  // title settles from 94% scale, then the avatar (0.6s), the CTA (1.3s) and the socials (2s+).
  &__title {
    font-family: var(--font-instrument-serif);
    --title-size: clamp(36px, 9vw, 56px);
    font-size: var(--title-size);
    line-height: 1.04;
    letter-spacing: calc(var(--title-size) * -0.025);
    text-wrap: balance;
    color: var(--color-foreground);
    animation: hero-title-settle 1.6s cubic-bezier(0.5, 1, 0.89, 1) backwards;

    @include mq(lg) {
      --title-size: clamp(44.8px, 5vw, 88px);
      line-height: 1.06;
      transform-origin: left center;
    }

    @include reduced-motion {
      animation: none;
    }
  }

  &__word {
    // Keep each word whole: never break "full-stack" at its hyphen.
    white-space: nowrap;
    animation: hero-word-in 0.5s cubic-bezier(0.11, 0, 0.5, 0) backwards;
    animation-delay: calc(0.1s * (var(--i, 0) + 1));

    @include reduced-motion {
      animation: none;
    }
  }

  &__highlight {
    padding-right: calc(var(--title-size) * 0.12);
    padding-bottom: calc(var(--title-size) * 0.08);
    font-style: italic;
    color: transparent;
    background-image: linear-gradient(
      100deg,
      #04f,
      #3b6cff 40%,
      #8b4dff 68%,
      #e83dcf 86%,
      #ff7a1a
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    animation: gradient-x 6s infinite;

    @include reduced-motion {
      animation-duration: 0s !important;
      animation-play-state: paused !important;
    }
  }

  &__name-text {
    color: transparent;
    background-image: linear-gradient(
      to bottom in oklab,
      oklch(55.2% 0.016 285.938),
      oklch(44.2% 0.017 285.786),
      oklch(21% 0.006 285.885)
    );
    -webkit-background-clip: text;
    background-clip: text;

    @include dark {
      background-image: linear-gradient(
        to bottom in oklab,
        oklch(37% 0.013 285.805),
        oklch(92% 0.004 286.32),
        oklch(98.5% 0 0)
      );
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    margin-top: 32px;

    @include mq(lg) {
      align-items: flex-start;
      gap: 40px;
      margin-top: 40px;
    }
  }

  &__cta {
    animation: hero-drop-in 1s cubic-bezier(0.5, 1, 0.89, 1) 1.3s backwards;

    @include reduced-motion {
      animation: none;
    }
  }

  &__avatar {
    order: -1;
    justify-self: center;
    width: 160px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 9999px;
    animation: hero-avatar-pop 1.5s cubic-bezier(0.5, 1, 0.89, 1) backwards;

    @include mq(lg) {
      order: 0;
      grid-column: 2;
      grid-row-start: 1;
      justify-self: end;
      width: 250px;
      animation-name: hero-avatar-in;
      animation-delay: 0.6s;
    }

    @include reduced-motion {
      animation: none;
    }
  }

  &__avatar-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

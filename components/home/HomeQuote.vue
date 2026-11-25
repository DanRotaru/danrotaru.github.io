<!-- Closing quote band at the bottom of the home page (no call to action). -->
<script setup lang="ts">
import { homeQuote } from "@/data/home";
</script>

<template>
  <SectionDivider />
  <section aria-label="Quote" class="home-quote">
    <div class="home-quote__container container">
      <div class="home-quote__frame">
        <div aria-hidden="true" class="home-quote__hatch" />
        <div aria-hidden="true" class="home-quote__glow" />
        <figure class="home-quote__figure">
          <span aria-hidden="true" class="home-quote__mark">“</span>
          <blockquote class="home-quote__text">
            <p>
              {{ homeQuote.before }}<em class="home-quote__highlight">{{ homeQuote.highlight }}</em
              >{{ homeQuote.after }}
            </p>
          </blockquote>
          <figcaption class="home-quote__author">
            <span aria-hidden="true" class="home-quote__rule" />
            {{ homeQuote.author }}
          </figcaption>
        </figure>
        <span aria-hidden="true" class="rail-node rail-node--top-left" />
        <span aria-hidden="true" class="rail-node rail-node--top-right" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.home-quote {
  position: relative;
  z-index: 0;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &__frame {
    position: relative;
    overflow: hidden;
    border-inline: 1px solid var(--color-border);
  }

  &__hatch {
    position: absolute;
    inset: 0;
    z-index: -10;
    @include hatch;
  }

  &__glow {
    position: absolute;
    inset: 0;
    z-index: -10;
    pointer-events: none;
    background-image: radial-gradient(
      ellipse 45% 60% at center,
      color-mix(in oklab, var(--color-background) 70%, transparent) 45%,
      transparent
    );
  }

  &__figure {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 832px;
    margin-inline: auto;
    padding: 96px 24px 88px;
    text-align: center;

    @include mq(lg) {
      padding-block: 128px 112px;
    }
  }

  &__mark {
    height: 56px;
    margin-bottom: 8px;
    font-family: var(--font-instrument-serif);
    font-size: 112px;
    line-height: 1;
    color: color-mix(in oklab, var(--color-foreground) 18%, transparent);
    user-select: none;

    @include mq(lg) {
      height: 72px;
      font-size: 144px;
    }
  }

  &__text {
    @include heading-serif(32px);
    font-size: 32px;
    line-height: 1.15;
    text-wrap: balance;
    color: var(--color-foreground);

    @include mq(sm) {
      font-size: 44px;
      letter-spacing: 1.1px;
    }

    @include mq(lg) {
      font-size: 56px;
      letter-spacing: 1.4px;
      line-height: 1.08;
    }
  }

  &__highlight {
    padding-right: 2.56px;

    @include mq(sm) {
      padding-right: 3.52px;
    }

    @include mq(lg) {
      padding-right: 4.48px;
    }

    font-style: italic;
    color: transparent;
    background-image: linear-gradient(100deg, #04f, #3b6cff 40%, #8b4dff 68%, #e83dcf 86%, #ff7a1a);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    animation: gradient-x 6s infinite;

    @include reduced-motion {
      animation: none;
    }
  }

  &__author {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
    font-family: var(--font-bricolage);
    font-size: 12px;
    letter-spacing: 1.44px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__rule {
    width: 32px;
    height: 1px;
    background-color: currentColor;
  }
}
</style>

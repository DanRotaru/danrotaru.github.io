<!--
  /projects header: crumpled paper with a construction sketch, drawn inside
  the page rails (unlike the full-bleed PageHero), and the serif page title.
-->
<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  highlight: string;
}>();
</script>

<template>
  <div class="projects-hero">
    <div aria-hidden="true" class="projects-hero__backdrop">
      <div class="projects-hero__backdrop-inner">
        <div class="projects-hero__paper">
          <ProjectsHeroSketch class="projects-hero__sketch" />
          <img
            class="projects-hero__texture"
            src="/static/images/crumpled-paper.avif"
            alt="crumpled paper texture"
            loading="lazy"
            decoding="async"
            style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
          />
        </div>
      </div>
    </div>
    <PageTitle :eyebrow="eyebrow" :title="title" :highlight="highlight" flush />
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.projects-hero {
  position: relative;
  z-index: 0;
  padding: 144px 20px 40px;

  @include mq(md) {
    padding-inline: 40px;
  }

  &__backdrop {
    pointer-events: none;
    position: absolute;
    top: 0;
    inset-inline: 0;
    z-index: -1;
    height: 450px;

    // Pin to the viewport and slide up with scroll where supported.
    @supports (animation-timeline: scroll()) {
      position: fixed !important;
      animation: pin-top-scroll linear both;
      animation-timeline: scroll();
      animation-range: 0 560px;
    }
  }

  &__backdrop-inner {
    height: 100%;

    @supports (animation-timeline: scroll()) {
      width: 100%;
      max-width: calc(var(--container-max) + var(--container-padding) * 2);
      margin-inline: auto;
      padding-inline: var(--container-padding);
    }
  }

  &__paper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: oklch(97% 0 0);
    opacity: 0.5;
    mask-image: linear-gradient(#000 40%, transparent 100%);

    @include dark {
      background-color: oklch(14.5% 0 0);
    }
  }

  &__sketch {
    position: absolute;
    top: 0;
    inset-inline: 0;
    z-index: -1;
    opacity: 0.4;

    @include mq(md) {
      width: 100%;
    }
  }

  // Hand-drawn strokes of the sketch (the rest use a fixed grey).
  &__ink {
    stroke: oklab(15.9988% 0.00114696 -0.00402176 / 0.8);

    @include dark {
      stroke: color-mix(in oklab, #fff 50%, transparent);
    }
  }

  &__texture {
    pointer-events: none;
    user-select: none;
    z-index: -1;
    object-fit: cover;
    mix-blend-mode: overlay;
  }

  // Original: `mb-0!` (beats PageTitle's own bottom margin).
}
</style>

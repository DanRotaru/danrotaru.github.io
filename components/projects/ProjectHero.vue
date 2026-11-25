<!-- Case-study header: photo / glyph backdrop, breadcrumb, title, description and the Copy menu. -->
<script setup lang="ts">
import type { Project } from "@/data/case-studies";

defineProps<{ project: Project }>();
</script>

<template>
  <section class="project-hero">
    <RailsOverlay nodes="bottom" />
    <div class="container">
      <div class="project-hero__inner">
        <div aria-hidden="true" class="project-hero__backdrop">
          <div class="project-hero__backdrop-inner">
            <div class="project-hero__paper">
              <img
                class="project-hero__photo"
                :src="project.caseStudy.heroImage"
                alt=""
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
              />
              <img
                class="project-hero__glyph"
                :src="project.caseStudy.heroGlyph"
                alt=""
                loading="lazy"
                decoding="async"
                style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
              />
            </div>
          </div>
        </div>

        <header class="project-hero__header">
          <nav aria-label="Breadcrumb">
            <ol class="project-hero__crumbs">
              <li class="project-hero__crumb">
                <NuxtLink to="/" class="project-hero__crumb-link">
                  <IconHouseDuotone class="project-hero__home-icon" />
                  <span class="visually-hidden">Home</span>
                </NuxtLink>
              </li>
              <li class="project-hero__crumb">
                <span aria-hidden="true">/</span>
                <NuxtLink to="/projects" class="project-hero__crumb-link">Projects</NuxtLink>
              </li>
              <li class="project-hero__crumb">
                <span aria-hidden="true">/</span>
                <span class="project-hero__crumb-current" aria-current="page">{{ project.title }}</span>
              </li>
            </ol>
          </nav>

          <h1 class="project-hero__title">{{ project.title }}</h1>

          <div class="project-hero__row">
            <p class="project-hero__description">{{ project.description }}</p>
            <CopyPageMenu :path="`/projects/${project.slug}`" />
          </div>
        </header>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.project-hero {
  position: relative;
  isolation: isolate;
  border-bottom: 1px solid var(--color-border);

  &__inner {
    position: relative;
  }

  &__backdrop {
    pointer-events: none;
    position: absolute;
    top: 0;
    inset-inline: 0;
    z-index: -1;

    // Pin to the viewport and slide up with scroll where supported.
    @supports (animation-timeline: scroll()) {
      position: fixed !important;
      animation: pin-top-scroll linear both;
      animation-timeline: scroll();
      animation-range: 0 560px;
    }
  }

  &__backdrop-inner {
    @supports (animation-timeline: scroll()) {
      width: 100%;
      max-width: calc(var(--container-max) + var(--container-padding) * 2);
      margin-inline: auto;
      padding-inline: var(--container-padding);
    }
  }

  &__paper {
    position: relative;
    z-index: -1;
    width: 100%;
    height: 320px;
    overflow: hidden;
    mask-image: linear-gradient(#000 40%, transparent 100%);

    @include dark {
      background-color: color-mix(in oklab, oklch(14.5% 0 0) 55%, transparent);
    }
  }

  &__photo,
  &__glyph {
    pointer-events: none;
    user-select: none;
    object-fit: cover;
    mask-image: radial-gradient(40% 45% at 12% 85%, #00000059 25%, #000 100%);
  }

  // Photo in light theme, glyph pattern in dark theme.
  &__photo {
    opacity: 0.25;
    filter: saturate(0.85);

    @include dark {
      display: none;
    }
  }

  &__glyph {
    display: none;

    @include dark {
      display: block;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    margin-right: auto;
    padding: 224px 16px 40px;

    @include mq(md) {
      padding-inline: 24px;
    }
  }

  &__crumbs {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 1.33333;
    color: oklch(55.6% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__crumb {
    display: contents;
  }

  &__crumb-link {
    transition: color var(--duration-default) var(--ease-default);

    @include hover {
      color: oklch(43.9% 0 0);

      @include dark {
        color: oklch(87% 0 0);
      }
    }
  }

  &__home-icon {
    width: 14px;
    height: 14px;
  }

  &__crumb-current {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(87% 0 0);
    }
  }

  &__title {
    font-family: var(--font-instrument-serif);
    font-size: 36px;
    line-height: 1.25;
    letter-spacing: 0.9px;

    @include mq(md) {
      letter-spacing: 1.2px;
      font-size: 48px;
    }
  }

  &__row {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;

    @include mq(sm) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__description {
    align-self: flex-start;
    max-width: 672px;
    font-size: 16px;
    line-height: 1.5;
    color: oklch(43.9% 0 0);

    @include mq(md) {
      font-size: 18px;
      line-height: 1.55556;
    }

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }
}
</style>

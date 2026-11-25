<!-- "Up next" link to the following case study, with its screenshot peeking up from the bottom. -->
<script setup lang="ts">
import type { Project } from "@/data/case-studies";

defineProps<{
  project: Project;
  /** 1-based position of `project` in the list. */
  position: number;
  total: number;
}>();

const pad = (value: number) => String(value).padStart(2, "0");
</script>

<template>
  <section class="project-next">
    <div class="container project-next__container">
      <div class="project-next__rails">
        <NuxtLink :to="`/projects/${project.slug}`" class="project-next__link">
          <div class="project-next__text">
            <p class="project-next__eyebrow">
              Up next<span class="project-next__dot">·</span>
              <span class="project-next__count">{{ pad(position) }} / {{ pad(total) }}</span>
            </p>
            <h3 class="project-next__title">{{ project.title }}</h3>
            <p class="project-next__tagline">{{ project.tagline }}</p>
            <div class="project-next__category">
              {{ project.category }}<span aria-hidden="true" class="project-next__arrows">
                <IconArrowRight class="project-next__arrow project-next__arrow--out" />
                <IconArrowRight class="project-next__arrow project-next__arrow--in" />
              </span>
            </div>
          </div>
          <div class="project-next__media">
            <div class="project-next__bezel">
              <div class="project-next__screen">
                <img
                  class="project-next__image"
                  :src="project.caseStudy.cover.src"
                  :alt="project.caseStudy.cover.alt"
                  loading="lazy"
                  decoding="async"
                  style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
                />
              </div>
            </div>
          </div>
        </NuxtLink>

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

$bounce: cubic-bezier(0.34, 1.4, 0.64, 1);

.project-next {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__rails {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__link {
    position: relative;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    align-items: center;
    gap: 40px;
    padding: 64px 16px 0;
    overflow: hidden;
    outline: none;

    @include mq(md) {
      padding-inline: 24px;
    }

    @include mq(lg) {
      grid-template-columns: 1fr 1.15fr;
      gap: 64px;
      padding-top: 80px;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    @include mq(lg) {
      padding-bottom: 80px;
    }
  }

  &__eyebrow {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__dot {
    margin-inline: 8px;
    opacity: 0.4;
  }

  &__count {
    font-variant-numeric: tabular-nums;
  }

  &__title {
    font-family: var(--font-instrument-serif);
    font-size: 48px;
    line-height: 0.95;
    text-wrap: balance;
    color: var(--color-foreground);

    @include mq(md) {
      font-size: 72px;
    }
  }

  &__tagline {
    max-width: 40ch;
    font-size: 16px;
    line-height: 1.5;
    text-wrap: balance;
    color: var(--color-muted-foreground);

    @include mq(md) {
      font-size: 18px;
      line-height: 1.55556;
    }
  }

  &__category {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
    font-family: var(--font-bricolage);
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    transition: color var(--duration-default) var(--ease-default);

    @include parent-hover(".project-next__link") {
      color: var(--color-foreground);
    }
  }

  // Arrow that slides out to the right while a second one slides in from the left.
  &__arrows {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    overflow: hidden;
  }

  &__arrow {
    width: 16px;
    height: 16px;

    &--in {
      position: absolute;
      opacity: 0;
      translate: -20px 0;
    }

    @include parent-hover(".project-next__link") {
      transition: all 0.5s $bounce;

      &--out {
        opacity: 0;
        translate: 20px 0;
      }

      &--in {
        opacity: 1;
        translate: 0 0;
      }
    }

    .project-next__link:focus-visible & {
      transition: all 0.5s var(--ease-default);

      &--out {
        opacity: 0;
        translate: 20px 0;
      }

      &--in {
        opacity: 1;
        translate: 0 0;
      }
    }
  }

  &__media {
    position: relative;
    align-self: flex-end;
  }

  &__bezel {
    padding: 6px 6px 0;
    background-color: color-mix(in oklab, var(--color-foreground) 4%, transparent);
    border-top-left-radius: calc(var(--radius) * 1.8);
    border-top-right-radius: calc(var(--radius) * 1.8);
    box-shadow: 0 0 0 1px var(--color-border);
    translate: 0 12%;
    transition: all 0.7s var(--ease-out-expo);

    @include parent-hover(".project-next__link") {
      translate: 0 4%;
    }

    .project-next__link:focus-visible & {
      translate: 0 4%;
    }
  }

  &__screen {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: oklch(92.2% 0 0);
    border-top-left-radius: calc(var(--radius) + 4px);
    border-top-right-radius: calc(var(--radius) + 4px);

    @include dark {
      background-color: oklch(20.5% 0 0);
    }
  }

  &__image {
    object-fit: cover;
    object-position: top;
    transition: scale 0.7s var(--ease-out-expo);

    @include parent-hover(".project-next__link") {
      scale: 1.03;
    }
  }
}
</style>

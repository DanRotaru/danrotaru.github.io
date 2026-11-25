<!--
  Gradient "browser card" with the project tagline and its screenshots,
  arranged per `project.card.layout` and animated on hover (lg+).
-->
<script setup lang="ts">
import type { Project, ProjectImage } from "@/data/case-studies";
import { cn } from "@/lib/cn";

const props = defineProps<{ project: Project }>();

type Shot = { image: ProjectImage; className: string };

const shot = (image: ProjectImage | undefined, className: string, framed = true): Shot[] =>
  image
    ? [{ image, className: cn("project-frame__shot", framed && "project-frame__shot--framed", className) }]
    : [];

/** Stage wrapper class (null for the single-shot layouts, which render the image directly). */
const media = computed<{ stage: string | null; shots: Shot[] }>(() => {
  const { layout } = props.project.card;
  const [first, second, third] = props.project.images;

  switch (layout) {
    case "duo":
      return {
        stage: "project-frame__stage project-frame__stage--duo",
        shots: [...shot(first, "project-frame__shot--duo-front"), ...shot(second, "project-frame__shot--duo-back")],
      };
    case "phones":
      return {
        stage: "project-frame__stage project-frame__stage--phones",
        shots: [
          ...shot(first, "project-frame__shot--phone project-frame__shot--phone-left", false),
          ...shot(second, "project-frame__shot--phone project-frame__shot--phone-center", false),
          ...shot(third, "project-frame__shot--phone project-frame__shot--phone-right", false),
        ],
      };
    case "stack":
      return {
        stage: "project-frame__stage project-frame__stage--stack",
        shots: [
          ...shot(first, "project-frame__shot--stack-top"),
          ...shot(second, "project-frame__shot--stack-bottom"),
        ],
      };
    default:
      return {
        stage: null,
        shots: shot(
          first,
          cn("project-frame__shot--single", layout === "single-left" && "project-frame__shot--single-left"),
        ),
      };
  }
});
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    :aria-label="`View Details of ${project.title}`"
    draggable="false"
    class="project-frame"
    :style="{ '--frame-gradient': project.card.gradient }"
  >
    <div class="project-frame__screen">
      <div aria-hidden="true" class="project-frame__bg" />
      <div aria-hidden="true" class="project-frame__bg project-frame__bg--hover" />
      <div aria-hidden="true" class="project-frame__shade">
        <div class="project-frame__shade-tint" />
        <div class="project-frame__shade-top" />
      </div>
      <div aria-hidden="true" class="project-frame__fade" />
      <div aria-hidden="true" class="project-frame__edge" />
      <div aria-hidden="true" class="project-frame__sheen" />
      <div class="project-frame__caption">
        <p class="project-frame__tagline">{{ project.tagline }}</p>
        <IconArrowRight class="project-frame__arrow" aria-hidden="true" />
      </div>
      <div class="project-frame__media">
        <div v-if="media.stage" :class="media.stage">
          <img
            v-for="item in media.shots"
            :key="item.image.src"
            :src="item.image.src"
            :alt="item.image.alt"
            :width="item.image.width ?? 1600"
            :height="item.image.height ?? 1000"
            draggable="false"
            loading="lazy"
            decoding="async"
            :class="item.className"
          />
        </div>
        <template v-else>
          <img
            v-for="item in media.shots"
            :key="item.image.src"
            :src="item.image.src"
            :alt="item.image.alt"
            :width="item.image.width ?? 1600"
            :height="item.image.height ?? 1000"
            draggable="false"
            loading="lazy"
            decoding="async"
            :class="item.className"
          />
        </template>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
@use "abstracts" as *;

$ease-rest: cubic-bezier(0.32, 0.72, 0, 1);
$ease-hover: cubic-bezier(0.22, 1, 0.36, 1);
$ease-bounce: cubic-bezier(0.34, 1.4, 0.64, 1);

/// Hover of the frame link, large screens only.
@mixin frame-hover {
  @include mq(lg) {
    @include parent-hover(".project-frame") {
      @content;
    }
  }
}

// Outer bezel (the link itself)
.project-frame {
  position: relative;
  isolation: isolate;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 11;
  padding: 4px;
  cursor: pointer;
  border-radius: calc(var(--radius) * 1.8);
  background-image: linear-gradient(to bottom in oklab, #fff, #f1f1f4);
  box-shadow:
    inset 0 1px 0 #fff,
    inset 0 -1px 0 #0000000a,
    0 0 0 1px #00000012,
    0 1px 2px #0000000f,
    0 14px 34px -14px #00000047;

  @include mq(sm) {
    aspect-ratio: 16 / 9;
  }

  @include mq(md) {
    aspect-ratio: 16 / 10;
  }

  @include mq(lg) {
    aspect-ratio: 16 / 11;
    padding: 8px;
    border-radius: calc(var(--radius) * 2.2);
  }

  @include dark {
    background-image: linear-gradient(
      to bottom in oklab,
      color-mix(in oklab, #fff 10%, transparent),
      color-mix(in oklab, #fff 3.5%, transparent)
    );
    box-shadow:
      inset 0 1px 0 #ffffff29,
      inset 0 -1px 0 #0006,
      0 0 0 1px #ffffff12,
      0 1px 2px #00000080,
      0 24px 48px -20px #000000d9;
  }

  // Lift shadow revealed on hover
  &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    opacity: 0;
    box-shadow: 0 30px 60px -20px #00000059;
    transition: opacity 0.5s var(--ease-default);

    @include reduced-motion {
      transition: none;
    }

    @include dark {
      box-shadow: 0 36px 70px -24px #000000e6;
    }
  }

  @include hover {
    &::after {
      opacity: 1;
    }
  }

  // Inner screen
  &__screen {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: calc(var(--radius) + 4px);
    box-shadow:
      0 0 0 1px #00000024,
      0 1px 2px #0000001f;

    @include mq-down(lg) {
      padding-top: 8px;
    }

    @include mq(lg) {
      border-radius: 16px;
    }

    @include dark {
      box-shadow:
        0 0 0 1px #0009,
        0 1px 2px #0006;
    }
  }

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: var(--frame-gradient);

    @include mq(lg) {
      filter: brightness(95%) saturate(90%);
    }

    &--hover {
      opacity: 0;
      transition: opacity 0.5s var(--ease-in-out);

      @include reduced-motion {
        transition: none;
      }

      @include mq-down(lg) {
        display: none;
      }

      @include mq(lg) {
        filter: brightness(110%) saturate(125%);
      }

      @include frame-hover {
        opacity: 1;
      }
    }
  }

  &__shade {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &__shade-tint {
    position: absolute;
    inset: 0;

    @include dark {
      background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.15);
    }
  }

  &__shade-top {
    position: absolute;
    top: 0;
    inset-inline: 0;
    height: 40%;
    background-image: linear-gradient(to bottom in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.15), transparent);

    @include dark {
      background-image: linear-gradient(to bottom in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.35), transparent);
    }
  }

  &__fade {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    z-index: 15;
    height: 20%;
    background-image: linear-gradient(to top in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.2), transparent);

    @include dark {
      background-image: linear-gradient(to top in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.4), transparent);
    }
  }

  &__edge {
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 20;
    border-radius: inherit;
    box-shadow:
      inset 0 0 0 1px #ffffff1a,
      inset 0 1px 0 #ffffff29;
  }

  &__sheen {
    pointer-events: none;
    position: absolute;
    top: 0;
    inset-inline: 0;
    z-index: 20;
    height: 1px;
    background-image: linear-gradient(90deg, transparent 15%, #ffffff52 50%, transparent 85%);
  }

  &__caption {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    width: 100%;
    padding: 8px 16px;
    color: rgb(255 255 255 / 0.9);
    text-shadow: 0 1px 12px #00000040;

    @include mq(md) {
      padding: 16px 24px;
    }

    @include mq(lg) {
      padding: 20px;
    }
  }

  &__tagline {
    font-size: 16px;
    line-height: 1.5;
    text-wrap: pretty;

    @include mq(sm) {
      font-size: 20px;
      line-height: 1.4;
    }

    @include mq(md) {
      font-size: 18px;
      line-height: 1.55556;
    }
  }

  &__arrow {
    display: none;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    transition: translate 0.3s var(--ease-out-quint);

    @include mq(sm) {
      display: block;
    }

    @include parent-hover(".project-frame") {
      translate: 6px 0;
      transition: translate 0.5s $ease-bounce;
    }
  }

  &__media {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 4px;
  }

  // Screenshot arrangements
  &__stage {
    position: relative;
    display: flex;
    width: 100%;

    &--duo {
      align-items: center;
      justify-content: center;
      padding-top: 16px;
      perspective: 2000px;
    }

    &--phones {
      align-items: flex-start;
      justify-content: center;
      perspective: 2000px;
    }

    &--stack {
      justify-content: flex-start;
      padding-top: 8px;
    }
  }

  // Screenshots
  &__shot {
    height: auto;
    object-fit: cover;
    transition-duration: 0.45s;
    transition-timing-function: $ease-rest;

    @include reduced-motion {
      transition: none !important;
    }

    @include frame-hover {
      transition-duration: 0.7s;
      transition-timing-function: $ease-hover;
    }

    &--framed {
      border: 2px solid rgb(255 255 255 / 0.4);
      border-top-color: rgb(255 255 255 / 0.6);
      border-top-left-radius: var(--radius-md);
      border-top-right-radius: var(--radius-md);
      box-shadow:
        0 0 0 1px #00000040,
        0 4px 16px #00000059,
        0 18px 50px -8px #00000080;
    }

    // One screenshot, tilted right (keythm, snippix, flux lura)
    &--single {
      width: 100%;
      max-width: 85%;
      transform-origin: bottom;
      translate: 0 20px;
      rotate: 1deg;
      transition-property: transform, translate, scale, rotate;

      @include mq(lg) {
        rotate: 0deg;
      }

      @include frame-hover {
        transform: perspective(1200px) rotateX(6deg) translateY(-8px) rotate(1deg) scale(1.045);
      }
    }

    // ...or tilted left (nextdemy, dan13.me)
    &--single-left {
      rotate: -2deg;

      @include mq(lg) {
        rotate: 0deg;
      }

      @include frame-hover {
        transform: perspective(1200px) rotateX(6deg) translateY(-8px) rotate(-1.5deg) scale(1.05);
      }
    }

    // Two desktop screenshots (venture den)
    &--duo-front {
      width: 85%;
      translate: -40px 0;
      rotate: -6deg;
      scale: 0.8;
      filter: brightness(90%);
      transition-property: translate, rotate, scale, filter;

      @include mq-down(lg) {
        z-index: 10;
      }

      @include mq(lg) {
        translate: 0 0;
        rotate: 0deg;
        scale: 1;
        filter: brightness(100%);
      }

      @include frame-hover {
        translate: -40px 0;
        rotate: -6deg;
        scale: 0.9;
        filter: brightness(0.85);
      }
    }

    &--duo-back {
      position: absolute;
      right: 5%;
      bottom: 0;
      width: 65%;
      translate: 16px -20px;
      rotate: 3deg;
      scale: 0.9;
      opacity: 1;
      transition-property: translate, rotate, scale, opacity;

      @include mq(lg) {
        translate: 0 48px;
        rotate: 12deg;
        scale: 0.75;
        opacity: 0;
      }

      @include frame-hover {
        translate: 16px -20px;
        rotate: 3deg;
        scale: 1;
        opacity: 1;
        transition-duration: 0.8s;
        transition-timing-function: cubic-bezier(0.34, 1.36, 0.64, 1);
        transition-delay: 75ms;
      }
    }

    // Three phone screenshots (finote)
    &--phone {
      position: absolute;
      width: 40%;
      transition-property: translate, rotate, scale, opacity;
    }

    &--phone-left,
    &--phone-right {
      z-index: 10;
      scale: 0.9;
      opacity: 0.9;

      @include frame-hover {
        rotate: 0deg;
        scale: 0.8;
        opacity: 1;
        transition-delay: 75ms;
      }
    }

    &--phone-left {
      transform-origin: 100% 100%;
      translate: -55% 0;
      rotate: -6deg;

      @include frame-hover {
        translate: calc(-100% + 24px) -80px;
      }
    }

    &--phone-right {
      transform-origin: 0 100%;
      translate: 55% 0;
      rotate: 6deg;

      @include frame-hover {
        translate: calc(100% - 24px) -80px;
      }
    }

    &--phone-center {
      z-index: 20;

      @include frame-hover {
        translate: 0 -40px;
        scale: 0.9;
      }
    }

    // Two stacked screenshots (starforge)
    &--stack-top {
      position: absolute;
      top: 12px;
      right: 3%;
      z-index: 20;
      width: 68%;
      transition-property: translate, rotate, scale, filter, z-index;

      @include mq(lg) {
        top: 0;
      }

      @include frame-hover {
        z-index: 15;
        translate: 0 3%;
        rotate: 3deg;
        scale: 0.95;
        filter: brightness(0.85);
      }
    }

    &--stack-bottom {
      position: relative;
      z-index: 10;
      width: 55%;
      margin-left: 3%;
      translate: 0 40px;
      transition-property: translate, rotate, scale, z-index;

      @include frame-hover {
        z-index: 30;
        translate: 5% 0;
        rotate: -3deg;
        scale: 1.08;
        transition-delay: 75ms;
      }
    }
  }
}
</style>

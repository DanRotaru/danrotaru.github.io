<!-- Pill button: a dark circle behind the arrow grows to fill the pill on hover. -->
<script setup lang="ts">
import { NuxtLink } from "#components";
import { cn } from "@/lib/cn";

const props = withDefaults(
  defineProps<{
    /** Renders a link. Without it the pill is a plain span, for use inside another link
     *  (give that link the `pill-cta-host` class so hovering it animates the pill). */
    href?: string;
    size?: "md" | "lg";
    /** Fill the container width from the md breakpoint up. */
    stretch?: boolean;
  }>(),
  { href: undefined, size: "md", stretch: false },
);

const classes = computed(() =>
  cn("pill-cta", props.size === "lg" && "pill-cta--lg", props.stretch && "pill-cta--stretch"),
);
</script>

<template>
  <component :is="href ? NuxtLink : 'span'" :to="href" :class="classes">
    <span aria-hidden="true" class="pill-cta__glow" />
    <span aria-hidden="true" class="pill-cta__clip">
      <span class="pill-cta__fill" />
    </span>
    <span class="pill-cta__text"><slot /></span>
    <span aria-hidden="true" class="pill-cta__icon">
      <IconArrowRight class="pill-cta__arrow pill-cta__arrow--out" />
      <IconArrowRight class="pill-cta__arrow pill-cta__arrow--in" />
    </span>
  </component>
</template>

<style lang="scss">
@use "abstracts" as *;

$ink: #0d0d0f;

/// Hover state of the pill: the pill itself (when it is the link) or a `.pill-cta-host` around it.
@mixin pill-hover {
  @media (hover: hover) {
    :is(.pill-cta:hover, .pill-cta-host:hover) & {
      @content;
    }
  }
}

@mixin pill-hover-dark {
  @media (hover: hover) {
    :root.dark :is(.pill-cta:hover, .pill-cta-host:hover) & {
      @content;
    }
  }
}

.pill-cta {
  // Geometry: the hover fill starts as a circle exactly behind the arrow.
  --pill-pad: 4px;
  --pill-icon-pad: 10px;
  --pill-arrow: 18px;
  --pill-circle: calc(var(--pill-arrow) + 2 * var(--pill-icon-pad));

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  padding: var(--pill-pad);
  padding-left: 12px;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  opacity: 0.85;
  border: 1px solid rgb(13 13 15 / 0.3);
  border-radius: 9999px;
  background-color: rgb(13 13 15 / 0.2);
  backdrop-filter: blur(4px);
  transition:
    opacity 0.4s ease,
    border-color 0.4s ease,
    scale 0.4s ease;

  @include dark {
    border-color: color-mix(in oklab, #fff 10%, transparent);
    background-color: color-mix(in oklab, #fff 10%, transparent);
  }

  @media (hover: hover) {
    &:hover,
    .pill-cta-host:hover & {
      opacity: 1;
      border-color: rgb(13 13 15 / 0.5);
    }

    :root.dark &:hover,
    :root.dark .pill-cta-host:hover & {
      border-color: color-mix(in oklab, #fff 30%, transparent);
    }
  }

  &:active,
  .pill-cta-host:active & {
    scale: 0.98;
  }

  @include focus-ring;

  // 50px tall: 2 × 4px pad + 40px circle + 2px border.
  &--lg {
    --pill-pad: 4px;
    --pill-icon-pad: 10px;
    --pill-arrow: 20px;

    padding-left: 12px;
    font-size: 18px;
  }

  &--stretch {
    @include mq(md) {
      width: 100%;
    }
  }

  &__glow {
    pointer-events: none;
    position: absolute;
    inset: -1px;
    border-radius: 9999px;
    opacity: 0;
    box-shadow:
      0 10px 15px -3px rgb(13 13 15 / 0.2),
      0 4px 6px -4px rgb(13 13 15 / 0.2);
    transition: opacity 0.4s ease;

    @include dark {
      box-shadow:
        0 10px 15px -3px color-mix(in oklab, #fff 20%, transparent),
        0 4px 6px -4px color-mix(in oklab, #fff 20%, transparent);
    }

    @include pill-hover {
      opacity: 1;
    }
  }

  &__clip {
    pointer-events: none;
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 9999px;
  }

  &__fill {
    position: absolute;
    inset: 0;
    background-color: $ink;
    clip-path: inset(
      var(--pill-pad) var(--pill-pad) var(--pill-pad) calc(100% - var(--pill-pad) - var(--pill-circle))
        round 9999px
    );
    transition: clip-path 0.5s ease;

    @include dark {
      background-color: #fff;
    }

    @include pill-hover {
      clip-path: inset(0 round 9999px);
    }
  }

  &__text {
    z-index: 10;
    flex: 1;
    padding-inline: 12px;
    text-align: center;
    color: $ink;
    transition: color 0.45s ease;

    @include dark {
      color: #fff;
    }

    @include pill-hover {
      color: #fff;
    }

    @include pill-hover-dark {
      color: $ink;
    }
  }

  &--lg &__text {
    padding-inline: 14px 16px;
  }

  &__icon {
    position: relative;
    z-index: 10;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--pill-circle);
    height: var(--pill-circle);
    overflow: hidden;
    border-radius: 9999px;
  }

  &__arrow {
    width: var(--pill-arrow);
    height: var(--pill-arrow);
    color: #fff;
    transition:
      translate 0.4s ease,
      opacity 0.4s ease;

    @include dark {
      color: $ink;
    }

    &--out {
      @include pill-hover {
        translate: 24px 0;
        opacity: 0;
      }
    }

    &--in {
      position: absolute;
      translate: -24px 0;
      opacity: 0;
      transition-delay: 75ms;

      @include pill-hover {
        translate: 0 0;
        opacity: 1;
      }
    }
  }
}
</style>

<!--
  Text link with a chip that expands behind it on hover and an arrow that
  slides out / in ("See all projects", "Read all posts", "Work experience").
-->
<script setup lang="ts">
defineProps<{ href: string }>();
</script>

<template>
  <NuxtLink :to="href" class="home-arrow-link">
    <span aria-hidden="true" class="home-arrow-link__chip" />
    <span class="home-arrow-link__label"><slot /></span>
    <span class="home-arrow-link__icon-wrap">
      <span aria-hidden="true" class="home-arrow-link__icon">
        <IconArrowRight class="home-arrow-link__arrow home-arrow-link__arrow--out" />
        <IconArrowRight class="home-arrow-link__arrow home-arrow-link__arrow--in" />
      </span>
    </span>
  </NuxtLink>
</template>

<style lang="scss">
@use "abstracts" as *;

$spring: linear(0, 0.06 3%, 0.24 7%, 0.52 12%, 0.82 18%, 1 24%, 1.06 30%, 1.07 34%, 1.05 40%, 1.01 50%, 0.995 60%, 1);
$bounce: cubic-bezier(0.34, 1.4, 0.64, 1);

.home-arrow-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  font-family: var(--font-bricolage);
  font-size: 14px;
  line-height: 1.42857;
  font-weight: 500;
  color: color-mix(in oklab, var(--color-foreground) 70%, transparent);
  border-radius: 9999px;
  outline: none;
  outline-offset: 8px;
  transition:
    color 0.3s var(--ease-default),
    scale 0.3s var(--ease-default);

  @include hover {
    color: var(--color-foreground);
  }

  &:focus-visible {
    color: var(--color-foreground);
    outline: 2px solid color-mix(in oklab, oklch(62.3% 0.214 259.815) 45%, transparent);
  }

  &:active {
    scale: 0.97;
    transition-duration: 0.15s;
  }

  &__chip {
    pointer-events: none;
    position: absolute;
    inset-block: -2px;
    left: calc(100% - 20px);
    right: -4px;
    border-radius: 9999px;
    background-image: linear-gradient(to bottom in oklab, var(--chip-top), var(--chip-bottom));
    box-shadow:
      inset 0 -1px 0 var(--chip-shadow-1),
      0 0 0 0.5px var(--chip-shadow-2),
      0 1px 2px var(--chip-shadow-3),
      0 4px 10px -4px var(--chip-shadow-4);
    transition-property: top, right, bottom, left, opacity;
    transition-duration: 0.3s;
    transition-timing-function: var(--ease-default);

    @include parent-hover(".home-arrow-link") {
      inset-block: -8px;
      inset-inline: -14px;
      transition-duration: 0.7s;
      transition-timing-function: $spring;
    }

    .home-arrow-link:focus-visible & {
      inset-block: -8px;
      inset-inline: -14px;
    }

    .home-arrow-link:active & {
      opacity: 0.8;
    }

    @include reduced-motion {
      transition-property: none;
    }
  }

  &__label {
    position: relative;
  }

  &__icon-wrap {
    position: relative;
    display: flex;
  }

  &__icon {
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

    &--out {
      @include parent-hover(".home-arrow-link") {
        translate: 20px 0;
        opacity: 0;
        transition: all 0.5s $bounce;
      }

      .home-arrow-link:focus-visible & {
        translate: 20px 0;
        opacity: 0;
        transition: all 0.5s var(--ease-default);
      }
    }

    &--in {
      position: absolute;
      translate: -20px 0;
      opacity: 0;

      @include parent-hover(".home-arrow-link") {
        translate: 0 0;
        opacity: 1;
        transition: all 0.5s $bounce;
      }

      .home-arrow-link:focus-visible & {
        translate: 0 0;
        opacity: 1;
        transition: all 0.5s var(--ease-default);
      }
    }
  }
}
</style>

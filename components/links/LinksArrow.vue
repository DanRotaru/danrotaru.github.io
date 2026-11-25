<!--
  Arrow that flies out top-right while a second one slides in, when the
  closest `[data-arrow-host]` ancestor is hovered.
-->
<template>
  <span aria-hidden="true" class="links-arrow">
    <IconArrowUpRight class="links-arrow__out" />
    <IconArrowUpRight class="links-arrow__in" />
  </span>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$spring: cubic-bezier(0.34, 1.4, 0.64, 1);

.links-arrow {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  overflow: hidden;
  color: color-mix(in oklab, var(--color-foreground) 35%, transparent);
  transition: color 0.3s var(--ease-default);

  @include parent-hover("[data-arrow-host]") {
    color: $blue;
  }

  &__out,
  &__in {
    width: 16px;
    height: 16px;
  }

  &__out {
    @include parent-hover("[data-arrow-host]") {
      translate: 16px -16px;
      transition: all 0.5s $spring;
    }
  }

  &__in {
    position: absolute;
    inset: 0;
    translate: -16px 16px;

    @include parent-hover("[data-arrow-host]") {
      translate: 0 0;
      transition: all 0.5s $spring;
    }
  }
}
</style>

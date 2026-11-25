<!-- Gradient behind the fixed header (dark theme only, like the original). -->
<template>
  <div aria-hidden="true" class="top-fade" data-top-fade="true" />
</template>

<style lang="scss">
@use "abstracts" as *;

.top-fade {
  --top-fade-rgb: 244 244 244;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  display: none;
  width: 100%;
  height: 64px;
  pointer-events: none;
  user-select: none;
  background-image: linear-gradient(
    to bottom,
    rgb(var(--top-fade-rgb) / 1) 0,
    rgb(var(--top-fade-rgb) / 0.74) 19%,
    rgb(var(--top-fade-rgb) / 0.54) 34%,
    rgb(var(--top-fade-rgb) / 0.38) 47%,
    rgb(var(--top-fade-rgb) / 0.28) 56%,
    rgb(var(--top-fade-rgb) / 0.19) 65%,
    rgb(var(--top-fade-rgb) / 0.13) 73%,
    rgb(var(--top-fade-rgb) / 0.08) 80%,
    rgb(var(--top-fade-rgb) / 0.04) 86%,
    rgb(var(--top-fade-rgb) / 0.02) 91%,
    rgb(var(--top-fade-rgb) / 0.01) 95%,
    rgb(var(--top-fade-rgb) / 0) 100%
  );

  @include mq(lg) {
    height: 72px;
  }

  @include dark {
    --top-fade-rgb: 13 13 15;
    display: block;
  }
}

// Pages with a full-bleed cover hero fade the gradient in on scroll.
@supports (animation-timeline: scroll()) {
  :root[data-cover-hero] .top-fade {
    animation: top-fade-in linear both;
    animation-timeline: scroll();
    animation-range: 0 320px;
  }
}
</style>

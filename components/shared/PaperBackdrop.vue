<!--
  Crumpled-paper texture behind page heroes. Pins to the top and slides up
  with scroll (CSS scroll-driven animation where supported).
-->
<template>
  <div class="paper-backdrop">
    <!-- Inline style = next/image `fill` (absolute, full size). -->
    <img
      class="paper-backdrop__image"
      src="/static/images/crumpled-paper.avif"
      alt="crumpled paper texture"
      loading="eager"
      fetchpriority="high"
      decoding="async"
      style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
    />
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.paper-backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 450px;
  overflow: hidden;
  background-color: color-mix(in oklab, oklch(97% 0 0) 70%, transparent);
  mask-image: linear-gradient(#000 40%, transparent 100%);

  @include dark {
    background-color: color-mix(in oklab, oklch(14.5% 0 0) 90%, transparent);
  }

  @supports (animation-timeline: scroll()) {
    position: fixed !important;
    animation: pin-top-scroll linear both;
    animation-timeline: scroll();
    animation-range: 0 560px;
  }

  &__image {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 450px;
    object-fit: cover;
    mix-blend-mode: overlay;
    pointer-events: none;
    user-select: none;
  }
}
</style>

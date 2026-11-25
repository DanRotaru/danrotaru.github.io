<!--
  Faded highway photo (light) / glyph pattern (dark) behind the /links
  header. Pins to the top and slides away with scroll like the paper backdrop.
-->
<template>
  <div class="links-backdrop">
    <img
      class="links-backdrop__photo"
      src="/static/links/cover-highway.jpg"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      fetchpriority="low"
    />
    <!-- decorative SVG -->
    <img
      class="links-backdrop__glyphs"
      src="/static/glyphs/fcdb1ac82a9a-d.svg"
      alt=""
      aria-hidden="true"
      width="1204"
      height="679"
      loading="lazy"
    />
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.links-backdrop {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 256px;
  overflow: hidden;
  background-color: color-mix(in oklab, oklch(97% 0 0) 50%, transparent);
  mask-image: linear-gradient(#000 40%, transparent 100%);

  @include mq(md) {
    height: 416px;
  }

  @include dark {
    background-color: color-mix(in oklab, oklch(14.5% 0 0) 60%, transparent);
  }

  @supports (animation-timeline: scroll()) {
    position: fixed !important;
    animation: pin-top-scroll linear both;
    animation-timeline: scroll();
    animation-range: 0 560px;
  }

  &__photo,
  &__glyphs {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    user-select: none;

    @include mq(md) {
      mask-image: radial-gradient(26% 60% at 84% 40%, #0000001f 45%, #000 100%);
    }
  }

  &__photo {
    opacity: 0.25;
    filter: saturate(0.85);

    @include dark {
      display: none;
    }
  }

  &__glyphs {
    display: none;

    @include dark {
      display: block;
    }
  }
}
</style>

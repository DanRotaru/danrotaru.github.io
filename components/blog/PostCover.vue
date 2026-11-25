<script setup lang="ts">
defineProps<{ src: string }>();

// Same inline positioning next/image's `fill` applied.
const fillStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  inset: "0",
  color: "transparent",
} as const;
</script>

<!--
  Blurred, saturated copy of the post cover behind the header. It fades out
  downwards and (where scroll-driven animations exist) scrolls away faster.
-->
<template>
  <div aria-hidden="true" class="post-cover">
    <CoverHeroFlag />
    <div class="post-cover__scaler">
      <img
        :src="src"
        alt=""
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        :style="fillStyle"
        class="post-cover__image"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.post-cover {
  position: absolute;
  top: 0;
  inset-inline: 0;
  z-index: -1;
  overflow: hidden;
  height: 400px;
  pointer-events: none;
  mask-image: linear-gradient(
    #000 0 28%,
    #000000e6 40%,
    #000000b8 52%,
    #00000080 63%,
    #0000004d 73%,
    #00000026 82%,
    #0000000d 91%,
    transparent
  );

  @include mq(md) {
    height: 560px;
  }

  @supports (animation-timeline: scroll()) {
    position: fixed;
    animation: pin-top-scroll linear both;
    animation-timeline: scroll();
    animation-range: 0 560px;
  }

  // Rendered at 1/4 size and scaled up: cheap, very soft blur.
  &__scaler {
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    height: 25%;
    transform-origin: 0 0;
    scale: 4;
  }

  &__image {
    object-fit: cover;
    opacity: 0.6;
    scale: 1.1;
    filter: blur(16px) saturate(200%);
    user-select: none;

    @include dark {
      opacity: 0.45;
      filter: blur(16px) saturate(150%);
    }
  }
}
</style>

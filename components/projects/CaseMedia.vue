<!-- Full-width 16:9 screenshot between case-study sections, on a hatched band. -->
<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
}>();
</script>

<template>
  <div class="case-media">
    <div class="case-media__frame" role="img" :aria-label="alt">
      <img
        class="case-media__image"
        :src="src"
        :alt="alt"
        loading="lazy"
        decoding="async"
        style="position: absolute; height: 100%; width: 100%; inset: 0; color: transparent"
      />
    </div>
  </div>
</template>

<style lang="scss">
// Styles shared with CaseVideo (its player sits inside a `.case-media__frame`).
@use "case-media";
</style>

<script setup lang="ts">
defineProps<{
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}>();
</script>

<!-- Content image in a tray card; click to zoom. -->
<template>
  <figure class="figure not-prose">
    <div class="figure__tray">
      <ImageZoom :src="src" :alt="alt" :width="width" :height="height">
        <img
          :src="src"
          :alt="alt"
          :width="width"
          :height="height"
          loading="lazy"
          decoding="async"
          class="figure__image"
        />
      </ImageZoom>
    </div>
    <figcaption v-if="caption" class="figure__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "./surface" as *;

.figure {
  margin-block: 24px;

  &__tray {
    @include mdx-tray;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid oklab(92.2% 0 0 / 0.8);
    border-radius: var(--radius-xl);

    @include dark {
      border-color: oklch(26.9% 0 0);
    }
  }

  &__caption {
    padding-top: 12px;
    padding-inline: 12px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    text-wrap: pretty;
    color: oklch(55.6% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }
}
</style>

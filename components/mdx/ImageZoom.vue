<script setup lang="ts">
/*
 * Wraps an image in a "zoom in" button that opens the full image in a modal
 * <dialog> (click anywhere or press Esc to close).
 */
defineProps<{
  src: string;
  alt: string;
  width: number;
  height: number;
}>();

const dialog = ref<HTMLDialogElement | null>(null);
</script>

<template>
  <button type="button" :aria-label="`Zoom image: ${alt}`" class="image-zoom" @click="dialog?.showModal()">
    <slot />
  </button>
  <dialog ref="dialog" class="image-zoom__dialog" :aria-label="alt" @click="dialog?.close()">
    <!-- full-size preview, loaded on demand -->
    <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy" class="image-zoom__image" />
  </dialog>
</template>

<style lang="scss">
@use "abstracts" as *;

.image-zoom {
  display: block;
  width: 100%;
  padding: 0;
  border-radius: var(--radius-xl);
  cursor: zoom-in;
  outline: none;

  &:focus-visible {
    box-shadow:
      0 0 0 2px var(--color-canvas),
      0 0 0 4px oklch(62.3% 0.214 259.815);
  }

  &__dialog {
    width: 100%;
    max-width: none;
    height: 100%;
    max-height: none;
    margin: 0;
    padding: 24px;
    border: 0;
    background: transparent;
    cursor: zoom-out;

    &[open] {
      display: flex;
      align-items: center;
      justify-content: center;
      // fade + zoom in (read by the `enter` keyframes)
      --s5Dv-K: 0;
      --8Lolzw: 0.95;
      animation: enter 0.2s var(--ease-out-quint);
    }

    &::backdrop {
      background-color: rgb(0 0 0 / 0.8);
      backdrop-filter: blur(4px);
    }
  }

  &__image {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    border-radius: var(--radius-xl);
    object-fit: contain;
  }
}
</style>

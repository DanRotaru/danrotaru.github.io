<script setup lang="ts">
const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const STEP = 1.25;

/*
 * Diagram panel with zoom in / zoom out / reset controls and drag-to-pan.
 * Transform values are exposed as CSS custom properties.
 */
const scale = ref(1);
const offset = ref({ x: 0, y: 0 });
const dragging = ref(false);
const touched = ref(false);
let drag: { x: number; y: number; ox: number; oy: number } | null = null;

const zoom = (factor: number) => {
  scale.value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value * factor));
};
const reset = () => {
  scale.value = 1;
  offset.value = { x: 0, y: 0 };
};

function onPointerDown(event: PointerEvent) {
  if (event.pointerType === "touch") touched.value = true;
  if (event.button !== 0 || (scale.value === 1 && event.pointerType === "touch")) return;
  drag = { x: event.clientX, y: event.clientY, ox: offset.value.x, oy: offset.value.y };
  dragging.value = true;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
}

function onPointerMove(event: PointerEvent) {
  const start = drag;
  if (!start) return;
  offset.value = { x: start.ox + event.clientX - start.x, y: start.oy + event.clientY - start.y };
}

function onPointerUp() {
  drag = null;
  dragging.value = false;
}

const style = computed(() => ({
  "--diagram-x": `${offset.value.x}px`,
  "--diagram-y": `${offset.value.y}px`,
  "--diagram-scale": scale.value,
}));
</script>

<template>
  <div class="diagram-viewport">
    <div
      class="diagram-viewport__stage"
      :data-dragging="dragging ? '' : undefined"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div class="diagram-viewport__content" :style="style">
        <slot />
      </div>
    </div>
    <div class="diagram-viewport__controls" :data-touched="touched ? '' : undefined">
      <button type="button" class="diagram-viewport__button" aria-label="Zoom in" title="Zoom in" @click="zoom(STEP)">
        <IconMagnifyingGlassPlusBold class="diagram-viewport__icon" />
      </button>
      <button
        type="button"
        class="diagram-viewport__button"
        aria-label="Zoom out"
        title="Zoom out"
        @click="zoom(1 / STEP)"
      >
        <IconMagnifyingGlassMinusBold class="diagram-viewport__icon" />
      </button>
      <button type="button" class="diagram-viewport__button" aria-label="Reset view" title="Reset view" @click="reset">
        <IconArrowCounterClockwiseBold class="diagram-viewport__icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "./surface" as *;

.diagram-viewport {
  @include mdx-panel;
  // Colours consumed by the pre-rendered "pele" SVGs.
  --pele-bg: #f6f6f8;
  --pele-surface: #fbfbfc;
  --pele-surface-alt: color-mix(in oklab, var(--color-foreground) 2.5%, transparent);
  --pele-border: color-mix(in oklab, var(--color-foreground) 14%, transparent);
  --pele-line: color-mix(in oklab, var(--color-foreground) 42%, transparent);
  --pele-fg: color-mix(in oklab, var(--color-foreground) 85%, transparent);
  --pele-muted: var(--color-muted-foreground);
  --pele-accent: oklch(62.3% 0.214 259.815);
  position: relative;
  overflow: hidden;

  @include dark {
    --pele-bg: color-mix(in oklab, oklch(20.5% 0 0) 50%, #0d0d0f);
    --pele-surface: color-mix(in oklab, #fff 7%, var(--pele-bg));
    --pele-border: #ffffff1a;
    --pele-line: color-mix(in oklab, var(--color-foreground) 55%, transparent);
  }

  &__stage {
    cursor: grab;
    touch-action: pan-y;
    user-select: none;

    &[data-dragging] {
      cursor: grabbing;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 16px;
    transform: translate(var(--diagram-x, 0), var(--diagram-y, 0)) scale(var(--diagram-scale, 1));
    transform-origin: center center;
    transition: transform 0.15s var(--ease-out-quint);

    @include mq(md) {
      padding: 32px;
    }

    [data-dragging] > & {
      transition: none;
    }
  }

  &__controls {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: 2px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent);
    border-radius: var(--radius);
    background-color: color-mix(in oklab, #fff 80%, transparent);
    box-shadow:
      0 1px 3px 0 #0000001a,
      0 1px 2px -1px #0000001a;
    backdrop-filter: blur(8px);
    opacity: 0;
    transition: opacity 0.2s var(--ease-default);

    .diagram:focus-within &,
    &[data-touched] {
      opacity: 1;
    }

    @include parent-hover(".diagram") {
      opacity: 1;
    }

    @include dark {
      border-color: color-mix(in oklab, #fff 10%, transparent);
      background-color: color-mix(in oklab, oklch(26.9% 0 0) 80%, transparent);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    color: var(--color-muted-foreground);
    cursor: pointer;
    @include mdx-focus-ring;

    @include hover {
      background-color: color-mix(in oklab, var(--color-foreground) 5%, transparent);
      color: var(--color-foreground);
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>

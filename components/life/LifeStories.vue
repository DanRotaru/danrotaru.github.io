<!--
  Instagram-style story highlights: a row of gradient rings, each opening a
  full-screen viewer (native <dialog>) with progress bars, auto-advance,
  tap left/right to navigate, press-and-hold to pause, arrow keys and Esc.
-->
<script setup lang="ts">
import type { LifeHighlight } from "@/data/life";

const props = defineProps<{ highlights: LifeHighlight[] }>();

const IMAGE_SECONDS = 5;

const dialog = ref<HTMLDialogElement | null>(null);
const video = ref<HTMLVideoElement | null>(null);
const seen = ref(new Set<string>());

const highlightIndex = ref(0);
const itemIndex = ref(0);
const progress = ref(0);
const paused = ref(false);

const highlight = computed(() => props.highlights[highlightIndex.value]);
const item = computed(() => highlight.value?.items[itemIndex.value]);

let frame = 0;
let last = 0;

function stopTimer() {
  cancelAnimationFrame(frame);
  frame = 0;
}

function tick(now: number) {
  const current = item.value;
  if (!current) return;
  if (!paused.value) {
    if (current.type === "video") {
      const el = video.value;
      if (el && el.duration) progress.value = el.currentTime / el.duration;
    } else {
      progress.value += (now - last) / 1000 / (current.duration ?? IMAGE_SECONDS);
    }
    if (progress.value >= 1) {
      next();
      return;
    }
  }
  last = now;
  frame = requestAnimationFrame(tick);
}

function startItem() {
  stopTimer();
  progress.value = 0;
  const current = highlight.value;
  if (current) seen.value.add(current.id);
  last = performance.now();
  frame = requestAnimationFrame(tick);
  nextTick(() => {
    if (item.value?.type === "video" && video.value) {
      video.value.currentTime = 0;
      video.value.play().catch(() => {});
    }
  });
}

function open(index: number) {
  highlightIndex.value = index;
  itemIndex.value = 0;
  paused.value = false;
  dialog.value?.showModal();
  startItem();
}

function close() {
  stopTimer();
  video.value?.pause();
  if (dialog.value?.open) dialog.value.close();
}

function next() {
  const current = highlight.value;
  if (!current) return close();
  if (itemIndex.value < current.items.length - 1) {
    itemIndex.value += 1;
  } else if (highlightIndex.value < props.highlights.length - 1) {
    highlightIndex.value += 1;
    itemIndex.value = 0;
  } else {
    return close();
  }
  startItem();
}

function prev() {
  if (itemIndex.value > 0) {
    itemIndex.value -= 1;
  } else if (highlightIndex.value > 0) {
    highlightIndex.value -= 1;
    itemIndex.value = (highlight.value?.items.length ?? 1) - 1;
  }
  startItem();
}

function setPaused(value: boolean) {
  paused.value = value;
  if (item.value?.type === "video" && video.value) {
    if (value) video.value.pause();
    else video.value.play().catch(() => {});
  }
}

// Tap the left third to go back, anywhere else to go forward; a long press
// only pauses (it doesn't navigate).
let pressStart = 0;
function onPointerDown() {
  pressStart = performance.now();
  setPaused(true);
}
function onPointerUp(event: PointerEvent) {
  setPaused(false);
  if (performance.now() - pressStart > 250) return;
  const target = event.currentTarget as HTMLElement;
  const { left, width } = target.getBoundingClientRect();
  if (event.clientX - left < width / 3) prev();
  else next();
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowRight") next();
  else if (event.key === "ArrowLeft") prev();
  else if (event.key === " ") {
    event.preventDefault();
    setPaused(!paused.value);
  }
}

function barFill(index: number) {
  if (index < itemIndex.value) return 1;
  if (index > itemIndex.value) return 0;
  return Math.min(progress.value, 1);
}

onBeforeUnmount(stopTimer);
</script>

<template>
  <div class="life-stories">
    <ul class="life-stories__rings">
      <li v-for="(entry, index) in highlights" :key="entry.id">
        <button
          type="button"
          :class="['life-stories__ring', { 'life-stories__ring--seen': seen.has(entry.id) }]"
          :aria-label="`Open ${entry.title} stories (${entry.items.length})`"
          @click="open(index)"
        >
          <span class="life-stories__ring-border">
            <img :src="entry.cover" alt="" class="life-stories__cover" loading="lazy" />
          </span>
          <span class="life-stories__title">{{ entry.title }}</span>
        </button>
      </li>
    </ul>

    <dialog
      ref="dialog"
      class="life-stories__dialog"
      :aria-label="highlight ? `${highlight.title} stories` : 'Stories'"
      @close="close"
      @keydown="onKeydown"
      @click.self="close"
    >
      <div v-if="highlight && item" class="life-stories__viewer">
        <div class="life-stories__bars">
          <span v-for="(_, index) in highlight.items" :key="index" class="life-stories__bar">
            <span class="life-stories__bar-fill" :style="{ transform: `scaleX(${barFill(index)})` }" />
          </span>
        </div>

        <div class="life-stories__head">
          <img :src="highlight.cover" alt="" class="life-stories__head-avatar" />
          <span class="life-stories__head-title">{{ highlight.title }}</span>
          <span v-if="item.date" class="life-stories__head-date">{{ item.date }}</span>
          <button type="button" class="life-stories__close" aria-label="Close stories" @click="close">✕</button>
        </div>

        <div
          class="life-stories__stage"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
          @pointerleave="paused && setPaused(false)"
          @contextmenu.prevent
        >
          <video
            v-if="item.type === 'video'"
            ref="video"
            :key="item.src"
            class="life-stories__media"
            :poster="item.poster"
            :src="item.src"
            playsinline
            preload="auto"
          />
          <img
            v-else
            :key="item.src"
            :src="item.src"
            :alt="item.caption ?? highlight.title"
            :class="['life-stories__media', { 'life-stories__media--blur': item.blur }]"
            draggable="false"
          />
        </div>

        <div v-if="item.caption || item.href" class="life-stories__foot">
          <p v-if="item.caption" class="life-stories__caption">{{ item.caption }}</p>
          <a
            v-if="item.href"
            class="life-stories__link"
            :href="item.href"
            rel="noopener noreferrer"
            target="_blank"
            @click="setPaused(true)"
            >{{ item.linkLabel ?? "View on Instagram" }} ↗</a
          >
        </div>

        <button type="button" class="life-stories__nav life-stories__nav--prev" aria-label="Previous story" @click="prev">‹</button>
        <button type="button" class="life-stories__nav life-stories__nav--next" aria-label="Next story" @click="next">›</button>
      </div>
    </dialog>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$ig: conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75);

.life-stories {
  &__rings {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 24px;
  }

  &__ring {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    @include focus-ring;
    border-radius: 16px;

    &:active {
      scale: 0.96;
    }
  }

  &__ring-border {
    display: grid;
    place-items: center;
    width: 84px;
    height: 84px;
    padding: 3px;
    flex: none;
    overflow: hidden;
    border-radius: 999px;
    background: $ig;
    transition: rotate 0.6s var(--ease-default);

    @include parent-hover(".life-stories__ring") {
      rotate: 25deg;
    }

    .life-stories__ring--seen & {
      background: var(--color-border);
    }
  }

  &__cover {
    display: block;
    width: 100%;
    max-width: none;
    height: 100%;
    aspect-ratio: 1;
    border: 3px solid var(--color-canvas);
    border-radius: 999px;
    object-fit: cover;
    transition: rotate 0.6s var(--ease-default);

    @include parent-hover(".life-stories__ring") {
      rotate: -25deg;
    }
  }

  &__title {
    max-width: 88px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    color: var(--color-foreground);
  }

  // --- Viewer ---------------------------------------------------------------
  &__dialog {
    width: 100%;
    max-width: none;
    height: 100%;
    max-height: none;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: #fff;

    &::backdrop {
      background: rgb(8 8 10 / 0.92);
      backdrop-filter: blur(8px);
    }

    &[open] {
      display: grid;
      place-items: center;
    }
  }

  &__viewer {
    position: relative;
    width: min(416px, 100vw);
    height: min(736px, 100dvh);
    overflow: hidden;
    background: #000;
    animation: life-story-in 0.3s var(--ease-out-quint, ease-out);

    @include mq(sm) {
      border-radius: 16px;
    }
  }

  &__bars {
    position: absolute;
    top: 10px;
    inset-inline: 10px;
    z-index: 3;
    display: flex;
    gap: 4px;
  }

  &__bar {
    flex: 1;
    height: 2px;
    overflow: hidden;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.35);
  }

  &__bar-fill {
    display: block;
    height: 100%;
    background: #fff;
    transform-origin: left;
  }

  &__head {
    position: absolute;
    top: 22px;
    inset-inline: 12px;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    text-shadow: 0 1px 2px rgb(0 0 0 / 0.5);
  }

  &__head-avatar {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    object-fit: cover;
  }

  &__head-title {
    font-weight: 600;
  }

  &__head-date {
    opacity: 0.7;
  }

  &__close {
    margin-left: auto;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    @include focus-ring;
  }

  &__stage {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    touch-action: manipulation;
    user-select: none;
    -webkit-touch-callout: none;

    // Scrims so the bars, header and caption stay readable on bright photos.
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(rgb(0 0 0 / 0.45), transparent 18%, transparent 75%, rgb(0 0 0 / 0.55));
    }
  }

  &__media {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  &__media--blur {
    filter: blur(18px) brightness(0.8);
    scale: 1.15;
  }

  &__foot {
    position: absolute;
    bottom: 24px;
    inset-inline: 16px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    pointer-events: none;
  }

  &__caption {
    font-size: 16px;
    text-align: center;
    text-shadow: 0 1px 3px rgb(0 0 0 / 0.6);
  }

  &__link {
    padding: 8px 16px;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.92);
    font-size: 14px;
    font-weight: 500;
    color: #0d0d0f;
    pointer-events: auto;
    transition: scale 0.2s var(--ease-default);
    @include focus-ring;

    &:active {
      scale: 0.96;
    }
  }

  &__nav {
    position: absolute;
    top: 50%;
    z-index: 4;
    display: none;
    width: 36px;
    height: 36px;
    translate: 0 -50%;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.85);
    cursor: pointer;
    font-size: 24px;
    line-height: 1;
    color: #0d0d0f;
    @include focus-ring;

    @media (hover: hover) and (min-width: 640px) {
      display: grid;
      place-items: center;
    }

    &--prev {
      left: 8px;
    }

    &--next {
      right: 8px;
    }
  }
}

@keyframes life-story-in {
  from {
    opacity: 0;
    scale: 0.94;
  }
}
</style>

<!-- 16:9 video between case-study sections, with a small custom control bar. -->
<script setup lang="ts">
defineProps<{
  src: string;
  poster: string;
  /** Accessible description of the film. */
  label: string;
}>();

const IDLE_MS = 2500;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const playerRef = ref<HTMLDivElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
let idleTimer: ReturnType<typeof setTimeout> | undefined;
const playing = ref(false);
const ended = ref(false);
const muted = ref(false);
const idle = ref(false);
const time = ref(0);
const duration = ref(0);
const buffered = ref(0);

function wake() {
  idle.value = false;
  clearTimeout(idleTimer);
  if (videoRef.value && !videoRef.value.paused) {
    idleTimer = setTimeout(() => (idle.value = true), IDLE_MS);
  }
}

onBeforeUnmount(() => clearTimeout(idleTimer));

function toggle() {
  const video = videoRef.value;
  if (!video) return;
  if (video.paused) void video.play();
  else video.pause();
}

function seekTo(ratio: number) {
  const video = videoRef.value;
  if (!video || !duration.value) return;
  video.currentTime = Math.min(Math.max(ratio, 0), 1) * duration.value;
}

function onScrub(event: PointerEvent) {
  const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
  seekTo((event.clientX - rect.left) / rect.width);
}

const scrubSteps: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 };

function onScrubKey(event: KeyboardEvent) {
  const video = videoRef.value;
  if (!video || !duration.value) return;
  const step = scrubSteps[event.key];
  if (step === undefined) return;
  event.preventDefault();
  video.currentTime = Math.min(Math.max(video.currentTime + step, 0), duration.value);
}

function toggleFullscreen() {
  const player = playerRef.value;
  if (!player) return;
  if (document.fullscreenElement) void document.exitFullscreen();
  else void player.requestFullscreen?.();
}

function onPlay() {
  playing.value = true;
  ended.value = false;
  wake();
}

function onPause() {
  playing.value = false;
  idle.value = false;
}

function onPointerLeave() {
  if (playing.value) idle.value = true;
}

function onLoadedMetadata(event: Event) {
  duration.value = (event.currentTarget as HTMLVideoElement).duration;
}

function onTimeUpdate(event: Event) {
  time.value = (event.currentTarget as HTMLVideoElement).currentTime;
}

function onProgress(event: Event) {
  const video = event.currentTarget as HTMLVideoElement;
  if (video.duration && video.buffered.length) {
    buffered.value = video.buffered.end(video.buffered.length - 1) / video.duration;
  }
}

const progress = computed(() => (duration.value ? time.value / duration.value : 0));
const playLabel = computed(() => (playing.value ? "Pause" : ended.value ? "Replay" : "Play"));
const muteLabel = computed(() => (muted.value ? "Turn sound on" : "Mute"));
</script>

<template>
  <div class="case-media">
    <div class="case-media__frame">
      <div
        ref="playerRef"
        class="case-video"
        tabindex="-1"
        :data-paused="!playing ? 'true' : undefined"
        :data-idle="playing && idle ? 'true' : undefined"
        :style="{ '--progress': progress, '--buffered': buffered }"
        @pointermove="wake"
        @pointerleave="onPointerLeave"
      >
        <video
          ref="videoRef"
          class="case-video__video"
          :src="src"
          :poster="poster"
          :aria-label="label"
          playsinline
          preload="none"
          :muted="muted"
          @click="toggle"
          @play="onPlay"
          @pause="onPause"
          @ended="ended = true"
          @loadedmetadata="onLoadedMetadata"
          @timeupdate="onTimeUpdate"
          @progress="onProgress"
        />
        <div aria-hidden="true" class="case-video__shade" />
        <div aria-hidden="true" class="case-video__mini-progress">
          <div class="case-video__mini-fill" />
        </div>

        <div class="case-video__controls">
          <div
            role="slider"
            tabindex="0"
            aria-label="Seek"
            :aria-valuemin="0"
            :aria-valuemax="Math.round(duration)"
            :aria-valuenow="Math.round(time)"
            :aria-valuetext="formatTime(time)"
            class="case-video__scrub"
            @pointerdown="onScrub"
            @keydown="onScrubKey"
          >
            <div class="case-video__track">
              <div class="case-video__buffered" />
              <div class="case-video__played" />
            </div>
            <div class="case-video__thumb-rail">
              <span class="case-video__thumb" />
            </div>
          </div>

          <div class="case-video__bar">
            <button type="button" class="case-video__button" :aria-label="playLabel" :title="playLabel" @click="toggle">
              <IconPauseFill v-if="playing" class="case-video__icon" />
              <IconPlayFill v-else class="case-video__icon" />
            </button>
            <span class="case-video__time">
              <span>{{ formatTime(time) }}</span>
              <span v-if="duration > 0"> / {{ formatTime(duration) }}</span>
            </span>
            <button
              type="button"
              class="case-video__button"
              :aria-label="muteLabel"
              :title="muteLabel"
              @click="muted = !muted"
            >
              <IconSpeakerSlashFill v-if="muted" class="case-video__icon" />
              <IconSpeakerHighFill v-else class="case-video__icon" />
            </button>
            <button
              type="button"
              class="case-video__button"
              aria-label="Full screen"
              title="Full screen"
              @click="toggleFullscreen"
            >
              <IconCornersOutBold class="case-video__icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "case-media";
@use "abstracts" as *;

// Player inside a `.case-media__frame` (16:9, rounded, ringed).
.case-video {
  position: absolute;
  inset: 0;
  isolation: isolate;
  overflow: hidden;
  background-color: #0d0d0f;
  outline: none;

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: scale 0.7s var(--ease-out-quint);

    @include reduced-motion {
      transition: none;
    }

    @include parent-hover(".case-video") {
      scale: 1.015;
    }

    .case-video[data-idle] & {
      cursor: none;
    }
  }

  &__shade {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.1);
    transition: opacity 0.3s var(--ease-default);
  }

  // Thin progress line shown while the controls are hidden.
  &__mini-progress {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    height: 2px;
    opacity: 0;
    transition: opacity 0.3s var(--ease-default);

    .case-video[data-idle] & {
      opacity: 1;
    }
  }

  &__mini-fill {
    width: 100%;
    height: 100%;
    background-color: #296ff0;
    transform-origin: 0;
    transform: scaleX(var(--progress, 0));
  }

  &__controls {
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    padding-inline: 12px;
    color: #fff;
    background-image: linear-gradient(
      to top in oklab,
      oklab(15.9988% 0.00114696 -0.00402176 / 0.45),
      oklab(15.9988% 0.00114696 -0.00402176 / 0.15),
      transparent
    );
    transition: all 0.3s var(--ease-out-quint);

    @include mq(sm) {
      padding-inline: 16px;
      padding-bottom: 10px;
    }

    @include reduced-motion {
      transition: none;
    }

    .case-video[data-idle] & {
      pointer-events: none;
      opacity: 0;
      translate: 0 8px;
    }
  }

  &__scrub {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 16px;
    cursor: pointer;
    touch-action: none;
    border-radius: calc(var(--radius) - 4px);
    outline: none;

    &:focus-visible {
      outline: 2px solid color-mix(in oklab, #fff 60%, transparent);
      outline-offset: 2px;
    }
  }

  &__track {
    position: relative;
    width: 100%;
    height: 3px;
    overflow: hidden;
    background-color: color-mix(in oklab, #fff 20%, transparent);
    border-radius: 9999px;
    transition: scale 0.2s var(--ease-out-quint);

    @include parent-hover(".case-video__scrub") {
      scale: 1 1.67;
    }

    .case-video__scrub:focus-visible & {
      scale: 1 1.67;
    }
  }

  &__buffered,
  &__played {
    position: absolute;
    inset: 0;
    transform-origin: 0;
  }

  &__buffered {
    background-color: color-mix(in oklab, #fff 25%, transparent);
    transform: scaleX(var(--buffered, 0));
  }

  &__played {
    background-color: color-mix(in oklab, #fff 90%, transparent);
    transform: scaleX(var(--progress, 0));
    transition: background-color 0.2s var(--ease-default);

    @include parent-hover(".case-video__scrub") {
      background-color: #296ff0;
    }

    .case-video__scrub:focus-visible & {
      background-color: #296ff0;
    }
  }

  &__thumb-rail {
    pointer-events: none;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
  }

  &__thumb {
    width: 12px;
    height: 12px;
    margin-left: calc(var(--progress, 0) * 100% - 6px);
    background-color: #fff;
    border-radius: 9999px;
    box-shadow: 0 1px 3px #0006;
    scale: 0;
    transition: scale 0.2s var(--ease-out-quint);

    @include parent-hover(".case-video__scrub") {
      scale: 1;
    }

    .case-video__scrub:focus-visible & {
      scale: 1;
    }
  }

  &__bar {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 2px;

    @include mq(sm) {
      margin-top: 4px;
    }
  }

  &__button {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 32px;
    height: 32px;
    color: color-mix(in oklab, #fff 85%, transparent);
    cursor: pointer;
    border-radius: calc(var(--radius) - 2px);
    outline: none;
    transition: all 0.2s var(--ease-default);

    @include hover {
      color: #fff;
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px color-mix(in oklab, #fff 60%, transparent);
    }

    &:active {
      scale: 0.9;
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    filter: drop-shadow(0 1px 2px #0006);
  }

  &__time {
    flex-shrink: 0;
    margin-right: auto;
    padding-inline: 4px;
    font-family: var(--font-bricolage);
    font-size: 12px;
    line-height: 1.33333;
    font-variant-numeric: tabular-nums;
    color: color-mix(in oklab, #fff 85%, transparent);
    text-shadow: 0 1px 2px #0006;
  }
}
</style>

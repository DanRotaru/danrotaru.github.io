<!--
  "Local Time" tile: the current time in Chișinău (ticking each second), a 24-hour
  strip shaded by rough day blocks with a marker at "now", and a hand-written guess
  at what I'm doing. The site is static, so the time only appears after mount.
-->
<script setup lang="ts">
import type { HomeDayBlock } from "@/data/home";

const props = defineProps<{
  timeZone: string;
  blocks: HomeDayBlock[];
  /** Label bottom-left. */
  caption: string;
}>();

const parts = ref<{ h: number; m: number; s: number; weekend: boolean } | null>(null);
let timer: ReturnType<typeof setInterval> | undefined;

function read() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: props.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  });
  const get = (type: string) => fmt.formatToParts(new Date()).find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday");
  parts.value = {
    h: Number(get("hour")),
    m: Number(get("minute")),
    s: Number(get("second")),
    weekend: weekday === "Sat" || weekday === "Sun",
  };
}

onMounted(() => {
  read();
  timer = setInterval(read, 1000);
});

onBeforeUnmount(() => clearInterval(timer));

const pad = (n: number) => String(n).padStart(2, "0");
const time = computed(() => (parts.value ? `${pad(parts.value.h)}:${pad(parts.value.m)}` : "--:--"));
const seconds = computed(() => (parts.value ? pad(parts.value.s) : "--"));

/** Share of the day gone, 0..1. */
const dayShare = computed(() =>
  parts.value ? (parts.value.h * 3600 + parts.value.m * 60 + parts.value.s) / 86_400 : 0,
);

/** Blocks as bar segments (left/width in %). */
const segments = computed(() =>
  props.blocks.map((block, i) => {
    const end = props.blocks[i + 1]?.from ?? 24;
    return { ...block, left: (block.from / 24) * 100, width: ((end - block.from) / 24) * 100 };
  }),
);

const status = computed(() => {
  if (!parts.value) return "";
  const hour = parts.value.h;
  const block = [...props.blocks].reverse().find((b) => hour >= b.from) ?? props.blocks[0]!;
  return parts.value.weekend && block.weekend ? block.weekend : block.label;
});
</script>

<template>
  <div class="home-local-time">
    <div class="home-local-time__body">
      <p class="home-local-time__clock">
        <span class="home-local-time__hm">{{ time }}</span>
        <span aria-hidden="true" class="home-local-time__s">{{ seconds }}</span>
        <Transition name="home-local-time-status" mode="out-in">
          <span v-if="status" :key="status" class="home-local-time__status">~ {{ status }}</span>
        </Transition>
      </p>

      <div aria-hidden="true" class="home-local-time__strip">
        <div class="home-local-time__bar">
          <span
            v-for="segment in segments"
            :key="segment.from"
            class="home-local-time__segment"
            :style="{ left: `${segment.left}%`, width: `${segment.width}%`, '--level': segment.level }"
          />
          <span v-if="parts" class="home-local-time__now" :style="{ left: `${dayShare * 100}%` }" />
        </div>
        <div class="home-local-time__ticks">
          <span>00</span>
          <span>06</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
      </div>
    </div>
    <p class="home-local-time__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

@keyframes home-local-time-pulse {
  50% {
    box-shadow: 0 0 0 5px color-mix(in oklab, $blue 0%, transparent);
  }
}

.home-local-time {
  position: absolute;
  inset: 0;

  &__body {
    position: absolute;
    inset-inline: 1.25rem;
    bottom: 3rem;
  }

  &__clock {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    column-gap: 0.375rem;
    row-gap: 0.25rem;
    margin: 0 0 1rem;
  }

  &__hm {
    font-family: var(--font-mono);
    font-size: 3rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums;
    color: var(--color-foreground);
    transition: color 0.3s ease;

    @include parent-hover($card) {
      color: $blue;
    }
  }

  &__s {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
    color: var(--color-muted-foreground);
  }

  &__status {
    flex-basis: 100%;
    font-family: var(--font-caveat);
    font-size: 1.375rem;
    line-height: 1;
    color: $blue;
  }

  &__bar {
    position: relative;
    height: 0.75rem;
    border-radius: 999px;
    background-color: #fff;
    box-shadow: 0 0 0 1px var(--color-border);

    @include dark {
      background-color: #18181b;
    }
  }

  &__segment {
    position: absolute;
    top: 0;
    bottom: 0;
    border-inline: 1px solid #fff;
    background-color: color-mix(in oklab, $blue calc(var(--level) * 100%), transparent);

    @include dark {
      border-color: #18181b;
    }

    &:first-child {
      border-radius: 999px 0 0 999px;
    }

    &:last-child {
      border-radius: 0 999px 999px 0;
    }
  }

  // "Now": a small ring sitting on the bar.
  &__now {
    position: absolute;
    top: 50%;
    width: 0.875rem;
    height: 0.875rem;
    translate: -50% -50%;
    border: 2px solid var(--color-foreground);
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 0 0 color-mix(in oklab, $blue 45%, transparent);
    animation: home-local-time-pulse 2s ease-in-out infinite;

    @include dark {
      background-color: #18181b;
    }

    @include reduced-motion {
      animation: none;
    }
  }

  &__ticks {
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    font-family: var(--font-mono);
    font-size: 10px;
    color: color-mix(in oklab, var(--color-foreground) 45%, transparent);
  }

  &__caption {
    pointer-events: none;
    position: absolute;
    left: 1.25rem;
    bottom: 1.25rem;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }
}

.home-local-time-status-enter-active,
.home-local-time-status-leave-active {
  transition: opacity 0.3s ease;
}

.home-local-time-status-enter-from,
.home-local-time-status-leave-to {
  opacity: 0;
}
</style>

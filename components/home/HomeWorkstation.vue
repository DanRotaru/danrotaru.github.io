<!--
  "Workstation" tile: a Windows 11 desktop (WinUI 3 look). A soft abstract
  wallpaper, a translucent "Mica" taskbar with Start + Search on the left of a
  centered group of pinned apps (running / focused indicators), and a system
  tray with a live clock. Hovering an app shows its tooltip and lifts it; while
  idle, the `idleApp` tooltip stays visible. Generic shapes only, no logos.
-->
<script setup lang="ts">
import type { HomeDockApp } from "@/data/home";

const props = defineProps<{
  apps: HomeDockApp[];
  /** App whose tooltip is shown while the pointer is away. */
  idleApp: string;
  caption: string;
}>();

const idleIndex = computed(() => Math.max(0, props.apps.findIndex((app) => app.title === props.idleApp)));
const hovered = ref<number | null>(null);
const active = computed(() => hovered.value ?? idleIndex.value);

// Tray clock: SSR renders a neutral placeholder, the client shows the visitor's time.
const time = ref("");
let timer: ReturnType<typeof setInterval> | undefined;
const tickClock = () => {
  time.value = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};
onMounted(() => {
  tickClock();
  timer = setInterval(tickClock, 30_000);
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="home-workstation">
    <div class="home-workstation__screen">
      <!-- Wallpaper: soft abstract ribbons. -->
      <span aria-hidden="true" class="home-workstation__wallpaper" />

      <div class="home-workstation__taskbar" @pointerleave="hovered = null">
        <div aria-hidden="true" class="home-workstation__start-group">
          <span class="home-workstation__start">
            <span /><span /><span /><span />
          </span>
          <span class="home-workstation__search">
            <svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5 14 14" /></svg>
            <span class="home-workstation__search-text">Search</span>
          </span>
        </div>

        <ul class="home-workstation__apps">
          <template v-for="(app, index) in apps" :key="app.title">
            <li v-if="app.divider" aria-hidden="true" class="home-workstation__divider" />
            <li
              :class="['home-workstation__app', { 'home-workstation__app--active': app.active }]"
              @pointerenter="hovered = index"
            >
              <span class="home-workstation__slot">
                <img
                  v-if="app.icon"
                  alt=""
                  class="home-workstation__icon"
                  :src="app.icon"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  :style="{ '--fit': app.fit ?? 1 }"
                />
                <span v-else aria-hidden="true" class="home-workstation__mono" :style="{ '--tile': app.color ?? '#3a3a44' }">{{
                  app.mono ?? app.title[0]
                }}</span>
              </span>
              <span :class="['home-workstation__tooltip', { 'home-workstation__tooltip--visible': index === active }]">{{
                app.title
              }}</span>
              <span
                v-if="app.running || app.active"
                aria-hidden="true"
                :class="['home-workstation__indicator', { 'home-workstation__indicator--active': app.active }]"
              />
            </li>
          </template>
        </ul>

        <div aria-hidden="true" class="home-workstation__tray">
          <svg class="home-workstation__tray-icon" viewBox="0 0 16 16">
            <path d="M2 6.5a9 9 0 0 1 12 0M4.2 8.8a6 6 0 0 1 7.6 0M6.4 11a3 3 0 0 1 3.2 0" />
          </svg>
          <svg class="home-workstation__tray-icon" viewBox="0 0 16 16">
            <path d="M3 6h2.5L9 3v10L5.5 10H3z" />
            <path d="M11 6a3 3 0 0 1 0 4" />
          </svg>
          <span class="home-workstation__clock">{{ time || "--:--" }}</span>
        </div>
      </div>
    </div>
    <p class="home-workstation__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$accent: #4cc2ff; // Windows 11 dark-mode accent family
$card: ".home-bento-card";

.home-workstation {
  position: absolute;
  inset: 0;
  container-type: inline-size;

  &__screen {
    position: absolute;
    inset: 92px 20px 48px;
    overflow: hidden;
    border-radius: 12px;
    box-shadow:
      0 0 0 1px var(--color-border),
      0 18px 36px -22px rgb(0 0 0 / 0.55);
  }

  // Original abstract wallpaper (soft blue ribbons), lighter in light mode.
  &__wallpaper {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(60% 90% at 50% 115%, rgb(76 194 255 / 0.55), transparent 60%),
      radial-gradient(45% 70% at 28% 80%, rgb(0 103 192 / 0.6), transparent 70%),
      radial-gradient(45% 70% at 72% 80%, rgb(0 120 212 / 0.55), transparent 70%),
      linear-gradient(180deg, #dbe9f7 0%, #b8d3ee 100%);
    transition: scale 0.6s var(--ease-out-quint);

    @include dark {
      background:
        radial-gradient(60% 90% at 50% 115%, rgb(76 194 255 / 0.45), transparent 60%),
        radial-gradient(45% 70% at 28% 80%, rgb(0 90 170 / 0.7), transparent 70%),
        radial-gradient(45% 70% at 72% 80%, rgb(0 103 192 / 0.6), transparent 70%),
        linear-gradient(180deg, #0b1a2e 0%, #10294a 100%);
    }

    @include parent-hover($card) {
      scale: 1.04;
    }
  }

  // Mica-like taskbar.
  &__taskbar {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 6px;
    height: 48px;
    padding-inline: 6px;
    background-color: rgb(243 243 243 / 0.82);
    backdrop-filter: blur(24px) saturate(150%);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.5);

    @include dark {
      background-color: rgb(32 32 32 / 0.82);
      box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
    }
  }

  &__start-group {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }

  // Generic Start glyph: four rounded tiles.
  &__start {
    display: grid;
    flex: none;
    grid-template-columns: repeat(2, 7px);
    gap: 1.5px;
    padding: 8px;
    border-radius: 6px;

    > span {
      width: 7px;
      height: 7px;
      border-radius: 1px;
      background-color: #0078d4;

      @include dark {
        background-color: $accent;
      }
    }
  }

  &__search {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    height: 30px;
    padding-inline: 10px;
    border-radius: 999px;
    background-color: rgb(255 255 255 / 0.7);
    box-shadow: 0 0 0 1px rgb(0 0 0 / 0.06);

    @include dark {
      background-color: rgb(255 255 255 / 0.07);
      box-shadow: 0 0 0 1px rgb(255 255 255 / 0.06);
    }

    svg {
      flex: none;
      width: 12px;
      height: 12px;
      fill: none;
      stroke: color-mix(in oklab, var(--color-foreground) 60%, transparent);
      stroke-width: 1.5;
      stroke-linecap: round;
    }

    @container (width < 544px) {
      display: none;
    }
  }

  &__search-text {
    font-size: 11px;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    @include truncate;
  }

  &__apps {
    display: flex;
    align-items: center;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__divider {
    width: 1px;
    height: 24px;
    margin-inline: 4px;
    background-color: color-mix(in oklab, var(--color-foreground) 15%, transparent);
  }

  &__app {
    position: relative;

    // Narrow tiles: keep the first seven pinned apps, like an overflowing taskbar.
    @container (width < 544px) {
      &:nth-child(n + 8) {
        display: none;
      }
    }

    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    transition: background-color 0.15s ease;

    &:hover,
    &--active {
      background-color: rgb(255 255 255 / 0.55);

      @include dark {
        background-color: rgb(255 255 255 / 0.08);
      }
    }

    @container (width < 480px) {
      width: 32px;
      height: 32px;
    }
  }

  &__slot {
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    transition: translate 0.25s var(--ease-out-quint);

    .home-workstation__app:hover & {
      translate: 0 -2px;
    }

    @container (width < 480px) {
      width: 22px;
      height: 22px;
    }
  }

  &__icon {
    width: calc(100% * var(--fit));
    height: calc(100% * var(--fit));
    border-radius: 4.8px;
    object-fit: contain;
  }

  // Lettered tile for apps without an icon file (no official logos).
  &__mono {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    border-radius: 4.8px;
    background-color: var(--tile);
    font-family: var(--font-bricolage);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: -0.18px;
    color: #fff;
  }

  // Running = short grey pill, focused = wider accent pill.
  &__indicator {
    position: absolute;
    left: 50%;
    bottom: 1px;
    width: 6px;
    height: 3px;
    border-radius: 999px;
    translate: -50% 0;
    background-color: color-mix(in oklab, var(--color-foreground) 45%, transparent);
    transition: width 0.25s var(--ease-out-quint);

    &--active {
      width: 16px;
      background-color: #0078d4;

      @include dark {
        background-color: $accent;
      }
    }
  }

  &__tooltip {
    pointer-events: none;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    z-index: 2;
    padding: 4px 8px;
    border-radius: 6px;
    translate: -50% 4px;
    background-color: rgb(249 249 249 / 0.96);
    box-shadow:
      0 0 0 1px rgb(0 0 0 / 0.08),
      0 8px 16px -6px rgb(0 0 0 / 0.3);
    font-size: 11px;
    white-space: nowrap;
    color: #1a1a1a;
    opacity: 0;
    transition:
      opacity 0.15s ease,
      translate 0.2s var(--ease-out-quint);

    @include dark {
      background-color: rgb(44 44 44 / 0.96);
      box-shadow:
        0 0 0 1px rgb(255 255 255 / 0.08),
        0 8px 16px -6px rgb(0 0 0 / 0.6);
      color: #f3f3f3;
    }

    &--visible {
      opacity: 1;
      translate: -50% 0;
    }
  }

  &__tray {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding-right: 4px;
  }

  &__tray-icon {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: color-mix(in oklab, var(--color-foreground) 70%, transparent);
    stroke-width: 1.3;
    stroke-linecap: round;
    stroke-linejoin: round;

    @container (width < 480px) {
      display: none;
    }
  }

  &__clock {
    font-size: 11px;
    font-variant-numeric: tabular-nums;
    color: var(--color-foreground);
  }

  &__caption {
    pointer-events: none;
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }

  @include reduced-motion {
    &__wallpaper,
    &__slot,
    &__tooltip,
    &__indicator {
      transition: none !important;
    }
  }
}
</style>

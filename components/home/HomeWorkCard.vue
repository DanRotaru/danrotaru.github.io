<!--
  Gradient "browser card" with the project tagline and its screenshots,
  arranged per `config.layout` and animated on hover (lg+).
-->
<script setup lang="ts">
import type { HomeWorkProject } from "@/data/home";
import type { WorkProject } from "@/data/projects";

const props = defineProps<{
  project: WorkProject;
  config: HomeWorkProject;
  /** Where the card links (defaults to the case study). */
  href?: string;
  /** Open `href` in a new tab. */
  external?: boolean;
  /** Static preview: no link, no lift on hover; slides are dragged instead of clicked through. */
  preview?: boolean;
}>();

const NuxtLink = resolveComponent("NuxtLink");

type Shot = { src: string; alt: string; width: number; height: number; index: number };
type PlacedShot = { shot: Shot; className: string; framed: boolean };

const shots = computed<Shot[]>(() =>
  props.project.images.map((image, index) => {
    const [width, height] = props.config.imageSizes[index] ?? [1600, 1000];
    return { src: image.src, alt: image.alt, width, height, index };
  }),
);

/** Screenshots (with their modifier classes) placed for the card layout. */
const media = computed<{ stage: string | null; shots: PlacedShot[] }>(() => {
  const list = shots.value;
  const place = (index: number, className: string, framed = true): PlacedShot[] => {
    const shot = list[index];
    return shot ? [{ shot, className, framed }] : [];
  };

  switch (props.config.layout) {
    case "duo":
      return {
        stage: "home-work-card__stage--duo",
        shots: [...place(0, "home-work-card__shot--duo-front"), ...place(1, "home-work-card__shot--duo-back")],
      };
    case "phones":
      return {
        stage: "home-work-card__stage--phones",
        shots: [
          ...place(0, "home-work-card__shot--phone home-work-card__shot--phone-left", false),
          ...place(1, "home-work-card__shot--phone home-work-card__shot--phone-center", false),
          ...place(2, "home-work-card__shot--phone home-work-card__shot--phone-right", false),
        ],
      };
    case "stack":
      return {
        stage: "home-work-card__stage--stack",
        shots: [...place(0, "home-work-card__shot--stack-top"), ...place(1, "home-work-card__shot--stack-bottom")],
      };
    default:
      return {
        stage: null,
        shots: place(
          0,
          props.config.layout === "single-left"
            ? "home-work-card__shot--single home-work-card__shot--single-left"
            : "home-work-card__shot--single",
        ),
      };
  }
});

// --- "slides" layout: auto-advancing screenshots (only while on screen,
// paused on hover, off for reduced motion).
const SLIDE_MS = 3500;
const isSlides = computed(() => props.config.layout === "slides" && shots.value.length > 1);
const slide = ref(0);
const root = ref<HTMLElement | null>(null);
const hovered = ref(false);
const onScreen = ref(false);
const reduceMotion = ref(false);
let slideTimer: ReturnType<typeof setInterval> | undefined;
let slideObserver: IntersectionObserver | undefined;

const dragging = ref(false);
const dragOffset = ref(0);

const autoplay = computed(
  () => isSlides.value && onScreen.value && !hovered.value && !dragging.value && !reduceMotion.value,
);
watch(autoplay, (on) => {
  clearInterval(slideTimer);
  if (on) slideTimer = setInterval(() => (slide.value = (slide.value + 1) % shots.value.length), SLIDE_MS);
});

// Drag / swipe the track (pointer events; vertical scrolling still works on touch).
const track = ref<HTMLElement | null>(null);
let startX = 0;
let startTime = 0;
let width = 1;

function onDragStart(event: PointerEvent) {
  if (!isSlides.value || event.button !== 0) return;
  dragging.value = true;
  startX = event.clientX;
  startTime = performance.now();
  width = track.value?.getBoundingClientRect().width || 1;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
}

function onDragMove(event: PointerEvent) {
  if (!dragging.value) return;
  let offset = event.clientX - startX;
  // Rubber-band past the first / last slide.
  const atStart = slide.value === 0 && offset > 0;
  const atEnd = slide.value === shots.value.length - 1 && offset < 0;
  if (atStart || atEnd) offset *= 0.35;
  dragOffset.value = offset;
}

function onDragEnd() {
  if (!dragging.value) return;
  const offset = dragOffset.value;
  const fast = Math.abs(offset) / Math.max(performance.now() - startTime, 1) > 0.5;
  if (Math.abs(offset) > width * 0.2 || (fast && Math.abs(offset) > 20)) {
    const next = slide.value + (offset < 0 ? 1 : -1);
    slide.value = Math.min(Math.max(next, 0), shots.value.length - 1);
  }
  dragOffset.value = 0;
  dragging.value = false;
}

const trackStyle = computed(() => ({
  transform: `translate3d(calc(${-slide.value * 100}% + ${dragOffset.value}px), 0, 0)`,
}));

onMounted(() => {
  if (!isSlides.value || !root.value) return;
  reduceMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  slideObserver = new IntersectionObserver(([entry]) => (onScreen.value = !!entry?.isIntersecting), { threshold: 0.3 });
  slideObserver.observe(root.value);
});

onBeforeUnmount(() => {
  clearInterval(slideTimer);
  slideObserver?.disconnect();
});

const shotClass = (item: PlacedShot) => [
  "home-work-card__shot",
  { "home-work-card__shot--framed": item.framed },
  item.className,
];
</script>

<template>
  <div
    ref="root"
    :class="['home-work-card', { 'home-work-card--preview': preview }]"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <component
      :is="preview ? 'div' : NuxtLink"
      v-bind="
        preview
          ? {}
          : {
              to: href ?? `/projects/${project.slug}`,
              'aria-label': external ? `Open ${project.title}` : `View Details of ${project.title}`,
              target: external ? '_blank' : undefined,
              rel: external ? 'noopener noreferrer' : undefined,
            }
      "
      draggable="false"
      class="home-work-card__link"
      :style="{ '--work-gradient': config.gradient }"
    >
      <div class="home-work-card__frame">
        <div aria-hidden="true" class="home-work-card__bg" />
        <div aria-hidden="true" class="home-work-card__bg home-work-card__bg--hover" />
        <div aria-hidden="true" class="home-work-card__shade">
          <div class="home-work-card__shade-tint" />
          <div class="home-work-card__shade-top" />
        </div>
        <div aria-hidden="true" class="home-work-card__fade" />
        <div aria-hidden="true" class="home-work-card__edge" />
        <div aria-hidden="true" class="home-work-card__sheen" />
        <div class="home-work-card__caption">
          <p class="home-work-card__tagline">{{ project.tagline }}</p>
          <IconArrowRight v-if="!preview" class="home-work-card__arrow" aria-hidden="true" />
        </div>
        <div class="home-work-card__media">
          <div
            v-if="isSlides"
            :class="[
              'home-work-card__shot home-work-card__shot--framed home-work-card__shot--single home-work-card__slides',
              { 'home-work-card__slides--dragging': dragging },
            ]"
            :style="{ aspectRatio: `${shots[0]!.width} / ${shots[0]!.height}` }"
            @pointerdown="onDragStart"
            @pointermove="onDragMove"
            @pointerup="onDragEnd"
            @pointercancel="onDragEnd"
          >
            <div ref="track" class="home-work-card__track" :style="trackStyle">
              <img
                v-for="shot in shots"
                :key="shot.src"
                :src="shot.src"
                :alt="shot.alt"
                :width="shot.width"
                :height="shot.height"
                draggable="false"
                :loading="shot.index === 0 ? 'eager' : 'lazy'"
                decoding="async"
                class="home-work-card__slide"
              />
            </div>
          </div>
          <div v-else-if="media.stage" :class="['home-work-card__stage', media.stage]">
            <img
              v-for="item in media.shots"
              :key="item.shot.src"
              :src="item.shot.src"
              :alt="item.shot.alt"
              :width="item.shot.width"
              :height="item.shot.height"
              draggable="false"
              loading="lazy"
              decoding="async"
              :class="shotClass(item)"
            />
          </div>
          <template v-else>
            <img
              v-for="item in media.shots"
              :key="item.shot.src"
              :src="item.shot.src"
              :alt="item.shot.alt"
              :width="item.shot.width"
              :height="item.shot.height"
              draggable="false"
              loading="lazy"
              decoding="async"
              :class="shotClass(item)"
            />
          </template>
        </div>
      </div>
    </component>
    <div v-if="isSlides" class="home-work-card__pager">
      <button
        v-for="shot in shots"
        :key="shot.src"
        type="button"
        :aria-label="`Show ${project.title} screenshot ${shot.index + 1} of ${shots.length}`"
        :aria-current="shot.index === slide"
        :class="['home-work-card__dot', { 'home-work-card__dot--active': shot.index === slide }]"
        @click="slide = shot.index"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$ease-rest: cubic-bezier(0.32, 0.72, 0, 1);
$ease-hover: cubic-bezier(0.22, 1, 0.36, 1);
$ease-bounce: cubic-bezier(0.34, 1.4, 0.64, 1);

/// Hover of the card link, large screens only.
@mixin card-hover {
  @include mq(lg) {
    @include parent-hover(".home-work-card__link") {
      @content;
    }
  }
}

.home-work-card {
  position: relative;
  transition: translate 0.5s var(--ease-default);

  @include reduced-motion {
    transition: none;
  }

  @include mq(lg) {
    @include hover {
      translate: 0 -8px;
    }
  }

  // Single screenshot / slides: the card is as tall as its content.
  &__link:has(.home-work-card__shot--single) {
    aspect-ratio: auto;
  }

  // Outer bezel
  &__link {
    position: relative;
    isolation: isolate;
    display: block;
    width: 100%;
    aspect-ratio: 16 / 11;
    padding: 4px;
    cursor: pointer;
    border-radius: calc(var(--radius) * 1.8);
    background-image: linear-gradient(to bottom in oklab, #fff, #f1f1f4);
    box-shadow:
      inset 0 1px 0 #fff,
      inset 0 -1px 0 #0000000a,
      0 0 0 1px #00000012,
      0 1px 2px #0000000f,
      0 14px 34px -14px #00000047;

    @include mq(sm) {
      aspect-ratio: 16 / 9;
    }

    @include mq(md) {
      aspect-ratio: 16 / 10;
    }

    @include mq(lg) {
      aspect-ratio: 16 / 11;
      padding: 8px;
      border-radius: calc(var(--radius) * 2.2);
    }

    @include dark {
      background-image: linear-gradient(
        to bottom in oklab,
        color-mix(in oklab, #fff 10%, transparent),
        color-mix(in oklab, #fff 3.5%, transparent)
      );
      box-shadow:
        inset 0 1px 0 #ffffff29,
        inset 0 -1px 0 #0006,
        0 0 0 1px #ffffff12,
        0 1px 2px #00000080,
        0 24px 48px -20px #000000d9;
    }

    // Lift shadow revealed on hover
    &::after {
      content: "";
      pointer-events: none;
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      opacity: 0;
      box-shadow: 0 30px 60px -20px #00000059;
      transition: opacity 0.5s var(--ease-default);

      @include reduced-motion {
        transition: none;
      }
    }

    @include hover {
      &::after {
        opacity: 1;
      }
    }

    @include dark {
      &::after {
        box-shadow: 0 36px 70px -24px #000000e6;
      }
    }
  }

  // Inner screen
  &__frame {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: calc(var(--radius) + 4px);
    box-shadow:
      0 0 0 1px #00000024,
      0 1px 2px #0000001f;

    @include mq-down(lg) {
      padding-top: 8px;
    }

    @include mq(lg) {
      border-radius: 16px;
    }

    @include dark {
      box-shadow:
        0 0 0 1px #0009,
        0 1px 2px #0006;
    }
  }

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: var(--work-gradient);

    @include mq(lg) {
      filter: brightness(95%) saturate(90%);
    }

    &--hover {
      opacity: 0;
      filter: brightness(110%) saturate(125%);
      transition: opacity 0.5s var(--ease-in-out);

      @include reduced-motion {
        transition: none;
      }

      @include mq-down(lg) {
        display: none;
      }

      @include mq(lg) {
        filter: brightness(110%) saturate(125%);
      }

      @include card-hover {
        opacity: 1;
      }
    }
  }

  &__shade {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &__shade-tint {
    position: absolute;
    inset: 0;

    @include dark {
      background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.15);
    }
  }

  &__shade-top {
    position: absolute;
    top: 0;
    inset-inline: 0;
    height: 40%;
    background-image: linear-gradient(to bottom in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.15), transparent);

    @include dark {
      background-image: linear-gradient(to bottom in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.35), transparent);
    }
  }

  &__fade {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    inset-inline: 0;
    z-index: 15;
    height: 20%;
    background-image: linear-gradient(to top in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.2), transparent);

    @include dark {
      background-image: linear-gradient(to top in oklab, oklab(15.9988% 0.00114696 -0.00402176 / 0.4), transparent);
    }
  }

  &__edge {
    pointer-events: none;
    position: absolute;
    inset: 0;
    z-index: 20;
    border-radius: inherit;
    box-shadow:
      inset 0 0 0 1px #ffffff1a,
      inset 0 1px 0 #ffffff29;
  }

  &__sheen {
    pointer-events: none;
    position: absolute;
    top: 0;
    inset-inline: 0;
    z-index: 20;
    height: 1px;
    background-image: linear-gradient(90deg, transparent 15%, #ffffff52 50%, transparent 85%);
  }

  &__caption {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    width: 100%;
    padding: 8px 16px;
    color: rgb(255 255 255 / 0.9);
    text-shadow: 0 1px 12px #00000040;

    @include mq(md) {
      padding: 16px 24px;
    }

    @include mq(lg) {
      padding: 24px 28px;
    }
  }

  &__tagline {
    font-size: 16px;
    line-height: 1.5;
    text-wrap: pretty;

    @include mq(sm) {
      font-size: 20px;
      line-height: 1.4;
    }

    @include mq(md) {
      font-size: 24px;
      line-height: 1.33333;
    }

    @include mq(lg) {
      font-size: 20px;
      line-height: 1.4;
    }

    @include mq(xl) {
      font-size: 24px;
      line-height: 1.33333;
    }
  }

  &__arrow {
    display: none;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    transition: translate 0.3s var(--ease-out-quint);

    @include mq(sm) {
      display: block;
    }

    @include mq(md) {
      width: 24px;
      height: 24px;
    }

    @include parent-hover(".home-work-card__link") {
      translate: 6px 0;
      transition: translate 0.5s $ease-bounce;
    }
  }

  &__media {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 4px;

    // Single screenshot / slides: ~20px under the caption, then the shot runs
    // off the bottom edge (the negative margin crops its bottom border).
    &:has(> .home-work-card__shot--single) {
      margin-top: 0;
      padding-top: 12px;

      @include mq(lg) {
        padding-top: 0;
        margin-top: -4px;
      }

      > .home-work-card__shot--single {
        translate: none;
        margin-bottom: -20px;
      }
    }
  }

  // "slides": a horizontal track of screenshots, auto-advancing and draggable.
  &__slides {
    position: relative;
    overflow: hidden;
    background-color: #0d0d0f;
    cursor: grab;
    touch-action: pan-y;
    user-select: none;

    &--dragging {
      cursor: grabbing;
    }
  }

  &__track {
    display: flex;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);

    .home-work-card__slides--dragging & {
      transition: none;
    }

    @include reduced-motion {
      transition: none;
    }
  }

  &__slide {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left top;
    pointer-events: none;
  }

  // Static preview (/projects): not a link, no lift or tilt on hover; the
  // background still brightens.
  &--preview {
    @include mq(lg) {
      @include hover {
        translate: none;
      }
    }

    .home-work-card__link {
      cursor: default;
    }

    @include mq(lg) {
      @media (hover: hover) {
        .home-work-card__link:hover .home-work-card__shot {
          transform: none;
        }
      }
    }
  }

  &__pager {
    position: absolute;
    bottom: 16px;
    left: 50%;
    z-index: 20;
    display: flex;
    gap: 6px;
    padding: 6px 8px;
    translate: -50% 0;
    border-radius: 999px;
    background-color: rgb(13 13 15 / 0.45);
    backdrop-filter: blur(8px);
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background-color: rgb(255 255 255 / 0.45);
    cursor: pointer;
    transition:
      width 0.3s var(--ease-default),
      background-color 0.3s var(--ease-default);
    @include focus-ring;

    &--active {
      width: 18px;
      background-color: #fff;
    }
  }

  // Screenshot arrangements
  &__stage {
    position: relative;
    display: flex;
    width: 100%;

    &--duo {
      align-items: center;
      justify-content: center;
      padding-top: 16px;
      perspective: 2000px;
    }

    &--phones {
      align-items: flex-start;
      justify-content: center;
      perspective: 2000px;
    }

    &--stack {
      justify-content: flex-start;
      padding-top: 8px;
    }
  }

  // Screenshots
  &__shot {
    height: auto;
    object-fit: cover;
    transition-duration: 0.45s;
    transition-timing-function: $ease-rest;

    @include reduced-motion {
      transition: none !important;
    }

    @include card-hover {
      transition-duration: 0.7s;
      transition-timing-function: $ease-hover;
    }

    &--framed {
      border: 2px solid rgb(255 255 255 / 0.4);
      border-top-color: rgb(255 255 255 / 0.6);
      border-top-left-radius: var(--radius-md);
      border-top-right-radius: var(--radius-md);
      box-shadow:
        0 0 0 1px #00000040,
        0 4px 16px #00000059,
        0 18px 50px -8px #00000080;
    }

    // One screenshot, tilted (keythm / nextdemy)
    &--single {
      width: 100%;
      max-width: 90%;
      transform-origin: bottom;
      translate: 0 20px;
      rotate: 1deg;
      transition-property: transform, translate, scale, rotate;

      @include mq(lg) {
        rotate: 0deg;
      }

      @include card-hover {
        transform: perspective(1200px) rotateX(6deg) translateY(-8px) rotate(1deg) scale(1.045);
      }
    }

    &--single-left {
      rotate: -2deg;

      @include mq(lg) {
        rotate: 0deg;
      }

      @include card-hover {
        transform: perspective(1200px) rotateX(6deg) translateY(-8px) rotate(-1.5deg) scale(1.05);
      }
    }

    // Two desktop screenshots (venture-den)
    &--duo-front {
      width: 85%;
      translate: -40px 0;
      rotate: -6deg;
      scale: 0.8;
      filter: brightness(90%);
      transition-property: translate, rotate, scale, filter;

      @include mq-down(lg) {
        z-index: 10;
      }

      @include mq(lg) {
        translate: 0 0;
        rotate: 0deg;
        scale: 1;
        filter: brightness(100%);
      }

      @include card-hover {
        translate: -40px 0;
        rotate: -6deg;
        scale: 0.9;
        filter: brightness(0.85);
      }
    }

    &--duo-back {
      position: absolute;
      right: 5%;
      bottom: 0;
      width: 65%;
      translate: 16px -20px;
      rotate: 3deg;
      scale: 0.9;
      opacity: 1;
      transition-property: translate, rotate, scale, opacity;

      @include mq(lg) {
        translate: 0 48px;
        rotate: 12deg;
        scale: 0.75;
        opacity: 0;
      }

      @include card-hover {
        translate: 16px -20px;
        rotate: 3deg;
        scale: 1;
        opacity: 1;
        transition-duration: 0.8s;
        transition-timing-function: cubic-bezier(0.34, 1.36, 0.64, 1);
        transition-delay: 75ms;
      }
    }

    // Three phone screenshots (finote)
    &--phone {
      position: absolute;
      width: 40%;
      transition-property: translate, rotate, scale, opacity;
    }

    &--phone-left,
    &--phone-right {
      z-index: 10;
      scale: 0.9;
      opacity: 0.9;

      @include card-hover {
        rotate: 0deg;
        scale: 0.8;
        opacity: 1;
        transition-delay: 75ms;
      }
    }

    &--phone-left {
      transform-origin: 100% 100%;
      translate: -55% 0;
      rotate: -6deg;

      @include card-hover {
        translate: calc(-100% + 24px) -80px;
      }
    }

    &--phone-right {
      transform-origin: 0 100%;
      translate: 55% 0;
      rotate: 6deg;

      @include card-hover {
        translate: calc(100% - 24px) -80px;
      }
    }

    &--phone-center {
      z-index: 20;

      @include card-hover {
        translate: 0 -40px;
        scale: 0.9;
      }
    }

    // Two stacked screenshots (star-forge)
    &--stack-top {
      position: absolute;
      top: 12px;
      right: 3%;
      z-index: 20;
      width: 68%;
      transition-property: translate, rotate, scale, filter, z-index;

      @include mq(lg) {
        top: 0;
      }

      @include card-hover {
        z-index: 15;
        translate: 0 3%;
        rotate: 3deg;
        scale: 0.95;
        filter: brightness(0.85);
      }
    }

    &--stack-bottom {
      position: relative;
      z-index: 10;
      width: 55%;
      margin-left: 3%;
      translate: 0 40px;
      transition-property: translate, rotate, scale, z-index;

      @include card-hover {
        z-index: 30;
        translate: 5% 0;
        rotate: -3deg;
        scale: 1.08;
        transition-delay: 75ms;
      }
    }
  }
}
</style>

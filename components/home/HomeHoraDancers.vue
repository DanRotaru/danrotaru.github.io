<!--
  "Hora" hero band (full width): a row of pixel dancers holding hands (girls in
  wide yellow / blue skirts, boys with red sashes), little red hearts above the
  joined hands, and stepped zigzag borders above and below, all on white fabric.
  Hover: the dancers bob in turn (a hora step), the band drifts sideways and the
  borders run the other way.
-->
<script setup lang="ts">
import { homeHoraRects, type HomeHoraGrid } from "@/data/home";

const props = defineProps<{
  caption: string;
  sprites: { girlYellow: HomeHoraGrid; boy: HomeHoraGrid; girlBlue: HomeHoraGrid; heart: HomeHoraGrid };
}>();

const PITCH = 10; // one dancer + one stitch where the hands meet
const UNITS = 36; // 9 repeats of [girl, boy, girl, boy]: wider than any card + one tile
const BORDER = 7;
const STRIP_TOP = BORDER; // sky strip rows 7..26
const STRIP_H = 20;
const ROWS = BORDER * 2 + STRIP_H;
const COLS = PITCH * UNITS;
const TILE = PITCH * 4;

const id = (s: string) => `home-hora-dancers-${s}`;

const order = ["girlYellow", "boy", "girlBlue", "boy"] as const;
const defs = computed(() => ({
  girlYellow: homeHoraRects(props.sprites.girlYellow),
  girlBlue: homeHoraRects(props.sprites.girlBlue),
  boy: homeHoraRects(props.sprites.boy),
  heart: homeHoraRects(props.sprites.heart),
}));

const dancers = Array.from({ length: UNITS }, (_, i) => ({
  key: i,
  href: `#${id(order[i % 4]!)}`,
  x: i * PITCH,
  phase: i % 4,
}));

// Stepped zigzag tile (8 × 7): red rules, a blue zigzag, yellow + red diamonds.
function zigzag(flip: boolean) {
  const cells: { x: number; y: number; fill: string }[] = [];
  const put = (x: number, y: number, fill: string) =>
    cells.push({ x: ((x % 8) + 8) % 8, y: flip ? BORDER - 1 - y : y, fill });
  for (let x = 0; x < 8; x++) {
    put(x, 0, "#D4283A");
    put(x, 6, "#D4283A");
    put(x, 1 + Math.abs(x - 4), "#1F57C3");
  }
  // Yellow diamond over each valley, red diamond under each peak.
  for (const [dx, dy] of [[0, 1], [0, 2], [0, 3], [-1, 2], [1, 2]] as const) put(dx, dy, "#F2C318");
  for (const [dx, dy] of [[4, 3], [4, 4], [4, 5], [3, 4], [5, 4]] as const) put(dx, dy, "#D4283A");
  return cells;
}
const zigTop = zigzag(false);
const zigBottom = zigzag(true);
</script>

<template>
  <div class="home-hora-dancers">
    <div aria-hidden="true" class="home-hora-dancers__fabric">
      <svg
        class="home-hora-dancers__svg"
        :viewBox="`0 0 ${COLS} ${ROWS}`"
        :width="COLS * 6"
        :height="ROWS * 6"
        shape-rendering="crispEdges"
      >
        <defs>
          <g v-for="(rects, name) in defs" :id="id(name)" :key="name">
            <rect v-for="(r, k) in rects" :key="k" :x="r.x" :y="r.y" width="1" height="1" :fill="r.fill" />
          </g>
          <pattern :id="id('zig-top')" width="8" :height="BORDER" patternUnits="userSpaceOnUse">
            <rect v-for="(r, k) in zigTop" :key="k" :x="r.x" :y="r.y" width="1" height="1" :fill="r.fill" />
          </pattern>
          <pattern
            :id="id('zig-bottom')"
            width="8"
            :height="BORDER"
            patternUnits="userSpaceOnUse"
            :y="BORDER + STRIP_H"
          >
            <rect v-for="(r, k) in zigBottom" :key="k" :x="r.x" :y="r.y" width="1" height="1" :fill="r.fill" />
          </pattern>
        </defs>

        <!-- Borders: run the opposite way on hover. -->
        <g class="home-hora-dancers__borders">
          <rect :x="-TILE" y="0" :width="COLS + TILE" :height="BORDER" :fill="`url(#${id('zig-top')})`" />
          <rect
            :x="-TILE"
            :y="BORDER + STRIP_H"
            :width="COLS + TILE"
            :height="BORDER"
            :fill="`url(#${id('zig-bottom')})`"
          />
        </g>

        <rect x="0" :y="STRIP_TOP" :width="COLS" :height="STRIP_H" fill="#EAF2FF" />

        <!-- The round: drifts sideways by one 4-dancer tile, seamlessly. -->
        <g class="home-hora-dancers__round">
          <g v-for="d in dancers" :key="d.key" :class="`home-hora-dancers__step home-hora-dancers__step--${d.phase}`">
            <use :href="d.href" :x="d.x" :y="STRIP_TOP + 3" />
            <!-- Joined hands: the stitch between this dancer and the next. -->
            <rect :x="d.x + 9" :y="STRIP_TOP + 6" width="1" height="1" fill="#1F57C3" />
          </g>
          <g
            v-for="d in dancers"
            :key="`h${d.key}`"
            :class="`home-hora-dancers__heart home-hora-dancers__heart--${d.phase}`"
          >
            <use :href="`#${id('heart')}`" :x="d.x + 7" :y="STRIP_TOP + 1" />
          </g>
        </g>
      </svg>
    </div>
    <p class="home-hora-dancers__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$card: ".home-bento-card";

@keyframes home-hora-dancers-step {
  0% {
    translate: 0 0;
  }

  25% {
    translate: 0 -1px;
  }

  50% {
    translate: 0 0;
  }
}

@keyframes home-hora-dancers-heart {
  0% {
    translate: 0 0;
  }

  50% {
    translate: 0 -1px;
  }
}

@keyframes home-hora-dancers-drift {
  to {
    translate: -40px 0;
  }
}

@keyframes home-hora-dancers-run {
  to {
    translate: 40px 0;
  }
}

// Scroll-driven versions: the round moves three tiles (the SVG is wide enough)
// and the borders one tile while the card crosses the viewport.
@keyframes home-hora-dancers-scroll-drift {
  from {
    translate: 0 0;
  }

  to {
    translate: -120px 0;
  }
}

@keyframes home-hora-dancers-scroll-run {
  from {
    translate: 0 0;
  }

  to {
    translate: 40px 0;
  }
}

// Named view timeline for the scroll animation. It sits on the section around the
// card: the card clips its content (overflow: hidden makes it a scroll container),
// so a timeline declared inside it would track the card, which never scrolls.
.home-bento-section:has(.home-hora-dancers) {
  view-timeline: --home-hora-dancers block;
}

.home-hora-dancers {
  position: absolute;
  inset: 0;

  &__fabric {
    position: absolute;
    inset: 104px 20px 44px;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    background-image:
      repeating-linear-gradient(0deg, rgb(31 87 195 / 0.05) 0 1px, transparent 1px 6px),
      repeating-linear-gradient(90deg, rgb(31 87 195 / 0.05) 0 1px, transparent 1px 6px);
    box-shadow:
      0 0 0 1px var(--color-border),
      0 14px 30px -18px rgb(0 0 0 / 0.4);
  }

  &__svg {
    display: block;
    flex: none;
    max-height: 100%;
    width: auto;
    height: 204px;

    @include mq-down(md) {
      height: 170px;
    }
  }

  // CSS-only scroll animation (where supported): the dance plays as the card
  // scrolls through the viewport. Hover below takes over with the timed loop
  // (its `animation` shorthand resets the timeline back to time-based).
  @supports (animation-timeline: view()) {
    &__round {
      animation: home-hora-dancers-scroll-drift linear both;
      animation-timeline: --home-hora-dancers;
    }

    &__borders {
      animation: home-hora-dancers-scroll-run linear both;
      animation-timeline: --home-hora-dancers;
    }

    &__step {
      animation: home-hora-dancers-step 1s step-end 16 both;
      animation-timeline: --home-hora-dancers;
    }

    &__heart {
      animation: home-hora-dancers-heart 1s step-end 16 both;
      animation-timeline: --home-hora-dancers;
    }
  }

  // Timed loop while the card is hovered.
  &__round,
  &__borders,
  &__step,
  &__heart {
    @include reduced-motion {
      animation: none !important;
    }
  }

  &__round {
    @include parent-hover($card) {
      animation: home-hora-dancers-drift 4s linear infinite;
    }
  }

  &__borders {
    @include parent-hover($card) {
      animation: home-hora-dancers-run 8s linear infinite;
    }
  }

  &__step {
    @include parent-hover($card) {
      animation: home-hora-dancers-step 0.8s step-end infinite;
    }
  }

  &__heart {
    @include parent-hover($card) {
      animation: home-hora-dancers-heart 0.8s step-end infinite;
    }
  }

  @for $i from 0 through 3 {
    &__step--#{$i} {
      animation-delay: #{$i * 0.2}s !important;
    }

    &__heart--#{$i} {
      animation-delay: #{$i * 0.2 + 0.1}s !important;
    }
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
}
</style>

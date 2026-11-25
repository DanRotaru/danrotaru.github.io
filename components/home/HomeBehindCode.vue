<!-- Badge hanging from a lanyard that sways toward the pointer ("Behind The Code" tile). -->
<script setup lang="ts">
const SPRING = { stiffness: 0.05, damping: 0.9 };
const MAX_TILT = 5;

const RING = "M3.59 7.15A8 15 -8 0 1 -0.59 36.85A8 15 -8 0 1 3.59 7.15Z";

defineProps<{
  strapText: string;
  photo: { src: string; alt: string; width: number; height: number };
}>();

/** Steel wire: dark outline, gradient body, thin highlight. */
const wire = (d: string, width: number) => [
  { d, fill: "none", stroke: "#4a4c53", "stroke-linecap": "round" as const, "stroke-width": width + 0.6 },
  { d, fill: "none", stroke: "url(#home-behind-code-steel)", "stroke-linecap": "round" as const, "stroke-width": width },
  { d, fill: "none", stroke: "rgb(255 255 255 / 0.75)", "stroke-linecap": "round" as const, "stroke-width": width * 0.22 },
];

const rigRef = ref<HTMLDivElement | null>(null);
const state = { value: 0, velocity: 0, target: 0, frame: 0 };

onBeforeUnmount(() => cancelAnimationFrame(state.frame));

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const tick = () => {
  const s = state;
  let running = true;
  if (reduced()) {
    s.value = s.target;
    s.velocity = 0;
    running = false;
  } else {
    s.velocity = (s.velocity + (s.target - s.value) * SPRING.stiffness) * SPRING.damping;
    s.value += s.velocity;
    if (Math.abs(s.target - s.value) < 0.001 && Math.abs(s.velocity) < 0.001) {
      s.value = s.target;
      s.velocity = 0;
      running = false;
    }
  }
  rigRef.value?.style.setProperty("rotate", `${s.value.toFixed(3)}deg`);
  s.frame = running ? requestAnimationFrame(tick) : 0;
};

const start = () => {
  if (!state.frame) state.frame = requestAnimationFrame(tick);
};

const onPointerEnter = () => {
  if (!reduced()) state.velocity += 0.6;
  start();
};

const onPointerMove = (event: PointerEvent) => {
  const rig = rigRef.value;
  if (!rig || event.pointerType === "touch") return;
  const area = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const box = rig.getBoundingClientRect();
  const offset = event.clientX - (box.left + box.width / 2);
  state.target = -(MAX_TILT * Math.max(-1, Math.min(1, offset / (area.width / 2))));
  start();
};

const onPointerLeave = () => {
  state.target = 0;
  start();
};
</script>

<template>
  <div
    class="home-behind-code"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
  >
    <div ref="rigRef" class="home-behind-code__rig">
      <div class="home-behind-code__strap">
        <span class="home-behind-code__stitch" />
        <span class="home-behind-code__strap-shade" />
        <span aria-hidden="true" class="home-behind-code__strap-text">{{ strapText }}</span>
      </div>
      <span class="home-behind-code__clip" />
      <div class="home-behind-code__badge">
        <div class="home-behind-code__badge-top">
          <span class="home-behind-code__slot" />
        </div>
        <div class="home-behind-code__cutout">
          <img
            :alt="photo.alt"
            class="home-behind-code__photo"
            :src="photo.src"
            :width="photo.width"
            :height="photo.height"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span aria-hidden="true" class="home-behind-code__shine" />
      </div>
      <span class="home-behind-code__ring">
        <svg aria-hidden="true" class="home-behind-code__ring-svg" viewBox="-14 -2 28 48">
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="home-behind-code-steel" x1="-10" x2="10" y1="0" y2="42">
              <stop offset="0" stop-color="#f5f6f8" />
              <stop offset="0.3" stop-color="#b9bcc4" />
              <stop offset="0.5" stop-color="#eceef1" />
              <stop offset="0.75" stop-color="#868991" />
              <stop offset="1" stop-color="#d9dce2" />
            </linearGradient>
            <clipPath id="home-behind-code-above">
              <rect height="20" width="28" x="-14" y="-2" />
            </clipPath>
            <clipPath id="home-behind-code-hole">
              <rect x="-20" y="33" width="40" height="10" rx="5" />
            </clipPath>
          </defs>
          <path v-for="(p, i) in wire('M-6 6A6 4 0 0 1 6 6', 2.2)" :key="`a${i}`" v-bind="p" />
          <g clip-path="url(#home-behind-code-above)">
            <path v-for="(p, i) in wire(RING, 2.6)" :key="`b${i}`" v-bind="p" />
          </g>
          <g clip-path="url(#home-behind-code-hole)" opacity="0.7">
            <path v-for="(p, i) in wire(RING, 2.6)" :key="`c${i}`" v-bind="p" />
          </g>
          <path v-for="(p, i) in wire('M3.59 7.15A8 15 -8 0 0 -0.59 36.85', 2.6)" :key="`d${i}`" v-bind="p" />
          <path v-for="(p, i) in wire('M6 6A6 4 0 0 1 -6 6', 2.2)" :key="`e${i}`" v-bind="p" />
        </svg>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$card: ".home-bento-card";

.home-behind-code {
  position: absolute;
  inset: 0;

  &__rig {
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 168px;
    translate: -50% 0;
    transform-origin: top;
  }

  // Lanyard strap.
  &__strap {
    position: relative;
    width: 36px;
    height: 80px;
    overflow: hidden;
    background-color: #d4d4d9;
    background-image: repeating-linear-gradient(0deg, #0000000f 0 1px, transparent 1px 3px);
    box-shadow:
      inset 1px 0 0 #ffffff80,
      inset -1px 0 0 #0000001f;

    @include dark {
      background-color: #141416;
      background-image: repeating-linear-gradient(0deg, #ffffff0d 0 1px, transparent 1px 3px);
      box-shadow:
        inset 1px 0 0 #ffffff14,
        inset -1px 0 0 #0006;
    }
  }

  &__stitch {
    position: absolute;
    inset-block: 0;
    inset-inline: 3px;
    border-inline: 1px dashed oklab(15.9988% 0.00114696 -0.00402176 / 0.15);

    @include dark {
      border-color: color-mix(in oklab, #fff 14%, transparent);
    }
  }

  &__strap-shade {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    height: 12px;
    background-image: linear-gradient(to bottom in oklab, transparent, oklab(15.9988% 0.00114696 -0.00402176 / 0.2));

    @include dark {
      background-image: linear-gradient(to bottom in oklab, transparent, oklab(15.9988% 0.00114696 -0.00402176 / 0.6));
    }
  }

  &__strap-text {
    position: absolute;
    left: 50%;
    bottom: 8px;
    translate: -50% 0;
    font-family: var(--font-bricolage);
    font-size: 8px;
    line-height: 1;
    letter-spacing: 2.4px;
    white-space: nowrap;
    text-transform: uppercase;
    writing-mode: vertical-rl;
    user-select: none;
    color: oklab(15.9988% 0.00114696 -0.00402176 / 0.32);

    @include dark {
      color: color-mix(in oklab, #fff 32%, transparent);
    }
  }

  &__clip {
    position: relative;
    z-index: 20;
    display: block;
    width: 42px;
    height: 18px;
    margin-top: -4px;
    border: 1px solid #3d3f45;
    border-radius: 5px;
    background-image: linear-gradient(160deg, #a3a5ac, #74767d 50%, #8a8c93);
    box-shadow:
      0 1.5px 2px #0006,
      inset 0 0 0 1px #fff9,
      inset 0 2px 2px #fff3;
  }

  &__badge {
    position: relative;
    width: 100%;
    height: 216px;
    margin-top: 18px;
    overflow: hidden;
    border: 1px solid oklab(15.9988% 0.00114696 -0.00402176 / 0.15);
    border-radius: 14px;
    background-image: linear-gradient(#f8f8f9, #ececee);
    box-shadow:
      0 24px 40px -24px #00000073,
      0 2px 6px -2px #00000014,
      inset 0 1px 0 #ffffffe6;

    @include dark {
      border-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.1);
      box-shadow:
        0 24px 40px -24px #0009,
        inset 0 1px 0 #ffffffe6;
    }
  }

  &__badge-top {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    height: 32px;
    padding-inline: 12px;
    padding-top: 4px;
  }

  &__slot {
    position: absolute;
    top: 14px;
    left: 50%;
    width: 44px;
    height: 12px;
    translate: -50% 0;
    border-radius: 9999px;
    background-color: #141416;
    box-shadow:
      inset 0 1.5px 1.5px #000000b3,
      0 1px 0 #ffffffe6;
  }

  &__cutout {
    position: absolute;
    left: 52.75%;
    bottom: -16px;
    width: 120%;
    translate: -50% 0;
    filter: drop-shadow(1.5px 0 0 #fff) drop-shadow(-1.5px 0 0 #fff) drop-shadow(0 1.5px 0 #fff)
      drop-shadow(0 -1.5px 0 #fff);
  }

  &__photo {
    width: 100%;
    height: auto;
    filter: contrast(125%) grayscale(100%);
    transition: all 0.5s var(--ease-default);

    @include parent-hover($card) {
      filter: contrast(125%) grayscale(0%);
    }
  }

  &__shine {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background-image: linear-gradient(115deg, transparent 40%, #ffffff73 50%, transparent 60%);
    background-position: 100% 0;
    background-size: 250% 100%;
    mix-blend-mode: soft-light;
    transition: all 1s var(--ease-out-quint);

    @include parent-hover($card) {
      background-position: 0 0;
    }
  }

  &__ring {
    pointer-events: none;
    position: absolute;
    top: 92px;
    left: 50%;
    z-index: 10;
    width: 28px;
    height: 48px;
    margin-left: -14px;
  }

  &__ring-svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    filter: drop-shadow(0 1px 1px #00000059);
  }
}
</style>

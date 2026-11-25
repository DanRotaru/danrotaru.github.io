<!--
  "Born in Moldova" tile: a linen birth card framed by an original
  cross-stitch border (dotted black edge, red zigzag with black fillers and
  red/black rosettes in the corners). Hover re-stitches the border clockwise
  around the frame, starting from the top-left corner.
-->
<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  date: string;
  country: string;
  caption: string;
}>();

const COLS = 36;
const ROWS = 16;
const BAND = 4;
const CORNER = [".rr.", "rkkr", "rkkr", ".rr."];
const ZIG = [1, 2, 3, 2];

type Tone = "red" | "black";

// Only border cells are rendered; each knows its clockwise perimeter position.
const stitches = (() => {
  const out: { key: string; tone: Tone; row: number; col: number; delay: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const inTop = r < BAND;
      const inBottom = r > ROWS - 1 - BAND;
      const inLeft = c < BAND;
      const inRight = c > COLS - 1 - BAND;
      if (!inTop && !inBottom && !inLeft && !inRight) continue;

      let tone: Tone | null = null;
      let depth: number;
      if ((inTop || inBottom) && (inLeft || inRight)) {
        const rr = inTop ? r : ROWS - 1 - r;
        const cc = inLeft ? c : COLS - 1 - c;
        const ch = CORNER[rr]?.[cc];
        tone = ch === "r" ? "red" : ch === "k" ? "black" : null;
        depth = Math.min(rr, cc);
      } else {
        const t = inTop || inBottom ? c - BAND : r - BAND;
        depth = inTop ? r : inBottom ? ROWS - 1 - r : inLeft ? c : COLS - 1 - c;
        const m = t % 4;
        if (depth === 0) tone = t % 2 === 0 ? "black" : null;
        else if (depth === ZIG[m]) tone = "red";
        else if ((depth === 1 && m === 2) || (depth === 3 && m === 0)) tone = "black";
      }
      if (!tone) continue;

      // Clockwise position: top → right → bottom → left.
      const p = inTop && !inRight
        ? c
        : inRight && !inBottom
          ? COLS + r
          : inBottom && !inLeft
            ? COLS + ROWS + (COLS - 1 - c)
            : 2 * COLS + ROWS + (ROWS - 1 - r);
      out.push({ key: `${r}-${c}`, tone, row: r + 1, col: c + 1, delay: p * 20 + depth * 45 });
    }
  }
  return out;
})();
</script>

<template>
  <div class="home-born-certificate">
    <div class="home-born-certificate__stage">
      <div class="home-born-certificate__cloth" :style="{ '--cols': COLS, '--rows': ROWS }">
        <span
          v-for="s in stitches"
          :key="s.key"
          aria-hidden="true"
          :class="['home-born-certificate__stitch', `home-born-certificate__stitch--${s.tone}`]"
          :style="{ gridRow: s.row, gridColumn: s.col, '--d': `${s.delay}ms` }"
        />
        <div class="home-born-certificate__text">
          <p class="home-born-certificate__label">{{ label }}</p>
          <p class="home-born-certificate__name">{{ name }}</p>
          <p class="home-born-certificate__meta">
            <template v-if="date">
              <span class="home-born-certificate__date">{{ date }}</span>
              <span aria-hidden="true" class="home-born-certificate__dot" />
            </template>
            <span>{{ country }}</span>
            <!-- Moldovan flag. -->
            <svg
              aria-hidden="true"
              class="home-born-certificate__flag"
              width="15px"
              height="15px"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#DD2E44" d="M32 5h-8v26h8a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z" />
              <path fill="#265FB5" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z" />
              <path fill="#FFCC4D" d="M12 5h12v26H12z" />
              <path fill="#DD2E44" d="M16 15h4v3h-4z" />
              <path fill="#269" d="M16 18v2l2 1l2-1v-2z" />
              <path fill="#A0724A" d="M16 11v1h1v2h2v-3zm3 10l-1 .625L17 21l-1 3l2 1l2-1zm-4-8l-1-1l-1 1v10l2-2v-7h1zm7-1l-1 1l-1 1h1v7l2 2V13z" />
              <path fill="#FFCC4D" d="M16.234 17.594h.531V18h-.531zm3 0h.531V18h-.531z" />
              <path fill="#77B255" d="M15.637 22.743c-.106.062-.263-.01-.35-.159l-2.232-3.866c-.086-.15-.07-.321.037-.383l.136-.078c.106-.062.263.01.349.159l2.232 3.867c.087.149.07.32-.036.382l-.136.078z" />
              <path fill="#FFCC4D" d="M22.817 18.393c.107.061.125.23.039.377l-2.191 3.798c-.086.147-.24.216-.348.155l-.135-.078c-.106-.062-.124-.23-.039-.378l2.192-3.798c.085-.146.24-.217.347-.154l.135.078z" />
              <path fill="#DD2E44" d="M16 21l-1 1v1l1-1zm4 0v1l1 1v-1z" />
              <path fill="#FFCC4D" d="M18 17l-1-1v2.958L18 20l1-1.042V16z" />
            </svg>
          </p>
        </div>
      </div>
    </div>
    <p class="home-born-certificate__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$card: ".home-bento-card";
$red: #b3261e;
$black: #1c1b1a;
$linen: #efe6d2;

@keyframes home-born-certificate-stitch {
  from {
    opacity: 0;
    scale: 0.3;
    rotate: -45deg;
  }
}

.home-born-certificate {
  position: absolute;
  inset: 0;

  &__stage {
    position: absolute;
    top: 88px;
    bottom: 48px;
    inset-inline: 20px;
    display: grid;
    place-items: center;
    container-type: size;
  }

  &__cloth {
    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--cols), 1fr);
    grid-template-rows: repeat(var(--rows), 1fr);
    width: min(100cqw, 100cqh * 36 / 16);
    aspect-ratio: 36 / 16;
    padding: 1.2%;
    border-radius: 6px;
    container-type: inline-size;
    background-color: $linen;
    background-image:
      repeating-linear-gradient(0deg, rgb(0 0 0 / 0.035) 0 1px, transparent 1px 4px),
      repeating-linear-gradient(90deg, rgb(0 0 0 / 0.035) 0 1px, transparent 1px 4px);
    box-shadow:
      0 0 0 1px var(--color-border),
      0 16px 32px -20px rgb(0 0 0 / 0.45);
    rotate: -1deg;
    transition:
      rotate 0.6s var(--ease-out-quint),
      translate 0.6s var(--ease-out-quint);

    @include parent-hover($card) {
      rotate: 0deg;
      translate: 0 -4px;
    }

    @include dark {
      filter: brightness(0.92);
      box-shadow:
        0 0 0 1px rgb(255 255 255 / 0.08),
        0 16px 32px -18px rgb(0 0 0 / 0.8);
    }
  }

  // Each stitch is an "X" made of two diagonal threads.
  &__stitch {
    position: relative;

    &::before,
    &::after {
      content: "";
      position: absolute;
      inset: 4%;
      background: linear-gradient(
        45deg,
        transparent calc(50% - 1.1px),
        var(--thread) calc(50% - 1.1px) calc(50% + 1.1px),
        transparent calc(50% + 1.1px)
      );
    }

    &::after {
      background: linear-gradient(
        -45deg,
        transparent calc(50% - 1.1px),
        var(--thread) calc(50% - 1.1px) calc(50% + 1.1px),
        transparent calc(50% + 1.1px)
      );
    }

    &--red {
      --thread: #{$red};
    }

    &--black {
      --thread: #{$black};
    }

    @include parent-hover($card) {
      animation: home-born-certificate-stitch 0.35s var(--ease-out-quint) var(--d) backwards;
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__text {
    grid-row: 5 / -5;
    grid-column: 5 / -5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.6cqi;
    min-width: 0;
    text-align: center;
    color: $black;
  }

  &__label {
    font-family: var(--font-bricolage);
    font-size: max(9px, 2.1cqi);
    letter-spacing: calc(max(9px, 2.1cqi) * 0.16);
    text-transform: uppercase;
    color: $red;
  }

  &__name {
    font-family: var(--font-instrument-serif);
    font-size: 7.2cqi;
    line-height: 1;
    letter-spacing: -0.072cqi;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: calc(max(10px, 2.5cqi) * 0.4) calc(max(10px, 2.5cqi) * 0.7);
    font-family: var(--font-bricolage);
    font-size: max(10px, 2.5cqi);
    letter-spacing: calc(max(10px, 2.5cqi) * 0.04);
  }

  &__date {
    font-family: var(--font-mono);
    font-weight: 600;
    color: $red;
  }

  // Tiny stitched rhombus separating date and country.
  &__dot {
    width: calc(max(10px, 2.5cqi) * 0.45);
    height: calc(max(10px, 2.5cqi) * 0.45);
    rotate: 45deg;
    background-color: $black;
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

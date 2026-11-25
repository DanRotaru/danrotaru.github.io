<!--
  Deck of fun-fact cards. The top card shows the current fact; two more peek
  out behind it. Click/tap (or Enter/Space) throws the top card off to the
  side and tucks it back under the stack, revealing the next fact.
-->
<script setup lang="ts">
import type { HomeFactCard } from "@/data/home";

const props = defineProps<{
  cards: HomeFactCard[];
  drawHint: string;
  /** Accessible label of the draw button. */
  drawLabel: string;
  /** Prefix of the "Fact 01 / 06" counter. */
  counterLabel: string;
}>();

const active = ref(0);
/** Indexes of cards currently flying off (several when clicking fast). */
const leaving = ref(new Set<number>());
const drawn = ref(false);

const total = computed(() => props.cards.length);
const current = computed(() => props.cards[active.value]);

/** Position in the stack: 0 = top, 1-2 = peeking, 3+ = tucked behind #2. */
const position = (index: number) => (index - active.value + total.value) % total.value;

const pad = (n: number) => String(n).padStart(2, "0");

function draw() {
  // No fly animation (so no animationend) under reduced motion.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const next = new Set(leaving.value);
    next.add(active.value);
    leaving.value = next;
  }
  active.value = (active.value + 1) % total.value;
  drawn.value = true;
}

function landed(index: number) {
  if (!leaving.value.has(index)) return;
  const next = new Set(leaving.value);
  next.delete(index);
  leaving.value = next;
}
</script>

<template>
  <div class="home-fact-deck">
    <button type="button" class="home-fact-deck__button" :aria-label="drawLabel" @click="draw">
      <span class="home-fact-deck__stack" aria-hidden="true">
        <span
          v-for="(card, i) in cards"
          :key="card.text"
          :class="[
            'home-fact-deck__card',
            {
              'home-fact-deck__card--top': position(i) === 0,
              'home-fact-deck__card--leaving': leaving.has(i),
            },
          ]"
          :style="{ '--pos': Math.min(position(i), 2), zIndex: total - position(i) }"
          @animationend.self="landed(i)"
        >
          <span class="home-fact-deck__head">
            <span class="home-fact-deck__tag"><span class="home-fact-deck__dot" />{{ card.tag }}</span>
            <span class="home-fact-deck__count">{{ counterLabel }} {{ pad(i + 1) }} / {{ pad(total) }}</span>
          </span>
          <span class="home-fact-deck__text">{{ card.text }}</span>
          <span class="home-fact-deck__note">{{ card.note }}</span>
          <span class="home-fact-deck__corner" />
        </span>
      </span>
      <span aria-hidden="true" :class="['home-fact-deck__hint', { 'home-fact-deck__hint--done': drawn }]">
        {{ drawHint }}
      </span>
    </button>
    <!-- Announce the new fact to screen readers. -->
    <p class="visually-hidden" aria-live="polite">
      {{ counterLabel }} {{ active + 1 }} / {{ total }}: {{ current?.text }}
    </p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);

// Top card slides out to the side above the stack, then drops below it and
// tucks back in exactly where position 2 rests, so it ends hidden by
// occlusion (no fading, no snapping).
@keyframes home-fact-deck-fly {
  0% {
    z-index: 50;
    translate: 0 0;
    rotate: -2deg;
    scale: 1;
  }

  45% {
    z-index: 50;
    translate: 78% -4%;
    rotate: 10deg;
    scale: 0.97;
  }

  50% {
    z-index: 50;
  }

  51% {
    z-index: 0;
  }

  100% {
    z-index: 0;
    translate: 28px -24px;
    rotate: 6deg;
    scale: 0.92;
  }
}

.home-fact-deck {
  position: relative;

  &__button {
    position: relative;
    display: block;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible .home-fact-deck__card--top {
      outline: 2px solid color-mix(in oklab, $blue 45%, transparent);
      outline-offset: 4px;
    }
  }

  &__stack {
    position: relative;
    display: block;
    width: min(320px, 78vw);
    aspect-ratio: 5 / 6;
  }

  // Cards fan slightly backwards: each position shifts, shrinks and tilts.
  &__card {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    border-radius: var(--radius-xl, 16px);
    background-color: #f7f7f8;
    box-shadow:
      0 0 0 1px var(--color-border),
      0 24px 48px -28px rgb(0 0 0 / 0.35);
    text-align: left;
    translate: calc(var(--pos) * 14px) calc(var(--pos) * -12px);
    rotate: calc(-2deg + var(--pos) * 4deg);
    scale: calc(1 - var(--pos) * 0.04);
    transition:
      translate 0.5s var(--ease-out-quint),
      rotate 0.5s var(--ease-out-quint),
      scale 0.5s var(--ease-out-quint),
      opacity 0.3s var(--ease-default),
      background-color 0.3s var(--ease-default);

    @include dark {
      background-color: #0f0f10;
    }

    // Back cards are blank-ish: hide their content.
    &:not(&--top) > * {
      opacity: 0;
    }

    &--top {
      background-color: #fff;

      @include dark {
        background-color: #131314;
      }

      @include parent-hover(".home-fact-deck__button") {
        translate: -4px -6px;
        rotate: -3.5deg;
      }
    }

    &--leaving {
      animation: home-fact-deck-fly 0.75s cubic-bezier(0.45, 0, 0.2, 1);

      > * {
        opacity: 1 !important;
      }
    }

    @include reduced-motion {
      transition: opacity 0.2s linear;
      animation: none !important;
    }

    > * {
      transition: opacity 0.25s var(--ease-default);
    }
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  &__tag {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-bricolage);
    font-size: 12px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: color-mix(in oklab, oklch(58.5% 0.233 277.117) 80%, transparent);

    @include dark {
      color: oklch(78.5% 0.115 274.713);
    }
  }

  &__dot {
    width: 5px;
    height: 5px;
    background-color: $blue;
  }

  &__count {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-variant-numeric: tabular-nums;
    color: oklch(70.8% 0 0);
  }

  &__text {
    flex: 1;
    display: flex;
    align-items: center;
    font-family: var(--font-instrument-serif), ui-serif, Georgia, serif;
    font-size: clamp(24px, 6vw, 32px);
    line-height: 1.15;
    letter-spacing: calc(clamp(24px, 6vw, 32px) * 0.01);
    text-wrap: balance;
    color: var(--color-foreground);
  }

  &__note {
    align-self: flex-end;
    rotate: -4deg;
    font-family: var(--font-caveat);
    font-size: 22px;
    line-height: 1;
    color: color-mix(in oklab, $blue 85%, transparent);
  }

  // Folded corner.
  &__corner {
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 28px;
    border-top-right-radius: var(--radius-xl, 16px);
    background: linear-gradient(
      225deg,
      transparent 50%,
      color-mix(in oklab, var(--color-foreground) 8%, transparent) 50%
    );
  }

  &__hint {
    position: absolute;
    bottom: -44px;
    left: 50%;
    translate: -50% 0;
    rotate: -3deg;
    font-family: var(--font-caveat);
    font-size: 24px;
    line-height: 1.33333;
    font-weight: 500;
    white-space: nowrap;
    color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
    transition: opacity 0.5s var(--ease-default);

    &--done {
      opacity: 0.35;
    }
  }
}
</style>

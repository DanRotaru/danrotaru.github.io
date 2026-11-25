<!--
  "Languages" tile: one row per language (greeting, code + name, level) with a
  phone-signal style meter. Hover drains the bars and refills them in a wave,
  row after row.
-->
<script setup lang="ts">
import type { HomeLanguageRow } from "@/data/home";

defineProps<{
  rows: HomeLanguageRow[];
  maxBars: number;
  /** Label bottom-left. */
  caption: string;
}>();
</script>

<template>
  <div class="home-language-signal">
    <ul class="home-language-signal__rows">
      <li v-for="(row, r) in rows" :key="row.code" class="home-language-signal__row">
        <span class="home-language-signal__word" :lang="row.code">{{ row.word }}</span>
        <span class="home-language-signal__meta">
          <span class="home-language-signal__code">{{ row.code }}</span>
          {{ row.lang }}
        </span>
        <span
          class="home-language-signal__bars"
          role="img"
          :aria-label="`${row.lang}: ${row.level}, ${row.bars} of ${maxBars}`"
        >
          <span
            v-for="b in maxBars"
            :key="b"
            class="home-language-signal__bar"
            :class="{ 'is-on': b <= row.bars }"
            :style="{ '--h': `${(b / maxBars) * 100}%`, '--d': `${r * 120 + b * 60}ms` }"
          />
        </span>
        <span class="home-language-signal__level">{{ row.level }}</span>
      </li>
    </ul>
    <p class="home-language-signal__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

@keyframes home-language-signal-fill {
  from {
    scale: 1 0;
  }
}

.home-language-signal {
  position: absolute;
  inset: 0;

  &__rows {
    position: absolute;
    inset-inline: 1.25rem;
    bottom: 3rem;
    display: grid;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  // word | code + name | bars | level
  &__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto 3.25rem;
    align-items: center;
    gap: 0.75rem;
    padding-block: 0.55rem;
    border-top: 1px solid var(--color-border);

    &:first-child {
      border-top: 0;
    }
  }

  &__word {
    overflow: hidden;
    font-family: var(--font-bricolage);
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--color-foreground);
    transition: color 0.3s ease;

    @include parent-hover($card) {
      color: $blue;
    }
  }

  &__meta {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 50%, transparent);
  }

  &__code {
    padding: 0.1rem 0.3rem;
    border-radius: 0.25rem;
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0;
    color: var(--color-foreground);
    box-shadow: 0 0 0 1px var(--color-border);
  }

  // Signal meter: bars grow left to right.
  &__bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 1rem;
  }

  &__bar {
    width: 4px;
    height: var(--h);
    border-radius: 1px;
    transform-origin: bottom;
    background-color: color-mix(in oklab, var(--color-foreground) 15%, transparent);

    &.is-on {
      background-color: var(--color-foreground);
      transition: background-color 0.3s ease;

      @include parent-hover($card) {
        background-color: $blue;
        animation: home-language-signal-fill 0.35s var(--ease-out-quint) var(--d) both;
      }
    }

    @include reduced-motion {
      animation: none !important;
    }
  }

  &__level {
    font-family: var(--font-caveat);
    font-size: 1.25rem;
    line-height: 1;
    text-align: right;
    color: $blue;
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
</style>

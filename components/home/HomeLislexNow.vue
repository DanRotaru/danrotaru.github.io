<!--
  "Now at Lislex" tile: an employee-style badge hanging from a lanyard, with a
  the Lislex logo next to the company name and a pulsing "now" dot. Hover swings the badge.
-->
<script setup lang="ts">
defineProps<{
  /** Company logo (public path). */
  logo: string;
  company: string;
  holder: string;
  rows: { label: string; value: string }[];
  status: string;
  tags: string[];
  caption: string;
}>();
</script>

<template>
  <div class="home-lislex-now">
    <ul class="home-lislex-now__tags">
      <li v-for="(tag, i) in tags" :key="tag" class="home-lislex-now__tag" :style="{ '--d': `${i * 70}ms` }">
        <span v-if="i === tags.length - 1" class="home-lislex-now__dot" aria-hidden="true" />
        {{ tag }}
      </li>
    </ul>

    <div aria-hidden="true" class="home-lislex-now__hang">
      <span class="home-lislex-now__strap" />
      <span class="home-lislex-now__clip" />
      <div class="home-lislex-now__badge">
        <span class="home-lislex-now__slot" />
        <div class="home-lislex-now__brand">
          <img class="home-lislex-now__mark" :src="logo" alt="" width="32" height="32" loading="lazy" decoding="async" />
          <span class="home-lislex-now__company">{{ company }}</span>
        </div>
        <span class="home-lislex-now__holder">{{ holder }}</span>
        <dl class="home-lislex-now__rows">
          <div v-for="row in rows" :key="row.label" class="home-lislex-now__row">
            <dt>{{ row.label }}</dt>
            <dd>{{ row.value }}</dd>
          </div>
          <div class="home-lislex-now__row">
            <dt>Status</dt>
            <dd class="home-lislex-now__status"><span class="home-lislex-now__dot" />{{ status }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <p class="home-lislex-now__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$green: oklch(72.3% 0.219 149.579);
$card: ".home-bento-card";

.home-lislex-now {
  position: absolute;
  inset: 0;
  container-type: inline-size;

  // Text tags on the left, above the caption.
  &__tags {
    position: absolute;
    left: 20px;
    bottom: 48px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    max-width: calc(100% - min(208px, 46cqi) - 56px);

    // Narrow tile (e.g. half width on tablet): the badge already shows city,
    // type and status, so the tags step aside instead of hiding under it.
    @container (width < 480px) {
      display: none;
    }
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 999px;
    background-color: #fff;
    box-shadow: 0 0 0 1px var(--color-border);
    font-family: var(--font-bricolage);
    font-size: 13px;
    font-weight: 500;
    color: var(--color-foreground);
    transition:
      translate 0.4s cubic-bezier(0.34, 1.4, 0.64, 1) var(--d),
      box-shadow 0.3s ease var(--d);

    @include dark {
      background-color: #18181b;
    }

    @include parent-hover($card) {
      translate: 0 -4px;
      box-shadow: 0 0 0 1px color-mix(in oklab, $blue 45%, transparent);
    }

    &:first-child {
      font-family: var(--font-instrument-serif), ui-serif, Georgia, serif;
      font-size: 16px;
      font-weight: 400;
      color: $blue;
    }
  }

  // The "now" dot: a soft pulse ring.
  &__dot {
    position: relative;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background-color: $green;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background-color: $green;
      animation: home-lislex-now-pulse 2s ease-out infinite;
    }

    @include reduced-motion {
      &::after {
        animation: none;
      }
    }
  }

  // Lanyard + badge, hung from the top-right edge.
  &__hang {
    position: absolute;
    top: 0;
    right: clamp(20px, 6cqi, 48px);
    bottom: 20px;
    width: min(208px, 46cqi);
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-origin: 50% 0;
    rotate: 2deg;
    transition: rotate 0.6s cubic-bezier(0.34, 1.4, 0.64, 1);

    @include parent-hover($card) {
      animation: home-lislex-now-swing 1.6s ease-in-out both;
    }

    @include reduced-motion {
      transition: none;

      @include parent-hover($card) {
        animation: none;
      }
    }
  }

  &__strap {
    flex: 1 1 auto;
    min-height: 24px;
    width: 12px;
    background-image: repeating-linear-gradient(
      180deg,
      $blue 0 6px,
      color-mix(in oklab, $blue 80%, #fff) 6px 12px
    );
    border-radius: 0 0 2px 2px;
  }

  &__clip {
    width: 24px;
    height: 10px;
    margin-top: -1px;
    border-radius: 3px;
    background-color: oklch(70.8% 0 0);
    box-shadow: inset 0 -2px 0 rgb(0 0 0 / 0.15);
  }

  &__badge {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: -2px;
    padding: 20px 16px 16px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow:
      0 0 0 1px var(--color-border),
      0 12px 28px -12px rgb(0 0 0 / 0.25);

    @include dark {
      background-color: #18181b;
      box-shadow:
        0 0 0 1px var(--color-border),
        0 12px 28px -12px rgb(0 0 0 / 0.6);
    }
  }

  &__slot {
    position: absolute;
    top: 8px;
    left: 50%;
    width: 32px;
    height: 5px;
    margin-left: -16px;
    border-radius: 999px;
    background-color: color-mix(in oklab, var(--color-foreground) 12%, transparent);
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  // Lislex logo (app-icon style, already has its own rounded tile).
  &__mark {
    flex: none;
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  &__company {
    font-family: var(--font-instrument-serif), ui-serif, Georgia, serif;
    font-size: 26px;
    line-height: 1;
    color: var(--color-foreground);
  }

  &__holder {
    font-family: var(--font-bricolage);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-foreground);
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 8px;
    border-top: 1px dashed var(--color-border);
  }

  &__row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 11px;

    dt {
      text-transform: uppercase;
      letter-spacing: 0.88px;
      color: color-mix(in oklab, var(--color-foreground) 50%, transparent);
    }

    dd {
      color: var(--color-foreground);
    }
  }

  &__status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: $green !important;
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

@keyframes home-lislex-now-pulse {
  0% {
    scale: 1;
    opacity: 0.7;
  }

  80%,
  100% {
    scale: 2.6;
    opacity: 0;
  }
}

@keyframes home-lislex-now-swing {
  0% {
    rotate: 2deg;
  }

  25% {
    rotate: -4deg;
  }

  50% {
    rotate: 3deg;
  }

  75% {
    rotate: -1.5deg;
  }

  100% {
    rotate: 0deg;
  }
}
</style>

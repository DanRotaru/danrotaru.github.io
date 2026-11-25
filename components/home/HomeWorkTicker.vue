<!--
  Side "ruler" of the work section. Tracks the project card in the middle of
  the viewport, marks it active, toggles `data-active` on the matching
  header/panel (`[data-panel]`) and animates the panel parts into place.
-->
<script setup lang="ts">
import type { HomeWorkAccent } from "@/data/home";

type TickerItem = { slug: string; title: string; accent: HomeWorkAccent };

const props = defineProps<{ items: TickerItem[] }>();

/** Scale / opacity of a tick by its distance from the active one. */
const TICK_STEPS = [
  { scale: 1, alpha: 1 },
  { scale: 0.58, alpha: 0.8 },
  { scale: 0.34, alpha: 0.5 },
  { scale: 0.2, alpha: 0.3 },
] as const;

const cardEl = (slug: string) => document.getElementById(`project-${slug}`);

const active = ref(0);
const navRef = ref<HTMLElement | null>(null);
let prevSlug: string | null = null;
let observer: IntersectionObserver | undefined;

// Which card crosses the vertical middle of the viewport.
function observeCards() {
  observer?.disconnect();
  const cards = props.items.map((item) => cardEl(item.slug)).filter((el): el is HTMLElement => el !== null);
  if (cards.length === 0) return;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = cards.indexOf(entry.target as HTMLElement);
        if (index !== -1) active.value = index;
      }
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
  );
  cards.forEach((card) => observer?.observe(card));
}

// Swap the visible header/panel and FLIP-animate their parts.
function swapPanels() {
  const slug = props.items[active.value]?.slug;
  const root = navRef.value?.closest("section");
  if (!slug || !root) return;

  const parts = (s: string) => [...root.querySelectorAll<HTMLElement>(`[data-panel="${s}"] [data-part]`)];
  const prev = prevSlug;
  const before =
    prev && prev !== slug
      ? new Map(parts(prev).map((el) => [el.dataset.part ?? "", el.getBoundingClientRect().top]))
      : null;

  root.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
    panel.toggleAttribute("data-active", panel.dataset.panel === slug);
  });
  prevSlug = slug;

  if (!before || !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;

  for (const el of parts(slug)) {
    const top = before.get(el.dataset.part ?? "");
    const delta = top === undefined ? 0 : top - el.getBoundingClientRect().top;
    if (Math.abs(delta) > 0.5) {
      el.animate([{ transform: `translateY(${delta}px)` }, { transform: "none" }], {
        duration: 450,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      });
    }
  }
}

onMounted(() => {
  observeCards();
  swapPanels();
});
watch(
  () => props.items,
  () => {
    observeCards();
    swapPanels();
  },
);
watch(active, swapPanels, { flush: "post" });
onBeforeUnmount(() => observer?.disconnect());

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const goTo = (slug: string) =>
  cardEl(slug)?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "center" });

const tickStep = (index: number) =>
  TICK_STEPS[Math.min(Math.abs(index - active.value), TICK_STEPS.length - 1)] ?? TICK_STEPS[0];
</script>

<template>
  <nav v-if="items.length > 0" ref="navRef" aria-label="Projects" class="home-work-ticker">
    <ol class="home-work-ticker__list" :style="{ '--ruler-shift': `${-12 * active}px` }">
      <li v-for="(item, index) in items" :key="item.slug">
        <button
          type="button"
          class="home-work-ticker__button"
          :aria-current="index === active ? 'true' : undefined"
          :aria-label="`Go to ${item.title}`"
          @click="goTo(item.slug)"
        >
          <span
            :class="[
              'home-work-ticker__tick',
              index === active && 'home-work-ticker__tick--active',
              index === active && `home-work-ticker__tick--${item.accent}`,
            ]"
            :style="{ '--tick-scale': tickStep(index).scale, '--tick-alpha': tickStep(index).alpha }"
          />
        </button>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "./accents" as *;

$ease: cubic-bezier(0.22, 1, 0.36, 1);

// Lives inside the `.home-work__grid` (which defines --row-h on lg).
.home-work-ticker {
  pointer-events: none;
  position: absolute;
  inset-block: 0;
  left: -16px;
  z-index: 20;
  width: 16px;

  @include mq(lg) {
    left: calc(60% + 14px);
    width: 24px;
  }

  &__list {
    pointer-events: auto;
    position: sticky;
    top: 45svh;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: translate 0.6s $ease;

    @include reduced-motion {
      transition: none;
    }

    @include mq(lg) {
      top: 184px;
      height: calc(var(--row-h) - 88px);
      margin-top: 88px;
      align-items: flex-start;
      translate: 0 var(--ruler-shift);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 16px;
    height: 14px;
    cursor: pointer;

    @include mq(lg) {
      justify-content: flex-start;
      width: 24px;
      height: 12px;
    }
  }

  &__tick {
    width: 12px;
    height: 2px;
    border-radius: 9999px;
    transform-origin: 100%;
    scale: var(--tick-scale) 1;
    opacity: var(--tick-alpha);
    background-color: oklch(70.8% 0 0);
    transition:
      scale 0.6s $ease,
      opacity 0.6s $ease,
      background-color 0.6s $ease;

    @include dark {
      &:not(.home-work-ticker__tick--active) {
        background-color: oklch(55.6% 0 0);
      }
    }

    @include reduced-motion {
      transition: none;
    }

    @include mq(lg) {
      width: 24px;
      transform-origin: 0;
    }

    &:not(.home-work-ticker__tick--active) {
      @include parent-hover(".home-work-ticker__button") {
        scale: max(var(--tick-scale), 0.7) 1;
        opacity: 1;
      }
    }

    &--active {
      background-color: var(--accent);
      filter: var(--accent-glow);
    }

    @include accent-modifiers;
  }
}
</style>

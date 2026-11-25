<script setup lang="ts">
import { AnimatePresence, motion, type VariantType } from "motion-v";
import type { ComponentPublicInstance } from "vue";

import { moreNav, navCta, primaryNav } from "@/data/navigation";

const LENS_SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;
const PRESS_SPRING = { scale: { type: "spring", stiffness: 600, damping: 28 } } as const;
const MORE_ID = moreNav.id;
const PANEL_ID = "more-panel";

type Rect = { left: number; width: number };

/** Desktop pill navigation: links, sliding highlight "lens", More dropdown and CTA. */
const props = defineProps<{
  activeId: string;
  isMoreOpen: boolean;
  /** Receives the <ul> so the pill can size itself to the list (null on unmount). */
  listRef: (node: HTMLUListElement | null) => void;
  reduceMotion: boolean;
  variants: Record<string, VariantType>;
  /** Width of the More panel in px (the expanded pill minus its padding). */
  panelWidth: number;
}>();

const emit = defineEmits<{ "more-open-change": [open: boolean] }>();

const route = useRoute();
const itemsMap = new Map<string, HTMLLIElement>();
const listNode = ref<HTMLUListElement | null>(null);
const moreButton = ref<HTMLButtonElement | null>(null);
let openTimer: ReturnType<typeof setTimeout> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;
let observer: ResizeObserver | undefined;

const rects = ref<Record<string, Rect>>({});
const hoveredId = ref<string | null>(null);
const pressedId = ref<string | null>(null);

// Forget the hovered item when the active section changes (route change).
watch(
  () => props.activeId,
  () => {
    hoveredId.value = null;
  },
);

function measure() {
  requestAnimationFrame(() => {
    const next: Record<string, Rect> = {};
    for (const [id, el] of itemsMap) {
      if (el.offsetWidth > 0) next[id] = { left: el.offsetLeft, width: el.offsetWidth };
    }
    rects.value = next;
  });
}

onMounted(() => {
  const node = listNode.value;
  props.listRef(node);
  if (!node) return;
  measure();
  observer = new ResizeObserver(measure);
  observer.observe(node);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  props.listRef(null);
  clearTimeout(openTimer);
  clearTimeout(closeTimer);
  document.removeEventListener("keydown", onKeyDown);
});

// Escape closes the dropdown and returns focus to the trigger.
function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  emit("more-open-change", false);
  moreButton.value?.focus();
}

watch(
  () => props.isMoreOpen,
  (open) => {
    if (!import.meta.client) return;
    if (open) document.addEventListener("keydown", onKeyDown);
    else document.removeEventListener("keydown", onKeyDown);
  },
  { immediate: true },
);

/** Function ref that keeps the id -> <li> map used to measure the lens positions. */
function registerItem(id: string) {
  return (el: Element | ComponentPublicInstance | null) => {
    if (el instanceof HTMLLIElement) itemsMap.set(id, el);
    else itemsMap.delete(id);
  };
}

function closeMore() {
  clearTimeout(closeTimer);
  emit("more-open-change", false);
}

function scheduleClose() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(closeMore, 250);
}

function holdOpen() {
  clearTimeout(closeTimer);
}

const lensId = computed(() => (props.isMoreOpen ? MORE_ID : (hoveredId.value ?? props.activeId)));
const lens = computed(() => rects.value[lensId.value] ?? null);
const isPressed = computed(() => pressedId.value !== null && pressedId.value === lensId.value);
const lensTransition = computed(() => (props.reduceMotion ? { duration: 0 } : { ...LENS_SPRING, ...PRESS_SPRING }));

// On a More page, the trigger shows that page's title instead of "More".
const currentMoreItem = computed(() => moreNav.items.find((item) => route.path.startsWith(item.href)));
const moreLabel = computed(() => currentMoreItem.value?.title ?? moreNav.label);

const menuStyle = computed(() => ({ "--more-panel-width": `${props.panelWidth}px` }));

function onPointerDown(event: PointerEvent) {
  const target = event.target as HTMLElement;
  if (target.closest(`#${PANEL_ID}`)) return;
  const id = target.closest<HTMLElement>("[data-nav-id]")?.dataset.navId;
  if (id && id !== navCta.href) {
    hoveredId.value = id;
    pressedId.value = id;
  }
}

// React's onBlur bubbles, so it maps to `focusout`.
function onFocusOut(event: FocusEvent) {
  const current = event.currentTarget as HTMLElement;
  if (!current.contains(event.relatedTarget as Node | null)) closeMore();
}

function onMenuMouseLeave() {
  clearTimeout(openTimer);
  closeMore();
}

function onListMouseLeave() {
  hoveredId.value = null;
  pressedId.value = null;
}

function onItemEnter(id: string) {
  hoveredId.value = id;
  if (props.isMoreOpen) scheduleClose();
}

function onMoreEnter() {
  hoveredId.value = MORE_ID;
  holdOpen();
  clearTimeout(openTimer);
  openTimer = setTimeout(() => emit("more-open-change", true), 150);
}

function onMoreLeave() {
  clearTimeout(openTimer);
}

function onCtaEnter() {
  hoveredId.value = null;
  if (props.isMoreOpen) scheduleClose();
}

function onPanelNavigate() {
  hoveredId.value = MORE_ID;
  closeMore();
}
</script>

<template>
  <motion.div
    class="nav-menu"
    :style="menuStyle"
    :variants="variants"
    initial="hidden"
    animate="visible"
    exit="exit"
    @animation-complete="measure"
    @focusout="onFocusOut"
    @mouseleave="onMenuMouseLeave"
  >
    <div class="nav-menu__track">
      <motion.span
        v-if="lens"
        aria-hidden="true"
        class="nav-menu__lens"
        :initial="{ x: lens.left, width: lens.width, opacity: 0 }"
        :animate="{ x: lens.left, width: lens.width, opacity: 0.85, scale: isPressed ? 0.93 : 1 }"
        :transition="lensTransition"
      />
      <ul
        ref="listNode"
        class="nav-menu__list"
        @mouseleave="onListMouseLeave"
        @pointerdown="onPointerDown"
        @pointerup="pressedId = null"
        @pointercancel="pressedId = null"
      >
        <li
          v-for="item in primaryNav"
          :key="item.id"
          :ref="registerItem(item.id)"
          class="nav-menu__item"
          :data-nav-id="item.id"
          @mouseenter="onItemEnter(item.id)"
        >
          <NuxtLink
            :aria-current="activeId === item.id ? 'page' : undefined"
            :class="['nav-menu__link', { 'nav-menu__link--lit': lensId === item.id }]"
            :to="item.href"
          >
            {{ item.label }}
          </NuxtLink>
        </li>

        <li
          :ref="registerItem(MORE_ID)"
          class="nav-menu__item nav-menu__item--more"
          :data-nav-id="MORE_ID"
          @mouseenter="onMoreEnter"
          @mouseleave="onMoreLeave"
        >
          <button
            ref="moreButton"
            type="button"
            :aria-expanded="isMoreOpen"
            :aria-controls="isMoreOpen ? PANEL_ID : undefined"
            :aria-current="activeId === MORE_ID ? 'page' : undefined"
            :class="['nav-menu__link nav-menu__more', { 'nav-menu__link--lit': lensId === MORE_ID }]"
            @click="emit('more-open-change', !isMoreOpen)"
          >
            <NavMoreLabel :label="moreLabel" :reduce-motion="reduceMotion" />
            <IconArrowDown01
              aria-hidden="true"
              :class="['nav-menu__chevron', { 'nav-menu__chevron--open': isMoreOpen }]"
            />
          </button>
          <AnimatePresence>
            <MorePanel
              v-if="isMoreOpen"
              :id="PANEL_ID"
              key="more-panel"
              :items="moreNav.items"
              :current-href="currentMoreItem?.href"
              @hold="holdOpen"
              @navigate="onPanelNavigate"
            />
          </AnimatePresence>
        </li>

        <li
          :ref="registerItem(navCta.href)"
          class="nav-menu__item nav-menu__item--cta"
          :data-nav-id="navCta.href"
          @mouseenter="onCtaEnter"
        >
          <NuxtLink
            :aria-current="activeId === navCta.href ? 'page' : undefined"
            class="nav-menu__cta button button--secondary"
            :to="navCta.href"
          >
            {{ navCta.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </motion.div>
</template>

<style lang="scss">
@use "abstracts" as *;

.nav-menu {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-block: 4px;

  // Item offsets, the lens and the More panel all resolve against the track
  // (the list itself stays unpositioned).
  &__track {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: max-content;
  }

  // Sliding chip under the hovered / active item.
  &__lens {
    position: absolute;
    inset-block: 0;
    left: 0;
    z-index: -10;
    border-radius: 999px;
    background-image: linear-gradient(180deg, var(--chip-top) 0, var(--chip-bottom) 100%);
    box-shadow:
      inset 0 1px 0 var(--chip-highlight),
      inset 0 -1px 0 var(--chip-shadow-1),
      0 0 0 0.5px var(--chip-shadow-2),
      0 1px 2px var(--chip-shadow-3),
      0 4px 10px -4px var(--chip-shadow-4);
  }

  &__list {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: max-content;
    white-space: nowrap;
  }

  &__item {
    position: relative;
    list-style: none;

    // The More panel is positioned against the whole menu, not this item.
    &--more {
      position: static;
    }

    &--cta {
      margin-left: 6px;
    }
  }

  &__link {
    display: block;
    padding: 8px 16px;
    border-radius: 999px;
    outline: none;
    font-size: 13.5px;
    font-weight: 500;
    color: oklch(37.1% 0 0);
    transition:
      color 0.15s var(--ease-default),
      scale 0.15s var(--ease-default);

    &:focus-visible {
      box-shadow: 0 0 0 2px rgb(59 130 246 / 0.4);
    }

    &:active {
      scale: 0.94;
    }

    @include hover {
      color: oklch(14.5% 0 0);
    }

    @include dark {
      color: color-mix(in oklab, #fff 65%, transparent);

      &:focus-visible {
        box-shadow: 0 0 0 2px rgb(255 255 255 / 0.25);
      }

      @media (hover: hover) {
        &:hover {
          color: #fff;
        }
      }
    }

    // Item under the lens.
    &--lit {
      color: oklch(14.5% 0 0);

      @include dark {
        color: #fff;
      }
    }
  }

  &__more {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    user-select: none;
  }

  &__label {
    position: relative;
    display: inline-flex;
  }

  &__label-measure {
    position: absolute;
    visibility: hidden;
    white-space: nowrap;
  }

  &__label-text {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
  }

  &__chevron {
    width: 14px;
    height: 14px;
    opacity: 0.7;
    transition: rotate 0.2s var(--ease-out-quint);

    &--open {
      rotate: 180deg;
    }
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 100%;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13.5px;
    white-space: nowrap;
  }
}
</style>

<script setup lang="ts">
import { AnimatePresence, motion, type VariantType } from "motion-v";

import {
  moreNav,
  navCta,
  primaryNav,
  type IconComponent,
} from "@/data/navigation";

const PANEL_ID = "mobile-menu-panel";

/**
 * Mobile header bar inside the glass pill: brand (or a rotating hint) and a
 * burger button. The burger expands the pill into a list of every nav
 * link; the parent animates the pill's height from `reportHeight`.
 */
const props = defineProps<{
  open: boolean;
  variants: Record<string, VariantType>;
  hint: {
    icon: IconComponent;
    text: string;
    href?: string;
    opensMenu?: boolean;
  } | null;
  hintKey: number;
  /** Receives the menu's natural height in px. */
  reportHeight: (height: number) => void;
}>();

const emit = defineEmits<{ "update:open": [open: boolean]; "run-hint": [] }>();

const route = useRoute();
const root = ref<HTMLElement | null>(null);
const burger = ref<HTMLButtonElement | null>(null);
let observer: ResizeObserver | undefined;

const links = [
  ...primaryNav.map((item) => ({ href: item.href, label: item.label })),
  ...moreNav.items.map((item) => ({ href: item.href, label: item.title })),
];

function isActive(href: string) {
  return href === "/" ? route.path === "/" : route.path.startsWith(href);
}

// Theme toggle (the desktop header has ThemeButton instead).
const colorMode = useColorMode();
const mounted = ref(false);
onMounted(() => (mounted.value = true));
const isDark = computed(() => mounted.value && colorMode.value === "dark");

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark";
}

function setOpen(open: boolean) {
  emit("update:open", open);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  setOpen(false);
  burger.value?.focus();
}

function onPointerDown(event: PointerEvent) {
  if (!root.value?.parentElement?.contains(event.target as Node))
    setOpen(false);
}

watch(
  () => props.open,
  (open) => {
    if (!import.meta.client) return;
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("pointerdown", onPointerDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    }
  },
  { immediate: true },
);

onMounted(() => {
  const node = root.value;
  if (!node) return;
  const update = () => props.reportHeight(node.offsetHeight);
  update();
  observer = new ResizeObserver(update);
  observer.observe(node);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  document.removeEventListener("keydown", onKeyDown);
  document.removeEventListener("pointerdown", onPointerDown);
});
</script>

<template>
  <motion.div
    class="mobile-menu"
    :variants="variants"
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div ref="root">
      <div class="mobile-menu__bar">
        <AnimatePresence mode="wait" :initial="false">
          <motion.button
            v-if="hint && !open"
            :key="`hint-${hintKey}`"
            type="button"
            class="mobile-menu__hint"
            :variants="variants"
            initial="hidden"
            animate="visible"
            exit="exit"
            @click="emit('run-hint')"
          >
            <component
              :is="hint.icon"
              aria-hidden="true"
              class="mobile-menu__hint-icon"
            />
            <span class="mobile-menu__hint-text">{{ hint.text }}</span>
          </motion.button>
          <motion.div
            v-else
            key="brand"
            :variants="variants"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <NuxtLink to="/" class="mobile-menu__brand" @click="setOpen(false)"
              >DanRotaru</NuxtLink
            >
          </motion.div>
        </AnimatePresence>

        <div class="mobile-menu__actions">
          <button
            ref="burger"
            type="button"
            :aria-label="open ? 'Close menu' : 'Open menu'"
            :aria-expanded="open"
            :aria-controls="PANEL_ID"
            :class="[
              'mobile-menu__icon-button mobile-menu__burger',
              { 'mobile-menu__burger--open': open },
            ]"
            @click="setOpen(!open)"
          >
            <span aria-hidden="true" class="mobile-menu__burger-line" />
            <span aria-hidden="true" class="mobile-menu__burger-line" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          v-if="open"
          :id="PANEL_ID"
          key="panel"
          class="mobile-menu__panel"
          :initial="{ opacity: 0, y: -4 }"
          :animate="{
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, delay: 0.05 },
          }"
          :exit="{ opacity: 0, transition: { duration: 0.1 } }"
        >
          <ul class="mobile-menu__list">
            <li v-for="link in links" :key="link.href">
              <NuxtLink
                :to="link.href"
                :aria-current="isActive(link.href) ? 'page' : undefined"
                :class="[
                  'mobile-menu__link',
                  { 'mobile-menu__link--active': isActive(link.href) },
                ]"
                @click="setOpen(false)"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
            <li class="mobile-menu__divider" aria-hidden="true" />
            <li>
              <button
                type="button"
                class="mobile-menu__link"
                @click="toggleTheme"
              >
                {{ isDark ? "Switch to Light mode" : "Switch to Dark mode" }}
              </button>
            </li>
          </ul>
          <NuxtLink
            :to="navCta.href"
            :aria-current="isActive(navCta.href) ? 'page' : undefined"
            class="mobile-menu__cta button button--secondary"
            @click="setOpen(false)"
          >
            {{ navCta.label }}
          </NuxtLink>
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.div>
</template>

<style lang="scss">
@use "abstracts" as *;

// Highlighted row (hover, press, current page): tint + lit top edge + hairline.
@mixin row-highlight {
  background-color: rgb(0 0 0 / 0.07);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.7),
    inset 0 0 0 0.5px rgb(0 0 0 / 0.08),
    0 1px 2px rgb(0 0 0 / 0.06);
  color: oklch(20.5% 0 0);

  @include dark {
    background-color: rgb(255 255 255 / 0.09);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / 0.12),
      inset 0 0 0 1px rgb(255 255 255 / 0.05),
      0 1px 3px rgb(0 0 0 / 0.35);
    color: #fff;
  }
}

.mobile-menu {
  width: 100%;

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    height: 44px;
    padding-inline: 8px 2px;
  }

  &__brand {
    display: block;
    padding: 2px 6px;
    border-radius: 999px;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.55;
    color: oklch(43.9% 0 0);
    user-select: none;
    @include focus-ring;

    @include dark {
      color: color-mix(in oklab, #fff 70%, transparent);
    }
  }

  &__hint {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 6px;
    border-radius: 999px;
    cursor: pointer;
    color: inherit;
    @include focus-ring;
  }

  &__hint-icon {
    width: 20px;
    height: 20px;
    color: oklch(55.6% 0 0);

    @include dark {
      color: color-mix(in oklab, #fff 60%, transparent);
    }
  }

  &__hint-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    white-space: nowrap;
    color: oklch(43.9% 0 0);
    user-select: none;

    @include dark {
      color: color-mix(in oklab, #fff 70%, transparent);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &__icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 999px;
    cursor: pointer;
    color: oklch(37.1% 0 0);
    transition: background-color 0.15s var(--ease-default);
    @include focus-ring;

    &:active {
      scale: 0.96;
    }

    @include hover {
      background-color: rgb(0 0 0 / 0.07);

      @include dark {
        background-color: rgb(255 255 255 / 0.09);
      }
    }

    @include dark {
      color: color-mix(in oklab, #fff 85%, transparent);
    }
  }

  // Two lines that cross into an "X" when open.
  &__burger {
    position: relative;
  }

  &__burger-line {
    position: absolute;
    left: 50%;
    width: 18px;
    height: 1.5px;
    border-radius: 999px;
    background-color: currentColor;
    translate: -50% 0;
    transition:
      top 0.25s var(--ease-default),
      rotate 0.25s var(--ease-default);

    &:nth-child(1) {
      top: calc(50% - 3.5px);
    }

    &:nth-child(2) {
      top: calc(50% + 2.5px);
    }
  }

  &__burger--open &__burger-line {
    top: calc(50% - 0.75px);

    &:nth-child(1) {
      rotate: 45deg;
    }

    &:nth-child(2) {
      rotate: -45deg;
    }
  }

  &__panel {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 4px 4px 12px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__divider {
    height: 1px;
    margin: 6px 12px;
    background-color: color-mix(
      in oklab,
      var(--color-foreground) 8%,
      transparent
    );
  }

  &__link {
    display: block;
    width: 100%;
    text-align: left;
    cursor: pointer;
    padding: 10px 12px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    color: oklch(37.1% 0 0);
    transition:
      background-color 0.15s var(--ease-default),
      box-shadow 0.15s var(--ease-default);
    @include focus-ring;

    @include dark {
      color: color-mix(in oklab, #fff 75%, transparent);
    }

    @include hover {
      @include row-highlight;
    }

    // Touch feedback (no hover on touch screens).
    &:active,
    &--active {
      @include row-highlight;
    }
  }

  &__cta {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border-radius: 999px;
    font-size: 15px;
  }
}
</style>

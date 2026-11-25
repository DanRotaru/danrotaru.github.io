<script setup lang="ts">
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type VariantType,
} from "motion-v";

import CoffeeDuotone from "@/components/icons/CoffeeDuotone.vue";
import CompassDuotone from "@/components/icons/CompassDuotone.vue";
import {
  moreNav,
  navCta,
  primaryNav,
  type IconComponent,
} from "@/data/navigation";

type Variants = Record<string, VariantType>;

const GREETING_EMOJI: Record<string, string> = {
  "Good morning": "🌅",
  "Good afternoon": "☀️",
  "Good evening": "🌙",
};

/** Hints that briefly replace the mobile menu button. */
const MOBILE_HINTS: {
  icon: IconComponent;
  text: string;
  href?: string;
  opensMenu?: boolean;
}[] = [
  { icon: CompassDuotone, text: "tap to explore", opensMenu: true },
  { icon: CoffeeDuotone, text: "buy me a coffee", href: "/coffee" },
];

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 6, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
};

const PILL_SPRING = {
  type: "spring",
  stiffness: 360,
  damping: 40,
  mass: 0.9,
} as const;

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  return "Good evening";
}

/** Which nav entry the current route belongs to. */
function getActiveId(pathname: string) {
  if (pathname.startsWith(navCta.href)) return navCta.href;
  const match = primaryNav.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );
  return match ? match.id : moreNav.id;
}

/**
 * The floating "dynamic island" nav. It greets the visitor, then morphs into
 * the desktop pill nav (600px+) or a compact bar with a burger menu (mobile). The pill grows into a panel when "More" is open.
 */
const route = useRoute();
const isClient = useIsClient();
const isMobile = useMediaQuery("(max-width: 599px)");
const prefersReducedMotion = useReducedMotion();
const variants = computed(() =>
  prefersReducedMotion.value ? reducedVariants : contentVariants,
);

const showGreeting = ref(true);
const isMoreOpen = ref(false);
const isMobileOpen = ref(false);
const mobileHeight = ref(44);
const containerWidth = ref(358);
const hintIndex = ref(-1);
const navWidth = ref(460);

// Close the More dropdown on navigation.
watch(
  () => route.path,
  () => {
    isMoreOpen.value = false;
    isMobileOpen.value = false;
  },
);

// Leaving the mobile layout closes the burger menu.
watch(isMobile, (mobile) => {
  if (!mobile) isMobileOpen.value = false;
});

/** Content width of the header container, so the mobile bar lines up with the page rails. */
let containerObserver: ResizeObserver | undefined;
const slotNode = ref<HTMLElement | null>(null);
function updateContainerWidth(nav: HTMLElement) {
  const style = getComputedStyle(nav);
  containerWidth.value =
    nav.clientWidth -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight);
}

// Greeting for 2.5s, then a few hints on mobile (5s, then every 15s).
let greetingTimer: ReturnType<typeof setTimeout> | undefined;
let firstHint: ReturnType<typeof setTimeout> | undefined;
let hideTimer: ReturnType<typeof setTimeout> | undefined;
let interval: ReturnType<typeof setInterval> | undefined;

onMounted(() => {
  const nav = slotNode.value?.closest<HTMLElement>(".site-header__nav");
  if (nav) {
    updateContainerWidth(nav);
    containerObserver = new ResizeObserver(() => updateContainerWidth(nav));
    containerObserver.observe(nav);
  }
  greetingTimer = setTimeout(() => (showGreeting.value = false), 2500);
  let count = 0;
  const showHint = () => {
    count += 1;
    hintIndex.value = (count - 1) % MOBILE_HINTS.length;
    hideTimer = setTimeout(() => (hintIndex.value = -1), 4000);
    if (count >= MOBILE_HINTS.length) clearInterval(interval);
  };
  firstHint = setTimeout(showHint, 5000);
  interval = setInterval(showHint, 15000);
});

// Measure the desktop nav list so the pill can size itself to it.
let listObserver: ResizeObserver | undefined;
function navRef(node: HTMLUListElement | null) {
  listObserver?.disconnect();
  listObserver = undefined;
  if (!node) return;
  const update = () => (navWidth.value = node.offsetWidth + 8);
  update();
  listObserver = new ResizeObserver(update);
  listObserver.observe(node);
}

onBeforeUnmount(() => {
  clearTimeout(greetingTimer);
  clearTimeout(firstHint);
  clearTimeout(hideTimer);
  clearInterval(interval);
  listObserver?.disconnect();
  containerObserver?.disconnect();
});

const activeId = computed(() => getActiveId(route.path));

const compact = computed(() => showGreeting.value || isMobile.value);
const expanded = computed(() => !compact.value && isMoreOpen.value);
/** Mobile bar: header container width minus this inset (centered, 19px in from each rail). */
const MOBILE_BAR_INSET = 38;
/** Mobile bar spans the header container, slightly inset from the rails. */
const mobileBar = computed(() => isMobile.value && !showGreeting.value);
/**
 * The expanded pill keeps the nav's width (so it never covers the theme
 * button) and grows down to fit the More list: link row incl. 4px gap
 * (44px) + panel (8px padding, 44px per row, 8px padding) + 8px bottom space.
 */
const expandedWidth = computed(() => navWidth.value);
const expandedHeight = 44 + 8 + moreNav.items.length * 44 + 8 + 8;
const size = computed(() =>
  mobileBar.value
    ? {
        width: Math.max(0, containerWidth.value - MOBILE_BAR_INSET),
        height: isMobileOpen.value ? mobileHeight.value : 44,
      }
    : expanded.value
      ? { width: expandedWidth.value, height: expandedHeight }
      : compact.value
        ? { width: 190, height: 44 }
        : { width: navWidth.value, height: 44 },
);
const spacerWidth = computed(() =>
  expanded.value ? navWidth.value : size.value.width,
);
const hint = computed(() =>
  hintIndex.value >= 0 ? (MOBILE_HINTS[hintIndex.value] ?? null) : null,
);
const greeting = computed(() => (isClient.value ? getGreeting() : ""));
const emoji = computed(() => GREETING_EMOJI[greeting.value] ?? "👋");

function runHint() {
  const current = hint.value;
  if (!current) return;
  hintIndex.value = -1;
  if (current.href) navigateTo(current.href);
  else if (current.opensMenu) isMobileOpen.value = true;
}

/** <noscript> fallback list (plain links, as rendered by the Next version). */
const fallbackLinks = [
  ...primaryNav.map((item) => ({ href: item.href, label: item.label })),
  ...moreNav.items.map((item) => ({ href: item.href, label: item.title })),
  { href: navCta.href, label: navCta.label },
];
const fallbackHtml =
  '<ul class="site-nav__fallback shadow-border">' +
  fallbackLinks
    .map(
      (link) =>
        `<li><a class="site-nav__fallback-link" href="${link.href}">${link.label}</a></li>`,
    )
    .join("") +
  "</ul>";
</script>

<template>
  <div class="site-nav">
    <div ref="slotNode" class="site-nav__slot">
      <!-- No-JS fallback list. Rendered with v-html: Vue can't hydrate element children of <noscript>. -->
      <noscript v-html="fallbackHtml" />
      <template v-if="isClient">
        <motion.div
          aria-hidden="true"
          class="site-nav__spacer"
          :initial="{ width: 0 }"
          :animate="{ width: spacerWidth }"
          :transition="PILL_SPRING"
        />
        <motion.div
          :class="[
            'site-nav__pill glass-pill',
            {
              'site-nav__pill--expanded': expanded || isMobileOpen,
              'site-nav__pill--mobile': mobileBar,
            },
          ]"
          :initial="{ opacity: 0, width: 0, height: 0 }"
          :animate="{ opacity: 1, ...size }"
          :transition="PILL_SPRING"
        >
          <AnimatePresence :initial="false" mode="wait">
            <motion.div
              v-if="showGreeting"
              key="greeting"
              class="site-nav__row site-nav__greeting"
              :variants="variants"
              initial="hidden"
              animate="visible"
              exit="exit"
              @click="showGreeting = false"
            >
              <motion.span
                aria-hidden="true"
                class="site-nav__emoji"
                :animate="
                  prefersReducedMotion
                    ? undefined
                    : { rotate: [0, 14, -8, 14, -4, 10, 0] }
                "
                :transition="{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }"
                >{{ emoji }}</motion.span
              >
              <span class="site-nav__greeting-text">{{ greeting }}</span>
            </motion.div>

            <MobileMenu
              v-else-if="isMobile"
              key="mobile"
              v-model:open="isMobileOpen"
              :variants="variants"
              :hint="hint"
              :hint-key="hintIndex"
              :report-height="(h: number) => (mobileHeight = h)"
              @run-hint="runHint"
            />

            <NavMenu
              v-else
              key="desktop"
              :active-id="activeId"
              :is-more-open="isMoreOpen"
              :list-ref="navRef"
              :reduce-motion="prefersReducedMotion"
              :variants="variants"
              :panel-width="expandedWidth - 8"
              @more-open-change="isMoreOpen = $event"
            />
          </AnimatePresence>
        </motion.div>
      </template>
    </div>
    <ThemeButton />
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

// Group: [ pill slot ][ theme button ], centred in the header.
.site-nav {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-inline: auto;

  &__slot {
    position: relative;
    display: flex;
    justify-content: center;
  }

  // Invisible box that gives the slot the pill's width (the pill itself is
  // absolutely positioned so it can grow into the More panel).
  &__spacer {
    flex-shrink: 0;
    height: 40px;
    visibility: hidden;
    pointer-events: none;
  }

  &__pill {
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 40px;
    padding-inline: 4px;
    border-radius: 22px;

    &--expanded {
      --glass-pill-bg: var(--menu-tint);
    }

    // Clip the burger menu while the pill animates its height.
    &--mobile {
      overflow: hidden;
    }

    // Open burger menu: same lit edge + deep shadow as the menus.
    &--mobile.site-nav__pill--expanded {
      box-shadow: var(--menu-shadow-inset), var(--menu-shadow);
    }
  }

  // Greeting row.
  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 184px;
    padding: 4px 10px;
    cursor: pointer;
    border-radius: 999px;
    color: inherit;
    @include focus-ring;
  }

  &__greeting {
    justify-content: center;
    margin-top: 6px;
  }

  &__emoji {
    display: inline-block;
    font-size: 16px;
    line-height: 1.5;
  }

  &__greeting-text {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    white-space: nowrap;
    color: oklch(37.1% 0 0);
    user-select: none;

    @include dark {
      color: #fff;
    }
  }

  // <noscript> fallback list.
  &__fallback {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 40px;
    padding: 4px 16px;
    border-radius: 22px;
    background-color: #fff;
    box-shadow: 0 10px 30px -14px rgb(0 0 0 / 0.22);

    @include dark {
      background-color: oklch(26.9% 0 0);
      box-shadow: none;
    }
  }

  &__fallback-link {
    display: block;
    padding: 6px 8px;
    font-size: 14px;
    line-height: 1.43;
    color: oklch(37.1% 0 0);

    @include dark {
      color: color-mix(in oklab, #fff 70%, transparent);
    }
  }
}
</style>

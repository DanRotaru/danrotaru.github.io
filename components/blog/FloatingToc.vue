<script setup lang="ts">
type TocHeading = { id: string; text: string; level: number };

const RING = 2 * Math.PI * 10;

/*
 * Floating "Contents" pill pinned to the bottom of the viewport while the
 * article is on screen. Shows the current section + reading progress and
 * expands into a panel listing the article's h2/h3 headings.
 */
const props = defineProps<{ articleId: string }>();

const headings = ref<TocHeading[]>([]);
const activeId = ref<string | null>(null);
const hoveredId = ref<string | null>(null);
const progress = ref(0);
const visible = ref(false);
const expanded = ref(false);
const panelId = useId();
const openerRef = ref<HTMLButtonElement | null>(null);
const listRef = ref<HTMLDivElement | null>(null);

// Collect headings once the article is in the DOM.
onMounted(() => {
  const article = document.getElementById(props.articleId);
  if (!article) return;
  headings.value = [...article.querySelectorAll<HTMLElement>("h2[id], h3[id]")].map((el) => ({
    id: el.id,
    text: el.textContent?.trim() ?? "",
    level: Number(el.tagName.slice(1)),
  }));
});

// Track active heading, progress and visibility on scroll.
watch(
  [() => props.articleId, headings],
  (_value, _old, onCleanup) => {
    if (headings.value.length === 0) return;
    const article = document.getElementById(props.articleId);
    const elements = headings.value
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const viewport = window.innerHeight;
      let current = elements[0]?.id ?? null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top > 120) break;
        current = el.id;
      }
      activeId.value = current;
      if (article) {
        const top = article.getBoundingClientRect().top + y;
        const height = article.offsetHeight;
        const range = height - viewport;
        progress.value = Math.min(100, Math.max(0, range > 0 ? ((y - top) / range) * 100 : 0));
        visible.value = y + viewport > top + 100 && y < top + height - 600;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onCleanup(() => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });
  },
);

// Esc closes; focus the active row when opening.
watch(expanded, async (isOpen, _old, onCleanup) => {
  if (!isOpen) return;
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  };
  window.addEventListener("keydown", onKey);
  onCleanup(() => window.removeEventListener("keydown", onKey));

  // Wait for the panel to lose `inert` before moving focus into it.
  await nextTick();
  const list = listRef.value;
  const active = activeId.value
    ? list?.querySelector<HTMLElement>(`[data-slug="${CSS.escape(activeId.value)}"]`)
    : null;
  if (list && active) list.scrollTo({ top: Math.max(0, active.offsetTop - 80) });
  (active ?? list?.querySelector<HTMLElement>("a"))?.focus({ preventScroll: true });
});

function close() {
  expanded.value = false;
  openerRef.value?.focus({ preventScroll: true });
}

function navigate(event: MouseEvent, id: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: target.getBoundingClientRect().top + window.scrollY - 80,
    behavior: reduce ? "auto" : "smooth",
  });
  history.pushState(null, "", `#${id}`);
  expanded.value = false;
}

const minLevel = computed(() => Math.min(...headings.value.map((h) => h.level)));
const activeTitle = computed(() => headings.value.find((h) => h.id === activeId.value)?.text);
const shellStyle = computed(() => ({
  "--toc-panel-height": `${Math.min(344, 55 + 34 * headings.value.length)}px`,
}));
</script>

<template>
  <template v-if="headings.length > 0">
    <div v-if="expanded" aria-hidden="true" class="floating-toc__backdrop" @click="close" />
    <div :class="['floating-toc', { 'floating-toc--visible': visible }]">
      <div
        :class="['floating-toc__shell glass-pill', { 'floating-toc__shell--expanded': expanded }]"
        :style="shellStyle"
      >
        <button
          ref="openerRef"
          type="button"
          :aria-controls="panelId"
          :aria-expanded="expanded"
          class="floating-toc__pill"
          :inert="expanded"
          @click="expanded = true"
        >
          <span class="visually-hidden">Table of contents: </span>
          <span class="floating-toc__dot">
            <span class="floating-toc__ping" />
            <span class="floating-toc__dot-core" />
          </span>
          <span class="floating-toc__current">
            <span :key="activeId ?? 'empty'" class="floating-toc__current-text">
              {{ activeTitle || "Contents" }}
            </span>
          </span>
          <svg class="floating-toc__ring" width="22" height="22" aria-hidden="true">
            <circle
              class="floating-toc__ring-track"
              cx="11"
              cy="11"
              r="10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
            <circle
              class="floating-toc__ring-value"
              cx="11"
              cy="11"
              r="10"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              :stroke-dasharray="RING"
              :stroke-dashoffset="RING - (progress / 100) * RING"
            />
          </svg>
        </button>

        <div :id="panelId" class="floating-toc__panel" :inert="!expanded">
          <div class="floating-toc__panel-head">
            <span class="floating-toc__panel-title">Contents</span>
            <button type="button" aria-label="Close table of contents" class="floating-toc__close" @click="close">
              <kbd class="floating-toc__kbd">esc</kbd>
            </button>
          </div>
          <div ref="listRef" class="floating-toc__scroll">
            <nav aria-label="Table of contents" class="floating-toc__nav">
              <a
                v-for="heading in headings"
                :key="heading.id"
                :href="`#${heading.id}`"
                :data-slug="heading.id"
                :aria-current="heading.id === activeId ? 'location' : undefined"
                :class="[
                  'floating-toc__link',
                  {
                    'floating-toc__link--active': heading.id === activeId,
                    'floating-toc__link--highlighted':
                      heading.id !== activeId && (hoveredId ?? activeId) === heading.id,
                  },
                ]"
                :style="{ '--toc-indent': `${14 * (heading.level - minLevel) + 12}px` }"
                @click="navigate($event, heading.id)"
                @mouseenter="hoveredId = heading.id"
                @mouseleave="hoveredId = null"
                @focus="hoveredId = heading.id"
                @blur="hoveredId = null"
              >
                <span aria-hidden="true" class="floating-toc__marker" />
                <span class="floating-toc__text">{{ heading.text }}</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
@use "abstracts" as *;

$ease: cubic-bezier(0.22, 1, 0.36, 1);
$spring: cubic-bezier(0.34, 1.3, 0.64, 1);

.floating-toc {
  position: fixed;
  bottom: 30px;
  left: 50%;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 50px) scale(0.9);
  transition:
    transform 0.5s $spring,
    opacity 0.3s ease-out;

  &--visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0) scale(1);
  }

  @include reduced-motion {
    transition: opacity 0.2s linear;
  }

  &__backdrop {
    position: fixed;
    inset: 0;
    z-index: 98;
    background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.3);
    backdrop-filter: blur(2px);
    --s5Dv-K: 0; // fade in (read by the `enter` keyframes)
    animation: enter 0.3s $ease;
  }

  &__shell {
    --glass-pill-bg: #ffffffeb;
    position: relative;
    overflow: hidden;
    width: 280px;
    height: 52px;
    border-radius: 26px;
    color: var(--color-foreground);
    transition:
      width 0.5s $ease,
      height 0.5s $ease,
      border-radius 0.5s $ease;

    @include dark {
      --glass-pill-bg: #28282cc7;
    }

    &--expanded {
      width: min(340px, calc(100vw - 32px));
      height: var(--toc-panel-height);
      border-radius: 24px;
    }
  }

  // Collapsed pill
  &__pill {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding-inline: 20px;
    cursor: pointer;
    outline: none;
    transition:
      opacity 0.5s $ease 0.1s,
      scale 0.5s $ease 0.1s,
      filter 0.5s $ease 0.1s;

    &:focus-visible {
      box-shadow: inset 0 0 0 2px color-mix(in oklab, var(--color-foreground) 30%, transparent);
    }

    .floating-toc__shell--expanded & {
      opacity: 0;
      scale: 0.95;
      filter: blur(4px);
      pointer-events: none;
      transition-delay: 0s;
    }
  }

  &__dot {
    position: relative;
    display: flex;
    flex-shrink: 0;
    width: 6px;
    height: 6px;
  }

  &__ping {
    position: absolute;
    display: inline-flex;
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    background-color: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;

    @include reduced-motion {
      animation: none;
    }
  }

  &__dot-core {
    position: relative;
    display: inline-flex;
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background-color: var(--color-foreground);
  }

  &__current {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    overflow: hidden;
    height: 100%;
    text-align: left;
  }

  &__current-text {
    display: block;
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.42857;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-foreground);
    animation: rise-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);

    @include reduced-motion {
      animation: none;
    }
  }

  &__ring {
    flex-shrink: 0;
    rotate: -90deg;
  }

  &__ring-track {
    color: color-mix(in oklab, var(--color-foreground) 15%, transparent);
  }

  &__ring-value {
    color: var(--color-foreground);
    transition: stroke-dashoffset 0.15s ease-out;
  }

  // Expanded panel
  &__panel {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
    scale: 1.05;
    transition:
      opacity 0.5s $ease,
      scale 0.5s $ease;

    .floating-toc__shell--expanded & {
      opacity: 1;
      pointer-events: auto;
      scale: 1;
      transition-delay: 0.1s;
    }
  }

  &__panel-head {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 8px;
  }

  &__panel-title {
    font-size: 11px;
    font-weight: 500;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);

    @include dark {
      color: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    }
  }

  &__close {
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.15s var(--ease-default);

    @include hover {
      opacity: 1;
    }
  }

  &__kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 19px;
    height: 19px;
    padding-inline: 3px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 25%, transparent);
    border-radius: 5px;
    background-color: color-mix(in oklab, var(--color-foreground) 6%, transparent);
    font-family: var(--font-sans);
    font-size: 10.5px;
    line-height: 1;
    color: color-mix(in oklab, var(--color-foreground) 85%, transparent);
  }

  &__scroll {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0 8px 12px;
  }

  &__nav {
    display: flex;
    flex-direction: column;
  }

  &__link {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    width: 100%;
    padding-block: 7px;
    padding-right: 12px;
    padding-left: var(--toc-indent, 12px);
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.42857;
    text-align: left;
    text-decoration: none;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    outline: none;
    transition:
      color 0.2s var(--ease-out-quint),
      background-color 0.2s var(--ease-out-quint);

    @include dark {
      color: color-mix(in oklab, var(--color-foreground) 45%, transparent);
    }

    &--highlighted {
      &,
      :root.dark & {
        background-color: color-mix(in oklab, var(--color-foreground) 6%, transparent);
        color: color-mix(in oklab, var(--color-foreground) 85%, transparent);
      }
    }

    &--active {
      &,
      :root.dark & {
        background-color: color-mix(in oklab, var(--color-foreground) 6%, transparent);
        font-weight: 500;
        color: var(--color-foreground);
      }
    }
  }

  &__marker {
    position: absolute;
    top: 50%;
    left: 4px;
    width: 2px;
    height: 16px;
    border-radius: 9999px;
    background-color: var(--color-foreground);
    opacity: 0;
    transform: translateY(-50%) scaleY(0);
    transition:
      opacity 0.3s $ease,
      transform 0.3s $ease;

    .floating-toc__link--active & {
      opacity: 1;
      transform: translateY(-50%) scaleY(1);
    }
  }

  &__text {
    position: relative;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

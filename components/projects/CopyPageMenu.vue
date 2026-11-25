<!-- "Copy" dropdown next to the case-study description: copy the URL or open the page in an assistant. -->
<script setup lang="ts">
import { site } from "@/lib/site";

const props = defineProps<{
  /** Route of the page, e.g. "/projects/keythm". */
  path: string;
}>();

const open = ref(false);
const copied = ref(false);
const rootRef = ref<HTMLDivElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;
const menuId = useId();

function onPointer(event: PointerEvent) {
  if (!rootRef.value?.contains(event.target as Node)) open.value = false;
}

function onKey(event: KeyboardEvent) {
  if (event.key === "Escape") open.value = false;
}

function unlisten() {
  document.removeEventListener("pointerdown", onPointer);
  document.removeEventListener("keydown", onKey);
}

// Close on outside pointer / Escape while the menu is open.
watch(open, (isOpen) => {
  if (!import.meta.client) return;
  unlisten();
  if (!isOpen) return;
  document.addEventListener("pointerdown", onPointer);
  document.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  unlisten();
  clearTimeout(timer);
});

const url = computed(() => `${site.url}${props.path}`);
const prompt = computed(
  () =>
    `I'm reading this page from ${site.name}'s site: ${url.value}\n\nHelp me understand it. Be ready to summarize it, explain concepts, give examples, or answer questions based on it.`,
);

async function copyUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 2000);
  } catch {
    // Clipboard unavailable (insecure context / denied): nothing to do.
  }
  open.value = false;
}

const external = computed(() => [
  {
    key: "chatgpt",
    label: "Open in ChatGPT",
    icon: "chatgpt",
    href: `https://chatgpt.com/?q=${encodeURIComponent(prompt.value)}`,
  },
  {
    key: "claude",
    label: "Open in Claude",
    icon: "claude",
    href: `https://claude.ai/new?q=${encodeURIComponent(prompt.value)}`,
  },
]);
</script>

<template>
  <div ref="rootRef" class="copy-page-menu" :data-open="open ? 'true' : undefined">
    <button
      type="button"
      aria-label="Copy or open this page"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="open ? menuId : undefined"
      class="copy-page-menu__trigger"
      @click="open = !open"
    >
      <IconLinkBold class="copy-page-menu__icon" />
      <span>Copy</span>
      <IconArrowDown01 class="copy-page-menu__icon copy-page-menu__chevron" />
    </button>

    <div v-if="open" :id="menuId" role="menu" class="copy-page-menu__popup">
      <button type="button" role="menuitem" class="copy-page-menu__item" @click="copyUrl">
        <IconLinkBold class="copy-page-menu__item-icon" />
        {{ copied ? "Copied URL!" : "Copy URL" }}
      </button>
      <a
        v-for="item in external"
        :key="item.key"
        role="menuitem"
        class="copy-page-menu__item"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        @click="open = false"
      >
        <!-- sprite fragment -->
        <img class="copy-page-menu__item-icon" :src="`/static/icons/sprite.svg#${item.icon}`" alt="" width="16" height="16" />
        {{ item.label }}
        <IconArrowUpRight aria-hidden="true" class="copy-page-menu__external" />
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.copy-page-menu {
  position: relative;
  flex-shrink: 0;

  &__trigger {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    line-height: 1.42857;
    white-space: nowrap;
    color: var(--color-muted-foreground);
    cursor: pointer;
    outline: none;
    transition: color var(--duration-default) var(--ease-default);

    @include hover {
      color: var(--color-foreground);
    }

    &:focus-visible {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }

    .copy-page-menu[data-open] & {
      color: var(--color-foreground);
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
    translate: 0 1px;
  }

  &__chevron {
    transition: rotate 0.2s var(--ease-default);

    .copy-page-menu[data-open] & {
      rotate: 180deg;
    }
  }

  &__popup {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 50;
    min-width: 208px;
    padding: 4px;
    color: var(--color-popover-foreground);
    border-radius: calc(var(--radius) + 4px);
    @include liquid-glass;
    // `enter` keyframe params (fade-in-0, zoom-in-95, slide-in-from-top-2).
    --s5Dv-K: 0;
    --8Lolzw: 0.95;
    --wLwbfM: -8px;
    animation: enter 0.1s var(--ease-default);
    transform-origin: top right;

    @include reduced-motion {
      animation: none;
    }
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 4px 6px;
    font-size: 14px;
    line-height: 1.42857;
    text-align: left;
    border-radius: var(--radius);
    cursor: default;
    outline: none;
    user-select: none;

    @include hover {
      background-color: color-mix(in oklab, var(--color-foreground) 10%, transparent);
    }

    &:focus-visible {
      background-color: color-mix(in oklab, var(--color-foreground) 10%, transparent);
    }
  }

  &__item-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }

  &__external {
    width: 14px;
    height: 14px;
    margin-left: auto;
    opacity: 0.4;
  }
}
</style>

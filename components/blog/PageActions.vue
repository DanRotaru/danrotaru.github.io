<script setup lang="ts">
import type { Component } from "vue";

import ClaudeLogo from "@/components/icons/ClaudeLogo.vue";
import CopyDuotone from "@/components/icons/CopyDuotone.vue";
import CopySimpleBold from "@/components/icons/CopySimpleBold.vue";
import MarkdownLogo from "@/components/icons/MarkdownLogo.vue";
import OpenaiLogo from "@/components/icons/OpenaiLogo.vue";

type Item = {
  key: string;
  label: string;
  icon: Component;
  href?: string;
  external?: boolean;
};

/*
 * "Copy ▾" menu in the post header: copy URL, copy the Markdown twin, view it,
 * or open the page in ChatGPT / Claude.
 */
const props = defineProps<{ path: string; markdownPath: string; siteName: string }>();

const open = ref(false);
const copied = ref<"url" | "md" | null>(null);
const origin = ref("");
const rootRef = ref<HTMLDivElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;
const menuId = useId();

onMounted(() => {
  // origin is only known in the browser
  origin.value = window.location.origin;
});
onBeforeUnmount(() => clearTimeout(timer));

watch(open, (isOpen, _old, onCleanup) => {
  if (!isOpen) return;
  const onPointer = (event: PointerEvent) => {
    if (!rootRef.value?.contains(event.target as Node)) open.value = false;
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") open.value = false;
  };
  document.addEventListener("pointerdown", onPointer);
  document.addEventListener("keydown", onKey);
  onCleanup(() => {
    document.removeEventListener("pointerdown", onPointer);
    document.removeEventListener("keydown", onKey);
  });
});

function flash(kind: "url" | "md") {
  copied.value = kind;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = null), 2000);
}

async function copyUrl() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    flash("url");
  } catch {
    /* clipboard unavailable */
  }
}

async function copyMarkdown() {
  try {
    const response = await fetch(props.markdownPath);
    if (!response.ok) return;
    await navigator.clipboard.writeText(await response.text());
    flash("md");
  } catch {
    /* clipboard unavailable */
  }
}

function select(key: string) {
  open.value = false;
  if (key === "url") void copyUrl();
  if (key === "md") void copyMarkdown();
}

const items = computed<Item[]>(() => {
  const prompt = `I'm reading this page from ${props.siteName}'s site: ${origin.value}${props.path}\n\nHelp me understand it. Be ready to summarize it, explain concepts, give examples, or answer questions based on it.`;
  return [
    { key: "url", label: copied.value === "url" ? "Copied URL!" : "Copy URL", icon: CopySimpleBold },
    { key: "md", label: copied.value === "md" ? "Copied!" : "Copy as Markdown", icon: CopyDuotone },
    { key: "view-md", label: "View as Markdown", icon: MarkdownLogo, href: props.markdownPath },
    {
      key: "chatgpt",
      label: "Open in ChatGPT",
      icon: OpenaiLogo,
      href: `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
      external: true,
    },
    {
      key: "claude",
      label: "Open in Claude",
      icon: ClaudeLogo,
      href: `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      external: true,
    },
  ];
});
</script>

<template>
  <div ref="rootRef" class="page-actions">
    <button
      type="button"
      aria-label="Copy or open this page"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="menuId"
      :class="['page-actions__trigger', { 'page-actions__trigger--open': open }]"
      @click="open = !open"
    >
      <IconCopySimpleBold class="page-actions__trigger-icon" />
      <span>Copy</span>
      <IconArrowDown01 class="page-actions__chevron" />
    </button>
    <div :id="menuId" role="menu" :class="['page-actions__menu', { 'page-actions__menu--open': open }]" :hidden="!open">
      <template v-for="item in items" :key="item.key">
        <a
          v-if="item.href"
          role="menuitem"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="page-actions__item"
          @click="open = false"
        >
          <span class="page-actions__icon"><component :is="item.icon" /></span>
          {{ item.label }}
          <IconArrowUpRightLink v-if="item.external" class="page-actions__external" />
        </a>
        <button v-else role="menuitem" type="button" class="page-actions__item" @click="select(item.key)">
          <span class="page-actions__icon"><component :is="item.icon" /></span>
          {{ item.label }}
        </button>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.page-actions {
  position: relative;
  display: inline-flex;

  &__trigger {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    transition: color 0.15s var(--ease-default);

    @include hover {
      color: var(--color-foreground);
    }

    &--open {
      color: var(--color-foreground);
    }
  }

  &__trigger-icon {
    width: 14px;
    height: 14px;
    translate: 0 1px;
  }

  &__chevron {
    width: 14px;
    height: 14px;
    translate: 0 1px;
    transition: rotate 0.2s var(--ease-default);

    .page-actions__trigger--open & {
      rotate: 180deg;
    }
  }

  &__menu {
    @include liquid-glass;
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 50;
    min-width: 208px;
    padding: 4px;
    border-radius: calc(var(--radius) + 4px);
    background-color: var(--menu-tint);
    color: var(--color-popover-foreground);
    white-space: nowrap;
    transform-origin: top left;

    &--open {
      // `enter` keyframes read these (fade-in-0 / zoom-in-95 / slide-in-from-top-2).
      --s5Dv-K: 0;
      --8Lolzw: 0.95;
      --wLwbfM: -8px;
      animation: enter 0.1s var(--ease-default);
    }

    @include mq(md) {
      right: 0;
      left: auto;
      transform-origin: top right;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 4px 6px;
    border-radius: var(--radius);
    font-size: 14px;
    line-height: 1.42857;
    text-align: left;
    color: inherit;
    cursor: default;
    outline: none;
    user-select: none;

    &:hover,
    &:focus-visible {
      background-color: color-mix(in oklab, var(--color-foreground) 10%, transparent);
    }
  }

  &__icon {
    display: inline-flex;
    flex-shrink: 0;

    & > svg {
      width: 16px;
      height: 16px;
    }
  }

  &__external {
    width: 12px;
    height: 12px;
    margin-left: auto;
    opacity: 0.4;
  }
}
</style>

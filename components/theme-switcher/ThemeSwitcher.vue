<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";

import DesktopBold from "@/components/icons/DesktopBold.vue";
import MoonBold from "@/components/icons/MoonBold.vue";
import SunBold from "@/components/icons/SunBold.vue";
import type { IconComponent } from "@/data/navigation";

const OPTIONS: { value: string; label: string; Icon: IconComponent }[] = [
  { value: "light", label: "Light theme", Icon: SunBold },
  { value: "system", label: "System theme", Icon: DesktopBold },
  { value: "dark", label: "Dark theme", Icon: MoonBold },
];

/** Light / System / Dark segmented radio group with a sliding indicator. */
const colorMode = useColorMode();
const isClient = useIsClient();
const buttons: (HTMLButtonElement | null)[] = [];

// The theme is only known on the client; render nothing selected until then.
const selected = computed(() =>
  isClient.value ? OPTIONS.findIndex((option) => option.value === colorMode.preference) : -1,
);

function setButton(index: number) {
  return (el: Element | ComponentPublicInstance | null) => {
    buttons[index] = el instanceof HTMLButtonElement ? el : null;
  };
}

function setTheme(value: string) {
  colorMode.preference = value;
}

function onKeyDown(event: KeyboardEvent) {
  const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[event.key];
  if (!step) return;
  event.preventDefault();
  const next = (Math.max(selected.value, 0) + step + OPTIONS.length) % OPTIONS.length;
  setTheme(OPTIONS[next]!.value);
  buttons[next]?.focus();
}
</script>

<template>
  <div aria-label="Theme" class="theme-switcher" role="radiogroup" @keydown="onKeyDown">
    <span
      v-if="selected >= 0"
      aria-hidden="true"
      class="theme-switcher__indicator"
      :style="{ '--index': selected }"
    />
    <button
      v-for="({ value, label, Icon }, index) in OPTIONS"
      :key="value"
      :ref="setButton(index)"
      :aria-checked="index === selected"
      :aria-label="label"
      :class="['theme-switcher__option', { 'theme-switcher__option--checked': index === selected }]"
      role="radio"
      :tabindex="index === selected || (selected < 0 && index === 0) ? 0 : -1"
      :title="label"
      type="button"
      @click="setTheme(value)"
    >
      <component :is="Icon" aria-hidden="true" width="14" height="14" />
    </button>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.theme-switcher {
  position: relative;
  display: flex;
  padding: 2px;
  border-radius: 999px;
  box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-foreground) 10%, transparent);

  &__indicator {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background-color: color-mix(in oklab, var(--color-foreground) 8%, transparent);
    translate: calc(var(--index, 0) * 100%) 0;
    transition: translate 0.3s var(--ease-out-expo);
  }

  &__option {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    outline: none;
    cursor: pointer;
    color: var(--color-muted-foreground);
    transition: all 0.15s var(--ease-default);

    @include hover {
      color: var(--color-foreground);
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px color-mix(in oklab, var(--color-foreground) 30%, transparent);
    }

    &--checked {
      color: var(--color-foreground);
    }
  }
}
</style>

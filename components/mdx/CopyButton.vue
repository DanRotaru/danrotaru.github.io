<script setup lang="ts">
/** Small icon button that copies `text` and shows a check for 2s. */
const props = defineProps<{ text: string }>();

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => clearTimeout(timer));

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 2000);
  } catch {
    // Clipboard unavailable (insecure context / permissions) — ignore.
  }
}
</script>

<template>
  <button
    type="button"
    :aria-label="copied ? 'Copied' : 'Copy code'"
    :class="['copy-button', { 'copy-button--copied': copied }]"
    @click="copy"
  >
    <span aria-live="polite" class="visually-hidden">{{ copied ? "Copied to clipboard" : "" }}</span>
    <IconCheckDuotone v-if="copied" class="copy-button__icon" />
    <IconCopyDuotone v-else class="copy-button__icon" />
  </button>
</template>

<style lang="scss">
@use "abstracts" as *;

.copy-button {
  display: inline-flex;
  padding: 6px;
  border-radius: var(--radius);
  color: oklch(70.8% 0 0);
  cursor: pointer;
  outline: none;
  transition: all 0.3s var(--ease-out-quint);

  &:active {
    scale: 0.98;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px color-mix(in oklab, oklch(62.3% 0.214 259.815) 60%, transparent);
  }

  @include hover {
    background-color: color-mix(in oklab, oklch(92.2% 0 0) 80%, transparent);
    color: oklch(62.3% 0.214 259.815);
  }

  @include dark {
    color: oklch(55.6% 0 0);

    @include hover {
      background-color: color-mix(in oklab, oklch(37.1% 0 0) 60%, transparent);
      color: oklch(70.7% 0.165 254.624);
    }
  }

  &--copied {
    &,
    &:hover {
      background-color: oklch(95% 0.052 163.051);
      color: oklch(59.6% 0.145 163.225);
    }

    @include dark {
      &,
      &:hover {
        background-color: color-mix(in oklab, oklch(37.8% 0.077 168.94) 40%, transparent);
        color: oklch(76.5% 0.177 163.223);
      }
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>

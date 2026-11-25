<!-- "Email — hello@… · Copy" row; copies the address to the clipboard. -->
<script setup lang="ts">
const props = defineProps<{ email: string }>();

const copied = ref(false);

watch(copied, (value, _old, onCleanup) => {
  if (!value) return;
  const timer = window.setTimeout(() => {
    copied.value = false;
  }, 2500);
  onCleanup(() => window.clearTimeout(timer));
});

async function handleClick() {
  try {
    await navigator.clipboard.writeText(props.email);
    copied.value = true;
  } catch {
    window.location.href = `mailto:${props.email}`;
  }
}
</script>

<template>
  <button type="button" class="copy-email-button" @click="handleClick">
    <span class="copy-email-button__text">
      <span class="copy-email-button__label">Email</span>
      <span class="copy-email-button__value">{{ email }}</span>
    </span>
    <span aria-live="polite" :class="['copy-email-button__status', { 'copy-email-button__status--copied': copied }]">
      <template v-if="copied"><IconCheckBold class="copy-email-button__icon" /> Copied</template>
      <template v-else><IconCopy class="copy-email-button__icon" /> Copy</template>
    </span>
  </button>
</template>

<style lang="scss">
@use "abstracts" as *;

.copy-email-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent);
  border-radius: var(--radius);
  background-color: color-mix(in oklab, var(--color-foreground) 2%, transparent);
  text-align: left;
  cursor: pointer;
  transition: all var(--duration-default) var(--ease-default);

  @include hover {
    border-color: color-mix(in oklab, var(--color-foreground) 20%, transparent);
    background-color: color-mix(in oklab, var(--color-foreground) 4%, transparent);
  }

  &__text {
    min-width: 0;
  }

  &__label {
    display: block;
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__value {
    @include truncate;
    display: block;
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.42857;
    color: var(--color-foreground);
  }

  &__status {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
    font-family: var(--font-sans);
    font-size: 12px;
    line-height: 1.33333;
    color: var(--color-muted-foreground);
    transition: color var(--duration-default) var(--ease-default);

    @include parent-hover(".copy-email-button") {
      color: var(--color-foreground);
    }

    &--copied,
    &--copied:is(.copy-email-button:hover *) {
      color: oklch(69.6% 0.17 162.48);
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }
}
</style>

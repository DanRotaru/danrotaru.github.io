<script setup lang="ts">
/**
 * Round glass light/dark toggle next to the pill nav (600px+).
 */
const colorMode = useColorMode();
const mounted = ref(false);
onMounted(() => (mounted.value = true));
const isDark = computed(() => mounted.value && colorMode.value === "dark");

function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <button
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="theme-button glass-pill"
    type="button"
    @click="toggleTheme"
  >
    <IconSunBold v-if="isDark" aria-hidden="true" class="theme-button__icon" />
    <IconMoonBold v-else aria-hidden="true" class="theme-button__icon" />
  </button>
</template>

<style lang="scss">
@use "abstracts" as *;

.theme-button {
  position: relative;
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-top: 4px;
  border-radius: 999px;
  cursor: pointer;
  color: oklch(37.1% 0 0);
  transition: all 0.15s var(--ease-default);
  @include focus-ring;

  // Same breakpoint as the mobile header in SiteNav.vue.
  @media (min-width: 600px) {
    display: inline-flex;
  }

  @include hover {
    color: oklch(20.5% 0 0);
  }

  &:active {
    scale: 0.98;
  }

  @include dark {
    color: color-mix(in oklab, #fff 85%, transparent);

    @media (hover: hover) {
      &:hover {
        color: #fff;
      }
    }
  }

  &__icon {
    width: 18px;
    height: 18px;
    transition: all 0.3s var(--ease-out-quint);

    @include parent-hover(".theme-button") {
      scale: 1.1;
      rotate: -12deg;
      color: oklch(55.4% 0.135 66.442);
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0.34, 1.4, 0.64, 1);

      // Sun: spin a little further and glow amber.
      @include dark {
        rotate: 45deg;
        color: oklch(82.8% 0.189 84.429);
      }
    }
  }
}
</style>

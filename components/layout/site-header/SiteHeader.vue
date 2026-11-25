<script setup lang="ts">
/**
 * Fixed site header: the morphing glass pill nav (desktop) / menu pill
 * (mobile) and the theme toggle.
 */
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main" class="site-header__nav container">
      <SiteNav />
    </nav>
  </header>
</template>

<style lang="scss">
@use "abstracts" as *;

.site-header {
  position: fixed;
  top: 10px;
  z-index: 5000;
  width: 100%;

  @include mq(md) {
    top: 16px;
  }

  &__nav {
    display: flex;
    align-items: flex-start;
    padding-block: 6px;
  }
}
</style>

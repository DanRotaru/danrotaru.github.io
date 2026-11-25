<script setup lang="ts">
/*
 * Sets `data-cover-hero` on <html> while a page with a full-bleed cover is
 * mounted (the header's top fade then animates in on scroll). Renders nothing.
 */
onMounted(() => {
  document.documentElement.dataset.coverHero = "";
});
onBeforeUnmount(() => {
  delete document.documentElement.dataset.coverHero;
});
</script>

<template>
  <template v-if="false" />
</template>

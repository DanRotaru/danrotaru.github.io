<script setup lang="ts">
/**
 * Wraps the footer. On large, tall screens the footer is fixed to the bottom
 * of the viewport behind the page and "revealed" as the page scrolls away;
 * this wrapper reserves its height (`--footer-h`, measured live).
 */
const wrapperEl = ref<HTMLDivElement | null>(null);
let observer: ResizeObserver | undefined;

onMounted(() => {
  const wrapper = wrapperEl.value;
  const footer = wrapper?.firstElementChild;
  if (!wrapper || !footer) return;
  observer = new ResizeObserver(([entry]) => {
    const height = entry?.borderBoxSize[0]?.blockSize;
    if (height === undefined) return;
    wrapper.style.setProperty("--footer-h", `${height}px`);
    wrapper.dataset.pinned = "";
  });
  observer.observe(footer);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  const wrapper = wrapperEl.value;
  if (!wrapper) return;
  delete wrapper.dataset.pinned;
  wrapper.style.removeProperty("--footer-h");
});
</script>

<template>
  <div ref="wrapperEl" class="site-footer-curtain">
    <slot />
  </div>
</template>

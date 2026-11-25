<script setup lang="ts">
/**
 * Fallback for browsers without scroll-driven animations: writes the distance
 * to the bottom of the page (0-600px) into `--mark-d` on the parent, which
 * drives the paused `footer-mark-rise` animation of the giant name letters.
 */
const el = ref<HTMLSpanElement | null>(null);
let cleanup: (() => void) | undefined;

onMounted(() => {
  const target = el.value?.parentElement;
  if (!target || CSS.supports("animation-timeline: scroll()")) return;
  const root = document.documentElement;
  let frame = 0;
  let last = "";
  const update = () => {
    frame = 0;
    const distance = Math.min(600, Math.max(0, root.scrollHeight - innerHeight - scrollY)).toFixed(1);
    if (distance !== last) {
      last = distance;
      target.style.setProperty("--mark-d", distance);
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule);
  cleanup = () => {
    cancelAnimationFrame(frame);
    removeEventListener("scroll", schedule);
    removeEventListener("resize", schedule);
    target.style.removeProperty("--mark-d");
  };
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
  <span ref="el" hidden />
</template>

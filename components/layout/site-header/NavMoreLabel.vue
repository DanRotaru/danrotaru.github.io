<script setup lang="ts">
import { motion } from "motion-v";

const LENS_SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

/** "More" label whose width springs when it changes to the current page title (part of NavMenu). */
const props = defineProps<{ label: string; reduceMotion: boolean }>();

const measureEl = ref<HTMLSpanElement | null>(null);
const width = ref<number | null>(null);
let observer: ResizeObserver | undefined;

onMounted(() => {
  const node = measureEl.value;
  if (!node) return;
  observer = new ResizeObserver(() => {
    width.value = node.offsetWidth;
  });
  observer.observe(node);
});

onBeforeUnmount(() => observer?.disconnect());

const transition = computed(() => (props.reduceMotion ? { duration: 0 } : LENS_SPRING));
</script>

<template>
  <span class="nav-menu__label">
    <span ref="measureEl" aria-hidden="true" class="nav-menu__label-measure">{{ label }}</span>
    <motion.span
      class="nav-menu__label-text"
      :initial="false"
      :animate="width === null ? undefined : { width }"
      :transition="transition"
      >{{ label }}</motion.span
    >
  </span>
</template>

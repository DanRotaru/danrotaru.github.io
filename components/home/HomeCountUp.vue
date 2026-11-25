<!--
  Animated number for bento tiles. Renders the final value on the server (so it
  is never "stuck" at 0 or blank), then counts from `from` to `to` with rAF:
  - once when it first scrolls into view (works on touch devices), and
  - every time the pointer enters the parent `.home-bento-card`.
  Respects prefers-reduced-motion (shows the final value, no animation).
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to: number;
    from?: number;
    /** Animation length in ms. */
    duration?: number;
    prefix?: string;
    suffix?: string;
    /** Thousands separators (1,284). */
    grouping?: boolean;
    /** Delay before counting, in ms. */
    delay?: number;
  }>(),
  { from: 0, duration: 1200, prefix: "", suffix: "", grouping: true, delay: 0 },
);

const el = ref<HTMLElement | null>(null);
const current = ref(props.to);

const formatted = computed(() => {
  const n = Math.round(current.value);
  return props.grouping ? n.toLocaleString("en-US") : String(n);
});

let frame = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
let card: Element | null = null;
let observer: IntersectionObserver | undefined;
let reduce = false;

// easeOutCubic: fast start, gentle landing.
const ease = (t: number) => 1 - (1 - t) ** 3;

function run() {
  if (reduce) return;
  cancelAnimationFrame(frame);
  if (timer) clearTimeout(timer);
  current.value = props.from;
  timer = setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / props.duration);
      current.value = props.from + (props.to - props.from) * ease(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }, props.delay);
}

onMounted(() => {
  reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!el.value) return;

  card = el.value.closest(".home-bento-card");
  card?.addEventListener("mouseenter", run);

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        run();
        observer?.disconnect();
      }
    },
    { threshold: 0.6 },
  );
  observer.observe(el.value);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  if (timer) clearTimeout(timer);
  card?.removeEventListener("mouseenter", run);
  observer?.disconnect();
});

watch(
  () => props.to,
  (value) => {
    current.value = value;
  },
);
</script>

<template>
  <span ref="el" class="home-count-up">
    <span aria-hidden="true">{{ prefix }}{{ formatted }}{{ suffix }}</span>
    <span class="visually-hidden">{{ prefix }}{{ grouping ? to.toLocaleString("en-US") : to }}{{ suffix }}</span>
  </span>
</template>

<style lang="scss">
.home-count-up {
  font-variant-numeric: tabular-nums;
}
</style>

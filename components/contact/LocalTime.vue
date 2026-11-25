<!-- Current time in the given time zone (e.g. "4:05 PM"), refreshed every 30s. -->
<script setup lang="ts">
const props = defineProps<{ timeZone: string }>();

const now = ref<Date | null>(null);

let first: number | undefined;
let timer: number | undefined;

onMounted(() => {
  const tick = () => {
    now.value = new Date();
  };
  first = window.setTimeout(tick, 0);
  timer = window.setInterval(tick, 30_000);
});

onBeforeUnmount(() => {
  window.clearTimeout(first);
  window.clearInterval(timer);
});

const label = computed(() =>
  now.value
    ? now.value.toLocaleTimeString("en-US", { timeZone: props.timeZone, hour: "numeric", minute: "2-digit" })
    : "—",
);
</script>

<template>
  <span class="local-time">{{ label }}</span>
</template>

<style lang="scss">
@use "abstracts" as *;

.local-time {
  font-variant-numeric: tabular-nums;
}
</style>

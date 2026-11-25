<script setup lang="ts">
import { site } from "@/lib/site";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: site.timezone,
  hour: "numeric",
  minute: "2-digit",
});

/** Current time in the owner's timezone ("—" until hydrated). Ticks once per minute, aligned to the minute boundary. */
const time = ref<string | null>(null);
let timeout: ReturnType<typeof setTimeout> | undefined;
let interval: ReturnType<typeof setInterval> | undefined;

function tick() {
  time.value = formatter.format(new Date());
}

onMounted(() => {
  tick();
  timeout = setTimeout(() => {
    tick();
    interval = setInterval(tick, 60_000);
  }, 60_000 - (Date.now() % 60_000));
});

onBeforeUnmount(() => {
  clearTimeout(timeout);
  clearInterval(interval);
});
</script>

<template>
  <span>{{ time ?? "—" }}</span>
</template>

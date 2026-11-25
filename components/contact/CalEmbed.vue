<!-- Inline Cal.com month view for booking a 30-minute call. -->
<script setup lang="ts">
const props = defineProps<{ calLink: string }>();

const EMBED_SRC = "https://app.cal.com/embed/embed.js";
const NAMESPACE = "30min";
/** Page colours behind the calendar (also used to mask the Cal.com badge). */
const BACKGROUND = { dark: "#0d0d0f", light: "#f7f7f8" } as const;

type CalQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };
type CalGlobal = CalQueue & { loaded?: boolean; ns?: Record<string, CalQueue> };

/** Cal.com's official inline-embed bootstrap (queues calls until embed.js loads). */
function getCal(): CalGlobal {
  const win = window as unknown as { Cal?: CalGlobal };
  if (win.Cal) return win.Cal;

  const push = (target: CalQueue, args: unknown[]) => {
    target.q = target.q ?? [];
    target.q.push(args);
  };
  const cal: CalGlobal = (...args: unknown[]) => {
    if (!cal.loaded) {
      cal.ns = {};
      const script = document.createElement("script");
      script.src = EMBED_SRC;
      script.async = true;
      document.head.appendChild(script);
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const namespace = args[1];
      if (typeof namespace === "string") {
        const registry = (cal.ns = cal.ns ?? {});
        const api: CalQueue = (...apiArgs: unknown[]) => push(api, apiArgs);
        registry[namespace] = registry[namespace] ?? api;
        push(registry[namespace], args);
        push(cal, ["initNamespace", namespace]);
        return;
      }
    }
    push(cal, args);
  };
  win.Cal = cal;
  return cal;
}

const colorMode = useColorMode();
// The resolved theme is unknown during SSR / hydration: render the placeholder until mounted.
const mounted = ref(false);
const theme = computed(() => (colorMode.value === "dark" ? "dark" : "light"));
const frame = ref<HTMLDivElement | null>(null);

onMounted(() => {
  mounted.value = true;
});

watch(
  [frame, () => props.calLink, theme],
  () => {
    const element = frame.value;
    if (!mounted.value || !element) return;
    element.innerHTML = "";

    const cal = getCal();
    cal("init", NAMESPACE, { origin: "https://app.cal.com" });
    const api = cal.ns?.[NAMESPACE];
    if (!api) return;
    api("inline", { elementOrSelector: element, calLink: props.calLink, config: { layout: "month_view", theme: theme.value } });
    api("ui", {
      theme: theme.value,
      styles: { body: { background: BACKGROUND[theme.value] } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  },
  { flush: "post" },
);
</script>

<template>
  <div v-if="!mounted" class="cal-embed__placeholder" />
  <div v-else class="cal-embed" :style="{ '--cal-bg': BACKGROUND[theme] }">
    <div aria-hidden="true" class="cal-embed__badge-mask" />
    <div ref="frame" class="cal-embed__frame" />
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.cal-embed {
  position: relative;
  height: 100%;
  min-height: 80px;

  // Hides the "Cal.com" badge under the calendar.
  &__badge-mask {
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 50;
    width: 100px;
    translate: -50% 0;
    background-color: var(--cal-bg);

    @include mq(md) {
      height: 60px;
    }
  }

  &__frame {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--cal-bg);
  }

  &__placeholder {
    height: 100%;
    min-height: 80px;
  }
}
</style>

<!-- Segmented "Send a message" / "Book a call" tabs with a sliding chip indicator. -->
<script setup lang="ts">
import type { Component } from "vue";

import CalendarBlankDuotone from "@/components/icons/CalendarBlankDuotone.vue";
import ChatTextDuotone from "@/components/icons/ChatTextDuotone.vue";
import { calLink, type ContactPanelId } from "@/data/contact";

const TABS: { id: ContactPanelId; label: string; Icon: Component }[] = [
  { id: "fill-form", label: "Send a message", Icon: ChatTextDuotone },
  { id: "book-call", label: "Book a call", Icon: CalendarBlankDuotone },
];

const props = defineProps<{ panel: ContactPanelId }>();
const emit = defineEmits<{ "panel-change": [panel: ContactPanelId] }>();

const list = ref<HTMLDivElement | null>(null);
// Load the Cal.com embed only once the call tab is first opened.
const calRequested = ref(props.panel === "book-call");
watch(
  () => props.panel,
  (panel) => {
    if (panel === "book-call") calRequested.value = true;
  },
);
const indicator = ref<Record<string, string> | null>(null);

let observer: ResizeObserver | undefined;

function measure() {
  const active = list.value?.querySelector<HTMLElement>(`[data-tab="${props.panel}"]`);
  if (!active) return;
  indicator.value = {
    "--tab-left": `${active.offsetLeft}px`,
    "--tab-top": `${active.offsetTop}px`,
    "--tab-width": `${active.offsetWidth}px`,
    "--tab-height": `${active.offsetHeight}px`,
  };
}

onMounted(() => {
  if (!list.value) return;
  measure();
  observer = new ResizeObserver(measure);
  observer.observe(list.value);
});
watch(() => props.panel, measure, { flush: "post" });
onBeforeUnmount(() => observer?.disconnect());

function handleKeyDown(event: KeyboardEvent) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  const index = TABS.findIndex((tab) => tab.id === props.panel);
  const next = TABS[(index + (event.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length]!;
  emit("panel-change", next.id);
  list.value?.querySelector<HTMLElement>(`[data-tab="${next.id}"]`)?.focus();
}
</script>

<template>
  <div class="contact-tabs">
    <div
      ref="list"
      role="tablist"
      aria-orientation="horizontal"
      class="contact-tabs__list"
      :style="indicator ?? undefined"
      @keydown="handleKeyDown"
    >
      <span aria-hidden="true" :class="['contact-tabs__indicator', { 'contact-tabs__indicator--ready': indicator }]" />
      <button
        v-for="tab in TABS"
        :id="`contact-tab-${tab.id}`"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-controls="`contact-panel-${tab.id}`"
        :aria-selected="panel === tab.id"
        :tabindex="panel === tab.id ? 0 : -1"
        :data-tab="tab.id"
        :class="['contact-tabs__tab', { 'contact-tabs__tab--active': panel === tab.id }]"
        @click="emit('panel-change', tab.id)"
      >
        <component :is="tab.Icon" class="contact-tabs__icon" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Both panels stay mounted so switching tabs keeps the draft and doesn't reload the calendar. -->
    <div
      id="contact-panel-fill-form"
      role="tabpanel"
      aria-labelledby="contact-tab-fill-form"
      :hidden="panel !== 'fill-form'"
      class="contact-tabs__panel"
    >
      <ContactForm />
    </div>
    <div
      id="contact-panel-book-call"
      role="tabpanel"
      aria-labelledby="contact-tab-book-call"
      :hidden="panel !== 'book-call'"
      class="contact-tabs__panel"
    >
      <CalEmbed v-if="calRequested" :cal-link="calLink" />
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.contact-tabs {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;

  &__list {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 100%;
    height: 44px;
    margin-inline: auto;
    padding: 4px;
    border-radius: 9999px;
    background-color: color-mix(in oklab, var(--color-foreground) 5%, transparent);
    color: var(--color-muted-foreground);

    @include mq(sm) {
      width: fit-content;
    }
  }

  // Raised chip that slides under the active tab.
  &__indicator {
    position: absolute;
    top: var(--tab-top);
    left: var(--tab-left);
    width: var(--tab-width);
    height: var(--tab-height);
    border-radius: 9999px;
    background-image: linear-gradient(180deg, var(--chip-top) 0, var(--chip-bottom) 100%);
    box-shadow:
      inset 0 1px 0 var(--chip-highlight),
      inset 0 -1px 0 var(--chip-shadow-1),
      0 0 0 0.5px var(--chip-shadow-2),
      0 1px 2px var(--chip-shadow-3),
      0 4px 10px -4px var(--chip-shadow-4);
    opacity: 0;
    transition: all 0.3s var(--ease-out-expo);

    @include reduced-motion {
      transition-property: none;
    }

    &--ready {
      opacity: 1;
    }
  }

  &__tab {
    position: relative;
    z-index: 10;
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 36px;
    padding: 2px 16px;
    border: 1px solid transparent;
    border-radius: 9999px;
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    white-space: nowrap;
    color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
    cursor: pointer;
    transition: all var(--duration-default) var(--ease-default);

    @include dark {
      color: var(--color-muted-foreground);
    }

    @include hover {
      color: var(--color-foreground);
    }

    &:focus-visible {
      outline: 1px solid var(--color-ring);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ring) 50%, transparent);
    }

    &--active,
    &--active:is(:root.dark *) {
      color: var(--color-foreground);
    }
  }

  &__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    pointer-events: none;
  }

  &__panel {
    flex: 1;
    min-height: 560px;
    font-size: 14px;
    line-height: 1.42857;
    outline: none;

    &[hidden] {
      display: none;
    }
  }
}
</style>

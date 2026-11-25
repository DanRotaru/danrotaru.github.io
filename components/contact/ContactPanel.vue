<!--
  Contact section: profile / intent chips / direct links, then the
  "Send a message" (default) <-> "Book a call" tabs. Picking an intent only shows its
  hint (it doesn't switch tabs). `?call` in the URL opens the booking tab.
-->
<script setup lang="ts">
import type { ContactPanelId } from "@/data/contact";

const panel = ref<ContactPanelId>("fill-form");
const intentId = ref<string | null>(null);

let timer: number | undefined;
onMounted(() => {
  if (!new URLSearchParams(window.location.search).has("call")) return;
  timer = window.setTimeout(() => {
    panel.value = "book-call";
  }, 0);
});
onBeforeUnmount(() => window.clearTimeout(timer));
</script>

<template>
  <div class="contact-panel">
    <ContactAside :intent-id="intentId" @intent="intentId = $event" />
    <ContactTabs :panel="panel" @panel-change="panel = $event" />
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.contact-panel {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
</style>

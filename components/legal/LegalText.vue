<!--
  Body copy block (paragraphs with underlined links and bold names).
  Content: the default slot, or the `html` prop (trusted HTML, legal content).
  Styles live in LegalRow.vue (`.legal-row__text`).
-->
<script setup lang="ts">
defineProps<{ html?: string }>();
</script>

<template>
  <div v-if="html !== undefined" class="legal-row__text" v-html="html" />
  <div v-else class="legal-row__text"><slot /></div>
</template>

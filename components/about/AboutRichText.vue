<!-- Renders RichText: plain strings, bold runs (may nest links) and external links. Recursive. -->
<script setup lang="ts">
import type { RichText } from "@/data/about";

defineProps<{ content: RichText | string }>();
</script>

<template>
  <template v-if="typeof content === 'string'">{{ content }}</template>
  <template v-else>
    <template v-for="(part, i) in content" :key="i">
      <template v-if="typeof part === 'string'">{{ part }}</template>
      <strong v-else-if="'strong' in part" class="about-experience__strong"><AboutRichText :content="part.strong" /></strong>
      <AboutExternalLink v-else :href="part.href" :text="part.text" :logo="part.logo" :logo-light="part.logoLight" />
    </template>
  </template>
</template>

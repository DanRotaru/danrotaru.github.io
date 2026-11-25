<!-- Body of /legal/privacy and /legal/terms: summary cards + heading/text rows. -->
<script setup lang="ts">
import type { LegalDocument as LegalDocumentData } from "@/content/legal/types";

defineProps<{ document: LegalDocumentData }>();
</script>

<template>
  <ContentFrame>
    <div class="legal-document">
      <LegalSummary :items="document.summary" :updated="document.updated" />
      <LegalRow
        v-for="(section, index) in document.sections"
        :key="index"
        :heading="section.heading"
        :divided="index < document.sections.length - 1"
      >
        <LegalText v-if="section.body" :html="section.body" />
        <LegalList v-if="section.list" :items="section.list" />
      </LegalRow>
    </div>
  </ContentFrame>
</template>

<style lang="scss">
@use "abstracts" as *;

.legal-document {
  display: flex;
  flex-direction: column;
}
</style>

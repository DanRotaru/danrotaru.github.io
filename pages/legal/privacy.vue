<script setup lang="ts">
import { privacy } from "@/content/legal/privacy";

usePageMeta({
  title: "Privacy Policy - Dan Rotaru",
  description: "What this site collects, why, who handles it, and how to have your data removed — in plain English.",
  path: "/legal/privacy",
  label: "Privacy Policy",
});
</script>

<template>
  <PageHero eyebrow="Legal" title="Privacy" highlight="Policy" />
  <LegalDocument :document="privacy" />
</template>

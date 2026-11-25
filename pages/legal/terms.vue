<script setup lang="ts">
import { terms } from "@/content/legal/terms";

usePageMeta({
  title: "Terms of Use - Dan Rotaru",
  description:
    "The ground rules for using this site: what's mine, what's fair game, and the usual limits — in plain English.",
  path: "/legal/terms",
  label: "Terms of Use",
});
</script>

<template>
  <PageHero eyebrow="Legal" highlight="Terms" title-after="of Use" />
  <LegalDocument :document="terms" />
</template>

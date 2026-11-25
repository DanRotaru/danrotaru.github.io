<script setup lang="ts">
import { site } from "@/lib/site";

usePageMeta({
  title: site.title,
  description: site.description,
  path: "/",
});
</script>

<template>
  <HomeHero />
  <SectionDivider />
  <HomeBirthCadenceMusic />
  <HomeEducationPrinciples />
  <HomeReadingTime />
  <HomeCareerCycling />
  <HomeLislex />
  <HomeHora />
  <HomeFacts />
  <HomeQuote />
</template>

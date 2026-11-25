<!-- "Off the keyboard" block at the bottom of /about: header band + the Life content (stories, facts). -->
<script setup lang="ts">
import { lifeIntro } from "@/data/life";
</script>

<template>
  <AboutSection
    id="life"
    class="about-life"
    :eyebrow="lifeIntro.eyebrow"
    :title="lifeIntro.title"
    :highlight="lifeIntro.highlight"
  />
  <LifeContent />
</template>

<style lang="scss">
// The Life rows below draw their own top border; drop the header's so the
// two don't double up.
.about-life .about-section__header {
  border-bottom: 0;
}
</style>

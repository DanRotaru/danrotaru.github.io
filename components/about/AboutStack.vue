<!--
  "The stack" section on the About page: the Daily Drivers skills card
  (moved from the home page) inside the hatched bento tray.
-->
<script setup lang="ts">
import { homeFeatures, homeSkills } from "@/data/home";

const { skills } = homeFeatures;
</script>

<template>
  <AboutSection id="stack" eyebrow="The Stack" title="What I build" highlight="with">
    <div class="about-stack">
      <div class="about-stack__cell">
        <HomeBentoCard :eyebrow="skills.eyebrow" :title="skills.title">
          <HomeSkills :legend="skills.legend" :all-label="skills.allLabel" :categories="homeSkills" />
        </HomeBentoCard>
      </div>
    </div>
  </AboutSection>
</template>

<style lang="scss">
@use "abstracts" as *;

// Hatched tray, same as the home bento sections.
.about-stack {
  padding: 12px;
  @include hatch;

  &__cell {
    display: grid;
    // Tall enough for six marquee rows (plus wrapped filter tabs on mobile).
    min-height: 372px;

    @include mq(sm) {
      min-height: 352px;
    }
  }
}
</style>

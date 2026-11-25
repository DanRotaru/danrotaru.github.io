<!-- Home row: "Hobby → Career" and bike commute. -->
<script setup lang="ts">
import { homeCareerPathCards, homeFitnessCards } from "@/data/home";

const { hobby } = homeCareerPathCards;
const { commute } = homeFitnessCards;
const cell = "home-bento-section__cell";
</script>

<template>
  <HomeBentoSection id="career-cycling">
    <div :class="[cell, `${cell}--span-5`]">
      <HomeBentoCard data-card-id="17" :eyebrow="hobby.eyebrow" :title="hobby.title" :href="hobby.href">
        <HomeExpHobbyCareer :shift="hobby" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-7`]">
      <HomeBentoCard data-card-id="20" :eyebrow="commute.eyebrow" :title="commute.title">
        <HomeBikeCommute
          :saved="commute.saved"
          :bike-label="commute.bikeLabel"
          :car-label="commute.carLabel"
          :caption="commute.caption"
        />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
</template>

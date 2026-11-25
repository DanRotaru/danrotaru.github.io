<!-- Home row: principles, "Questions Before Code" and the degree card. -->
<script setup lang="ts">
import { homePrinciplesCards, homeEducationCards, homeProblemFirstCards } from "@/data/home";

const { principles } = homePrinciplesCards;
const { degree } = homeEducationCards;
const { questions } = homeProblemFirstCards;
const cell = "home-bento-section__cell";
</script>

<template>
  <HomeBentoSection id="education-principles">
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="3" :eyebrow="principles.eyebrow" :title="principles.title">
        <HomePrinciples :items="principles.items" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="4" :eyebrow="questions.eyebrow" :title="questions.title">
        <HomeQuestionsFirst :items="questions.items" :caption="questions.caption" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`, `${cell}--full-md`]">
      <HomeBentoCard data-card-id="5" :eyebrow="degree.eyebrow" :title="degree.title">
        <HomeDegree
          :university="degree.university"
          :degree="degree.degree"
          :years="degree.years"
          :caption="degree.caption"
        />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
</template>

<style lang="scss">
@use "abstracts" as *;

// Three cards, with "Questions Before Code" a bit wider than its neighbours.
#education-principles .home-bento-section__tray {
  @include mq(lg) {
    grid-template-columns: 1fr 1.3fr 1fr;

    > .home-bento-section__cell {
      grid-column: auto;
    }
  }
}
</style>

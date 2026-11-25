<!-- Home row: reading highlights, local time and languages. -->
<script setup lang="ts">
import { homeLanguageCards, homeLocalTimeCards, homeReadingCards } from "@/data/home";

const { clock } = homeLocalTimeCards;
const { highlights } = homeReadingCards;
const { languages } = homeLanguageCards;
const cell = "home-bento-section__cell";
</script>

<template>
  <HomeBentoSection id="reading-time">
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="8" :eyebrow="highlights.eyebrow" :title="highlights.title">
        <HomeHighlights :segments="highlights.segments" :source="highlights.source" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="9" :eyebrow="clock.eyebrow" :title="clock.title">
        <HomeLocalTime :time-zone="clock.timeZone" :blocks="clock.blocks" :caption="clock.caption" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`, `${cell}--full-md`]">
      <HomeBentoCard data-card-id="10" :eyebrow="languages.eyebrow" :title="languages.title">
        <HomeLanguageSignal :rows="languages.rows" :max-bars="languages.maxBars" :caption="languages.caption" />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
</template>

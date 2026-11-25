<!-- Home row: "Born in Moldova" certificate, shipping cadence and "On Repeat" music. -->
<script setup lang="ts">
import { homeShippingCards, homeFocusCards, homeBirthCards } from "@/data/home";

const { cadence } = homeShippingCards;
const { nowPlaying } = homeFocusCards;
const { certificate } = homeBirthCards;
const cell = "home-bento-section__cell";
</script>

<template>
  <HomeBentoSection id="birth-cadence-music">
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="0" :eyebrow="certificate.eyebrow" :title="certificate.title">
        <HomeBornCertificate
          :label="certificate.label"
          :name="certificate.name"
          :date="certificate.date"
          :country="certificate.country"
          :caption="certificate.caption"
        />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`]">
      <HomeBentoCard data-card-id="1" :eyebrow="cadence.eyebrow" :title="cadence.title">
        <HomeCadence :weeks="cadence.weeks" :caption="cadence.caption" />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-4`, `${cell}--full-md`]">
      <HomeBentoCard data-card-id="2" :eyebrow="nowPlaying.eyebrow" :title="nowPlaying.title">
        <HomeNowPlaying :track="nowPlaying.track" :artist="nowPlaying.artist" :caption="nowPlaying.caption" />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
</template>

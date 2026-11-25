<!-- Home row: day job ("Now at Lislex") and freelance ("Real clients taught me to ship"). -->
<script setup lang="ts">
import { homeFreelanceCards, homeLislexCards } from "@/data/home";

const { now } = homeLislexCards;
const { orders } = homeFreelanceCards;
const cell = "home-bento-section__cell";
</script>

<template>
  <HomeBentoSection id="lislex">
    <div :class="[cell, `${cell}--span-7`]">
      <HomeBentoCard data-card-id="26" :eyebrow="now.eyebrow" :title="now.title">
        <HomeLislexNow
          :logo="now.logo"
          :company="now.company"
          :holder="now.holder"
          :rows="now.rows"
          :status="now.status"
          :tags="now.tags"
          :caption="now.caption"
        />
      </HomeBentoCard>
    </div>
    <div :class="[cell, `${cell}--span-5`]">
      <HomeBentoCard data-card-id="28" :eyebrow="orders.eyebrow" :title="orders.title" :href="orders.href">
        <HomeExpOrders :count="orders.count" :caption="orders.caption" />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
</template>

<style lang="scss">
// A little taller than a default row so the badge, map and box have room under the titles.
#lislex .home-bento-section__cell {
  min-height: 336px;
}
</style>

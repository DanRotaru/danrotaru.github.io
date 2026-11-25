<!-- Home row: "Hora, in pixels": playful pixel-embroidery band with little dancing people. -->
<script setup lang="ts">
import { homeHoraCards } from "@/data/home";

const { hora } = homeHoraCards;
const cell = "home-bento-section__cell";
</script>

<template>
  <HomeBentoSection id="hora">
    <div :class="[cell, 'home-hora__hero']">
      <HomeBentoCard data-card-id="32" :eyebrow="hora.eyebrow" :title="hora.title">
        <HomeHoraDancers :sprites="hora.sprites" :caption="hora.caption" />
      </HomeBentoCard>
    </div>
  </HomeBentoSection>
</template>

<style lang="scss">
@use "abstracts" as *;

// Full-width hero band. Scoped to #hora so it beats the base cell span at every breakpoint.
#hora .home-hora__hero {
  min-height: 352px;
  grid-column: 1 / -1;
}

// Taller regular cards so the pixel panels have room under the titles.
#hora .home-bento-section__cell:not(.home-hora__hero) {
  min-height: 336px;
}
</style>

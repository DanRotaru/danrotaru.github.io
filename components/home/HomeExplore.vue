<!-- "My Site — Explore, experiment && say hello": workstation and about tiles. -->
<script setup lang="ts">
import { homeExplore, homeFeatures } from "@/data/home";

const { behindCode } = homeExplore;
const { workstation } = homeFeatures;
</script>

<template>
  <section class="home-explore">
    <div class="container home-explore__container">
      <div class="home-explore__frame">
        <div class="home-explore__header">
          <PageTitle as="h2" class="home-explore__title" :eyebrow="homeExplore.eyebrow">
            <template #title>{{ homeExplore.title }}<br /></template>
            <template #highlight>{{ homeExplore.highlight }}</template>
          </PageTitle>
        </div>
        <div class="home-explore__tray">
          <div class="home-explore__cell">
            <HomeBentoCard :eyebrow="workstation.eyebrow" :title="workstation.title" :href="workstation.href" size="fixed">
              <HomeWorkstation :apps="workstation.apps" :idle-app="workstation.idleApp" :caption="workstation.caption" />
            </HomeBentoCard>
          </div>
          <div class="home-explore__cell">
            <HomeBentoCard :eyebrow="behindCode.eyebrow" :title="behindCode.title" :href="behindCode.href" size="fixed">
              <HomeBehindCode :strap-text="behindCode.strapText" :photo="behindCode.photo" />
            </HomeBentoCard>
          </div>
        </div>
        <span class="rail-node rail-node--top-left" />
        <span class="rail-node rail-node--top-right" />
        <span class="rail-node rail-node--bottom-left" />
        <span class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.home-explore {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__frame {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 48px 20px;
    border-bottom: 1px solid var(--color-border);
    text-align: center;

    @include mq(md) {
      padding: var(--header-height) 40px;
    }
  }

  // Overrides on the shared page-title (original: `mb-0! max-w-2xl max-sm:px-0`).
  &__title {
    max-width: 672px !important;
    margin-bottom: 0 !important;

    @include mq-down(sm) {
      padding-inline: 0 !important;
    }
  }

  &__tray {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 12px;
    padding: 12px;
    @include hatch;

    @include mq(md) {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  &__cell {
    grid-column: span 1 / span 1;

    @include mq(md) {
      grid-column: span 6 / span 6;
    }
  }
}
</style>

<!--
  The Life content (stories + facts) in a bordered section. Used at the bottom
  of /about.
-->
<script setup lang="ts">
import { instagramHighlights, instagramPosts, lifeFacts, lifeInstagram } from "@/data/life";
</script>

<template>
  <UsesSection>
    <UsesRow id="stories" divided>
      <template #heading>Moments from<br />my <em>stories</em>.</template>
      <a class="life-content__instagram" :href="lifeInstagram.href" rel="noopener noreferrer" target="_blank">
        <IconInstagramOutline aria-hidden="true" class="life-content__instagram-icon" />
        More on Instagram <span class="life-content__handle">{{ lifeInstagram.handle }}</span>
        <IconArrowUpRightSmall aria-hidden="true" class="life-content__instagram-arrow" />
      </a>
      <div class="life-content__group">
        <h3 class="life-content__group-title">Instagram highlights</h3>
        <LifeStories :highlights="instagramHighlights" />
      </div>
      <div class="life-content__group">
        <h3 class="life-content__group-title">From the feed</h3>
        <LifeStories :highlights="instagramPosts" />
      </div>
    </UsesRow>
    <UsesRow id="facts">
      <template #heading>A few <em>facts</em><br />about <em>me</em>.</template>
      <LifeFacts :facts="lifeFacts" />
    </UsesRow>
  </UsesSection>
</template>

<style lang="scss">
@use "abstracts" as *;

.life-content {
  &__instagram {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    font-size: 14px;
    color: var(--color-foreground);
    transition: border-color 0.3s var(--ease-default);
    @include focus-ring;

    @include hover {
      border-color: color-mix(in oklab, var(--color-foreground) 35%, transparent);
    }
  }

  &__instagram-icon,
  &__instagram-arrow {
    width: 16px;
    height: 16px;
  }

  &__group {
    margin-top: 40px;
  }

  &__group-title {
    margin-bottom: 16px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__handle {
    color: var(--color-muted-foreground);
  }
}
</style>

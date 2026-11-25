<!--
  "Principles" tile: a numbered list in an index-card style. Hover highlights
  the rules one after another (marker sweep behind the text).
-->
<script setup lang="ts">
defineProps<{
  items: string[];
}>();
</script>

<template>
  <div class="home-principles">
    <ol class="home-principles__list">
      <li v-for="(item, i) in items" :key="item" class="home-principles__item" :style="{ '--d': `${i * 140}ms` }">
        <span class="home-principles__num">{{ String(i + 1).padStart(2, "0") }}</span>
        <span class="home-principles__text">{{ item }}</span>
      </li>
    </ol>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

.home-principles {
  position: absolute;
  inset: 0;

  &__list {
    position: absolute;
    inset-inline: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding-block: 8px;
    border-top: 1px solid color-mix(in oklab, var(--color-foreground) 8%, transparent);
  }

  &__num {
    flex: none;
    font-family: var(--font-mono);
    font-size: 10px;
    color: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    transition: color 0.3s ease-in;

    @include parent-hover($card) {
      color: $blue;
      transition: color 0.3s ease-out var(--d);
    }
  }

  // Highlighter sweep: a background that grows from the left.
  &__text {
    min-width: 0;
    font-family: var(--font-instrument-serif), ui-serif, Georgia, serif;
    font-size: 18px;
    line-height: 1.3;
    letter-spacing: 0.18px;
    color: var(--color-foreground);
    background-image: linear-gradient(color-mix(in oklab, $blue 18%, transparent), color-mix(in oklab, $blue 18%, transparent));
    background-repeat: no-repeat;
    background-position: 0 85%;
    background-size: 0% 45%;
    transition: background-size 0.3s ease-in;
    @include truncate;

    @include parent-hover($card) {
      background-size: 100% 45%;
      transition: background-size 0.5s var(--ease-out-quint) var(--d);
    }
  }
}
</style>

<!--
  Grid of software tiles (logo + name + kind), each linking out.
  Marked up as a schema.org ItemList, like the old site's toolbox.
-->
<script setup lang="ts">
import type { ToolboxItem } from "@/data/toolbox";

defineProps<{
  items: ToolboxItem[];
}>();
</script>

<template>
  <ul class="toolbox-grid" itemscope itemtype="https://schema.org/ItemList">
    <li
      v-for="(item, index) in items"
      :key="item.name"
      class="toolbox-grid__cell"
      itemprop="itemListElement"
      itemscope
      itemtype="https://schema.org/ListItem"
    >
      <meta itemprop="position" :content="String(index + 1)" />
      <a class="toolbox-grid__card" :href="item.href" target="_blank" rel="noopener noreferrer" itemprop="url">
        <span class="toolbox-grid__logo">
          <img
            class="toolbox-grid__image"
            :src="item.logo"
            alt=""
            width="44"
            height="44"
            loading="lazy"
            decoding="async"
            itemprop="image"
          />
        </span>
        <span class="toolbox-grid__name" itemprop="name">{{ item.name }}</span>
        <span class="toolbox-grid__kind">{{ item.kind }}</span>
        <IconArrowUpRightSmall class="toolbox-grid__arrow" />
      </a>
    </li>
  </ul>
</template>

<style lang="scss">
@use "abstracts" as *;

$accent: oklch(62.3% 0.214 259.815);

.toolbox-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @include mq(sm) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @include mq(xl) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 100%;
    padding: 28px 12px 20px;
    text-align: center;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    background-image: radial-gradient(75% 60% at 50% 0%, #00000008, transparent);
    transition: all 0.2s var(--ease-default);

    @include dark {
      background-image: radial-gradient(75% 60% at 50% 0%, #ffffff0d, transparent);
    }

    @include hover {
      translate: 0 -2px;
      border-color: color-mix(in oklab, var(--color-foreground) 20%, transparent);
      background-color: color-mix(in oklab, var(--color-foreground) 2.5%, transparent);
    }

    &:focus-visible {
      outline: 1px solid color-mix(in oklab, #{$accent} 60%, transparent);
      outline-offset: 2px;
    }
  }

  &__logo {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    margin-bottom: 12px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 8%, transparent);
    border-radius: var(--radius-xl);
    background-color: color-mix(in oklab, var(--color-foreground) 2%, transparent);
    transition: all 0.2s var(--ease-default);

    @include parent-hover(".toolbox-grid__card") {
      scale: 1.04;
      border-color: color-mix(in oklab, var(--color-foreground) 18%, transparent);
    }
  }

  &__image {
    width: 44px;
    height: 44px;
    object-fit: contain;
    border-radius: 8px;
  }

  &__name {
    max-width: 100%;
    font-family: var(--font-bricolage);
    font-size: 15px;
    line-height: 1.3;
    font-weight: 500;
    color: color-mix(in oklab, var(--color-foreground) 85%, transparent);
    transition: color 0.2s var(--ease-default);

    @include parent-hover(".toolbox-grid__card") {
      color: var(--color-foreground);
    }
  }

  &__kind {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__arrow {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 14px;
    height: 14px;
    opacity: 0;
    translate: -4px 4px;
    color: $accent;
    transition: all 0.2s var(--ease-default);

    @include parent-hover(".toolbox-grid__card") {
      opacity: 1;
      translate: 0 0;
    }
  }
}
</style>

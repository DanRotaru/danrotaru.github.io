<!--
  "Git Worktrees" tile: a folder tree, main checkout on top and one sibling
  worktree per agent, each on its own branch. Hover lights the agent
  branches one by one.
-->
<script setup lang="ts">
import type { HomeAiTreeEntry } from "@/data/home";

defineProps<{
  entries: HomeAiTreeEntry[];
  /** Label bottom-left. */
  caption: string;
}>();
</script>

<template>
  <div class="home-ai-worktree-tree">
    <ul class="home-ai-worktree-tree__list">
      <li
        v-for="(entry, i) in entries"
        :key="entry.path"
        :class="['home-ai-worktree-tree__row', { 'home-ai-worktree-tree__row--child': entry.depth > 0 }]"
        :style="{ '--d': `${i * 150}ms` }"
      >
        <svg aria-hidden="true" class="home-ai-worktree-tree__folder" viewBox="0 0 16 16">
          <path d="M1.5 4.5a1 1 0 0 1 1-1h3.6l1.4 1.5h6a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1Z" />
        </svg>
        <span class="home-ai-worktree-tree__path">{{ entry.path }}</span>
        <span class="home-ai-worktree-tree__branch">{{ entry.branch }}</span>
      </li>
    </ul>
    <p class="home-ai-worktree-tree__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

.home-ai-worktree-tree {
  position: absolute;
  inset: 0;

  &__list {
    position: absolute;
    inset-inline: 20px;
    top: 104px;
    bottom: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7.2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6.4px;
    min-width: 0;

    &--child {
      padding-left: 24px;

      // Tree connector: └─
      &::before {
        content: "";
        position: absolute;
        left: 7.2px;
        top: -13.6px;
        width: 12.8px;
        height: 21.6px;
        border-left: 1px solid color-mix(in oklab, var(--color-foreground) 25%, transparent);
        border-bottom: 1px solid color-mix(in oklab, var(--color-foreground) 25%, transparent);
        border-bottom-left-radius: 4px;
      }
    }
  }

  &__folder {
    flex: none;
    width: 16px;
    height: 16px;
    fill: color-mix(in oklab, var(--color-foreground) 12%, transparent);
    stroke: color-mix(in oklab, var(--color-foreground) 50%, transparent);
    stroke-width: 1;
    stroke-linejoin: round;
    transition:
      fill 0.3s ease var(--d),
      stroke 0.3s ease var(--d);

    .home-ai-worktree-tree__row--child & {
      @include parent-hover($card) {
        fill: color-mix(in oklab, #{$blue} 25%, transparent);
        stroke: $blue;
      }
    }
  }

  &__path {
    min-width: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    @include truncate;
  }

  &__branch {
    flex: none;
    margin-left: auto;
    padding: 0.8px 6.4px;
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px var(--color-border);
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    transition:
      background-color 0.3s ease var(--d),
      color 0.3s ease var(--d);

    .home-ai-worktree-tree__row--child & {
      @include parent-hover($card) {
        background-color: $blue;
        color: #fff;
      }
    }
  }

  @include reduced-motion {
    &__folder,
    &__branch {
      transition: none !important;
    }
  }

  &__caption {
    pointer-events: none;
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }
}
</style>

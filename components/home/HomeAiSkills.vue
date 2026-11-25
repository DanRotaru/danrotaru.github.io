<!--
  "Skills & Commands" tile: a slash-command palette listing my reusable
  workflows. At rest the first command is selected; hover steps the selection
  down the list like arrow-key presses.
-->
<script setup lang="ts">
import type { HomeAiCommand } from "@/data/home";

defineProps<{
  query: string;
  commands: HomeAiCommand[];
  /** Label bottom-left. */
  caption: string;
}>();
</script>

<template>
  <div class="home-ai-skills">
    <div class="home-ai-skills__palette">
      <p aria-hidden="true" class="home-ai-skills__input">
        <span>{{ query }}</span><span class="home-ai-skills__caret" />
      </p>
      <ul class="home-ai-skills__list">
        <li aria-hidden="true" class="home-ai-skills__select" />
        <li v-for="command in commands" :key="command.name" class="home-ai-skills__item">
          <span class="home-ai-skills__name">{{ command.name }}</span>
          <span class="home-ai-skills__hint">{{ command.hint }}</span>
        </li>
      </ul>
    </div>
    <p class="home-ai-skills__caption">{{ caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";
$row: 24px;

@keyframes home-ai-skills-blink {
  50% {
    opacity: 0;
  }
}

@keyframes home-ai-skills-step {
  0%,
  22% {
    translate: 0 0;
  }

  25%,
  47% {
    translate: 0 $row;
  }

  50%,
  72% {
    translate: 0 $row * 2;
  }

  75%,
  97% {
    translate: 0 $row * 3;
  }

  100% {
    translate: 0 0;
  }
}

.home-ai-skills {
  position: absolute;
  inset: 0;

  &__palette {
    position: absolute;
    inset-inline: 20px;
    bottom: 48px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #fff;
    box-shadow:
      0 0 0 1px var(--color-border),
      0 10px 24px -16px rgb(0 0 0 / 0.3);

    @include dark {
      background-color: #18181b;
    }
  }

  &__input {
    display: flex;
    align-items: center;
    gap: 1.6px;
    padding: 6.4px 12px;
    border-bottom: 1px solid var(--color-border);
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-foreground);
  }

  &__caret {
    width: 1.5px;
    height: 14.4px;
    background-color: $blue;
    animation: home-ai-skills-blink 1s steps(1, end) infinite;
  }

  &__list {
    position: relative;
    margin: 0;
    padding: 4.8px;
    list-style: none;
  }

  &__select {
    position: absolute;
    inset-inline: 4.8px;
    top: 4.8px;
    height: $row;
    border-radius: 6px;
    background-color: color-mix(in oklab, #{$blue} 12%, transparent);

    @include parent-hover($card) {
      animation: home-ai-skills-step 3.2s var(--ease-out-quint) infinite;
    }
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 9.6px;
    height: $row;
    padding-inline: 7.2px;
  }

  &__name {
    flex: none;
    font-family: var(--font-mono);
    font-size: 11px;
    color: $blue;
  }

  &__hint {
    min-width: 0;
    font-family: var(--font-bricolage);
    font-size: 12px;
    color: color-mix(in oklab, var(--color-foreground) 55%, transparent);
    @include truncate;
  }

  @include reduced-motion {
    &__caret,
    &__select {
      animation: none !important;
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

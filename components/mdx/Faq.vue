<script setup lang="ts">
import type { VNodeChild } from "vue";

import { RenderNodes } from "@/lib/mdx-vnodes";

export type FaqItem = { question: string; answer: string | VNodeChild };

defineProps<{ items: FaqItem[]; title?: string }>();
</script>

<!--
  "Q. 01" style disclosure list (case studies). Each question is a native
  <details> that animates open via `::details-content`. String answers are
  wrapped in a paragraph; rich answers are rendered as given.
-->
<template>
  <div class="faq not-prose">
    <h2 v-if="title" class="faq__title">{{ title }}</h2>
    <div class="faq__list">
      <details v-for="(item, index) in items" :key="item.question" class="faq__item">
        <summary class="faq__summary">
          <span class="faq__number">Q.{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="faq__question">{{ item.question }}</span>
          <span aria-hidden="true" class="faq__toggle">
            <span class="faq__toggle-bar" />
            <span class="faq__toggle-bar faq__toggle-bar--vertical" />
          </span>
        </summary>
        <div class="faq__answer">
          <div class="faq__body prose">
            <p v-if="typeof item.answer === 'string'" class="faq__text">{{ item.answer }}</p>
            <RenderNodes v-else :nodes="item.answer" />
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.faq {
  &__title {
    margin-bottom: 24px;
    font-family: var(--font-serif);
    font-size: 30px;
    line-height: 1.2;
    letter-spacing: 0.75px;
  }

  // Dashed separators between questions.
  &__list > :not(:last-child) {
    border-bottom: 1px dashed var(--color-border);
  }

  &__item {
    // Animated open/close (progressive enhancement).
    &::details-content {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition:
        grid-template-rows 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        opacity 0.25s cubic-bezier(0.23, 1, 0.32, 1),
        content-visibility 0.3s cubic-bezier(0.23, 1, 0.32, 1) allow-discrete;
    }

    &[open]::details-content {
      grid-template-rows: 1fr;
      opacity: 1;
    }

    @include reduced-motion {
      &::details-content {
        transition: none;
      }
    }

    &:first-child > .faq__summary {
      padding-top: 0;
    }
  }

  &__summary {
    display: grid;
    grid-template-columns: 48px 1fr auto;
    column-gap: 8px;
    align-items: baseline;
    padding-block: 20px;
    border-radius: var(--radius-sm);
    list-style: none;
    cursor: pointer;
    outline: none;

    &::-webkit-details-marker,
    &::marker {
      display: none;
    }

    &:focus-visible {
      outline: 2px solid oklch(70.8% 0 0);
      outline-offset: 4px;
    }
  }

  &__number {
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 0.3px;
    font-variant-numeric: tabular-nums;
    color: oklch(70.8% 0 0);

    @include dark {
      color: oklch(43.9% 0 0);
    }
  }

  &__question {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    text-wrap: balance;
    color: oklch(37.1% 0 0);

    @include dark {
      color: oklch(87% 0 0);
    }
  }

  &__toggle {
    position: relative;
    align-self: center;
    width: 12px;
    height: 12px;
    color: oklch(70.8% 0 0);

    @include dark {
      color: oklch(55.6% 0 0);
    }
  }

  &__toggle-bar {
    position: absolute;
    inset-inline: 0;
    top: 50%;
    height: 1px;
    background-color: currentColor;
    translate: 0 -50%;

    &--vertical {
      inset: 0 auto;
      left: 50%;
      width: 1px;
      height: auto;
      translate: -50% 0;
      transition: rotate 0.3s cubic-bezier(0.23, 1, 0.32, 1);

      @include reduced-motion {
        transition: none;
      }
    }
  }

  // Open / hover states.
  &__item[open] &__number,
  &__item[open] &__toggle {
    color: oklch(20.5% 0 0);

    @include dark {
      color: #fff;
    }
  }

  &__item[open] &__question {
    color: oklch(14.5% 0 0);

    @include dark {
      color: #fff;
    }
  }

  &__item[open] &__toggle-bar--vertical {
    rotate: 90deg;
  }

  @media (hover: hover) {
    &__item:hover &__number,
    &__item:hover &__toggle {
      color: oklch(20.5% 0 0);
    }

    &__item:hover &__question {
      color: oklch(14.5% 0 0);
    }

    :root.dark &__item:hover &__number,
    :root.dark &__item:hover &__toggle,
    :root.dark &__item:hover &__question {
      color: #fff;
    }
  }

  &__answer {
    min-height: 0;
    overflow: hidden;
  }

  &__body {
    padding-bottom: 24px;
    padding-left: 56px;

    &.prose {
      max-width: none;
    }
  }

  &__text {
    margin-block: 0;
    text-wrap: pretty;
  }
}
</style>

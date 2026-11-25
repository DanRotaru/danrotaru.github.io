<script setup lang="ts">
export type PostFaqItem = { question: string; answer: string };

defineProps<{ items: PostFaqItem[] }>();
</script>

<!-- "Frequently asked questions" card list at the end of a blog post (one open at a time). -->
<template>
  <section aria-labelledby="faq-heading" class="post-faq">
    <h2 id="faq-heading" class="post-faq__title">Frequently asked questions</h2>
    <div class="post-faq__tray">
      <div class="post-faq__list">
        <details v-for="item in items" :key="item.question" name="blog-faq" class="post-faq__item">
          <summary class="post-faq__summary">
            <span class="post-faq__question">{{ item.question }}</span>
            <span class="post-faq__toggle">
              <IconChevronDown class="post-faq__chevron" />
            </span>
          </summary>
          <div class="post-faq__answer">
            <div class="post-faq__text">{{ item.answer }}</div>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.post-faq {
  width: 100%;
  max-width: 768px;
  margin-top: 16px;
  margin-inline: auto;
  scroll-margin-top: 96px;

  &__title {
    margin-bottom: 24px;
    font-family: var(--font-serif);
    font-size: 30px;
    line-height: 1.2;
    letter-spacing: 0.75px;
  }

  &__tray {
    padding: 4px;
    border: 1px solid oklch(92.2% 0 0);
    border-radius: calc(var(--radius) * 1.8);
    background-color: color-mix(in oklab, oklch(92.2% 0 0) 50%, transparent);

    @include dark {
      border-color: oklch(26.9% 0 0);
      background-color: color-mix(in oklab, oklch(20.5% 0 0) 50%, transparent);
    }
  }

  &__list {
    overflow: hidden;
    border: 1px solid color-mix(in oklab, oklch(92.2% 0 0) 80%, transparent);
    border-radius: calc(var(--radius) + 4px);
    background-color: #f6f6f8;
    box-shadow: 0 1px 2px 0 #0000000d;

    @include dark {
      border-color: oklch(26.9% 0 0);
      background-color: transparent;
    }

    & > :not(:last-child) {
      border-bottom: 1px solid color-mix(in oklab, oklch(92.2% 0 0) 70%, transparent);

      @include dark {
        border-color: color-mix(in oklab, oklch(26.9% 0 0) 60%, transparent);
      }
    }
  }

  &__item {
    transition: all 0.15s var(--ease-default);

    &[open] {
      background-color: color-mix(in oklab, #fff 50%, transparent);

      @include dark {
        background-color: color-mix(in oklab, oklch(26.9% 0 0) 14%, transparent);
      }
    }

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
  }

  &__summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    list-style: none;
    cursor: pointer;
    transition: all 0.15s var(--ease-default);

    &::-webkit-details-marker,
    &::marker {
      display: none;
    }

    @include hover {
      background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.02);
    }

    @include dark {
      @include hover {
        background-color: color-mix(in oklab, #fff 2%, transparent);
      }
    }
  }

  &__question {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.375;
    color: oklch(26.9% 0 0);
    transition: all 0.15s var(--ease-default);

    .post-faq__item[open] & {
      color: oklch(14.5% 0 0);
    }

    @include dark {
      color: oklch(92.2% 0 0);

      .post-faq__item[open] & {
        color: #fff;
      }
    }
  }

  &__toggle {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 1px solid color-mix(in oklab, oklch(92.2% 0 0) 80%, transparent);
    border-radius: 9999px;
    background-color: #fff;
    color: oklch(55.6% 0 0);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

    @include parent-hover(".post-faq__item") {
      color: oklch(37.1% 0 0);
    }

    .post-faq__item[open] & {
      border-color: oklch(87% 0 0);
      color: oklch(20.5% 0 0);
      rotate: 180deg;
    }

    @include dark {
      border-color: color-mix(in oklab, oklch(37.1% 0 0) 60%, transparent);
      background-color: color-mix(in oklab, oklch(26.9% 0 0) 60%, transparent);
      color: oklch(70.8% 0 0);

      @include parent-hover(".post-faq__item") {
        color: oklch(92.2% 0 0);
      }

      .post-faq__item[open] & {
        border-color: oklch(43.9% 0 0);
        color: #fff;
      }
    }
  }

  &__chevron {
    width: 16px;
    height: 16px;
  }

  &__answer {
    min-height: 0;
    overflow: hidden;
  }

  &__text {
    padding: 0 20px 20px;
    font-size: 14px;
    line-height: 1.625;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }
}
</style>

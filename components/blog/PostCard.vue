<script setup lang="ts">
import { formatCardDate, type PostMeta } from "@/data/posts";

defineProps<{ post: PostMeta }>();

// Same inline positioning next/image's `fill` applied.
const fillStyle = {
  position: "absolute",
  height: "100%",
  width: "100%",
  inset: "0",
  color: "transparent",
} as const;
</script>

<!-- Blog grid card: cover with overlay label, title, excerpt, meta and "Read article". -->
<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="post-card">
    <div class="post-card__media">
      <img
        :src="post.cover"
        :alt="post.coverAlt ?? post.title"
        loading="lazy"
        decoding="async"
        :style="fillStyle"
        class="post-card__image"
      />
      <div class="post-card__shade" />
      <div v-if="post.coverLabel" class="post-card__label-wrap">
        <span class="post-card__label">{{ post.coverLabel }}</span>
      </div>
    </div>
    <div class="post-card__body">
      <h3 class="post-card__title">{{ post.title }}</h3>
      <p class="post-card__excerpt">{{ post.description }}</p>
      <div class="post-card__footer">
        <div class="post-card__meta">
          <span>{{ post.readingTime }} min read</span>
          <span class="post-card__dot">·</span>
          <time :datetime="`${post.date}T00:00:00.000Z`">{{ formatCardDate(post.date) }}</time>
        </div>
        <div class="post-card__cta">
          Read article
          <span aria-hidden="true" class="post-card__arrows">
            <IconArrowRight class="post-card__arrow post-card__arrow--out" />
            <IconArrowRight class="post-card__arrow post-card__arrow--in" />
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
@use "abstracts" as *;

$spring: cubic-bezier(0.34, 1.4, 0.64, 1);

.post-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  border-radius: calc(var(--radius) * 2.2);
  background-color: #f7f7f8;
  box-shadow: 0 0 0 1px var(--color-border);
  transition: all 0.3s var(--ease-default);

  &:active {
    scale: 0.98;
  }

  @include hover {
    background-color: oklch(98.5% 0 0);
  }

  @include dark {
    background-color: #0f0f10;

    @include hover {
      background-color: color-mix(in oklab, oklch(20.5% 0 0) 40%, transparent);
    }
  }

  &__media {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16 / 11;
    border-radius: calc(var(--radius) * 1.8);
    background-color: oklch(97% 0 0);

    @include dark {
      background-color: oklch(20.5% 0 0);
    }
  }

  &__image {
    object-fit: cover;
    transition: scale 0.5s var(--ease-default);

    @include parent-hover(".post-card") {
      scale: 1.05;
    }
  }

  &__shade {
    position: absolute;
    inset: 0;
    background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.25);

    @include dark {
      background-color: oklab(15.9988% 0.00114696 -0.00402176 / 0.4);
    }
  }

  &__label-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  &__label {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.375;
    letter-spacing: -0.5px;
    text-align: center;
    text-wrap: balance;
    color: #fff;
    filter: drop-shadow(0 1px 2px #0000008c);
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 16px 8px 12px;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.375;
    color: oklch(20.5% 0 0);
    transition: color 0.3s var(--ease-default);

    @include parent-hover(".post-card") {
      color: oklch(43.9% 0 0);
    }

    @include dark {
      color: #fff;

      @include parent-hover(".post-card") {
        color: oklch(87% 0 0);
      }
    }
  }

  &__excerpt {
    @include line-clamp(2);
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.625;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: auto;
    padding-top: 16px;
  }

  &__meta {
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 0.28px;
    text-transform: uppercase;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__dot {
    margin-inline: 6px;
  }

  &__cta {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 0.3px;
    color: oklch(43.9% 0 0);
    transition: color 0.3s var(--ease-default);

    @include parent-hover(".post-card") {
      color: oklch(20.5% 0 0);
    }

    @include dark {
      color: oklch(70.8% 0 0);

      @include parent-hover(".post-card") {
        color: #fff;
      }
    }
  }

  &__arrows {
    position: relative;
    display: inline-flex;
    overflow: hidden;
    width: 14px;
    height: 14px;
  }

  &__arrow {
    width: 14px;
    height: 14px;

    &--in {
      position: absolute;
      inset: 0;
      translate: -16px 0;
    }

    @include parent-hover(".post-card") {
      transition: all 0.5s $spring;

      &--out {
        translate: 16px 0;
      }

      &--in {
        translate: 0 0;
      }
    }
  }
}
</style>

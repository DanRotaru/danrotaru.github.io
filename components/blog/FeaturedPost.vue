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

<!-- Large horizontal card for the featured post on /blog. -->
<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="featured-post">
    <div class="featured-post__media">
      <img
        :src="post.cover"
        :alt="post.coverAlt ?? post.title"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        :style="fillStyle"
        class="featured-post__image"
      />
      <div class="featured-post__shade" />
      <div v-if="post.coverLabel" class="featured-post__label-wrap">
        <span class="featured-post__label">{{ post.coverLabel }}</span>
      </div>
    </div>
    <div class="featured-post__body">
      <span class="featured-post__eyebrow">Featured</span>
      <div class="featured-post__meta">
        <span>{{ post.readingTime }} min read</span>
        <span class="featured-post__dot">·</span>
        <time :datetime="`${post.date}T00:00:00.000Z`">{{ formatCardDate(post.date) }}</time>
      </div>
      <h2 class="featured-post__title">{{ post.title }}</h2>
      <p class="featured-post__excerpt">{{ post.description }}</p>
      <div class="featured-post__tags">
        <span v-for="tag in post.tags" :key="tag" class="featured-post__tag">{{ tag }}</span>
      </div>
      <div class="featured-post__cta">
        Read article
        <span aria-hidden="true" class="featured-post__arrows">
          <IconArrowRight class="featured-post__arrow featured-post__arrow--out" />
          <IconArrowRight class="featured-post__arrow featured-post__arrow--in" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
@use "abstracts" as *;

$spring: cubic-bezier(0.34, 1.4, 0.64, 1);

.featured-post {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: calc(var(--radius) * 2.2);
  box-shadow: 0 0 0 1px var(--color-border);
  transition: all 0.3s var(--ease-default);

  @include mq(md) {
    flex-direction: row;
  }

  &:active {
    scale: 0.98;
  }

  @include hover {
    background-color: oklch(98.5% 0 0);
  }

  @include dark {
    @include hover {
      background-color: color-mix(in oklab, oklch(20.5% 0 0) 40%, transparent);
    }
  }

  &__media {
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: calc(var(--radius) * 1.8);
    background-color: oklch(97% 0 0);

    @include mq(md) {
      width: 50%;
      aspect-ratio: auto;
    }

    @include dark {
      background-color: oklch(20.5% 0 0);
    }
  }

  &__image {
    object-fit: cover;
    transition: scale 0.5s var(--ease-default);

    @include parent-hover(".featured-post") {
      scale: 1.03;
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
    padding: 32px;
  }

  &__label {
    font-size: 24px;
    font-weight: 400;
    line-height: 1.375;
    letter-spacing: -0.6px;
    text-align: center;
    text-wrap: balance;
    color: #fff;
    filter: drop-shadow(0 2px 10px #0006);

    @include mq(md) {
      letter-spacing: -0.75px;
      font-size: 30px;
    }
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 16px 20px;

    @include mq(md) {
      padding: 24px 32px;
    }
  }

  &__eyebrow {
    margin-bottom: 16px;
    font-family: var(--font-sans);
    font-size: 11px;
    letter-spacing: 0.28px;
    text-transform: uppercase;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__meta {
    margin-bottom: 16px;
    font-family: var(--font-sans);
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__dot {
    margin-inline: 6px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.25;
    color: oklch(20.5% 0 0);
    transition: color 0.3s var(--ease-default);

    @include mq(md) {
      font-size: 30px;
      line-height: 1.2;
    }

    @include parent-hover(".featured-post") {
      color: oklch(43.9% 0 0);
    }

    @include dark {
      color: #fff;

      @include parent-hover(".featured-post") {
        color: oklch(87% 0 0);
      }
    }
  }

  &__excerpt {
    @include line-clamp(3);
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.625;
    color: oklch(43.9% 0 0);

    @include mq(md) {
      font-size: 16px;
    }

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 24px;
  }

  &__tag {
    padding: 2px 8px;
    border-radius: var(--radius-md);
    background-color: oklch(98.5% 0 0);
    font-size: 12px;
    line-height: 1.33333;
    color: oklch(43.9% 0 0);

    @include dark {
      background-color: color-mix(in oklab, oklch(26.9% 0 0) 60%, transparent);
      color: oklch(70.8% 0 0);
    }
  }

  &__cta {
    display: flex;
    align-self: flex-end;
    align-items: center;
    gap: 6px;
    margin-top: 32px;
    font-size: 14px;
    line-height: 1.42857;
    letter-spacing: 0.35px;
    color: oklch(43.9% 0 0);
    transition: color 0.3s var(--ease-default);

    @include parent-hover(".featured-post") {
      color: oklch(20.5% 0 0);
    }

    @include dark {
      color: oklch(70.8% 0 0);

      @include parent-hover(".featured-post") {
        color: #fff;
      }
    }
  }

  &__arrows {
    position: relative;
    display: inline-flex;
    overflow: hidden;
    width: 16px;
    height: 16px;
  }

  &__arrow {
    width: 16px;
    height: 16px;

    &--in {
      position: absolute;
      inset: 0;
      translate: -20px 0;
    }

    @include parent-hover(".featured-post") {
      transition: all 0.5s $spring;

      &--out {
        translate: 20px 0;
      }

      &--in {
        translate: 0 0;
      }
    }
  }
}
</style>

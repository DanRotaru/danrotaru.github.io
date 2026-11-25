<script setup lang="ts">
import { formatPostDate, type PostMeta } from "@/data/posts";
import { site } from "@/lib/site";

const props = defineProps<{ post: PostMeta }>();

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const updated = computed(() =>
  props.post.updated && props.post.updated !== props.post.date ? props.post.updated : null,
);
const shown = computed(() => updated.value ?? props.post.date);
</script>

<!-- Post title block: breadcrumb, serif title, lead, reading time, copy menu and date. -->
<template>
  <header class="post-header">
    <RailsOverlay nodes="none" class="post-header__rails" />
    <div class="container">
      <div class="post-header__inner">
        <nav aria-label="Breadcrumb">
          <ol class="post-header__crumbs">
            <li class="post-header__crumb">
              <NuxtLink to="/" class="post-header__crumb-link">
                <IconHouseDuotone class="post-header__home-icon" />
                <span class="visually-hidden">Home</span>
              </NuxtLink>
            </li>
            <li class="post-header__crumb">
              <span aria-hidden="true">/</span>
              <NuxtLink to="/blog" class="post-header__crumb-link">Blog</NuxtLink>
            </li>
          </ol>
        </nav>
        <h1 class="post-header__title">{{ post.title }}</h1>
        <p class="post-header__lead">{{ post.description }}</p>
        <div class="post-header__meta">
          <div class="post-header__meta-start">
            <span class="post-header__reading">
              <IconClockDuotone class="post-header__clock" />
              {{ post.readingTime }} min read
            </span>
            <PageActions
              :path="`/blog/${post.slug}`"
              :markdown-path="`/blog/${post.slug}/index.md`"
              :site-name="site.name"
            />
          </div>
          <span class="post-header__date" :title="`Published ${formatPostDate(post.date)}`">
            <time :datetime="`${shown}T00:00:00.000Z`">{{ updated ? "Updated " : "" }}{{ shortDate(shown) }}</time>
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@use "abstracts" as *;

.post-header {
  position: relative;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 112px 20px 16px;
    text-align: left;

    @include mq(md) {
      align-items: center;
      padding: 160px 40px 24px;
      text-align: center;
    }
  }

  &__crumbs {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    line-height: 1.33333;
    list-style: none;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__crumb {
    display: contents;
  }

  &__crumb-link {
    transition: color 0.15s var(--ease-default);

    @include hover {
      color: var(--color-foreground);
    }
  }

  &__home-icon {
    width: 14px;
    height: 14px;
  }

  &__title {
    max-width: 768px;
    margin-top: 20px;
    font-family: var(--font-serif);
    font-size: 40px;
    font-weight: 500;
    line-height: 1.05;
    letter-spacing: -1px;
    text-wrap: pretty;
    color: #111;

    @include mq(md) {
      letter-spacing: -1.5px;
      font-size: 60px;
      line-height: 1.02;
      text-wrap: balance;
    }

    @include dark {
      color: var(--color-foreground);
    }
  }

  &__lead {
    max-width: 768px;
    margin-top: 24px;
    font-size: 18px;
    line-height: 1.625;
    text-wrap: pretty;
    color: oklch(37.1% 0 0);

    @include mq(md) {
      font-size: 20px;
    }

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    max-width: 768px;
    margin-top: 48px;
    font-size: 12px;
    line-height: 1.33333;
    white-space: nowrap;
    color: oklch(43.9% 0 0);

    @include mq(md) {
      gap: 16px;
      font-size: 14px;
      line-height: 1.42857;
    }

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__meta-start {
    display: flex;
    align-items: center;
    gap: 12px;

    @include mq(md) {
      gap: 16px;
    }
  }

  &__reading {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__clock {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
  }

  &__date {
    cursor: help;
  }
}
</style>

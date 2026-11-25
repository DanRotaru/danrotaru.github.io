<script setup lang="ts">
import { type PostMeta, tagLabel } from "@/data/posts";

/*
 * /blog body: tag filter chips + RSS toolbar, the featured post and the
 * "Latest articles" grid. Filtering is client-side.
 */
const props = defineProps<{ posts: PostMeta[]; tags: string[] }>();

const tag = ref<string | null>(null);

const visible = computed(() => {
  const current = tag.value;
  return current ? props.posts.filter((post) => post.tags.includes(current)) : props.posts;
});
const featured = computed(() => visible.value.find((post) => post.featured));
const latest = computed(() => visible.value.filter((post) => post !== featured.value));
</script>

<template>
  <BlogBand as="section" label="Featured article">
    <div class="blog-explorer__toolbar">
      <div class="blog-explorer__filters">
        <div class="blog-explorer__chips">
          <button
            type="button"
            :aria-pressed="tag === null"
            :class="['blog-explorer__chip', { 'blog-explorer__chip--active': tag === null }]"
            @click="tag = null"
          >
            All Posts
          </button>
          <button
            v-for="item in tags"
            :key="item"
            type="button"
            :aria-pressed="tag === item"
            :class="['blog-explorer__chip blog-explorer__chip--tag', { 'blog-explorer__chip--active': tag === item }]"
            @click="tag = tag === item ? null : item"
          >
            {{ tagLabel(item) }}
          </button>
        </div>
      </div>
      <div class="blog-explorer__actions">
        <a
          aria-label="RSS Feed"
          class="blog-explorer__rss"
          href="/blog/rss.xml"
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconRssDuotone class="blog-explorer__rss-icon" />
        </a>
      </div>
    </div>
    <p aria-live="polite" class="visually-hidden">
      {{ visible.length }} {{ visible.length === 1 ? "post" : "posts" }}
    </p>
    <div v-if="featured" class="blog-explorer__tray blog-explorer__tray--featured" data-tray="">
      <FeaturedPost :post="featured" />
    </div>
  </BlogBand>

  <template v-if="latest.length > 0">
    <BlogHeadingBand title="Latest articles" />
    <BlogBand as="section" label="Latest articles">
      <div class="blog-explorer__tray" data-tray="">
        <div class="blog-explorer__grid">
          <PostCard v-for="post in latest" :key="post.slug" :post="post" />
        </div>
      </div>
    </BlogBand>
  </template>
</template>

<style lang="scss">
@use "abstracts" as *;

.blog-explorer {
  &__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;

    @include mq(sm) {
      padding-inline: 24px;
    }
  }

  &__filters {
    flex: 1;
    min-width: 0;
  }

  &__chips {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    padding-right: 32px;
    overflow-x: auto;
    mask-image: linear-gradient(90deg, #000, #000 calc(100% - 32px), transparent);
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__chip {
    flex-shrink: 0;
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 14px;
    line-height: 1.42857;
    white-space: nowrap;
    color: oklch(70.8% 0 0);
    cursor: pointer;
    transition: all 0.2s var(--ease-default);

    &:active {
      scale: 0.98;
    }

    &--tag {
      text-transform: capitalize;
    }

    @include hover {
      color: oklch(37.1% 0 0);
    }

    @include dark {
      color: oklch(55.6% 0 0);

      @include hover {
        color: oklch(87% 0 0);
      }
    }

    // Raised "keycap" chip for the active filter.
    &--active {
      &,
      &:hover {
        background-image: linear-gradient(180deg, var(--chip-top) 0, var(--chip-bottom) 100%);
        box-shadow:
          inset 0 1px 0 var(--chip-highlight),
          inset 0 -1px 0 var(--chip-shadow-1),
          0 0 0 0.5px var(--chip-shadow-2),
          0 1px 2px var(--chip-shadow-3),
          0 4px 10px -4px var(--chip-shadow-4);
        color: oklch(20.5% 0 0);
      }

      @include dark {
        &,
        &:hover {
          color: #fff;
        }
      }
    }
  }

  &__actions {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
  }

  &__rss {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background-color: transparent;
    color: oklch(70.8% 0 0);
    transition:
      color 0.15s var(--ease-default),
      border-color 0.15s var(--ease-default);

    @include hover {
      border-color: oklch(70.8% 0 0);
      color: oklch(43.9% 0 0);
    }

    @include dark {
      border-color: oklch(26.9% 0 0);

      @include hover {
        border-color: oklch(43.9% 0 0);
        color: oklch(87% 0 0);
      }
    }
  }

  &__rss-icon {
    width: 16px;
    height: 16px;
  }

  // Hatched tray holding the cards.
  &__tray {
    display: grid;
    gap: 12px;
    padding: 12px;
    @include hatch;

    &--featured {
      border-top: 1px solid var(--color-border);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 12px;

    @include mq(md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mq(lg) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
</style>

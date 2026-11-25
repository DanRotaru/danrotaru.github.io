<script setup lang="ts">
import type { Component } from "vue";

import type { PostFaqItem } from "@/components/blog/PostFaq.vue";
import type { PostMeta } from "@/data/posts";
import { getPost, postSeoTitle, posts } from "@/data/posts";
import { mdxComponents } from "@/lib/mdx-components";

type PostModule = { default: Component; faq?: PostFaqItem[] };

// Post bodies, keyed by slug (content/blog/<slug>.mdx).
const bodies = Object.fromEntries(
  Object.entries(import.meta.glob<PostModule>("@/content/blog/*.mdx")).map(([file, load]) => [
    file.replace(/^.*\/([^/]+)\.mdx$/, "$1"),
    load,
  ]),
);

const route = useRoute();
const slug = String(route.params.slug);
const found = getPost(slug);
const loadBody = bodies[slug];

if (!found || !loadBody) {
  throw createError({ statusCode: 404, statusMessage: "Not found", fatal: true });
}
const post: PostMeta = found;

usePageMeta({
  title: postSeoTitle(post),
  description: post.seoDescription ?? post.description,
  path: `/blog/${post.slug}`,
  label: post.title,
  imageAlt: post.coverAlt,
  tags: post.tags,
  image: post.cover,
  type: "article",
  publishedTime: post.date,
  modifiedTime: post.updated ?? post.date,
});

const morePosts = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

const mod = await loadBody();
const Content = shallowRef<Component>(mod.default);
const faq: PostFaqItem[] = mod.faq ?? [];
</script>

<template>
  <article class="post">
    <PostCover :src="post.cover" />
    <PostHeader :post="post" />

    <BlogBand flush-top>
      <FloatingToc article-id="blog-article" />
      <div class="post__body">
        <div id="blog-article" class="post__article">
          <Prose class="prose--lg prose--article">
            <component :is="Content" :components="mdxComponents" />
          </Prose>
        </div>
      </div>
    </BlogBand>

    <template v-if="faq.length > 0">
      <SectionDivider />
      <BlogBand>
        <div class="post__faq">
          <PostFaq :items="faq" />
        </div>
      </BlogBand>
    </template>

    <SectionDivider />
    <BlogBand>
      <div class="post__footer">
        <PostFooter :tags="post.tags" />
      </div>
    </BlogBand>
  </article>

  <template v-if="morePosts.length > 0">
    <BlogHeadingBand title="More posts" />
    <BlogBand as="section">
      <div class="post__more" data-tray="">
        <PostCard v-for="item in morePosts" :key="item.slug" :post="item" />
      </div>
    </BlogBand>
  </template>
</template>

<style lang="scss">
@use "abstracts" as *;

// Blog post page layout (/blog/[slug]).
.post {
  position: relative;
  isolation: isolate;

  &__body {
    position: relative;
    padding: 32px 20px 48px;

    @include mq(md) {
      padding-inline: 40px;
      padding-bottom: 64px;
    }
  }

  // The article column (`#blog-article`).
  &__article {
    min-width: 0;
    max-width: 768px;
    margin-inline: auto;
    overflow-x: hidden;
    overflow-wrap: break-word;

    @include mq(lg) {
      max-width: calc(768px + 80px);
      padding-inline: 40px;
      overflow-x: visible;
    }
  }

  &__faq {
    padding: 48px 20px;

    @include mq(md) {
      padding: 64px 40px;
    }
  }

  &__footer {
    padding: 40px 20px;

    @include mq(md) {
      padding: 48px 40px;
    }
  }

  &__more {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 12px;
    padding: 12px;
    @include hatch;

    @include mq(md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mq(lg) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
</style>

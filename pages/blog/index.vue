<script setup lang="ts">
import { allPostTags, posts } from "@/data/posts";

usePageMeta({
  title: "Blog | Engineering Notes - Dan Rotaru",
  description:
    "Practical notes on building for the web: full-stack engineering, AI and LLM features, performance, developer tooling, and lessons from the craft.",
  path: "/blog",
});

const tags = allPostTags();
</script>

<template>
  <PageHero eyebrow="The Pensieve">
    <template #title>Handpicked</template>
    <template #highlight>Insights</template>
  </PageHero>
  <BlogExplorer :posts="posts" :tags="tags" />
</template>

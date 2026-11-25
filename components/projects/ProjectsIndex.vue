<!--
  /projects: railed hero followed by the curated work section (cards with a
  sticky detail panel), whose own title is dropped in favour of the hero.

  Kept under a single root element (as in the Next version, where sibling roots
  made scroll-on-navigate land on the work section instead of the top of the page).
-->
<script setup lang="ts">
import type { WorkItem } from "@/data/home";

const props = defineProps<{
  eyebrow: string;
  title: string;
  highlight: string;
  /** Projects to list (defaults to the curated case studies). */
  projects?: WorkItem[];
  /** Cards link to each project's live URL instead of its case study. */
  external?: boolean;
  /** Tags for the filter row above the list (no row when omitted). */
  tags?: string[];
  tagIcons?: Record<string, { icon: string; invert?: boolean }>;
}>();

const activeTag = ref<string | null>(null);

const tagCounts = computed(() => {
  const counts: Record<string, number> = {};
  for (const { project } of props.projects ?? []) for (const tag of project.tech) counts[tag] = (counts[tag] ?? 0) + 1;
  return counts;
});

const visible = computed(() =>
  props.projects && activeTag.value
    ? props.projects.filter(({ project }) => project.tech.includes(activeTag.value!))
    : props.projects,
);
</script>

<template>
  <div>
    <section class="projects-index">
      <div class="container projects-index__container">
        <div class="projects-index__rails">
          <ProjectsHero :eyebrow="eyebrow" :title="title" :highlight="highlight" />

          <span aria-hidden="true" class="rail-node rail-node--top-left" />
          <span aria-hidden="true" class="rail-node rail-node--top-right" />
          <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
          <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
        </div>
      </div>
    </section>
    <section v-if="tags?.length" class="projects-index projects-index--filter" aria-label="Filter">
      <div class="container projects-index__container">
        <div class="projects-index__rails projects-index__filter">
          <ProjectTagFilter
            v-model="activeTag"
            :tags="tags"
            :icons="tagIcons"
            :counts="tagCounts"
            :total="projects?.length"
          />
          <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
          <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
        </div>
      </div>
    </section>
    <!-- Re-mounted per tag so the side ruler re-reads the visible cards. -->
    <HomeWork :key="activeTag ?? 'all'" :intro="false" :projects="visible" :external="external" />
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.projects-index {
  position: relative;
  margin-top: -1px;
  border-bottom: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__rails {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__filter {
    padding: 24px 20px;

    @include mq(md) {
      padding-inline: 40px;
    }
  }
}
</style>

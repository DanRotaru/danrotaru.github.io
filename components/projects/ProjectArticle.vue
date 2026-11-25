<!--
  Railed section holding the case-study facts and the MDX body
  (a stack of CaseSection / CaseMedia blocks, each closed by a hairline).
  The MDX body is the default slot.
-->
<script setup lang="ts">
import type { Project } from "@/data/case-studies";

defineProps<{ project: Project }>();
</script>

<template>
  <section class="project-article">
    <div class="container project-article__container">
      <div class="project-article__rails">
        <ProjectMeta :project="project" />
        <article>
          <p class="visually-hidden">TL;DR: {{ project.caseStudy.tldr }}</p>
          <div><slot /></div>
        </article>

        <span aria-hidden="true" class="rail-node rail-node--top-left" />
        <span aria-hidden="true" class="rail-node rail-node--top-right" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-left" />
        <span aria-hidden="true" class="rail-node rail-node--bottom-right" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.project-article {
  position: relative;
  margin-top: -1px;
  border-top: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__rails {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }
}
</style>

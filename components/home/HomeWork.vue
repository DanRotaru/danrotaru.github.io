<!--
  "Curated work": project cards on the left, a sticky detail panel for the
  card in view on the right (lg+). Below lg everything stacks per project.
-->
<script setup lang="ts">
import { type HomeWorkProject, homeWork, type WorkItem } from "@/data/home";
import { getProject } from "@/data/case-studies";
import { formatLaunched, type WorkProject } from "@/data/projects";

const props = withDefaults(
  defineProps<{
    /** Render the section's own "Curated work" title (off when a page hero already provides one). */
    intro?: boolean;
    /** Projects to show (defaults to the curated case studies from `homeWork`). */
    projects?: WorkItem[];
    /** Link titles and cards to each project's live URL (new tab) instead of its case study. */
    external?: boolean;
  }>(),
  { intro: true, projects: undefined, external: false },
);

const items: WorkItem[] =
  props.projects ??
  homeWork.projects.flatMap((config) => {
    const project = getProject(config.slug);
    return project ? [{ project, config }] : [];
  });

const mainHref = (project: WorkProject) =>
  props.external ? (project.liveUrl ?? project.repoUrl ?? "/projects") : `/projects/${project.slug}`;
const linkAttrs = props.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
const mainLabel = (config: HomeWorkProject) => (props.external ? (config.linkLabel ?? "Open") : homeWork.caseStudyLabel);

const tickerItems = items.map(({ project, config }) => ({
  slug: project.slug,
  title: project.title,
  accent: config.accent,
}));

const vars = (index: number) => ({ "--i": index, "--row": index + 1 });
</script>

<template>
  <section id="work" class="home-work">
    <div class="container home-work__container">
      <div class="home-work__rails">
        <div v-if="intro" class="home-work__intro">
          <PageTitle as="h2" :eyebrow="homeWork.eyebrow" class="home-work__title">
            <template #title>{{ homeWork.title }}</template>
            <template #highlight>{{ homeWork.highlight }}</template>
          </PageTitle>
        </div>

        <div class="home-work__grid" :style="{ '--n': items.length }">
          <span aria-hidden="true" class="rail-node home-work__node home-work__node--top" />
          <span aria-hidden="true" class="rail-node home-work__node home-work__node--bottom" />

          <HomeWorkTicker :items="tickerItems" />

          <template v-for="({ project, config }, index) in items" :key="project.slug">
            <header
              class="home-work__header"
              :data-panel="project.slug"
              :data-active="index === 0 ? '' : undefined"
              :style="vars(index)"
            >
              <div :class="['home-work__heading', { 'home-work__heading--divided': index > 0 }]">
                <NuxtLink :to="mainHref(project)" v-bind="linkAttrs" class="home-work__title-link" data-part="title">
                  <h3 class="home-work__project-title">{{ project.title }}</h3>
                </NuxtLink>
                <p class="home-work__category" data-part="category">
                  {{ project.category
                  }}<template v-if="project.launched"
                    ><span aria-hidden="true" class="home-work__sep">·</span
                    ><time :datetime="project.launched">{{ formatLaunched(project.launched) }}</time></template
                  >
                </p>
              </div>
              <ul aria-label="Key technologies" class="home-work__stack" data-part="stack">
                <li v-for="tech in project.tech" :key="tech" class="home-work__tech">{{ tech }}</li>
              </ul>
            </header>

            <div
              :id="`project-${project.slug}`"
              class="home-work__card"
              :data-card="project.slug"
              :style="vars(index)"
            >
              <HomeWorkCard :project="project" :config="config" :href="mainHref(project)" :external="external" :preview="external" />
            </div>

            <div
              :class="['home-work__panel', `home-work__panel--${config.accent}`]"
              :data-panel="project.slug"
              :data-active="index === 0 ? '' : undefined"
              :style="vars(index)"
            >
              <p class="home-work__description" data-part="description">{{ project.description }}</p>
              <ul class="home-work__highlights">
                <li
                  v-for="(highlight, i) in config.highlights"
                  :key="highlight"
                  class="home-work__highlight"
                  :data-part="`highlight-${i}`"
                >
                  <IconSparkleFour class="home-work__star" aria-hidden="true" />
                  <span>{{ highlight }}</span>
                </li>
              </ul>
              <div class="home-work__links" data-part="links">
                <HomeArrowLink :href="mainHref(project)" v-bind="linkAttrs">{{ mainLabel(config) }}</HomeArrowLink>
                <a
                  v-if="!external && (config.liveUrl ?? project.liveUrl)"
                  class="home-work__external"
                  :href="config.liveUrl ?? project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >Live<IconArrowUpRight aria-hidden="true" class="home-work__external-icon"
                /></a>
                <a
                  v-if="(config.repoUrl ?? project.repoUrl) && (config.repoUrl ?? project.repoUrl) !== mainHref(project)"
                  class="home-work__external"
                  :href="config.repoUrl ?? project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >Code<IconArrowUpRight aria-hidden="true" class="home-work__external-icon"
                /></a>
              </div>
            </div>
          </template>
        </div>

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
@use "./accents" as *;

/// Right-column items (header + panel) share one sticky grid area on lg;
/// only the `[data-active]` one is visible.
@mixin sticky-panel {
  @include mq(lg) {
    position: sticky;
    grid-column-start: 2;
    grid-row: 1 / span var(--n);
    align-self: flex-start;
    visibility: hidden;

    &[data-active]:not([data-active="false"]) {
      visibility: visible;
    }
  }
}

.home-work {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__rails {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 48px 20px;
    text-align: center;
    border-bottom: 1px solid var(--color-border);

    @include mq(md) {
      padding: var(--header-height, 64px) 40px;
    }
  }

  // Mix with .page-title (double class to win over the shared defaults).
  &__title.page-title {
    max-width: 672px;
    margin-bottom: 0;

    @include mq-down(sm) {
      padding-inline: 0;
    }
  }

  &__grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    container-type: inline-size;

    @include mq(lg) {
      --row-h: calc(41.25cqw + 79.5px);
      grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);

      // Vertical rule between the columns
      &::before {
        content: "";
        position: absolute;
        inset-block: 0;
        left: 60%;
        width: 1px;
        background-color: var(--color-border);
      }
    }
  }

  // Rail nodes where the column rule meets the borders (mixed with .rail-node).
  &__node {
    left: calc(60% - 3px);

    @include mq-down(lg) {
      display: none;
    }

    &--top {
      top: -3px;
    }

    &--bottom {
      bottom: -3px;
    }
  }

  // ---------------------------------------------------------------------------
  // Header (title, category, stack)
  // ---------------------------------------------------------------------------
  &__header {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include mq-down(lg) {
      display: contents;
    }

    @include mq(lg) {
      pointer-events: none;
      top: 96px;
      height: var(--row-h);
      padding: 72px 32px 0 48px;

      > * {
        pointer-events: auto;
      }
    }

    @include sticky-panel;
  }

  &__heading {
    order: calc(var(--i) * 4);
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 4px 12px;
    padding: 28px 20px 20px;

    @include mq(md) {
      padding-inline: 32px;
    }

    @include mq(lg) {
      padding: 0;
    }

    &--divided {
      @include mq-down(lg) {
        border-top: 1px solid var(--color-border);
      }
    }
  }

  &__title-link {
    width: fit-content;
  }

  &__project-title {
    font-family: var(--font-instrument-serif);
    font-size: 30px;
    line-height: 1.25;
    letter-spacing: 0.75px;
    color: var(--color-foreground);

    @include mq(lg) {
      letter-spacing: 0.9px;
      font-size: 36px;
    }
  }

  &__category {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 12px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    line-height: 1;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__stack {
    order: calc(var(--i) * 4 + 2);
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-inline: 20px;
    padding-top: 20px;

    @include mq(md) {
      padding-inline: 32px;
    }

    @include mq(lg) {
      padding: 0;
    }
  }

  &__tech {
    padding: 2px 10px;
    font-size: 12px;
    line-height: 1.33333;
    color: color-mix(in oklab, var(--color-foreground) 70%, transparent);
    background-color: color-mix(in oklab, var(--color-foreground) 3%, transparent);
    border: 1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent);
    border-radius: 9999px;
  }

  // ---------------------------------------------------------------------------
  // Card cell (left column on lg)
  // ---------------------------------------------------------------------------
  &__card {
    order: calc(var(--i) * 4 + 1);
    padding: 8px;
    @include hatch;

    @include mq(md) {
      padding: 12px;
    }

    @include mq(lg) {
      grid-column-start: 1;
      grid-row: var(--row);
      padding: 48px 12px;
    }
  }

  // ---------------------------------------------------------------------------
  // Detail panel (description, highlights, links)
  // ---------------------------------------------------------------------------
  &__panel {
    order: calc(var(--i) * 4 + 3);
    padding-inline: 20px;
    padding-bottom: 32px;

    @include mq(md) {
      padding-inline: 32px;
    }

    @include mq(lg) {
      top: 256px;
      height: calc(var(--row-h) - 160px);
      margin-top: 160px;
      padding: 0 32px 48px 48px;
    }

    @include sticky-panel;
    @include accent-modifiers;
  }

  &__description {
    max-width: 48ch;
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.5;
    text-wrap: pretty;
    color: color-mix(in oklab, var(--color-foreground) 85%, transparent);

    @include mq(lg) {
      margin-top: 16px;
    }
  }

  &__highlights {
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-width: 52ch;
    margin-top: 28px;

    @include mq-down(lg) {
      display: none;
    }
  }

  &__highlight {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    line-height: 1.42857;
    text-wrap: pretty;
    color: var(--color-muted-foreground);
  }

  &__star {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    color: var(--accent);
    filter: var(--accent-glow);
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 24px;
    margin-top: 24px;

    @include mq(lg) {
      margin-top: 28px;
    }
  }

  // Live / Code: visually hidden until focused with the keyboard.
  &__external {
    @include sr-only;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
    transition: color var(--duration-default) var(--ease-default);

    @include hover {
      color: var(--color-foreground);
    }

    &:focus-visible {
      position: static;
      width: auto;
      height: auto;
      margin: 0;
      padding: 0;
      overflow: visible;
      clip-path: none;
      white-space: normal;
    }
  }

  &__external-icon {
    width: 14px;
    height: 14px;
  }
}
</style>

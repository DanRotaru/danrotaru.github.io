<!-- Facts grid (type, role, dates, links) and the tech-stack chips above the case-study body. -->
<script setup lang="ts">
import type { Component } from "vue";

import GithubLogoDuotone from "@/components/icons/GithubLogoDuotone.vue";
import GlobeDuotone from "@/components/icons/GlobeDuotone.vue";
import TrayArrowDownDuotone from "@/components/icons/TrayArrowDownDuotone.vue";
import type { CaseStudyLinkIcon, Project } from "@/data/case-studies";
import { cn } from "@/lib/cn";

const props = defineProps<{ project: Project }>();

const linkIcons: Record<CaseStudyLinkIcon, Component> = {
  globe: GlobeDuotone,
  download: TrayArrowDownDuotone,
  github: GithubLogoDuotone,
};

const facts = computed(() => {
  const { role, built, updated } = props.project.caseStudy;
  return [
    { label: "Type", value: props.project.category },
    { label: "Role", value: role },
    { label: "Built", value: built },
    { label: "Updated", value: updated },
  ];
});
</script>

<template>
  <div class="project-meta">
    <div class="project-meta__grid">
      <div class="project-meta__facts">
        <div v-for="fact in facts" :key="fact.label">
          <p class="project-meta__label">{{ fact.label }}</p>
          <p class="project-meta__value">{{ fact.value }}</p>
        </div>
        <div v-for="link in project.caseStudy.links" :key="link.label">
          <p class="project-meta__label">{{ link.label }}</p>
          <a
            class="project-meta__link"
            :href="link.href"
            v-bind="link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
          >
            <span class="project-meta__link-text">
              <component :is="linkIcons[link.icon]" class="project-meta__link-icon" />
              {{ link.text }}
            </span>
            <IconArrowUpRightThin class="project-meta__link-arrow" />
          </a>
        </div>
      </div>

      <div class="project-meta__stack">
        <p class="project-meta__label project-meta__label--stack">Tech Stack</p>
        <div class="project-meta__chips">
          <span v-for="tech in project.caseStudy.stack" :key="tech.name" class="project-meta__chip shadow-border">
            <!-- sprite fragment, not optimisable -->
            <img
              v-if="tech.icon"
              alt=""
              aria-hidden="true"
              :class="cn('project-meta__chip-icon', tech.invert && 'project-meta__chip-icon--invert')"
              height="14"
              width="14"
              loading="lazy"
              :src="`/static/icons/sprite.svg#${tech.icon}`"
            />
            <span v-else aria-hidden="true" class="project-meta__chip-spacer" />
            <span class="project-meta__chip-name">{{ tech.name }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.project-meta {
  border-bottom: 1px solid var(--color-border);

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    @include mq(lg) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 32px;
    padding: 32px 16px;

    @include mq(md) {
      padding-inline: 24px;
    }
  }

  &__label {
    margin-bottom: 6px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: oklch(55.6% 0 0);

    &--stack {
      margin-bottom: 12px;
    }
  }

  &__value {
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    color: oklch(26.9% 0 0);

    @include dark {
      color: oklch(92.2% 0 0);
    }
  }

  // Blue link with an underline that draws in from the left on hover.
  &__link {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    line-height: 1.42857;
    font-weight: 500;
    color: oklch(54.6% 0.245 262.881);

    &::before {
      content: "";
      pointer-events: none;
      position: absolute;
      top: 21px;
      left: 0;
      width: 100%;
      height: 0.7px;
      background-color: currentColor;
      transform-origin: 100%;
      scale: 0 1;
      transition: scale 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @include hover {
      color: oklch(48.8% 0.243 264.376);

      &::before {
        transform-origin: 0;
        scale: 1 1;
      }
    }

    @include dark {
      color: oklch(70.7% 0.165 254.624);

      @include hover {
        color: oklch(80.9% 0.105 251.813);
      }
    }
  }

  &__link-text {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    line-height: 1;
  }

  &__link-icon {
    width: 14px;
    height: 14px;
  }

  &__link-arrow {
    width: 7.7px;
    height: 7.7px;
    margin-left: 4.2px;
    opacity: 0;
    translate: 0 4px;
    transition: all 0.3s var(--ease-default);

    @include reduced-motion {
      transition: none;
    }

    @include parent-hover(".project-meta__link") {
      opacity: 1;
      translate: 0 0;
    }
  }

  &__stack {
    padding: 32px 16px;
    border-top: 1px solid var(--color-border);

    @include mq(md) {
      padding-inline: 24px;
    }

    @include mq(lg) {
      border-top-width: 0;
      border-left: 1px solid var(--color-border);
    }
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    @include mq(sm) {
      gap: 8px;
    }
  }

  &__chip {
    display: flex;
    padding: 4px 8px;
    font-family: var(--font-geist-mono);
    background-color: color-mix(in oklab, var(--color-primary) 5%, transparent);
    border-radius: calc(var(--radius) - 2px);

    @include mq(sm) {
      padding: 5px 10px;
    }
  }

  &__chip-icon {
    width: 12px;
    height: 12px;
    margin-right: 6px;

    @include mq(sm) {
      width: 14px;
      height: 14px;
    }

    &--invert {
      @include dark {
        filter: invert(100%);
      }
    }
  }

  // Keeps the chip height when a tech has no icon.
  &__chip-spacer {
    height: 12px;

    @include mq(sm) {
      height: 14px;
    }
  }

  &__chip-name {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.25px;
    text-transform: uppercase;
    color: oklch(43.9% 0 0);

    @include mq(sm) {
      letter-spacing: 0.28px;
      font-size: 11px;
    }

    @include dark {
      color: oklch(87% 0 0);
    }
  }
}
</style>

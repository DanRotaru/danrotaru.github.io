<!--
  "Daily Drivers" tile: four marquee rows of tech chips (one per category,
  alternating direction) or, when a category is picked, a wrapped list.
-->
<script setup lang="ts">
import type { HomeSkill, HomeSkillCategory } from "@/data/home";

const props = defineProps<{
  legend: string;
  allLabel: string;
  categories: Record<HomeSkillCategory, HomeSkill[]>;
}>();

const names = computed(() => Object.keys(props.categories) as HomeSkillCategory[]);
const options = computed(() => [props.allLabel, ...names.value]);
const active = ref<string>(props.allLabel);
// Unique per instance: the card can appear more than once on a page.
const floorId = `skills-floor-${useId()}`;
const { el, offscreen } = useOffscreen<HTMLDivElement>();
const selected = computed(() => (active.value === props.allLabel ? null : (active.value as HomeSkillCategory)));
const uniqueTitles = computed(() => [
  ...new Set(names.value.flatMap((name) => (props.categories[name] ?? []).map((skill) => skill.title))),
]);

const rows = computed(() =>
  names.value.map((name) => {
    const row = props.categories[name] ?? [];
    const repeated = Array.from({ length: Math.ceil(10 / row.length) }, () => row).flat();
    return { name, repeated, items: [...repeated, ...repeated] };
  }),
);

function onChange(option: string) {
  active.value = option === active.value ? props.allLabel : option;
}

// Skill chip (icon via CSS mask variables).
function chipClass(skill: HomeSkill) {
  return [
    "home-skills__chip",
    {
      "home-skills__chip--invert": skill.themeAdaptive,
      "home-skills__chip--dark-icon": skill.darkIcon,
      "home-skills__chip--highlight": skill.highlight,
    },
  ];
}

function chipStyle(skill: HomeSkill): Record<string, string> {
  return {
    "--chip-icon": `url("${skill.icon}")`,
    ...(skill.darkIcon ? { "--chip-icon-dark": `url("${skill.darkIcon}")` } : {}),
  };
}
</script>

<template>
  <div ref="el" class="home-skills" :data-offscreen="offscreen ? '' : undefined">
    <svg aria-hidden="true" class="home-skills__floor" preserveAspectRatio="xMidYMid slice" viewBox="0 0 500 288">
      <defs>
        <pattern height="18" :id="floorId" patternUnits="userSpaceOnUse" width="36">
          <path
            d="M0 9 L18 0 L36 9 M0 9 L18 18 L36 9"
            fill="none"
            stroke="currentColor"
            stroke-opacity="0.06"
            stroke-width="0.6"
          />
        </pattern>
      </defs>
      <rect :fill="`url(#${floorId})`" height="100%" width="100%" />
      <path
        d="M-20 250 L520 -20 M120 300 L520 100"
        fill="none"
        stroke="currentColor"
        stroke-dasharray="3 4"
        stroke-opacity="0.14"
        stroke-width="0.7"
      />
    </svg>

    <HomeFilterTabs :legend="legend" :options="options" :value="active" @change="onChange" />

    <div class="home-skills__stage">
      <ul v-if="selected" :key="selected" class="home-skills__grid">
        <li
          v-for="(skill, index) in categories[selected] ?? []"
          :key="skill.title"
          class="home-skills__grid-item"
          :style="{ animationDelay: `${index * 22}ms` }"
        >
          <span :class="chipClass(skill)" :style="chipStyle(skill)">{{ skill.title }}</span>
        </li>
      </ul>
      <div v-else class="home-skills__rows">
        <ul class="visually-hidden">
          <li v-for="title in uniqueTitles" :key="title">{{ title }}</li>
        </ul>
        <div
          v-for="(row, rowIndex) in rows"
          :key="row.name"
          aria-hidden="true"
          class="home-skills__row"
          :style="{ animationDelay: `${rowIndex * 50}ms` }"
        >
          <div
            :class="['home-skills__track', { 'home-skills__track--reverse': rowIndex % 2 !== 0 }]"
            :style="{ animationDuration: `${row.repeated.length * 5}s` }"
          >
            <span
              v-for="(skill, index) in row.items"
              :key="`${skill.title}-${index}`"
              :class="chipClass(skill)"
              :style="chipStyle(skill)"
              >{{ skill.title }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.home-skills {
  position: absolute;
  inset: 0;

  &[data-offscreen],
  &[data-offscreen] * {
    animation-play-state: paused !important;
  }

  &__floor {
    pointer-events: none;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: var(--color-foreground);
    mask-image: radial-gradient(75% 85% at 65% 75%, #000, transparent);
  }

  &__stage {
    position: absolute;
    inset-inline: 0;
    top: 92px;
    // Extra room on mobile, where the filter tabs wrap onto two lines.
    bottom: 68px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include mq(sm) {
      bottom: 48px;
    }
  }

  &__rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__row {
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent, #000 10% 90%, transparent);
    animation: rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  }

  &__track {
    --tech-row-shift: -50%;
    display: flex;
    gap: 6px;
    width: max-content;
    animation: tech-row 50s linear infinite;

    @include parent-hover(".home-skills__row") {
      animation-play-state: paused;
    }

    &--reverse {
      animation-direction: reverse;
    }

    @include reduced-motion {
      animation: none;
    }
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 6px;
    height: 100%;
    padding-inline: 20px;
    overflow-y: auto;
    scrollbar-width: none;
  }

  &__grid-item {
    animation: rise-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  }

  &__chip {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 6px;
    height: 22px;
    padding-inline: 8px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 9%, transparent);
    border-radius: 3px;
    background-color: #f7f7f8;
    box-shadow: inset 0 1px 0 #fff9;
    font-family: var(--font-bricolage);
    font-size: 11px;
    color: color-mix(in oklab, var(--color-foreground) 65%, transparent);
    transition: all 0.3s var(--ease-out-quint);

    &::before {
      content: "";
      flex-shrink: 0;
      width: 12px;
      height: 12px;
      background-image: var(--chip-icon);
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: contain;
    }

    @include parent-hover(".home-bento-card") {
      background-color: #fff;

      @include dark {
        background-color: #131314;
      }
    }

    @include hover {
      border-color: color-mix(in oklab, var(--color-foreground) 20%, transparent);
      color: var(--color-foreground);
    }

    @include dark {
      background-color: #0f0f10;
      box-shadow: inset 0 1px 0 #ffffff0a;
    }

    // Brighter on dark, darker on light: full foreground instead of 65%.
    &--highlight {
      border-color: color-mix(in oklab, var(--color-foreground) 22%, transparent);
      color: var(--color-foreground);
    }

    &--invert {
      @include dark {
        &::before {
          filter: invert(100%);
        }
      }
    }

    &--dark-icon {
      @include dark {
        &::before {
          background-image: var(--chip-icon-dark);
        }
      }
    }
  }
}
</style>

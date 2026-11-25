<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Raw <svg> markup (content/diagrams/<page>.ts). Used on all screens, or below md when `svgWide` is set. */
    svg: string;
    caption?: string;
    label?: string;
    /** Optional wider layout of the same diagram, shown from the md breakpoint. */
    svgWide?: string;
    /** Break out of the text column on large screens (up to 1024px). */
    wide?: boolean;
  }>(),
  { caption: undefined, label: undefined, svgWide: undefined, wide: false },
);
</script>

<!--
  Pre-rendered diagram SVG (the original site renders Mermaid-like "pele"
  diagrams at build time) in a tray card with zoom / pan controls.
-->
<template>
  <figure :class="['diagram not-prose', { 'diagram--wide': wide }]" :aria-label="label">
    <div class="diagram__tray">
      <DiagramViewport>
        <template v-if="svgWide">
          <div class="diagram__svg diagram__svg--narrow" v-html="svg" />
          <div class="diagram__svg diagram__svg--wide" v-html="svgWide" />
        </template>
        <div v-else class="diagram__svg" v-html="svg" />
      </DiagramViewport>
    </div>
    <figcaption v-if="caption" class="diagram__caption">{{ caption }}</figcaption>
  </figure>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "./surface" as *;

// Figure wrapper + all "pele" diagram styles (flowchart, sequence, tree, gantt, state...).
// The SVG markup is generated, so `.pele-*` classes are styled as-is (descendant selectors).
.diagram {
  width: 100%;
  min-width: 0;
  margin-block: 24px;

  &--wide {
    position: relative;

    @include mq(lg) {
      left: 50%;
      width: min(1024px, calc(100vw - var(--container-padding) * 2 - 80px));
      translate: -50% 0;
    }
  }

  &__tray {
    @include mdx-tray;
  }

  &__svg {
    display: flex;
    justify-content: center;

    &--narrow {
      @include mq(md) {
        display: none;
      }
    }

    &--wide {
      display: none;

      @include mq(md) {
        display: flex;
      }
    }

    & svg {
      max-width: 100%;
    }
  }

  &__caption {
    padding-top: 12px;
    padding-inline: 12px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    text-wrap: pretty;
    color: oklch(55.6% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  // ---------------------------------------------------------------------------
  // pele diagram theme
  // ---------------------------------------------------------------------------
  .pele {
    --pele-font: var(--font-sans);
    --pele-font-mono: var(--font-mono);
    --pele-radius: 8px;

    :is(path, rect, polygon, circle, ellipse, line) {
      vector-effect: non-scaling-stroke;
    }

    .pele-node > :first-child {
      filter: drop-shadow(0 1px 1.5px #0000000f) drop-shadow(0 4px 10px #0000000a);
    }

    :is(.blue, .accent) {
      --pele-tone: oklch(62.3% 0.214 259.815);
    }

    .green {
      --pele-tone: oklch(69.6% 0.17 162.48);
    }

    .rose {
      --pele-tone: oklch(64.5% 0.246 16.439);
    }

    .amber {
      --pele-tone: oklch(76.9% 0.188 70.08);
    }

    .violet {
      --pele-tone: oklch(60.6% 0.25 292.717);
    }

    .cyan {
      --pele-tone: oklch(71.5% 0.143 215.221);
    }

    .pele-lifeline:is(.blue, .green, .rose, .amber, .violet, .cyan) {
      stroke: color-mix(in oklab, var(--pele-tone) 45%, transparent);
    }

    .pele-message:is(.blue, .green, .rose, .amber, .violet, .cyan) path {
      stroke: color-mix(in oklab, var(--pele-tone) 80%, var(--pele-fg));
    }

    .pele-message:is(.blue, .green, .rose, .amber, .violet, .cyan) .pele-marker {
      fill: color-mix(in oklab, var(--pele-tone) 80%, var(--pele-fg));
      stroke: none;
    }

    .pele-cluster > rect {
      stroke: color-mix(in oklab, var(--color-foreground) 9%, transparent);
    }

    .pele-note > :is(rect, path) {
      fill: color-mix(in oklab, oklch(76.9% 0.188 70.08) 8%, var(--pele-surface));
      stroke: color-mix(in oklab, oklch(76.9% 0.188 70.08) 40%, var(--pele-surface));
    }

    .pele-note text {
      fill: color-mix(in oklab, oklch(66.6% 0.179 58.318) 60%, var(--pele-fg));
    }

    .pele-tree-dir > .pele-icon path {
      fill: oklab(76.9% 0.0640531 0.176752 / 0.18);
      stroke: oklch(76.9% 0.188 70.08);
    }

    :is(.pele-node, .pele-task):is(.blue, .accent, .green, .rose, .amber, .violet, .cyan, .pele-active, .pele-crit)
      :is(rect, polygon, path, circle, ellipse):not(.pele-icon *) {
      fill: color-mix(in oklab, var(--pele-tone) 9%, var(--pele-surface));
      stroke: color-mix(in oklab, var(--pele-tone) 70%, var(--pele-surface));
    }

    :is(.pele-node, .pele-task):is(.blue, .accent, .green, .rose, .amber, .violet, .cyan, .pele-active, .pele-crit) text {
      fill: color-mix(in oklab, var(--pele-tone) 62%, var(--pele-fg));
    }
  }

  :root.dark & .pele .pele-node > :first-child {
    filter: drop-shadow(0 1px #ffffff0a) drop-shadow(0 6px 14px #00000073);
  }

  // Gantt charts
  .pele-gantt {
    .pele-active {
      --pele-tone: oklch(69.6% 0.17 162.48);
    }

    .pele-crit {
      --pele-tone: oklch(64.5% 0.246 16.439);
    }

    .pele-task rect {
      fill: var(--pele-surface);
      stroke: var(--pele-border);
    }

    .pele-task text {
      fill: var(--pele-fg);
    }

    .pele-section-0 {
      fill: var(--pele-surface-alt);
    }

    .pele-section-1 {
      fill: transparent;
    }
  }
}
</style>

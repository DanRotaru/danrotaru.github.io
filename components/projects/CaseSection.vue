<!--
  One numbered chapter of a case study: sticky number + serif heading on the
  left (lg+), prose on the right. Used inside content/projects/*.mdx.
-->
<script setup lang="ts">
defineProps<{
  /** Two-digit section number, e.g. "01". */
  number: string;
  title: string;
}>();
</script>

<template>
  <section class="case-section">
    <div class="case-section__aside">
      <div class="case-section__heading">
        <p class="case-section__number">
          <span class="case-section__index">{{ number }}</span>
          <span aria-hidden="true" class="case-section__rule" />
        </p>
        <h2 class="case-section__title">{{ title }}</h2>
      </div>
    </div>
    <div class="case-section__content">
      <Prose class="case-section__prose"><slot /></Prose>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.case-section {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  border-bottom: 1px solid var(--color-border);

  @include mq(lg) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  &__aside {
    padding: 40px 20px 0;

    @include mq(md) {
      padding-inline: 40px;
    }

    @include mq(lg) {
      grid-column: span 4 / span 4;
      padding-block: 64px;
      border-right: 1px solid var(--color-border);
    }
  }

  &__heading {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @include mq(lg) {
      position: sticky;
      top: 128px;
    }
  }

  &__number {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__index {
    font-variant-numeric: tabular-nums;
  }

  &__rule {
    width: 24px;
    height: 1px;
    background-color: var(--color-border);
  }

  &__title {
    font-family: var(--font-instrument-serif);
    font-size: 30px;
    line-height: 1.25;
    letter-spacing: 0.75px;
    text-wrap: balance;
    color: var(--color-foreground);
  }

  &__content {
    padding: 24px 20px 48px;

    @include mq(md) {
      padding-inline: 40px;
    }

    @include mq(lg) {
      grid-column: span 8 / span 8;
      padding-block: 64px;
    }
  }

  // Original: `max-w-[68ch]` over the prose default of 65ch.
  &__prose {
    max-width: 68ch !important;
  }
}
</style>

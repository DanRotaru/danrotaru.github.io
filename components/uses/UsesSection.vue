<!--
  Bordered column that holds the Uses page rows (hardware, toolkit),
  with rail nodes at the four corners. Rows (<UsesRow>) go in the default slot.
-->
<template>
  <section class="uses-section">
    <div class="container uses-section__container">
      <div class="uses-section__frame">
        <div class="uses-section__rows"><slot /></div>
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

.uses-section {
  position: relative;
  margin-top: -1px;
  border-block: 1px solid var(--color-border);

  &__container {
    height: 100%;
  }

  &__frame {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__rows {
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    scroll-margin-top: 96px;

    @include mq(lg) {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    &--divided {
      border-bottom: 1px solid var(--color-border);
    }
  }

  &__aside {
    padding-inline: 20px;
    padding-top: 40px;

    @include mq(md) {
      padding-inline: 40px;
    }

    @include mq(lg) {
      grid-column: span 4 / span 4;
      padding-block: 64px;
      border-right: 1px solid var(--color-border);
    }
  }

  &__sticky {
    @include mq(lg) {
      position: sticky;
      top: 128px;
    }
  }

  &__heading {
    @include heading-serif(30px);
    font-size: 30px;
    line-height: 1.25;
    color: oklch(70.8% 0 0);

    @include dark {
      color: #777b84;
    }

    em {
      font-style: normal;
      color: oklch(20.5% 0 0);

      @include dark {
        color: oklch(97% 0 0);
      }
    }
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
}
</style>

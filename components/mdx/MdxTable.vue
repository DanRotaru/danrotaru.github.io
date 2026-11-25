<script setup lang="ts">
/** MDX (GFM) table inside a horizontally scrollable card. */
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="mdx-table not-prose">
    <div class="mdx-table__scroll" role="group" aria-label="Scrollable table" tabindex="0">
      <table class="mdx-table__table"><slot /></table>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "./surface" as *;

.mdx-table {
  @include mdx-tray;
  margin-block: 24px;

  &__scroll {
    @include mdx-panel;
    overflow-x: auto;

    &:focus-visible {
      outline: 2px solid color-mix(in oklab, oklch(62.3% 0.214 259.815) 60%, transparent);
      outline-offset: 2px;
    }
  }

  &__table {
    width: 100%;
    min-width: 500px;
    border-collapse: collapse;
    font-size: 14px;
    line-height: 1.42857;
  }

  &__row {
    border-bottom: 1px solid color-mix(in oklab, oklch(92.2% 0 0) 60%, transparent);

    &:last-child {
      border-width: 0;
    }

    @include dark {
      border-color: color-mix(in oklab, oklch(26.9% 0 0) 40%, transparent);
    }
  }

  &__head > &__row {
    border-bottom: 1px solid oklch(92.2% 0 0);

    @include dark {
      border-color: oklch(26.9% 0 0);
    }
  }

  &__th {
    padding: 8px 16px;
    text-align: left;
  }

  &__label {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: var(--radius-md);
    background-color: color-mix(in oklab, oklch(92.2% 0 0) 80%, transparent);
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
    color: oklch(26.9% 0 0);

    @include dark {
      background-color: oklch(26.9% 0 0);
      color: oklch(92.2% 0 0);
    }
  }

  &__td {
    padding: 10px 16px;
    font-size: 14px;
    line-height: 1.625;
    vertical-align: top;
    color: oklch(43.9% 0 0);

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }
}
</style>

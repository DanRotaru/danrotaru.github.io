<!--
  "Chose / Over / Why / Cost" trade-off table in a bezel; scrolls horizontally on small screens.
  Cells are plain strings or MDX JSX (VNodes, e.g. a fragment with <InlineCode>).
-->
<script setup lang="ts">
import type { VNode } from "vue";

defineProps<{
  /** Column headings, e.g. ["Chose", "Over", "Why", "Cost"]. */
  columns: string[];
  rows: Array<Array<string | VNode>>;
}>();
</script>

<template>
  <div class="comparison-table not-prose">
    <div class="comparison-table__scroll" role="group" aria-label="Scrollable table" tabindex="0">
      <table class="comparison-table__table">
        <thead class="comparison-table__head">
          <tr class="comparison-table__row">
            <th v-for="column in columns" :key="column" class="comparison-table__th">
              <span class="comparison-table__badge">{{ column }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="comparison-table__row">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="comparison-table__td">
              <template v-if="typeof cell === 'string'">{{ cell }}</template>
              <component :is="cell" v-else />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

// Rendered inside `.prose`; the table parts are scoped under the block
// (`.comparison-table .comparison-table__x`) so generic prose table styles don't win.
.comparison-table {
  margin-block: 24px;
  padding: 3px;
  background-color: color-mix(in oklab, oklch(92.2% 0 0) 50%, transparent);
  border: 1px solid oklch(92.2% 0 0);
  border-radius: var(--radius-2xl);

  @include dark {
    background-color: color-mix(in oklab, oklch(20.5% 0 0) 50%, transparent);
    border-color: oklch(26.9% 0 0);
  }

  & &__scroll {
    overflow-x: auto;
    background-color: #f6f6f8;
    border: 1px solid color-mix(in oklab, oklch(92.2% 0 0) 80%, transparent);
    border-radius: var(--radius-xl);
    box-shadow: 0 1px 2px #0000000d;

    &:focus-visible {
      outline: 2px solid color-mix(in oklab, oklch(62.3% 0.214 259.815) 60%, transparent);
      outline-offset: 2px;
    }

    @include dark {
      background-color: transparent;
      border-color: oklch(26.9% 0 0);
      box-shadow: none;
    }
  }

  & &__table {
    width: 100%;
    min-width: 500px;
    margin: 0;
    font-size: 14px;
    line-height: 1.42857;
    border-collapse: collapse;
  }

  & &__row {
    border-bottom: 1px solid color-mix(in oklab, oklch(92.2% 0 0) 60%, transparent);

    &:last-child {
      border-width: 0;
    }

    @include dark {
      border-color: color-mix(in oklab, oklch(26.9% 0 0) 40%, transparent);
    }
  }

  & &__head > &__row {
    border-bottom: 1px solid oklch(92.2% 0 0);

    @include dark {
      border-color: oklch(26.9% 0 0);
    }
  }

  & &__th {
    padding: 8px 16px;
    text-align: left;
    vertical-align: bottom;
  }

  & &__badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    white-space: nowrap;
    color: oklch(26.9% 0 0);
    background-color: color-mix(in oklab, oklch(92.2% 0 0) 80%, transparent);
    border-radius: calc(var(--radius) - 2px);

    @include dark {
      color: oklch(92.2% 0 0);
      background-color: oklch(26.9% 0 0);
    }
  }

  & &__td {
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

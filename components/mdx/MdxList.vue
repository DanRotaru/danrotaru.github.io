<script setup lang="ts">
/** MDX bullet list. (Markdown's own `class`, e.g. GFM `contains-task-list`, is replaced like in React.) */
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const rest = computed(() => {
  const { class: _class, ...other } = attrs;
  void _class;
  return other;
});
</script>

<template>
  <ul v-bind="rest" class="mdx-list"><slot /></ul>
</template>

<style lang="scss">
@use "abstracts" as *;

// `.prose &` raises specificity above the typography rules these replace.
.mdx-list {
  &,
  .prose & {
    margin-block: 16px;
    padding-left: 24px;
    list-style-type: disc;

    & > li::marker {
      color: oklch(87% 0 0);
    }

    @include dark {
      & > li::marker {
        color: oklch(43.9% 0 0);
      }
    }
  }

  // Item spacing at zero specificity: inside .prose the typography li margins win (as on the original).
  @at-root :where(.mdx-list > :not(:last-child)) {
    margin-block-end: 8px;
  }

  &--ordered {
    &,
    .prose & {
      list-style-type: decimal;

      & > li::marker {
        font-weight: 500;
        color: oklch(70.8% 0 0);
      }

      @include dark {
        & > li::marker {
          color: oklch(55.6% 0 0);
        }
      }
    }
  }
}
</style>

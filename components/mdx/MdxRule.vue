<script setup lang="ts">
/** MDX `---`. */
defineOptions({ inheritAttrs: false });
</script>

<template>
  <hr class="mdx-rule" />
</template>

<style lang="scss">
@use "abstracts" as *;

.mdx-rule {
  &,
  .prose & {
    margin-block: 40px;
    border-width: 1px 0 0;
    border-color: var(--color-border);
  }
}
</style>

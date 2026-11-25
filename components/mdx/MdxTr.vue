<script setup lang="ts">
// Part of the .mdx-table block (styles in MdxTable.vue).
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const rest = computed(() => {
  const { class: _class, ...other } = attrs;
  void _class;
  return other;
});
</script>

<template>
  <tr v-bind="rest" class="mdx-table__row"><slot /></tr>
</template>

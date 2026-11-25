<script setup lang="ts">
// Part of the .mdx-table block (styles in MdxTable.vue). GFM alignment (`align` / `style`) is dropped.
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const rest = computed(() => {
  const { class: _class, align: _align, style: _style, ...other } = attrs;
  void _class;
  void _align;
  void _style;
  return other;
});
</script>

<template>
  <td v-bind="rest" class="mdx-table__td"><slot /></td>
</template>

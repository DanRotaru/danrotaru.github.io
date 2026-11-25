<script setup lang="ts">
/** MDX numbered list. Styles live in MdxList.vue (.mdx-list block). */
defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
const rest = computed(() => {
  const { class: _class, ...other } = attrs;
  void _class;
  return other;
});
</script>

<template>
  <ol v-bind="rest" class="mdx-list mdx-list--ordered"><slot /></ol>
</template>

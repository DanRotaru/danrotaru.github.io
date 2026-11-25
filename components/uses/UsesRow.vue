<!--
  One row: sticky serif heading on the left (lg+), content on the right.
  Heading goes in the `heading` slot (wrap the emphasised words in <em>).
  Styles live in UsesSection.vue (`.uses-section__row`...).
-->
<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    /** Draw a bottom border under the row (all but the last). */
    divided?: boolean;
  }>(),
  { divided: false },
);
</script>

<template>
  <div :id="id" :class="divided ? 'uses-section__row uses-section__row--divided' : 'uses-section__row'">
    <div class="uses-section__aside">
      <div class="uses-section__sticky">
        <h2 class="uses-section__heading"><slot name="heading" /></h2>
      </div>
    </div>
    <div class="uses-section__content"><slot /></div>
  </div>
</template>

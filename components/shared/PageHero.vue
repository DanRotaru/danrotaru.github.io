<!--
  Standard page header: crumpled-paper backdrop, vertical rails and a
  centered serif title. Used by Toolbox, Blog, Contact, Legal, etc.

  `title`, `highlight` and `titleAfter` accept a plain string prop or a same-named slot (slot wins).
  The default slot is extra content under the title (intro text, buttons...).
-->
<script setup lang="ts">
defineProps<{
  /** Small uppercase label above the title, e.g. "The Gear". */
  eyebrow: string;
  /** Plain part of the title, e.g. "What Powers". */
  title?: string;
  /** Gradient italic part of the title, e.g. "My Work". */
  highlight?: string;
  /** Text after the highlight, e.g. "of Use". */
  titleAfter?: string;
}>();
</script>

<template>
  <section class="page-hero">
    <PaperBackdrop />
    <RailsOverlay nodes="bottom" />
    <div class="container">
      <div class="page-hero__inner">
        <PageTitle :eyebrow="eyebrow" :title="title" :highlight="highlight" :title-after="titleAfter" flush>
          <template v-if="$slots.title" #title><slot name="title" /></template>
          <template v-if="$slots.highlight" #highlight><slot name="highlight" /></template>
          <template v-if="$slots.titleAfter" #titleAfter><slot name="titleAfter" /></template>
        </PageTitle>
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.page-hero {
  position: relative;
  isolation: isolate;
  border-bottom: 1px solid var(--color-border);

  &__inner {
    padding: 144px 20px 48px;

    @include mq(md) {
      padding-inline: 40px;
      padding-bottom: 64px;
    }
  }

}
</style>

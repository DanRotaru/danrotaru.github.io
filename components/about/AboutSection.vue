<!--
  Bordered page section used below the About intro: rails with corner nodes,
  a centered serif header band, then the section body.
  `title` / `highlight` are ReactNode in the source -> named slots (props as plain-string fallback).
-->
<script setup lang="ts">
defineProps<{
  id?: string;
  eyebrow: string;
  title?: string;
  highlight?: string;
}>();

const slots = defineSlots<{
  default?: () => unknown;
  title?: () => unknown;
  highlight?: () => unknown;
}>();
</script>

<template>
  <section :id="id" class="about-section">
    <div class="container about-section__container">
      <div class="about-section__frame">
        <div class="about-section__header">
          <PageTitle :eyebrow="eyebrow" as="h2" class="about-section__title">
            <template v-if="slots.title || title" #title>
              <slot name="title">{{ title }}</slot>
            </template>
            <template v-if="slots.highlight || highlight" #highlight>
              <slot name="highlight">{{ highlight }}</slot>
            </template>
          </PageTitle>
        </div>
        <slot />
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

.about-section {
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

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 48px 20px;
    text-align: center;
    border-bottom: 1px solid var(--color-border);

    @include mq(md) {
      padding: var(--header-height) 40px;
    }
  }

  &__title.page-title {
    max-width: 672px;
    margin-bottom: 0;

    @include mq-down(sm) {
      padding-inline: 0;
    }
  }
}
</style>

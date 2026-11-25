<!--
  Error page (Next's app/not-found.tsx). Wrapped in <NuxtLayout> so the site chrome
  (header, contact CTA, footer) renders around it like Next's not-found inside the root layout.
-->
<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error.statusCode === 404);

useHead({
  title: () => (isNotFound.value ? "Page Not Found - Dan Rotaru" : "Something Went Wrong - Dan Rotaru"),
  meta: [{ name: "robots", content: "noindex, follow" }],
});
useSeoMeta({ description: "This page doesn't exist or has moved." });

function goHome() {
  void clearError({ redirect: "/" });
}
</script>

<template>
  <NuxtLayout>
    <PageHero
      :eyebrow="String(error.statusCode || 404)"
      :title="isNotFound ? 'Page' : 'Something'"
      :highlight="isNotFound ? 'Not Found' : 'Went Wrong'"
    >
      <div class="not-found">
        <p v-if="isNotFound" class="not-found__text">
          This page sank in the lake. It may have moved, or the link might be mistyped.
        </p>
        <p v-else class="not-found__text">An unexpected error occurred. Try again, or head back home.</p>
        <div class="not-found__actions">
          <a class="not-found__button button button--primary" href="/" @click.prevent="goHome">
            Back to home
            <IconArrowRight aria-hidden="true" class="not-found__icon" />
          </a>
          <button class="not-found__button button button--secondary" data-command-menu-trigger="" type="button">
            Search the site
          </button>
        </div>
      </div>
    </PageHero>
  </NuxtLayout>
</template>

<style lang="scss">
@use "abstracts" as *;

// 404 page content under the PageHero title.
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  margin-top: 20px;
  text-align: center;

  &__text {
    max-width: 448px;
    font-size: 16px;
    line-height: 1.6;
    text-wrap: balance;
    color: var(--color-muted-foreground);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    padding-inline: 18px;
    border-radius: 12px;
    font-size: 14px;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>

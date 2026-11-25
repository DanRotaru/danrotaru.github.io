<script setup lang="ts">
import { site } from "@/lib/site";

const WIDGET_URL = "https://buymeacoffee.com/widget/page/danrotaru";

usePageMeta({
  title: `Buy Me a Coffee | Support My Work - ${site.name}`,
  description: "Enjoying the articles, projects or open-source code? Buy me a coffee to support what I build next.",
  path: "/coffee",
  label: "Buy Me a Coffee",
});
</script>

<template>
  <PageHero eyebrow="Support" title="Buy me" highlight="a coffee" />
  <ContentFrame inner-class-name="coffee-page__body">
    <p class="coffee-page__intro">
      If something here saved you time or taught you something, a coffee keeps the next project going. Thank you!
    </p>
    <div class="coffee-page__widget">
      <iframe class="coffee-page__frame" :src="WIDGET_URL" title="Buy Me a Coffee" loading="lazy" allow="payment" />
    </div>
    <p class="coffee-page__fallback">
      Widget not loading?
      <a href="https://buymeacoffee.com/danrotaru" target="_blank" rel="noopener noreferrer">Open Buy Me a Coffee</a>
    </p>
    <SupportMethods />
  </ContentFrame>
</template>

<style lang="scss">
@use "abstracts" as *;

.coffee-page {
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    padding: 48px 20px;
    text-align: center;

    @include mq(md) {
      padding: 64px 40px;
    }
  }

  &__intro {
    max-width: 48ch;
    font-size: 16px;
    line-height: 1.5;
    text-wrap: pretty;
    color: color-mix(in oklab, var(--color-foreground) 85%, transparent);
  }

  &__widget {
    width: 100%;
    max-width: 480px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid var(--color-border);
    border-radius: 16px;
  }

  &__frame {
    display: block;
    width: 100%;
    height: 704px;
    border: 0;
  }

  &__fallback {
    font-size: 14px;
    color: var(--color-muted-foreground);

    a {
      color: var(--color-foreground);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
}
</style>

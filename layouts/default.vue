<!-- Root layout: site chrome around every page (body has class "site", see nuxt.config.ts). -->
<template>
  <SkipLink />
  <TopFade />
  <SiteHeader />
  <main id="main" class="site__main" tabindex="-1">
    <slot />
  </main>
  <SiteFooter />
</template>

<style lang="scss">
@use "abstracts" as *;

// Root layout block (<body class="site">).
.site {
  &__main {
    outline: none;

    // On large, tall screens the footer is pinned underneath the page and
    // revealed on scroll; main paints an opaque canvas over it.
    // It stacks above the footer (z-index 1 vs 0) instead of pushing the footer
    // to a negative z-index, which would put it under <body> and make it
    // unclickable.
    @include mq-pinned {
      position: relative;
      z-index: 1;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -100;
        background-color: var(--color-canvas);
      }
    }
  }
}
</style>

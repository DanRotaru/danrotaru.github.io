<script setup lang="ts">
import { footerNav, legalNav, site } from "@/lib/site";

/** Static files (sitemap.xml, rss.xml, llms.txt) are plain links, not routes. */
function isFileLink(href: string) {
  return /\.[a-z0-9]+$/i.test(href);
}

/**
 * Site footer: link columns, local time, email, legal links, theme switcher
 * and the giant name mark. On large, tall screens it is pinned behind the
 * page and revealed on scroll (see FooterCurtain).
 */
const year = new Date().getFullYear();
const letters = Array.from(site.name);
</script>

<template>
  <div class="site-footer-divider">
    <SectionDivider />
  </div>
  <FooterCurtain>
    <footer class="site-footer">
      <div class="site-footer__container container">
        <div class="site-footer__frame">
          <div class="site-footer__top">
            <nav aria-label="Footer" class="site-footer__nav">
              <div v-for="column in footerNav" :key="column.title" class="site-footer__column">
                <h2 class="site-footer__heading">{{ column.title }}</h2>
                <ul class="site-footer__links">
                  <li v-for="link in column.links" :key="link.href">
                    <a
                      v-if="link.external"
                      class="site-footer__link"
                      :href="link.href"
                      rel="noopener noreferrer"
                      target="_blank"
                      >{{ link.label }}</a
                    >
                    <NuxtLink v-else class="site-footer__link" :to="link.href">{{ link.label }}</NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>

            <div class="site-footer__details">
              <dl class="site-footer__meta">
                <div class="site-footer__meta-item">
                  <dt class="site-footer__label">Local time</dt>
                  <dd class="site-footer__value">
                    <FooterLocalTime class="site-footer__time" /> {{ site.timezoneLabel }}
                  </dd>
                </div>
                <div class="site-footer__meta-item">
                  <dt class="site-footer__label">Email</dt>
                  <dd>
                    <CopyEmail :email="site.email" />
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div class="site-footer__bottom">
            <p>© {{ year }} {{ site.name }}</p>
            <div class="site-footer__bottom-end">
              <ul class="site-footer__legal">
                <li v-for="link in legalNav" :key="link.href">
                  <a v-if="isFileLink(link.href)" class="site-footer__legal-link" :href="link.href">{{ link.label }}</a>
                  <NuxtLink v-else class="site-footer__legal-link" :to="link.href">{{ link.label }}</NuxtLink>
                </li>
              </ul>
              <ThemeSwitcher />
            </div>
          </div>

          <div aria-hidden="true" class="site-footer__mark">
            <div class="site-footer__mark-row">
              <span
                v-for="(letter, index) in letters"
                :key="`${index}-${letter}`"
                class="site-footer__letter"
                :style="{ '--i': index }"
                >{{ letter }}</span
              >
              <FooterMarkScroll />
            </div>
          </div>

          <div aria-hidden="true" class="site-footer__rails" />
        </div>
      </div>
    </footer>
  </FooterCurtain>
</template>

<style lang="scss">
@use "abstracts" as *;

$mark-ease: linear(
  0,
  0.067 4.5%,
  0.213 9.1%,
  0.383 13.6%,
  0.544 18.2%,
  0.681 22.7%,
  0.789 27.3%,
  0.87 31.8%,
  0.927 36.4%,
  0.965 40.9%,
  0.988 45.5%,
  1.002 50%,
  1.011 59.1%,
  1.008 72.7%,
  1.003 86.4%,
  1
);

// Hatched band above the footer. When pinned, it paints an opaque canvas so
// it hides the fixed footer underneath.
.site-footer-divider {
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

// Reserves the footer's height while the footer itself is fixed underneath.
.site-footer-curtain {
  @include mq-pinned {
    &[data-pinned] {
      height: calc(var(--footer-h) - 1px);
      pointer-events: none;

      > * {
        position: fixed !important;
        inset-inline: 0;
        bottom: 0;
        pointer-events: auto;
      }
    }
  }
}

.site-footer {
  position: relative;
  margin-top: -1px;

  @include mq-pinned {
    position: sticky !important;
    bottom: 0;
    z-index: 0;
  }

  &__container {
    height: 100%;
  }

  &__frame {
    position: relative;
    height: 100%;
    border-inline: 1px solid var(--color-border);
  }

  &__top {
    display: flex;
    flex-direction: column;
    gap: 48px;
    padding: 48px 16px 0;

    @include mq(lg) {
      flex-direction: row;
      justify-content: space-between;
      padding: 64px 64px 0;
    }
  }

  &__nav {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;
    gap: 40px 8px;

    @include mq(sm) {
      justify-content: flex-start;
      column-gap: 64px;
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__heading,
  &__label {
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__heading {
    padding-inline: 8px;
  }

  &__links {
    display: flex;
    flex-direction: column;
    margin-block: -5px;
    font-size: 16px;
    line-height: 1.5;
    white-space: nowrap;
  }

  &__link {
    display: flex;
    margin-inline: -4px;
    padding: 5px 12px;
    outline: none;
    color: var(--color-foreground);
    transition: all 0.3s var(--ease-default);

    &:focus-visible {
      outline: 2px solid color-mix(in oklab, oklch(62.3% 0.214 259.815) 45%, transparent);
      outline-offset: 4px;
    }

    &:active {
      scale: 0.97;
    }

    @include mq(sm) {
      margin-inline: -32px;
      padding-inline: 40px;
    }
  }

  // Hovering / focusing one link dims its siblings.
  &__nav:has(a:focus-visible) &__link {
    color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
  }

  @media (hover: hover) {
    &__nav:has(a:hover) &__link {
      color: color-mix(in oklab, var(--color-foreground) 60%, transparent);
    }

    &__nav:has(a:hover) &__link:hover {
      color: var(--color-foreground);
    }
  }

  &__nav:has(a:focus-visible) &__link:focus-visible {
    color: var(--color-foreground);
  }

  &__details {
    padding-inline: 8px;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__meta-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__value {
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-foreground);
  }

  &__time {
    font-variant-numeric: tabular-nums;
  }

  &__email {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    text-align: left;
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-foreground);
    transition: all 0.15s var(--ease-default);
    @include focus-ring;

    &:active {
      scale: 0.98;
    }
  }

  &__email-icon {
    display: inline-flex;
    color: var(--color-muted-foreground);
    transition: all 0.15s var(--ease-default);

    @include parent-hover(".site-footer__email") {
      color: oklch(62.3% 0.214 259.815);
    }

    &--copied {
      color: oklch(62.3% 0.214 259.815);
    }
  }

  &__email-svg {
    width: 14px;
    height: 14px;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 56px 24px 0;
    font-size: 12px;
    line-height: 1.33;
    color: var(--color-muted-foreground);

    @include mq(sm) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    @include mq(lg) {
      padding-inline: 72px;
    }
  }

  &__bottom-end {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 24px;
  }

  &__legal {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 16px;
  }

  &__legal-link {
    transition: all 0.3s var(--ease-default);

    @include hover {
      color: var(--color-foreground);
    }

    &:focus-visible {
      color: var(--color-foreground);
    }
  }

  // Giant hatched "Dan Rotaru" that rises letter by letter at the bottom.
  &__mark {
    margin-top: 16px;
    container-type: inline-size;
    user-select: none;
  }

  &__mark-row {
    display: flex;
    justify-content: center;
    height: 17.3cqw;
    padding-top: 3cqw;
    overflow: hidden;
    mask-image: linear-gradient(#000 60%, transparent);
  }

  &__letter {
    --mark-line: color-mix(in oklab, var(--color-foreground) 22%, transparent);
    --mark-fill: color-mix(in oklab, var(--color-foreground) 6%, transparent);
    display: inline-block;
    font-family: var(--font-instrument-serif);
    font-size: 19.6cqw;
    line-height: 0.92;
    letter-spacing: -0.588cqw;
    white-space: pre;
    color: transparent;
    background-image:
      repeating-linear-gradient(160deg, var(--mark-line) 0 1px, transparent 1px 3px),
      linear-gradient(var(--mark-fill), var(--mark-fill));
    -webkit-background-clip: text;
    background-clip: text;

    @media (prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 720px) {
      animation-name: footer-mark-rise;
      animation-timing-function: $mark-ease;
      animation-fill-mode: both;
      will-change: translate, opacity;

      @supports (animation-timeline: scroll()) {
        animation-timeline: scroll(root);
        animation-range: calc(100% - 520px + var(--i) * 24px) calc(100% - 300px + var(--i) * 24px);
      }

      @supports not (animation-timeline: scroll()) {
        animation-duration: 220s;
        animation-delay: calc((var(--mark-d, -100000) - 520 + var(--i) * 24) * 1s);
        animation-play-state: paused;
      }
    }
  }

  // Rails continuing above the pinned footer (visible in the reveal gap).
  &__rails {
    position: absolute;
    bottom: 100%;
    inset-inline: -1px;
    display: none;
    height: 100vh;
    border-inline: 1px solid var(--color-border);
    pointer-events: none;

    @include mq-pinned {
      display: block;
    }
  }
}
</style>

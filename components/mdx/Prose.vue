<!--
  Typography wrapper for long-form content (blog posts, case studies, legal).
  Optional modifiers via `class`: `prose--lg` (larger type from md up),
  `prose--article` (blog article heading/leading tweaks).
-->
<template>
  <div class="prose"><slot /></div>
</template>

<style lang="scss">
@use "abstracts" as *;

// Long-form typography (port of @tailwindcss/typography `prose prose-neutral dark:prose-invert`
// with the site's dark-mode overrides). Element rules skip anything inside `.not-prose`,
// exactly like the original — MDX components that draw their own UI (code blocks,
// diagrams, callouts, tables...) carry the `not-prose` marker class.
//
// Modifiers:
//   .prose--lg       => `md:prose-lg` (bigger type from the md breakpoint)
//   .prose--article  => blog article tweaks (serif h2, tighter leading)

/// `.prose :where(<sel>):not(:where(.not-prose, .not-prose *))`
@mixin el($sel) {
  :where(#{$sel}):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
    @content;
  }
}

.prose {
  --prose-body: oklch(37.1% 0 0);
  --prose-headings: oklch(20.5% 0 0);
  --prose-lead: oklch(43.9% 0 0);
  --prose-links: oklch(20.5% 0 0);
  --prose-bold: oklch(20.5% 0 0);
  --prose-counters: oklch(55.6% 0 0);
  --prose-bullets: oklch(87% 0 0);
  --prose-hr: oklch(92.2% 0 0);
  --prose-quotes: oklch(20.5% 0 0);
  --prose-quote-borders: oklch(92.2% 0 0);
  --prose-captions: oklch(55.6% 0 0);
  --prose-kbd: oklch(20.5% 0 0);
  --prose-kbd-shadows: oklab(20.5% 0 0 / 0.1);
  --prose-code: oklch(20.5% 0 0);
  --prose-pre-code: oklch(92.2% 0 0);
  --prose-pre-bg: oklch(26.9% 0 0);
  --prose-th-borders: oklch(87% 0 0);
  --prose-td-borders: oklch(92.2% 0 0);

  max-width: 65ch;
  font-size: 16px;
  line-height: 1.75;
  color: var(--prose-body);

  @include dark {
    --prose-body: #c8c8c8;
    --prose-headings: #fafafa;
    --prose-lead: #a3a3a3;
    --prose-links: #f5f5f5;
    --prose-bold: #f5f5f5;
    --prose-counters: #a3a3a3;
    --prose-bullets: #737373;
    --prose-hr: #404040;
    --prose-quotes: #d4d4d4;
    --prose-quote-borders: #525252;
    --prose-captions: #a3a3a3;
    --prose-kbd: #fff;
    --prose-kbd-shadows: #ffffff1a;
    --prose-code: #d4d4d4;
    --prose-pre-code: #e5e5e5;
    --prose-pre-bg: #101010;
    --prose-th-borders: #525252;
    --prose-td-borders: #404040;
  }

  @include el("p") {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  @include el('[class~="lead"]') {
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 20px;
    line-height: 1.6;
    color: var(--prose-lead);
  }

  @include el("a") {
    font-weight: 500;
    color: var(--prose-links);
    text-decoration: underline;
  }

  @include el("strong") {
    font-weight: 600;
    color: var(--prose-bold);
  }

  @include el("a strong, blockquote strong, thead th strong") {
    color: inherit;
  }

  @include el("ol") {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-inline-start: 26px;
    list-style-type: decimal;
  }

  @include el("ul") {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-inline-start: 26px;
    list-style-type: disc;
  }

  @include el("ol > li") {
    &::marker {
      font-weight: 400;
      color: var(--prose-counters);
    }
  }

  @include el("ul > li") {
    &::marker {
      color: var(--prose-bullets);
    }
  }

  @include el("dt") {
    margin-top: 20px;
    font-weight: 600;
    color: var(--prose-headings);
  }

  @include el("hr") {
    margin-top: 48px;
    margin-bottom: 48px;
    border-color: var(--prose-hr);
    border-top-width: 1px;
  }

  @include el("blockquote") {
    margin-top: 25.6px;
    margin-bottom: 25.6px;
    padding-inline-start: 16px;
    border-inline-start-width: 4px;
    border-inline-start-color: var(--prose-quote-borders);
    font-style: italic;
    font-weight: 500;
    color: var(--prose-quotes);
    quotes: "\201C" "\201D" "\2018" "\2019";
  }

  @include el("blockquote p:first-of-type") {
    &::before {
      content: open-quote;
    }
  }

  @include el("blockquote p:last-of-type") {
    &::after {
      content: close-quote;
    }
  }

  @include el("h1") {
    margin-top: 0;
    margin-bottom: 32px;
    font-size: 36px;
    font-weight: 800;
    line-height: 1.11111;
    color: var(--prose-headings);
  }

  @include el("h1 strong") {
    font-weight: 900;
    color: inherit;
  }

  @include el("h2") {
    margin-top: 48px;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.33333;
    color: var(--prose-headings);
  }

  @include el("h2 strong") {
    font-weight: 800;
    color: inherit;
  }

  @include el("h3") {
    margin-top: 32px;
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.6;
    color: var(--prose-headings);
  }

  @include el("h3 strong") {
    font-weight: 700;
    color: inherit;
  }

  @include el("h4") {
    margin-top: 24px;
    margin-bottom: 8px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--prose-headings);
  }

  @include el("h4 strong") {
    font-weight: 700;
    color: inherit;
  }

  @include el("img, video") {
    margin-top: 32px;
    margin-bottom: 32px;
  }

  @include el("picture") {
    display: block;
    margin-top: 32px;
    margin-bottom: 32px;
  }

  @include el("picture > img") {
    margin-top: 0;
    margin-bottom: 0;
  }

  @include el("kbd") {
    padding: 2.63px 5.25px;
    border-radius: 5px;
    box-shadow:
      0 0 0 1px var(--prose-kbd-shadows),
      0 3px 0 var(--prose-kbd-shadows);
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: var(--prose-kbd);
  }

  @include el("code") {
    font-size: 14px;
    font-weight: 600;
    color: var(--prose-code);

    &::before,
    &::after {
      content: "`";
    }
  }

  @include el("a code, h1 code, blockquote code, h4 code, thead th code") {
    color: inherit;
  }

  @include el("h2 code") {
    font-size: 21px;
    color: inherit;
  }

  @include el("h3 code") {
    font-size: 18px;
    color: inherit;
  }

  @include el("pre") {
    overflow-x: auto;
    margin-top: 24px;
    margin-bottom: 24px;
    padding: 12px 16px;
    border-radius: 6px;
    background-color: var(--prose-pre-bg);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.71429;
    color: var(--prose-pre-code);
  }

  @include el("pre code") {
    padding: 0;
    border-width: 0;
    border-radius: 0;
    background-color: transparent;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;

    &::before,
    &::after {
      content: none;
    }
  }

  @include el("table") {
    width: 100%;
    margin-top: 28px;
    margin-bottom: 28px;
    table-layout: auto;
    font-size: 14px;
    line-height: 1.71429;
  }

  @include el("thead") {
    border-bottom-width: 1px;
    border-bottom-color: var(--prose-th-borders);
  }

  @include el("thead th") {
    padding-inline: 8px;
    padding-bottom: 8px;
    vertical-align: bottom;
    font-weight: 600;
    color: var(--prose-headings);
  }

  @include el("tbody tr") {
    border-bottom-width: 1px;
    border-bottom-color: var(--prose-td-borders);
  }

  @include el("tbody tr:last-child") {
    border-bottom-width: 0;
  }

  @include el("tbody td") {
    vertical-align: baseline;
  }

  @include el("tbody td, tfoot td") {
    padding: 8px;
  }

  @include el("thead th:first-child, tbody td:first-child, tfoot td:first-child") {
    padding-inline-start: 0;
  }

  @include el("thead th:last-child, tbody td:last-child, tfoot td:last-child") {
    padding-inline-end: 0;
  }

  @include el("th, td") {
    text-align: start;
  }

  @include el("figure") {
    margin-top: 32px;
    margin-bottom: 32px;
  }

  @include el("figure > *") {
    margin-top: 0;
    margin-bottom: 0;
  }

  @include el("figcaption") {
    margin-top: 12px;
    font-size: 14px;
    line-height: 1.42857;
    color: var(--prose-captions);
  }

  @include el("li") {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  @include el("ol > li, ul > li") {
    padding-inline-start: 6px;
  }

  @include el(".prose > ul > li p") {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  @include el(".prose > ul > li > p:first-child, .prose > ol > li > p:first-child") {
    margin-top: 20px;
  }

  @include el(".prose > ul > li > p:last-child, .prose > ol > li > p:last-child") {
    margin-bottom: 20px;
  }

  @include el("ul ul, ul ol, ol ul, ol ol") {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  @include el("dl") {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  @include el("dd") {
    margin-top: 8px;
    padding-inline-start: 26px;
  }

  @include el("h2 + *, h3 + *, h4 + *, hr + *") {
    margin-top: 0;
  }

  @include el(".prose > :first-child") {
    margin-top: 0;
  }

  @include el(".prose > :last-child") {
    margin-bottom: 0;
  }

  // -------------------------------------------------------------------------
  // md:prose-lg
  // -------------------------------------------------------------------------
  &--lg {
    @include mq(md) {
      font-size: 18px;
      line-height: 1.77778;

      @include el("p") {
        margin-top: 24px;
        margin-bottom: 24px;
      }

      @include el('[class~="lead"]') {
        margin-top: 24px;
        margin-bottom: 24px;
        font-size: 22px;
        line-height: 1.45455;
      }

      @include el("blockquote") {
        margin-top: 30px;
        margin-bottom: 30px;
        padding-inline-start: 18px;
      }

      @include el("h1") {
        margin-top: 0;
        margin-bottom: 40px;
        font-size: 48px;
        line-height: 1;
      }

      @include el("h2") {
        margin-top: 56px;
        margin-bottom: 32px;
        font-size: 30px;
        line-height: 1.33333;
      }

      @include el("h3") {
        margin-top: 40px;
        margin-bottom: 16px;
        font-size: 24px;
        line-height: 1.5;
      }

      @include el("h4") {
        margin-top: 32px;
        margin-bottom: 8px;
        line-height: 1.55556;
      }

      @include el("img, picture, video") {
        margin-top: 32px;
        margin-bottom: 32px;
      }

      @include el("picture > img") {
        margin-top: 0;
        margin-bottom: 0;
      }

      @include el("kbd") {
        padding: 3.56px 7.11px;
        font-size: 16px;
      }

      @include el("code") {
        font-size: 16px;
      }

      @include el("h2 code") {
        font-size: 26px;
      }

      @include el("h3 code") {
        font-size: 21px;
      }

      @include el("pre") {
        margin-top: 32px;
        margin-bottom: 32px;
        padding: 16px 24px;
        font-size: 16px;
        line-height: 1.75;
      }

      @include el("ol, ul") {
        margin-top: 24px;
        margin-bottom: 24px;
        padding-inline-start: 28px;
      }

      @include el("li") {
        margin-top: 12px;
        margin-bottom: 12px;
      }

      @include el("ol > li, ul > li") {
        padding-inline-start: 8px;
      }

      @include el("ul ul, ul ol, ol ul, ol ol") {
        margin-top: 16px;
        margin-bottom: 16px;
      }

      @include el("hr") {
        margin-top: 56px;
        margin-bottom: 56px;
      }

      // Rules with no prose-lg counterpart, rescaled to the 18px base.
      @include el("dt") {
        margin-top: 22.5px;
      }

      @include el("table") {
        margin-top: 32px;
        margin-bottom: 32px;
      }

      @include el(".prose > ul > li p") {
        margin-top: 13.5px;
        margin-bottom: 13.5px;
      }

      @include el(".prose > ul > li > p:first-child, .prose > ol > li > p:first-child") {
        margin-top: 22.5px;
      }

      @include el(".prose > ul > li > p:last-child, .prose > ol > li > p:last-child") {
        margin-bottom: 22.5px;
      }

      @include el("dl") {
        margin-top: 22.5px;
        margin-bottom: 22.5px;
      }

      @include el("dd") {
        margin-top: 9px;
        padding-inline-start: 29.25px;
      }

      @include el("h2 + *, h3 + *, h4 + *, hr + *") {
        margin-top: 0;
      }

      @include el("table") {
        font-size: 16px;
        line-height: 1.5;
      }

      @include el("thead th") {
        padding-inline: 12px;
        padding-bottom: 12px;
      }

      @include el("tbody td, tfoot td") {
        padding: 12px;
      }

      @include el("thead th:first-child, tbody td:first-child, tfoot td:first-child") {
        padding-inline-start: 0;
      }

      @include el("thead th:last-child, tbody td:last-child, tfoot td:last-child") {
        padding-inline-end: 0;
      }

      @include el("figure") {
        margin-top: 32px;
        margin-bottom: 32px;
      }

      @include el("figure > *") {
        margin-top: 0;
        margin-bottom: 0;
      }

      @include el("figcaption") {
        margin-top: 16px;
        font-size: 16px;
        line-height: 1.5;
      }

      @include el(".prose > :first-child") {
        margin-top: 0;
      }

      @include el(".prose > :last-child") {
        margin-bottom: 0;
      }
    }
  }

  // -------------------------------------------------------------------------
  // Blog article tweaks (prose-h2:* / prose-h3:* / prose-p:leading-[1.7] ...)
  // -------------------------------------------------------------------------
  &--article {
    // Width is set by the page layout.
    max-width: none;

    @include el("h2") {
      margin-top: 64px;
      margin-bottom: 20px;
      font-family: var(--font-serif);
      font-size: 30px;
      font-weight: 400;
      line-height: 1.1;
      letter-spacing: 0;

      @include mq(md) {
        font-size: 36px;
      }
    }

    @include el("h3") {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.4;
    }

    // prose-lg h3 margins, measured against the 20px article h3 size.
    &.prose--lg {
      @include mq(md) {
        @include el("h3") {
          margin-top: 33.33px;
          margin-bottom: 13.33px;
        }
      }
    }

    @include el("p, li") {
      line-height: 1.7;
    }

    @include el("h2 + *, h3 + *, h4 + *, hr + *") {
      margin-top: 0;
    }
  }
}
</style>

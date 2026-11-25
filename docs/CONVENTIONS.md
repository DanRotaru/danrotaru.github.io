# Project conventions

## Stack

- **Nuxt 4** (Vue 3.5, `<script setup lang="ts">`), classic root-level folders (no `app/` dir), same shape as `/dev`.
- Fully static: `npm run generate` → `.output/public`.
- **SCSS + BEM** for all styling. No Tailwind, no CSS-in-JS, no CSS Modules, no `scoped` styles.
- **MDX** for blog posts and project case studies, compiled to Vue by `@mdx-js/rollup` (see `nuxt.config.ts`),
  with `rehype-pretty-code` + Shiki for code blocks.
- **@nuxtjs/color-mode** for light/dark (class `dark` on `<html>`, dark by default, system aware).
- **motion-v** (`import { motion, AnimatePresence, useSpring, ... } from "motion-v"`) only where JS-driven animation is needed.

## Folder structure

```
app.vue                     <NuxtLayout><NuxtPage/></NuxtLayout>
error.vue                   404 / error page
layouts/default.vue         Site chrome (skip link, header, main, contact CTA, footer)
pages/                      Routes (file-based). Page-level styles go in the page's <style lang="scss">.
components/
  icons/                    One SFC per SVG icon. Auto-imported with the "Icon" prefix: <IconArrowRight />
  layout/                   Site chrome: header (+ nav, more panel, search button), footer, contact CTA...
  shared/                   Reusable blocks used by several pages (PageHero, PageTitle, PillCta...)
  mdx/                      Components available inside MDX (Prose, Faq, Diagram, CodeBlock...)
  <page>/                   Components used by one page only (home/, about/, projects/, blog/...)
composables/                Auto-imported composables (usePageMeta, useOffscreen, useMediaQuery, useCommandMenu...)
content/
  blog/<slug>.mdx           Blog post bodies (may `export const faq = [...]`)
  projects/<slug>.mdx       Case study bodies
  diagrams/*.ts             Pre-rendered diagram SVG strings
  legal/*.ts                Legal page content (HTML strings)
data/                       Typed content (projects, posts, experience, toolbox, links...)
lib/                        Plain TS helpers (site config, cn/bem, contact, MDX component map)
server/routes/              Generated files: rss.xml, sitemap.xml, robots.txt, llms.txt, manifest, Markdown twins
assets/styles/
  abstracts/                Sass-only helpers (breakpoints, mixins) — no CSS output
  _tokens.scss              CSS custom properties (light + dark)
  _reset.scss, _base.scss, _keyframes.scss
  _blocks.scss              Global reusable blocks (container, glass-pill, button, heading, rail-node...)
  main.scss                 Entry, registered in nuxt.config.ts `css`
public/static/              Static assets (images, icons, resume.pdf), served at /static/...
```

## Components

- One component per `.vue` file, **PascalCase file name = component name**, e.g. `components/home/HomeHero.vue`.
- Components are auto-imported by file name (no path prefix), so names are globally unique. Icons use `<IconName />`.
- A component's styles live in the same SFC, in an **unscoped** `<style lang="scss">` block that starts with
  `@use "abstracts" as *;`. One BEM block per component.
- Props are typed with `defineProps<{...}>()` (+ `withDefaults`). Content passed as children uses `<slot />`;
  extra named content areas use named slots.
- `class` passed by a parent falls through to the root element automatically.
- Non-component helpers (geometry, SVG strings) are plain `.ts` files next to the component.

## BEM rules

- **Block** = component root: `.project-card`. One block per component; block name = kebab-case component name.
- **Element** = part of a block: `.project-card__title`. Never nest elements in names (`__header__title` ❌ → `__header-title` ✅).
- **Modifier** = variant/state: `.project-card--featured`, `.project-card__title--large`. Always used together with the base class.
- **Mixes** are fine: `<div class="hero__media shadow-border">` (element of one block + a global block).
- States from JS use modifiers or `aria-*`/`data-*` attributes: `.nav__link[aria-current="page"]`, `.menu--open`.
- Nesting in SCSS only via `&__element` / `&--modifier` / pseudo-classes / media queries. Avoid descendant selectors on tags except inside `.prose`.
- Use Vue's class bindings (`:class="['card', { 'card--active': active }]"`) or `cn()` / `bem()` from `@/lib/cn`.

## Styling rules

- Use tokens: `var(--color-foreground)`, `var(--color-muted-foreground)`, `var(--color-border)`, `var(--color-canvas)`...
- Every stylesheet starts with `@use "abstracts" as *;` and uses:
  - `@include mq(md) {}` (min-width 768px), `mq-down(lg)`, `mq-pinned` — breakpoints sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.
  - `@include hover {}` for hover (only on hover-capable devices).
  - `@include dark {}` for dark-theme overrides.
  - `@include reduced-motion {}`.
- Keyframes live in `assets/styles/_keyframes.scss`.
- Lengths are in `px` only; never use `em` or `rem`. When a value has to follow a fluid font size (`clamp()`, `cqi`, `vw`), multiply that expression instead: `letter-spacing: calc(var(--title-size) * -0.025)`. `@include heading-serif(30px)` takes the font size and sets the matching letter-spacing.

## Pages & metadata

- Each page calls `usePageMeta({ title, description, path, ... })` (title, canonical, Open Graph, Twitter card).
- Dynamic pages (`pages/blog/[slug].vue`, `pages/projects/[slug].vue`) throw
  `createError({ statusCode: 404, fatal: true })` for unknown slugs; all slugs are listed in `nitro.prerender.routes`.

## Content

- Personal details: `lib/site.ts`.
- Projects: `data/projects.ts` (+ `content/projects/<slug>.mdx`).
- Blog: `data/posts.ts` (+ `content/blog/<slug>.mdx`).
- MDX files only import data (diagrams). Components used inside MDX (`<Callout>`, `<CaseSection>`, `<Faq>`...)
  and the Markdown element overrides (`h2`, `a`, `code`, `figure`...) come from the map in `lib/mdx-components.ts`.

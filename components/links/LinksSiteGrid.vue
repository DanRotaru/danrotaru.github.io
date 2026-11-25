<!-- "On the site" — four cards linking to the main sections, with live counts. -->
<script setup lang="ts">
import { linksSite } from "@/data/links";
import { formatPostDate, posts } from "@/data/posts";
import { latestProjects } from "@/data/projects";
import { toolCount } from "@/data/toolbox";

type SiteCard = {
  href: string;
  eyebrow: string;
  title: string;
  kicker: string;
  text: string;
  /** Which media block the card renders (the React version passed a ReactNode). */
  media: "about" | "image" | "image-top" | "device";
  image?: string;
};

/** Inline positioning next/image applied to `fill` images. */
const FILL_STYLE = { position: "absolute", inset: "0", width: "100%", height: "100%", color: "transparent" } as const;

const { about, projects: projectsCard, blog, toolbox } = linksSite;
const featured = (latestProjects.find(({ project }) => project.slug === projectsCard.featuredSlug) ?? latestProjects[0]!).project;
const latest = posts[0]!;

const cards: SiteCard[] = [
  { ...about, media: "about" },
  {
    href: projectsCard.href,
    eyebrow: `${latestProjects.length} projects`,
    title: projectsCard.title,
    kicker: projectsCard.kicker,
    text: featured.title,
    media: "image-top",
    image: featured.images[0]?.src,
  },
  {
    href: blog.href,
    eyebrow: `${posts.length} posts`,
    title: blog.title,
    kicker: formatPostDate(latest.date, "short"),
    text: latest.title,
    media: "image",
    image: latest.cover,
  },
  { ...toolbox, eyebrow: `${toolCount} tools`, media: "device", image: toolbox.image },
];
</script>

<template>
  <div class="links-site-grid" data-tray="">
    <NuxtLink v-for="card in cards" :key="card.href" class="links-site-grid__card" :to="card.href" data-arrow-host="">
      <span class="links-site-grid__media">
        <template v-if="card.media === 'about'">
          <span class="links-site-grid__about-bg" />
          <span class="links-site-grid__about-lines" />
          <span class="links-site-grid__about-logo">
            <IconCompassDuotone class="links-site-grid__logo" />
          </span>
        </template>
        <template v-else-if="card.media === 'device'">
          <span class="links-site-grid__hatch" />
          <img
            class="links-site-grid__device"
            :src="card.image"
            alt=""
            :style="FILL_STYLE"
            loading="lazy"
            decoding="async"
          />
        </template>
        <img
          v-else
          :class="['links-site-grid__image', { 'links-site-grid__image--top': card.media === 'image-top' }]"
          :src="card.image"
          alt=""
          :style="FILL_STYLE"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span class="links-site-grid__body">
        <span class="links-site-grid__top">
          <span class="links-site-grid__eyebrow">{{ card.eyebrow }}</span>
          <LinksArrow />
        </span>
        <span class="links-site-grid__title">{{ card.title }}</span>
        <span class="links-site-grid__text">
          <span class="links-site-grid__kicker">{{ card.kicker }}</span> {{ card.text }}
        </span>
      </span>
    </NuxtLink>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "../shared/paper" as paper;

$spring: cubic-bezier(0.34, 1.4, 0.64, 1);

.links-site-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;
  padding: 12px;
  @include hatch;

  @include mq(sm) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @include mq(lg) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &__card {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px;
    border-radius: calc(var(--radius) * 1.8);
    background-color: #f7f7f8;
    box-shadow: 0 0 0 1px var(--color-border);
    transition: all 0.3s var(--ease-out-quint);

    @include hover {
      background-color: #fff;
    }

    &:active {
      --chip-shadow-3: transparent;
      --chip-shadow-4: transparent;
      scale: 0.98;
    }

    @include mq(sm) {
      flex-direction: column;
      align-items: stretch;

      &:last-child:nth-child(odd) {
        grid-column: span 2 / span 2;
      }
    }

    @include mq(lg) {
      &:last-child:nth-child(odd) {
        grid-column: span 1 / span 1;
      }
    }

    @include dark {
      background-color: #0f0f10;

      @media (hover: hover) {
        &:hover {
          background-color: #131314;
        }
      }
    }
  }

  &__media {
    position: relative;
    display: block;
    flex-shrink: 0;
    width: 112px;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: calc(var(--radius) + 4px);
    background-color: color-mix(in oklab, var(--color-foreground) 3%, transparent);
    box-shadow: 0 0 0 1px color-mix(in oklab, var(--color-foreground) 5%, transparent);

    @include mq(sm) {
      width: auto;
      aspect-ratio: 16 / 10;
    }
  }

  // About: compass icon on a dark gradient.
  &__about-bg {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(160deg, #1c1c20, #0e0e10);
  }

  &__about-lines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(135deg, #ffffff06 0 1px, transparent 1px 7px);
  }

  &__about-logo {
    position: absolute;
    inset: 0;
    display: grid;
    place-content: center;
  }

  &__logo {
    width: 40px;
    height: 40px;
    color: #fff;
    opacity: 0.9;
    transition: scale 0.3s var(--ease-out-quint);

    @include mq(sm) {
      width: 56px;
      height: 56px;
    }

    @include parent-hover(".links-site-grid__card") {
      scale: 1.1;
      transition-duration: 0.5s;
      transition-timing-function: $spring;
    }
  }

  &__image {
    object-fit: cover;
    transition: scale 0.7s var(--ease-out-quint);

    &--top {
      object-position: top;
    }

    @include parent-hover(".links-site-grid__card") {
      scale: 1.04;
    }
  }

  &__hatch {
    position: absolute;
    inset: 0;
    @include hatch;
  }

  &__device {
    padding: 12px;
    object-fit: contain;
    filter: drop-shadow(0 14px 14px #00000059);
    transition: translate 0.3s var(--ease-out-quint);

    @include parent-hover(".links-site-grid__card") {
      translate: 0 -6px;
      transition-duration: 0.5s;
      transition-timing-function: $spring;
    }
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    padding: 4px 10px;

    @include mq(sm) {
      padding-top: 16px;
      padding-bottom: 10px;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__eyebrow {
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__title {
    font-family: var(--font-serif);
    font-size: 24px;
    line-height: 1.33333;
    letter-spacing: 0.6px;
    color: var(--color-foreground);
  }

  &__text {
    @include line-clamp(2);
    font-size: 14px;
    line-height: 1.42857;
    text-wrap: pretty;
    color: var(--color-muted-foreground);
  }

  &__kicker {
    color: color-mix(in oklab, var(--color-muted-foreground) 60%, transparent);
  }
}
</style>

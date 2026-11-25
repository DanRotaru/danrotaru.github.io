<!-- Link-in-bio header: banner, avatar, name, contact card and bio. -->
<script setup lang="ts">
import { linksProfile, linksResume } from "@/data/links";
import { site } from "@/lib/site";
</script>

<template>
  <div class="links-hero">
    <LinksBackdrop />
    <ContentFrame flush-top inner-class-name="links-hero__frame">
      <div class="links-hero__banner">
      </div>
      <div class="links-hero__grid">
        <span class="links-hero__avatar">
          <span class="links-hero__avatar-inner">
            <img
              class="links-hero__avatar-img"
              :src="linksProfile.photo"
              :alt="linksProfile.name"
              width="288"
              height="288"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
            <span aria-hidden="true" class="links-hero__avatar-grain" />
            <span aria-hidden="true" class="links-hero__avatar-gloss" />
          </span>
        </span>
        <div class="links-hero__intro">
          <h1 class="links-hero__name">{{ linksProfile.name }}</h1>
          <p class="links-hero__role">
            {{ linksProfile.role }}
            <span aria-hidden="true" class="links-hero__separator" />
            <span class="links-hero__location">
              <IconMapPinDuotone class="links-hero__location-icon" />
              {{ linksProfile.location }}
            </span>
          </p>
        </div>
        <div class="links-hero__card">
          <LinksContactCard :email="site.email" :resume="linksResume" :photo="linksProfile.photo" />
        </div>
        <p class="links-hero__bio">{{ linksProfile.bio }}</p>
      </div>
    </ContentFrame>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "../shared/paper" as paper;

.links-hero {
  position: relative;
  isolation: isolate;

  &__frame {
    padding-bottom: 40px;

    @include mq(md) {
      padding-bottom: 48px;
    }
  }

  &__banner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 160px;
    border-bottom: 1px solid var(--color-border);

    @include mq(md) {
      height: 288px;
      padding-top: 56px;
      padding-right: 48px;
    }

    @include mq(lg) {
      padding-right: 80px;
    }
  }

  &__grid {
    display: grid;
    gap: 20px;
    padding-inline: 20px;

    @include mq(md) {
      grid-template-columns: auto minmax(0, 1fr);
      gap: 24px 28px;
      padding-inline: 40px;
    }

    @include mq(lg) {
      grid-template-columns: auto minmax(0, 1fr) 352px;
    }
  }

  // Rounded portrait overlapping the banner border.
  &__avatar {
    position: relative;
    flex-shrink: 0;
    place-self: flex-start;
    margin-top: -56px;
    padding: 6px;
    border-radius: 28px;
    background-color: var(--color-background);
    box-shadow:
      0 0 0 1px color-mix(in oklab, var(--color-foreground) 10%, transparent),
      0 24px 40px -20px #000000b3;

    @include mq(md) {
      margin-top: -48px;
    }
  }

  &__avatar-inner {
    position: relative;
    display: block;
    width: 96px;
    height: 96px;
    overflow: hidden;
    border-radius: 22px;

    @include mq(md) {
      width: 144px;
      height: 144px;
    }
  }

  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    filter: contrast(1.04) saturate(0.95);
  }

  &__avatar-grain {
    position: absolute;
    inset: 0;
    background-image: paper.$photo-grain;
    opacity: 0.25;
    mix-blend-mode: overlay;
  }

  &__avatar-gloss {
    position: absolute;
    inset: 0;
    border-radius: 22px;
    box-shadow:
      inset 0 1px 0 #ffffff40,
      inset 0 0 0 1px #00000026;
  }

  &__intro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    min-width: 0;

    @include mq(md) {
      align-self: flex-end;
    }
  }

  &__name {
    font-family: var(--font-serif);
    font-size: 36px;
    line-height: 1.25;
    letter-spacing: 0.9px;
    text-wrap: balance;

    @include mq(md) {
      letter-spacing: 1.5px;
      font-size: 60px;
    }
  }

  &__role {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 12px;
    font-size: 14px;
    line-height: 1.42857;
    color: color-mix(in oklab, var(--color-foreground) 75%, transparent);

    @include mq(md) {
      font-size: 16px;
      line-height: 1.5;
    }
  }

  &__separator {
    width: 4px;
    height: 4px;
    border-radius: 9999px;
    background-color: color-mix(in oklab, var(--color-foreground) 25%, transparent);

    @include mq-down(sm) {
      display: none;
    }
  }

  &__location {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--color-muted-foreground);
  }

  &__location-icon {
    width: 14px;
    height: 14px;
  }

  &__card {
    @include mq-down(lg) {
      order: 9999;
      margin-top: 8px;
    }

    @include mq(md) {
      grid-column: span 2 / span 2;
    }

    @include mq(lg) {
      grid-area: 1 / 3 / span 2 / span 1;
      padding-top: 24px;
    }
  }

  &__bio {
    max-width: 52ch;
    font-size: 16px;
    line-height: 1.5;
    text-wrap: pretty;
    color: var(--color-muted-foreground);

    @include mq(sm) {
      font-size: 18px;
      line-height: 1.55556;
    }

    @include mq(md) {
      grid-column: span 2 / span 2;
      grid-row-start: 2;
      align-self: flex-start;
    }
  }
}
</style>

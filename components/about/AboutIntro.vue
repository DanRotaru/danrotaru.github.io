<!-- About page header: title, full-width bio and social links. -->
<script setup lang="ts">
import GithubLogoDuotone from "@/components/icons/GithubLogoDuotone.vue";
import LinkedinLogoDuotone from "@/components/icons/LinkedinLogoDuotone.vue";
import { aboutIntro } from "@/data/about";
import type { AboutSocial } from "@/data/about";

const socialIcons = {
  linkedin: LinkedinLogoDuotone,
  github: GithubLogoDuotone,
};

const { eyebrow, title, highlight, paragraphs } = aboutIntro;
const socials: AboutSocial[] = aboutIntro.socials;
</script>

<template>
  <section class="about-intro">
    <RailsOverlay nodes="bottom" />
    <div class="container">
      <div class="about-intro__inner">
        <div class="about-intro__grid">
          <div class="about-intro__text">
            <PageTitle :eyebrow="eyebrow" :title="title" :highlight="highlight" class="about-intro__title" />
            <div class="about-intro__body-wrap">
              <div class="about-intro__body">
                <p v-for="(text, i) in paragraphs" :key="i"><AboutRichText :content="text" /></p>
                <div class="about-intro__socials">
                  <a
                    v-for="social in socials"
                    :key="social.label"
                    class="about-intro__social"
                    :href="social.href"
                    :title="social.label"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span class="visually-hidden">{{ social.label }}</span>
                    <span class="about-intro__social-icon">
                      <component :is="socialIcons[social.icon]" aria-hidden="true" class="about-intro__social-svg" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.about-intro {
  position: relative;
  border-bottom: 1px solid var(--color-border);

  &__inner {
    padding: 144px 20px var(--header-height);

    @include mq(md) {
      padding-inline: 40px;
    }
  }

  &__grid {
    display: grid;
    gap: 32px;
  }

  // The shared title has a large bottom margin by default.
  &__title.page-title {
    margin-bottom: 16px;
  }

  &__body-wrap {
    @include mq(lg) {
      margin-top: 16px;
    }
  }

  &__body {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 300;
    letter-spacing: 0.8px;
    text-align: center;
    color: rgb(13 13 15 / 0.8);

    @include mq(lg) {
      letter-spacing: 0.9px;
      margin-inline: 0;
      font-size: 18px;
      line-height: 1.55556;
      text-align: left;
    }

    @include dark {
      color: oklch(87% 0 0);
    }
  }

  &__socials {
    display: flex;
    gap: 8px;
    width: fit-content;
    margin-top: -16px;
    margin-inline: auto;

    @include mq(lg) {
      margin-inline: 0;
      translate: -12px 0;
    }
  }

  &__social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
    padding: 10px;
    color: oklch(20.5% 0 0);
    transition: color 0.15s var(--ease-default);

    &:active {
      scale: 0.98;
    }

    @include hover {
      color: oklch(62.3% 0.214 259.815);
    }

    @include dark {
      color: oklch(87% 0 0);

      @include hover {
        color: oklch(70.7% 0.165 254.624);
      }
    }
  }

  &__social-svg {
    display: block;
    width: 20px;
    height: 20px;
  }

  &__social-icon {
    display: block;
    transition:
      scale 0.3s var(--ease-out-quint),
      rotate 0.3s var(--ease-out-quint);

    @include parent-hover(".about-intro__social") {
      scale: 1.1;
      rotate: -6deg;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0.34, 1.4, 0.64, 1);
    }
  }
}
</style>

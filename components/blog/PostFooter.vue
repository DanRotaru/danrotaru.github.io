<script setup lang="ts">
import GithubLogoDuotone from "@/components/icons/GithubLogoDuotone.vue";
import LinkedinLogoDuotone from "@/components/icons/LinkedinLogoDuotone.vue";
import { tagLabel } from "@/data/posts";
import { site } from "@/lib/site";

defineProps<{ tags: string[] }>();

const socials = [
  { title: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinLogoDuotone },
  { title: "GitHub", href: site.socials.github, Icon: GithubLogoDuotone },
];
</script>

<!-- "Related tags" + "Follow on social media" block under a post. -->
<template>
  <div class="post-footer">
    <section aria-labelledby="post-tags">
      <h2 id="post-tags" class="post-footer__heading">Related tags</h2>
      <ul class="post-footer__tags">
        <li v-for="tag in tags" :key="tag">
          <NuxtLink to="/blog" class="post-footer__tag">{{ tagLabel(tag) }}</NuxtLink>
        </li>
      </ul>
    </section>
    <section aria-labelledby="post-follow">
      <h2 id="post-follow" class="post-footer__heading">Follow on social media</h2>
      <div class="post-footer__follow">
        <div class="post-footer__author">
          <img
            src="/static/images/dan-rotaru-avatar.jpg"
            alt=""
            width="36"
            height="36"
            loading="lazy"
            decoding="async"
            class="post-footer__avatar"
          />
          <span class="post-footer__name">{{ site.name }}</span>
        </div>
        <ul class="post-footer__socials">
          <li>
            <a
              href="/blog/rss.xml"
              rel="alternate"
              type="application/rss+xml"
              title="RSS feed"
              class="post-footer__social"
            >
              <IconRssRegular class="post-footer__social-icon" />
              <span class="visually-hidden">RSS feed</span>
            </a>
          </li>
          <li v-for="social in socials" :key="social.title">
            <a :href="social.href" rel="me noopener" target="_blank" :title="social.title" class="post-footer__social">
              <component :is="social.Icon" class="post-footer__social-icon" />
              <span class="visually-hidden">{{ social.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.post-footer {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 768px;
  margin-inline: auto;

  &__heading {
    font-size: 12px;
    line-height: 1.33333;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
    list-style: none;
  }

  &__tag {
    display: block;
    padding: 4px 12px;
    border: 1px solid var(--color-border);
    border-radius: 9999px;
    font-size: 14px;
    line-height: 1.42857;
    color: oklch(43.9% 0 0);
    transition: all 0.15s var(--ease-default);

    &::first-letter {
      text-transform: uppercase;
    }

    @include hover {
      border-color: color-mix(in oklab, var(--color-foreground) 30%, transparent);
      color: var(--color-foreground);
    }

    @include dark {
      color: oklch(70.8% 0 0);
    }
  }

  &__follow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 16px;
    margin-top: 16px;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar {
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    box-shadow: 0 0 0 1px var(--color-border);
    object-fit: cover;
  }

  &__name {
    font-weight: 500;
    color: var(--color-foreground);
  }

  &__socials {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
  }

  &__social {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: oklch(55.6% 0 0);
    transition: color 0.15s var(--ease-default);

    @include hover {
      color: oklch(62.3% 0.214 259.815);
    }

    @include dark {
      color: oklch(70.8% 0 0);

      @include hover {
        color: oklch(70.7% 0.165 254.624);
      }
    }
  }

  &__social-icon {
    width: 18px;
    height: 18px;
  }
}
</style>

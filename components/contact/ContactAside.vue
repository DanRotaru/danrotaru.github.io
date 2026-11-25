<!-- Three columns above the tabs: who + local time, "What brings you here?", direct links. -->
<script setup lang="ts">
import GithubLogoDuotone from "@/components/icons/GithubLogoDuotone.vue";
import LinkedinLogoDuotone from "@/components/icons/LinkedinLogoDuotone.vue";
import { contactIntents, contactProfile, contactSocials } from "@/data/contact";
import { site } from "@/lib/site";

const SOCIAL_ICONS = {
  linkedin: LinkedinLogoDuotone,
  github: GithubLogoDuotone,
} as const;

/** Inline positioning next/image applied to `fill` images. */
const FILL_STYLE = { position: "absolute", inset: "0", width: "100%", height: "100%", color: "transparent" } as const;

const props = defineProps<{ intentId: string | null }>();
const emit = defineEmits<{ intent: [id: string] }>();

const intent = computed(() => contactIntents.find((item) => item.id === props.intentId));
</script>

<template>
  <aside class="contact-aside">
    <div class="contact-aside__profile">
      <div class="contact-aside__polaroid">
        <span aria-hidden="true" class="contact-aside__grain" />
        <div class="contact-aside__photo">
          <img
            :alt="contactProfile.name"
            class="contact-aside__photo-img"
            :src="contactProfile.photo"
            :style="FILL_STYLE"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div class="contact-aside__who">
        <p class="contact-aside__name">{{ contactProfile.name }}</p>
        <p class="contact-aside__status">
          <span class="contact-aside__pulse">
            <span class="contact-aside__ping" />
            <span class="contact-aside__dot" />
          </span>
          <LocalTime :time-zone="contactProfile.timeZone" /> in {{ contactProfile.city }}
        </p>
      </div>
    </div>

    <div>
      <p class="contact-aside__label">What brings you here?</p>
      <div class="contact-aside__chips">
        <button
          v-for="item in contactIntents"
          :key="item.id"
          type="button"
          :aria-pressed="item.id === intentId"
          :class="['contact-aside__chip', { 'contact-aside__chip--active': item.id === intentId }]"
          @click="emit('intent', item.id)"
        >
          {{ item.label }}
        </button>
      </div>
      <p :class="['contact-aside__hint', { 'contact-aside__hint--visible': intent }]">{{ intent?.hint ?? " " }}</p>
    </div>

    <div class="contact-aside__direct">
      <p class="contact-aside__label">Or reach me directly</p>
      <CopyEmailButton :email="site.email" />
      <div class="contact-aside__socials">
        <a
          v-for="social in contactSocials"
          :key="social.label"
          :aria-label="social.label"
          class="contact-aside__social"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <component :is="SOCIAL_ICONS[social.icon]" class="contact-aside__social-icon" />
        </a>
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
@use "abstracts" as *;
@use "../shared/paper" as paper;

$emerald: oklch(69.6% 0.17 162.48);

.contact-aside {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 32px;

  @include mq(md) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
  }

  &__profile {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  // Small polaroid print of the portrait.
  &__polaroid {
    position: relative;
    flex-shrink: 0;
    width: 84px;
    padding: 6px 6px 16px;
    border-radius: 3px;
    background-color: #fbf9f4;
    box-shadow:
      0 1px 1px #0000000f,
      0 8px 16px -10px #0006;
    rotate: -3deg;

    @include dark {
      background-color: #f2efe7;
    }
  }

  &__grain {
    position: absolute;
    inset: 0;
    border-radius: 3px;
    background-image: paper.$grain;
    opacity: 0.8;
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  &__photo {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
  }

  &__photo-img {
    object-fit: cover;
    object-position: top;
  }

  &__who {
    min-width: 0;
  }

  &__name {
    font-family: var(--font-serif);
    font-size: 24px;
    line-height: 1.25;
    color: var(--color-foreground);
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.42857;
    color: var(--color-muted-foreground);
  }

  &__pulse {
    position: relative;
    display: flex;
    width: 6px;
    height: 6px;
  }

  &__ping {
    position: absolute;
    display: inline-flex;
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    background-color: color-mix(in oklab, $emerald 60%, transparent);
    animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }

  &__dot {
    position: relative;
    display: inline-flex;
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background-color: $emerald;
  }

  &__label {
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  &__chip {
    padding: 6px 16px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 15%, transparent);
    border-radius: 9999px;
    font-family: var(--font-sans);
    font-size: 14px;
    line-height: 1.42857;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    cursor: pointer;
    transition: all var(--duration-default) var(--ease-default);

    @include hover {
      border-color: color-mix(in oklab, var(--color-foreground) 35%, transparent);
      color: var(--color-foreground);
    }

    &--active,
    &--active:hover {
      border-color: var(--color-foreground);
      background-color: var(--color-foreground);
      color: var(--color-background);
    }
  }

  &__hint {
    margin-top: 12px;
    font-family: var(--font-hand);
    font-weight: 500;
    font-size: 21.6px;
    line-height: 1.25;
    color: color-mix(in oklab, var(--color-foreground) 70%, transparent);
    opacity: 0;
    transition: opacity 0.3s var(--ease-default);

    @include mq-down(md) {
      display: none;
    }

    @include mq(md) {
      min-height: 28px;
    }

    &--visible {
      opacity: 1;

      @include mq-down(md) {
        display: block;
      }
    }
  }

  &__direct {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__socials {
    display: flex;
    gap: 8px;
  }

  &__social {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent);
    border-radius: var(--radius);
    color: var(--color-muted-foreground);
    transition: all var(--duration-default) var(--ease-default);

    @include hover {
      border-color: color-mix(in oklab, var(--color-foreground) 25%, transparent);
      color: var(--color-foreground);
    }
  }

  &__social-icon {
    width: 16px;
    height: 16px;
  }
}
</style>

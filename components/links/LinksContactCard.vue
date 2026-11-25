<!-- Floating card with email (copy), résumé link and a "Write me a message" button. -->
<script setup lang="ts">
defineProps<{
  email: string;
  resume: { href: string; label: string; value: string };
  photo: string;
}>();
</script>

<template>
  <div class="links-contact-card">
    <LinksEmailRow :email="email" />
    <span aria-hidden="true" class="links-contact-card__divider" />
    <a class="links-contact-card__row" :href="resume.href" target="_blank" rel="noopener noreferrer">
      <span class="links-contact-card__chip">
        <IconFileTextDuotone class="links-contact-card__chip-icon" />
      </span>
      <span class="links-contact-card__text">
        <span class="links-contact-card__label">{{ resume.label }}</span>
        <span class="links-contact-card__plain">{{ resume.value }}</span>
      </span>
      <IconArrowUpRight class="links-contact-card__trail links-contact-card__trail--arrow" />
    </a>
    <div class="links-contact-card__actions">
      <NuxtLink class="links-contact-card__call button button--secondary" to="/contact">
        <span class="links-contact-card__call-inner">
          <span aria-hidden="true" class="links-contact-card__plus">+</span>
          <span aria-hidden="true" class="links-contact-card__you">You</span>
          <span class="links-contact-card__avatar">
            <img
              class="links-contact-card__avatar-img"
              :src="photo"
              alt=""
              width="64"
              height="64"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span class="links-contact-card__call-label">Write me a message</span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$spring: cubic-bezier(0.34, 1.4, 0.64, 1);

.links-contact-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 28px;
  background-color: #f7f7f8;
  background-image: linear-gradient(to bottom, #fff, color-mix(in oklab, #fff 70%, transparent));
  box-shadow:
    inset 0 1px 0 #fff,
    0 0 0 1px #00000012,
    0 1px 2px #0000000d,
    0 24px 48px -24px #00000040;

  @include dark {
    background-color: #0f0f10;
    background-image: linear-gradient(
      to bottom,
      color-mix(in oklab, #fff 7%, transparent),
      color-mix(in oklab, #fff 2%, transparent)
    );
    box-shadow:
      inset 0 1px 0 #ffffff1a,
      0 0 0 1px #ffffff12,
      0 1px 2px #0006,
      0 30px 60px -28px #000c;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    border-radius: calc(var(--radius) * 2.2);
    text-align: left;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s var(--ease-default);

    @include hover {
      background-color: color-mix(in oklab, var(--color-foreground) 4%, transparent);
    }

    &:focus-visible {
      background-color: color-mix(in oklab, var(--color-foreground) 5%, transparent);
    }

    &:active {
      --chip-shadow-3: transparent;
      --chip-shadow-4: transparent;
      scale: 0.98;
    }
  }

  &__chip {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    background-image: linear-gradient(180deg, var(--chip-top) 0, var(--chip-bottom) 100%);
    box-shadow:
      inset 0 1px 0 var(--chip-highlight),
      inset 0 -1px 0 var(--chip-shadow-1),
      0 0 0 0.5px var(--chip-shadow-2),
      0 1px 2px var(--chip-shadow-3),
      0 4px 10px -4px var(--chip-shadow-4);
    color: color-mix(in oklab, var(--color-foreground) 70%, transparent);
    transition: color 0.3s var(--ease-default);

    @include parent-hover(".links-contact-card__row") {
      color: $blue;
    }
  }

  &__chip-icon {
    width: 16px;
    height: 16px;
  }

  &__text {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  }

  &__label {
    font-family: var(--font-sans);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__value {
    @include truncate;
    font-size: 14px;
    line-height: 1.42857;
    color: var(--color-foreground);
  }

  &__plain {
    font-size: 14px;
    line-height: 1.42857;
    color: var(--color-foreground);
  }

  &__trail {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--color-muted-foreground);
    transition: all 0.3s var(--ease-out-quint);

    @include parent-hover(".links-contact-card__row") {
      color: $blue;
    }

    &--done {
      color: oklch(69.6% 0.17 162.48);
    }

    &--arrow {
      @include parent-hover(".links-contact-card__row") {
        translate: 2px -2px;
        transition-duration: 0.5s;
        transition-timing-function: $spring;
      }
    }
  }

  &__divider {
    height: 1px;
    margin-inline: 16px;
    background-color: var(--color-border);
  }

  &__actions {
    display: flex;
    margin-top: 4px;
  }

  // Secondary button with an avatar that slides aside to reveal "+ You".
  &__call {
    display: inline-flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 48px;
    border-radius: 9999px;
    white-space: nowrap;
  }

  &__call-inner {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__plus {
    position: absolute;
    top: 50%;
    left: 8px;
    display: grid;
    place-items: center;
    width: 20px;
    font-size: 20px;
    font-weight: 300;
    line-height: 1;
    color: currentColor;
    opacity: 0;
    translate: 0 -50%;
    scale: 0.5;
    transition: all 0.3s var(--ease-out-quint);

    .links-contact-card__call:focus-visible & {
      opacity: 1;
      scale: 1;
    }

    @include parent-hover(".links-contact-card__call") {
      opacity: 1;
      scale: 1;
      transition-duration: 0.5s;
      transition-delay: 75ms;
      transition-timing-function: $spring;
    }
  }

  &__you {
    position: absolute;
    top: 50%;
    left: 30px;
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    background-color: oklch(20.5% 0 0);
    box-shadow: 0 4px 10px -4px #00000073;
    font-size: 11px;
    font-weight: 500;
    color: #fff;
    opacity: 0;
    translate: -30px -50%;
    scale: 0.9;
    transition: all 0.3s var(--ease-out-quint);

    @include dark {
      background-color: #fff;
      color: oklch(20.5% 0 0);
    }

    .links-contact-card__call:focus-visible & {
      opacity: 1;
      translate: 0 -50%;
      scale: 1;
    }

    @include parent-hover(".links-contact-card__call") {
      opacity: 1;
      translate: 0 -50%;
      scale: 1;
      transition-duration: 0.5s;
      transition-timing-function: $spring;
    }
  }

  &__avatar {
    position: relative;
    z-index: 10;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    overflow: hidden;
    border-radius: 9999px;
    box-shadow:
      0 0 0 1.5px #fff,
      0 2px 6px -2px #0006;
    transition: translate 0.3s var(--ease-out-quint);

    .links-contact-card__call:focus-visible & {
      translate: -30px 0;
    }

    @include parent-hover(".links-contact-card__call") {
      translate: -30px 0;
      transition-duration: 0.5s;
      transition-timing-function: $spring;
    }
  }

  &__avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  &__call-label {
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
    transition: translate 0.3s var(--ease-out-quint);

    .links-contact-card__call:focus-visible & {
      translate: 30px 0;
    }

    @include parent-hover(".links-contact-card__call") {
      translate: 30px 0;
      transition-duration: 0.5s;
      transition-timing-function: $spring;
    }
  }
}
</style>

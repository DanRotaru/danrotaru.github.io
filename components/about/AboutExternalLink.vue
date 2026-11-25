<!-- External link styled like the original MDX links (last word + arrow never wrap apart). Styles live here so the link works on any page. -->
<script setup lang="ts">
const props = defineProps<{ href: string; text: string; logo?: string; logoLight?: string }>();

const parts = computed(() => {
  const words = props.text.split(" ");
  const last = words.pop();
  return { head: words.length ? `${words.join(" ")} ` : null, last };
});
</script>

<template>
  <a class="about-experience__link" :href="href" target="_blank" rel="noopener noreferrer">
    <template v-if="!logo && parts.head">{{ parts.head }}</template>
    <span class="about-experience__link-tail">
      <template v-if="logo">
        <img
          v-if="logoLight"
          :src="logoLight"
          :alt="text"
          class="about-experience__link-logo about-experience__link-logo--light"
        />
        <img
          :src="logo"
          :alt="text"
          class="about-experience__link-logo"
          :class="{ 'about-experience__link-logo--dark': logoLight }"
        />
      </template>
      <template v-else>{{ parts.last }}</template><span aria-hidden="true" class="about-experience__link-icon-wrap">
        <IconArrowUpRight class="about-experience__link-icon" />
      </span>
    </span>
    <span class="visually-hidden">(opens in new tab)</span>
  </a>
</template>

<style lang="scss">
@use "abstracts" as *;

.about-experience {
  &__link {
    color: oklch(54.6% 0.245 262.881);
    text-decoration-line: underline;
    text-decoration-color: color-mix(in oklab, oklch(54.6% 0.245 262.881) 30%, transparent);
    text-decoration-thickness: 1px;
    text-underline-offset: 3.52px;

    @include mq(lg) {
      text-underline-offset: 3.96px;
    }

    transition: all 0.3s var(--ease-out-quint);

    @include hover {
      color: oklch(48.8% 0.243 264.376);
      text-decoration-color: oklch(54.6% 0.245 262.881);
    }

    @include dark {
      color: oklch(70.7% 0.165 254.624);
      text-decoration-color: color-mix(in oklab, oklch(70.7% 0.165 254.624) 30%, transparent);

      @include hover {
        color: oklch(80.9% 0.105 251.813);
        text-decoration-color: oklch(80.9% 0.105 251.813);
      }
    }
  }

  &__link-tail {
    white-space: nowrap;
  }

  // Logo in place of the link text (e.g. EiHAI).
  &__link-logo {
    display: inline;
    height: 24px;
    width: auto;
    margin-right: 2px;
    vertical-align: middle;

    &--dark {
      display: none;

      @include dark {
        display: inline;
      }
    }

    &--light {
      @include dark {
        display: none;
      }
    }
  }

  &__link-icon-wrap {
    display: inline-block;
    margin-inline-start: 2px;
    line-height: 1;
    vertical-align: middle;
    user-select: none;
  }

  &__link-icon {
    display: block;
    width: 13.6px;
    height: 13.6px;

    @include mq(lg) {
      width: 15.3px;
      height: 15.3px;
    }

    transition: translate 0.3s var(--ease-out-expo);

    @include parent-hover(".about-experience__link") {
      translate: 1px -1px;
    }

    @include reduced-motion {
      transition: none;
    }
  }
}
</style>

<script setup lang="ts">
usePageMeta({
  title: "Contact | Let's Talk - Dan Rotaru",
  description:
    "Get in touch with Dan Rotaru about freelance work, a full-time role, or an idea you're working on. Send a message or book a call.",
  path: "/contact",
});
</script>

<template>
  <PageHero eyebrow="Get in touch" title="Tell me" highlight="what you're building" />
  <ContentFrame inner-class-name="contact-page__body">
    <ContactPanel />
  </ContentFrame>
  <SectionDivider />
  <HomeExplore />
</template>

<style lang="scss">
@use "abstracts" as *;

.contact-page {
  &__body {
    padding: 48px 20px;

    @include mq(md) {
      padding: 64px 40px;
    }

    @include mq(lg) {
      padding-inline: 48px;
    }
  }
}
</style>

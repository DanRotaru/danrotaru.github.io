<script setup lang="ts">
import { linksConnect } from "@/data/links";

usePageMeta({
  title: "Links | Social Profiles & Connect - Dan Rotaru",
  description:
    "Find all of Dan Rotaru's social profiles, contact links, and ways to connect in one place. GitHub, LinkedIn, Telegram, Instagram, and more.",
  path: "/links",
});
</script>

<template>
  <LinksHero />
  <nav aria-label="Links">
    <section aria-label="On the site">
      <LinksBand title="On the site" />
      <ContentFrame as="div">
        <LinksSiteGrid />
      </ContentFrame>
    </section>
    <section aria-label="Connect">
      <LinksBand title="Connect" />
      <ContentFrame as="div">
        <LinksConnectGrid :tiles="linksConnect" />
      </ContentFrame>
    </section>
  </nav>
</template>

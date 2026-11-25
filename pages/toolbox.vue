<script setup lang="ts">
import { toolbox } from "@/data/toolbox";
// import { toolCount, toolGroups } from "@/data/toolbox"; // used by the commented-out toolkit section

usePageMeta({
  title: "Toolbox | Favorite Software & Dev Tools - Dan Rotaru",
  description:
    "Dan Rotaru's favorite software and the dev tools, CLI tools and apps he reinstalls first on every new machine.",
  path: "/toolbox",
});
</script>

<template>
  <PageHero eyebrow="Toolbox" title="Some of my" highlight="Favorite Software" />
  <UsesSection>
    <!-- Restore `divided` on this row when re-enabling the toolkit section below. -->
    <UsesRow id="toolbox">
      <template #heading><em>{{ toolbox.length }} apps</em> I keep<br /><em>coming back to</em>.</template>
      <ToolboxGrid :items="toolbox" />
    </UsesRow>
    <!--
    <UsesRow id="toolkit">
      <template #heading><em>{{ toolCount }} tools</em> I'd<br /><em>reinstall first</em>.</template>
      <ToolList :groups="toolGroups" />
    </UsesRow>
    -->
  </UsesSection>
</template>

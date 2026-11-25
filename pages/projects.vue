<script setup lang="ts">
import { projectTags, sideProjects, tagIcons } from "@/data/projects";

usePageMeta({
  title: "Projects | Web Apps, Tools & Extensions - Dan Rotaru",
  description:
    "Projects by Dan Rotaru: EiHAI, Cepret.md, Movie Shuffle, Material Design Icons, QuickCConverter, ClickUp Track, JSON & Code Viewer and more.",
  path: "/projects",
});
</script>

<template>
  <ProjectsIndex
    eyebrow="Projects"
    title="Some of my"
    highlight="projects"
    :projects="sideProjects"
    :tags="projectTags"
    :tag-icons="tagIcons"
    external
  />
</template>

<!--
  Shared layout of the "What experience taught me" tiles ("Hobby → Career" card): an
  illustration slot for the before -> after shift, the one-line lesson in
  serif italics, and the "Lesson NN" caption.
-->
<script setup lang="ts">
import type { HomeExpShift } from "@/data/home";

defineProps<{
  shift: HomeExpShift;
}>();
</script>

<template>
  <div class="home-exp-shift-frame">
    <div class="home-exp-shift-frame__art"><slot /></div>
    <p class="home-exp-shift-frame__lesson">{{ `“${shift.lesson}”` }}</p>
    <p class="home-exp-shift-frame__caption">{{ shift.caption }}</p>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

$blue: oklch(62.3% 0.214 259.815);
$card: ".home-bento-card";

.home-exp-shift-frame {
  position: absolute;
  inset: 0;

  &__art {
    position: absolute;
    inset-inline: 20px;
    top: 112px;
    bottom: 92px;
  }

  &__lesson {
    position: absolute;
    inset-inline: 20px;
    bottom: 41.6px;
    padding-right: 40px;
    font-family: var(--font-instrument-serif);
    font-size: 18.4px;
    font-style: italic;
    line-height: 1.2;
    color: color-mix(in oklab, var(--color-foreground) 85%, transparent);
    transition: color 0.3s ease-in;

    @include parent-hover($card) {
      color: var(--color-foreground);
    }
  }

  &__caption {
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-family: var(--font-bricolage);
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
  }
}
</style>

<template>
  <Header/>
  <div class="default">
    <slot/>
  </div>

  <div class="decorations">
    <i class="decorations__top"/>
    <i class="decorations__center"/>
  </div>

  <div class="page-appearance"></div>

  <Sprites/>
</template>

<script setup>
import '@/assets/styles/layouts/default.scss';
</script>
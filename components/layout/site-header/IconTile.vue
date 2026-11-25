<script setup lang="ts">
import { navTints, type NavTint } from "@/data/navigation";

/** Rounded square with a vertical colour gradient and a white icon (menu rows). */
const props = defineProps<{ tint: NavTint }>();

const style = computed(() => {
  const { from, to } = navTints[props.tint];
  return { "--tile-from": from, "--tile-to": to };
});
</script>

<template>
  <span aria-hidden="true" class="icon-tile" :style="style">
    <slot />
  </span>
</template>

<style lang="scss">
@use "abstracts" as *;

.icon-tile {
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-image: linear-gradient(to bottom, var(--tile-from), var(--tile-to));
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.35),
    0 1px 3px rgb(0 0 0 / 0.3);
  color: #fff;

  // Put on the icon inside: <Icon className="icon-tile__icon" />
  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>

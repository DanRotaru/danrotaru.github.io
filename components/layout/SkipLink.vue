<template>
  <a class="skip-link" href="#main">Skip to content</a>
</template>

<style lang="scss">
@use "abstracts" as *;

.skip-link {
  @include sr-only;
  padding: 8px 16px;
  border-radius: 9999px;
  background-color: #fff;
  color: #0d0d0f;
  font-size: 14px;
  line-height: 1.42857;
  font-weight: 500;
  box-shadow:
    0 10px 15px -3px #0000001a,
    0 4px 6px -4px #0000001a;

  &:focus {
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 10000;
    width: auto;
    height: auto;
    margin: 0;
    padding: 8px 16px;
    overflow: visible;
    clip-path: none;
    white-space: normal;
  }

  @include dark {
    background-color: oklch(20.5% 0 0);
    color: #fff;
  }
}
</style>

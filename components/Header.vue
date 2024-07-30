<template>
  <header class="header" :class="{visible: headerVisibility}">
    <RouterLink to="/" @click="toggleHeaderVisibility">Home</RouterLink>
    <RouterLink to="/about" @click="toggleHeaderVisibility">About</RouterLink>
    <RouterLink to="/projects" @click="toggleHeaderVisibility">Projects</RouterLink>
    <RouterLink to="/toolbox" @click="toggleHeaderVisibility">Toolbox</RouterLink>
    <RouterLink to="/blog" @click="toggleHeaderVisibility">Blog</RouterLink>

    <button class="theme-toggle" :class="{light: useLightTheme}" @click="setTheme" data-splitbee-event="Change Theme"
            :data-splitbee-event-destination="useLightTheme ? 'light' : 'dark'" aria-label="Theme Toggle">
      <svg viewbox="0 0 24 24">
        <use xlink:href="#svg-moon"/>
        <use xlink:href="#svg-sun"/>
      </svg>
    </button>
  </header>

  <button class="header__hamburger" :class="{active: headerVisibility}" @click="toggleHeaderVisibility" aria-label="Header Hamburger">
    <svg viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4.75 5.75H19.25"/>
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4.75 18.25H19.25"/>
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M4.75 12H19.25"/>
    </svg>
  </button>

  <div class="header__overlay" @click="toggleHeaderVisibility"></div>
</template>
<style lang="scss">
.header {
  $self: &;
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 12;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px;
  border-radius: 16px;
  background: rgb(255 255 255 / 5%);
  border: 1px solid rgb(255 255 255 / 3%);
  backdrop-filter: blur(25px);
  font: 16px/1 'Inter', sans-serif;

  @media (max-width: 500px) {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    transform: scale(.95) translateY(5px);
    left: unset;
    right: 15px;
    flex-direction: column;
    align-items: flex-start;
    width: 300px;
    background-color: #1f2937;
    transition: .2s ease;
    transition-property: visibility, opacity, transform;

    &.visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: scale(1) translateY(0);

      ~ #{$self}__overlay {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
    }
  }

  a {
    position: relative;
    color: #fff;
    text-decoration: none;
    padding: 10px;
    border-radius: 10px;
    transition: .4s ease background-color;

    @media (max-width: 500px) {
      font-size: 18px;
      color: #b7b7b7;
      display: block;
      width: 100%;

      &:first-child {
        width: calc(100% - 40px);
      }
    }

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255 / 10%);
      border-radius: 10px;
      transition: .12s ease;
      transition-property: transform;
      transform: scale(0);
      pointer-events: none;
    }

    &:hover {
      transition: .2s ease background-color;
      background-color: rgb(255 255 255 / 10%);
    }

    &.router-link-active {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }

  .theme-toggle {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    padding: 6px;
    border-radius: 10px;
    background-color: rgb(255 255 255 / 15%);
    transition: 0.4s ease;
    transition-property: background, opacity, box-shadow, color;

    &:hover {
      opacity: 1;
      color: #fff;
      box-shadow: 0 3px 6px #0000001a, 0 -2px 67px #ffc75f;
      background-image: linear-gradient(135deg, #926aff 0%, #ff77b0 50%, #ffb367 100%);
      background-image: linear-gradient(135deg, color(display-p3 .5725490196 .4156862745 1/1) 0%, color(display-p3 1 .4666666667 .6901960784/1) 50%, color(display-p3 1 .7019607843 .4039215686/1) 100%);

      &:before,
      &:after {
        opacity: 1;
        transform: translate(-50%, 33px);
      }
    }

    svg {
      width: 24px;
      height: 24px;

      use {
        color: #fff;
        transition: .4s ease;
        transition-property: opacity, transform;
        opacity: 0;
        transform: rotate(-90deg);

        &:nth-child(1) {
          opacity: 1;
          transform: rotate(360deg);
        }
      }
    }

    &:before {
      content: 'Switch to light mode';
      position: absolute;
      bottom: 0;
      left: 50%;
      padding: 5px 7px;
      white-space: nowrap;
      font-size: 12px;
      border-radius: 5px;
      pointer-events: none;
      background-color: #020420;
      color: #fff;
      border: 1px solid #1E293B;
      transform: translate(-50%, 38px);
      opacity: 0;
      transition: .2s ease;
      transition-property: transform, opacity;

      @media (max-width: 500px) {
        position: unset;
        opacity: 1;
        transform: unset !important;
        background-color: transparent;
        border: unset;
        font-size: 14px;
      }
    }

    &:after {
      //content: '';
      position: absolute;
      top: 8px;
      left: 50%;
      border-style: solid;
      border-width: 0 8px 8px 8px;
      border-color: transparent transparent #020420 transparent;
      transform: translate(-50%, 35px);
      opacity: 0;
      transition: .2s ease;
      transition-property: transform, opacity;
    }

    &.light {
      &:before {
        content: 'Switch to dark mode';
      }

      use {
        &:nth-child(1) {
          opacity: 0;
          transform: rotate(90deg);
        }

        &:nth-child(2) {
          opacity: 1;
          transform: rotate(0);
        }
      }
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 10;
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, .2);
    transition: .2s ease;
    transition-property: opacity, visibility;
  }

  &__hamburger {
    position: fixed;
    top: 20px;
    right: 15px;
    z-index: 12;
    width: 45px;
    height: 45px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    background-color: rgb(255 255 255 / 15%);
    backdrop-filter: blur(25px);
    transition: .2s ease;
    transition-property: background-color;
    display: none;

    @media (max-width: 500px) {
      display: flex;
    }

    &:hover {
      background-color: rgb(255 255 255 / 20%);
    }

    &.active {
      background-color: transparent;
      box-shadow: none;
      opacity: .8;
      backdrop-filter: none;
      transition: .2s ease opacity;

      &:hover {
        opacity: 1;
      }

      path {
        &:nth-child(1) {
          transform: translate3d(7px, 0, 0) rotate(45deg);
        }

        &:nth-child(2) {
          transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
          opacity: 0;
        }

        &:nth-child(3) {
          transform: translate3d(-5px, 13px, 0) rotate(-45deg);

        }
      }
    }

    svg {
      width: 24px;
      height: 24px;

      path {
        stroke: #fff;
        transition: .15s ease transform;
      }
    }
  }
}

body:has(.page-projects):not(.light),
body:has(.page-blog):not(.light) {
  .header {
    background-color: #282E43;
  }
}
</style>
<script setup>
const useLightTheme = useState(() => false);
const headerVisibility = useState(() => false);

const setTheme = () => {
  useLightTheme.value = !useLightTheme.value;
  document.body.classList.toggle('light');
}

const toggleHeaderVisibility = () => {
  headerVisibility.value = !headerVisibility.value;
}
</script>
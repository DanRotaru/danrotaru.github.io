<template>
  <div class="page page-projects">
    <div class="container container--lg">
      <div class="text-center">
        <h5 class="h5">PROJECTS</h5>
        <h1 class="h1">Some of my projects</h1>
      </div>

      <ol class="projects" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li class="project" v-for="(project, index) in projects" itemprop="itemListElement" itemscope
            itemtype="https://schema.org/ListItem">
          <meta itemprop="position" :content="(index + 1).toString()"/>

          <div class="project-info">
            <h5 class="project-info__title" itemprop="name">{{ project.name }}</h5>
            <p class="project-info__description" itemprop="description" v-html="project.description"></p>
            <a :href="project.link" target="_blank" class="project-info__link" itemprop="item"
               data-splitbee-event="Open Project" :data-splitbee-event-destination="project.name">Open</a>
          </div>

          <div class="project-media" v-if="project.media.length">
            <template v-if="project.media.length > 1">
              <Splide :options="{ autoplay: true, interval: 3000, arrows: false, rewind: true, perPage: 1 }"
                      aria-label="Project Medias">
                <SplideSlide v-for="media in project.media">
                  <video v-if="media.endsWith('.mp4')" :src="media" autoplay muted loop/>
                  <img v-else :src="media" alt="project">
                </SplideSlide>
              </Splide>
            </template>
            <template v-else>
              <video v-if="project.media[0].endsWith('.mp4')" :src="project.media[0]" autoplay muted loop/>
              <img v-else :src="project.media[0]" alt="project">
            </template>
          </div>
        </li>
      </ol>

      <h2 class="mt-30 h2 text-center">and plainly more...</h2>
    </div>
  </div>

</template>
<script setup>
import {Splide, SplideSlide} from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

useSeoMeta({
  title: 'Dan Rotaru – Projects',
  ogTitle: 'Dan Rotaru – Projects',
  description: 'Hi👋, my name is Dan Rotaru, I\'m a full-stack web developer, engineer with a creative edge. There are some of my projects...',
})

const projects = [
  {
    name: 'Material Design Icons',
    description: `A Open-source iconography for designers and developers. Material design icons viewer, more than 7000+ icons, fastest way to get needed icons. Just icons, nothing else. Get to HTML, CSS, data path, encoded, or just download.`,
    link: 'https://dan13.me/icons',
    media: [
      '/img/projects/material-design-icons.png',
    ],
  },
  {
    name: 'QuickCConverter',
    description: `Quick Currency Converter - Fastest currency converter <a href="https://chromewebstore.google.com/detail/quickcconverter-quick-cur/ajgaihokdfdjgephfaibpdjbogepckgd" target="_blank">extension</a>. Experience lightning-fast currency conversions.`,
    link: 'https://chromewebstore.google.com/detail/quickcconverter-quick-cur/ajgaihokdfdjgephfaibpdjbogepckgd',
    media: [
      '/img/projects/QuickCConverter/Main.jpg',
      '/img/projects/QuickCConverter/Shortcut.jpg',
      '/img/projects/QuickCConverter/Multiple currency converter.jpg',
      '/img/projects/QuickCConverter/Customization.jpg',
      '/img/projects/QuickCConverter/Theme.jpg',
      '/img/projects/QuickCConverter/Selecting.jpg',
    ],
  },
  {
    name: 'ClickUp Track',
    description: `ClickUp Track is a <a href="https://chromewebstore.google.com/detail/clickup-track/lmjdappfabcipedkfgjccefgjdgcgglb" target="_blank">Chrome extension</a> that boosts productivity by integrating time tracking directly into your ClickUp workflow.`,
    link: 'https://chromewebstore.google.com/detail/clickup-track/lmjdappfabcipedkfgjccefgjdgcgglb',
    media: [
      '/img/projects/ClickUpTrack/Page.jpg',
      '/img/projects/ClickUpTrack/Page-1.jpg',
      '/img/projects/ClickUpTrack/Page-2.jpg',
      '/img/projects/ClickUpTrack/Page-3.jpg',
      '/img/projects/ClickUpTrack/Page-4.jpg',
      '/img/projects/ClickUpTrack/Page-5.jpg',
    ],
  },
  {
    name: 'JSON & Code Viewer',
    description: `JSON & Code Viewer is a <a href="https://chromewebstore.google.com/detail/json-code-viewer/miahlkanimkomfiiecemmdmjgenckamn" target="_blank">Chrome extension</a> that enhances your browsing experience by replacing default text displays with a beautifully styled code editor for JSON, CSS, and JavaScript.`,
    link: 'https://chromewebstore.google.com/detail/json-code-viewer/miahlkanimkomfiiecemmdmjgenckamn',
    media: [
      '/img/projects/JsonAndCodeViewer/main.jpg',
      '/img/projects/JsonAndCodeViewer/monokai-theme.jpg',
      '/img/projects/JsonAndCodeViewer/options.jpg',
      '/img/projects/JsonAndCodeViewer/options-2.jpg',
      '/img/projects/JsonAndCodeViewer/js-code-viewer.jpg',
      '/img/projects/JsonAndCodeViewer/light-theme.jpg',
    ],
  },
  {
    name: 'SVG Tools',
    description: `Simple way to get svg as encoded, for CSS, HTML, tag, img...`,
    link: 'https://dan13.me/svgtools/',
    media: [
      '/img/projects/svgtools.png',
    ],
  },
  {
    name: 'ColorName',
    description: `Get Color Name by color HEX, dont waste your time by naming color`,
    link: 'https://dan13.me/colorname/',
    media: [
      '/img/projects/colorname.png',
    ],
  },
  {
    name: 'CSS Color Filter',
    description: `CSS color filter generator to convert from black to target hex color`,
    link: 'https://dan13.me/css-filter/',
    media: [
      '/img/projects/cssfilter.png',
    ],
  },
  {
    name: 'Storage.js',
    description: `Storage.js - lightweight library to interactive with LocalStorage API.`,
    link: 'https://github.com/DanRotaru/storage.js',
    media: [
      '/img/projects/storage-js.svg',
    ],
  },
];
</script>
<style lang="scss">
.projects {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  padding: 15px;
  border-radius: 15px;
  background-color: rgba(255 255 255 / 10%);
  border: 1px solid rgba(255 255 255 / 10%);
  transition: .2s ease;
  transition-property: background-color, border-color;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: rgba(255 255 255 / 12%);
    border-color: rgba(255 255 255 / 12%);
  }

  @media (max-width: 992px) {
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  &-info {
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 32%;

    @media (max-width: 992px) {
      width: 100%;
      padding: 0;
    }

    &__title {
      font-size: 28px;
      margin-bottom: 10px;
    }

    &__description {
      margin-bottom: 10px;
    }

    &__link {
      position: relative;
      display: block;
      gap: 10px;
      margin-top: auto;
      padding: 10px 30px;
      text-align: center;
      border-radius: 50px;
      text-decoration: none;
      background-color: #0F172A;
      color: #cbd5e1 !important;
      transition: .2s ease;
      transition-property: background-color, color;

      &:hover {
        background-color: #141d32;
        color: #fff !important;

        &:after {
          opacity: 1;
          transform: translateY(-50%) rotate(-40deg);
        }

        &:before {
          transform: scale(1) translateY(-50%);
        }
      }

      &:after {
        content: '';
        position: absolute;
        right: 15px;
        top: 50%;
        z-index: 2;
        width: 15px;
        height: 13px;
        opacity: .6;
        transform: translateY(-50%);
        transition: .2s ease;
        transition-property: opacity, transform;
        background-size: 100%;
        background-image: url("data:image/svg+xml,%0A%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='16' viewBox='0 0 18 16' fill='%23FFFFFF' %3E%0A%3Cpath d='M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928932C10.9526 0.538408 10.3195 0.538408 9.92893 0.928932C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM1 9H17V7H1V9Z' fill='%23FFFFFF'/%3E%0A%3C/svg%3E%0A");
      }

      &:before {
        content: '';
        position: absolute;
        right: 10px;
        top: 50%;
        transform-origin: top;
        transform: scale(0) translateY(-50%);
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #484E5D;
        z-index: 0;
        transition: .2s ease transform;
      }
    }
  }

  &-media {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 68%;
    line-height: 0;

    @media (max-width: 992px) {
      width: 100%;
    }

    img,
    video {
      display: block;
      width: 100%;
      max-height: 520px;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  .splide__pagination__page.is-active {
    background-color: #858585;
  }
}
</style>
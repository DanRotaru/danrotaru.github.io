<template>
  <div class="container home">
    <div class="home-heading">
      <h1 class="home-heading__title text-animation" aria-label="Hi👋, I'm DanRotaru, a full-stack web developer with a creative edge.">
        <span>Hi👋, </span>
        <span>I'm </span>
        <span class="primary">DanRotaru, </span>
        <span>a </span>
        <span>full-stack </span>
        <span>web </span>
        <span>developer </span>
        <span>with </span>
        <span>a </span>
        <span>creative </span>
        <span>edge.</span>
      </h1>
    </div>

    <div class="home-cta">
      <RouterLink to="/about" class="home-cta__btn">
        More about me
        <svg fill="none" width="10" height="10" viewBox="0 0 10 10">
          <path d="M0 5h7"></path>
          <path d="M1 1l4 4-4 4"></path>
        </svg>
      </RouterLink>

      <ul class="home-cta__socials" itemscope itemtype="https://schema.org/BreadcrumbList">
        <li v-for="social in socials" itemprop="itemListElement" itemscope
            itemtype="https://schema.org/ListItem">
          <a :href="social.link" target="_blank"
             itemprop="item"
             :aria-label="'My ' + social.name"
             data-splitbee-event="Open Social Link"
             :data-splitbee-event-destination="social.name">
            <svg>
              <use :xlink:href="'#svg-' + social.name"/>
            </svg>
          </a>
        </li>

      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: 'Dan Rotaru – a full-stack web developer with a creative edge',
  ogTitle: 'Dan Rotaru – a full-stack web developer with a creative edge',
});

const socials = [
  {
    name: 'telegram',
    link: 'https://t.me/danrotaru',
  },
  {
    name: 'github',
    link: 'https://github.com/DanRotaru/',
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/dan-rotaru/',
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/dan.rotaru13/',
  },
  {
    name: 'email',
    link: 'mailto:hello@dan13.me',
  }
]
</script>
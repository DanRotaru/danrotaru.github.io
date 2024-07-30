<template>
  <div class="page">
    <div class="container">
      <div class="text-center">
        <h5 class="h5">Toolbox</h5>
        <h1 class="h1">Some of my favorite software</h1>
      </div>

      <ul class="toolbox">
        <li v-for="tool in tools">
          <a :href="tool.url" target="_blank" class="toolbox__item"
             data-splitbee-event="Toolbox Link" :data-splitbee-event-destination="tool.name">
            <img v-if="tool.logo" :src="tool.logo" :alt="tool.name"/>
            <span>{{ tool.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>
<script setup>
const tools = [
  {
    name: 'Google Chrome',
    url: 'https://www.google.com/chrome/',
    logo: '/img/toolbox/chrome.png',
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/',
    logo: '/img/toolbox/spotify.png',
  },
  {
    name: 'PowerToys',
    url: 'https://learn.microsoft.com/en-us/windows/powertoys/',
    logo: '/img/toolbox/powertoys.png',
  },
  {
    name: '1Password',
    url: 'https://1password.com/',
    logo: '/img/toolbox/1password.png',
  },
  {
    name: 'Arc',
    url: 'https://arc.net/',
    logo: '/img/toolbox/arc.png',
  },
  {
    name: 'Windows Terminal',
    url: 'https://github.com/microsoft/terminal',
    logo: '/img/toolbox/wt.png',
  },
  {
    name: 'VS Code',
    url: 'https://code.visualstudio.com/',
    logo: '/img/toolbox/vscode.png',
  },
  {
    name: 'WebStorm',
    url: 'https://www.jetbrains.com/webstorm/',
    logo: '/img/toolbox/webstorm.png',
  },
  {
    name: 'PhpStorm',
    url: 'https://www.jetbrains.com/phpstorm/',
    logo: '/img/toolbox/phpstorm.png',
  },
  {
    name: 'MongoDB Compass',
    url: 'https://www.mongodb.com/products/tools/compass',
    logo: '/img/toolbox/mongodb-compass.png',
  },
  {
    name: 'Sidekick',
    url: 'https://www.meetsidekick.com/',
    logo: '/img/toolbox/sidekick.png',
  },
  {
    name: 'Vivaldi',
    url: 'https://vivaldi.com/',
    logo: '/img/toolbox/vivaldi.png',
  },
  {
    name: 'Runjs',
    url: 'https://runjs.app/',
    logo: '/img/toolbox/runjs.png',
  },
  {
    name: 'Nilesoft Shell',
    url: 'https://nilesoft.org/',
    logo: '/img/toolbox/nilesoft.png',
  },
  {
    name: 'MailSpring',
    url: 'https://www.getmailspring.com/',
    logo: '/img/toolbox/mailspring.png',
  },
  {
    name: 'Slack',
    url: 'https://slack.com/',
    logo: '/img/toolbox/slack.png',
  },
  {
    name: 'Notion',
    url: 'https://www.notion.so/',
    logo: '/img/toolbox/notion.png',
  },
  {
    name: 'Figma',
    url: 'https://www.figma.com/',
    logo: '/img/toolbox/figma.png',
  },
  {
    name: 'ImageGlass',
    url: 'https://imageglass.org/',
    logo: '/img/toolbox/imageglass.jpg',
  },
  {
    name: 'Telegram',
    url: 'https://t.me/',
    logo: '/img/toolbox/telegram.png',
  },

]
</script>

<style lang="scss">
.toolbox {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 500px) {
    gap: 15px;
  }

  &__item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    width: 200px;
    height: 185px;
    background: #161F32;
    border-radius: 15px;
    border: 1px solid #2d3341;
    cursor: pointer;
    transition: .2s ease;
    transition-property: transform, background-color, border-color;

    @media (max-width: 500px) {
      width: calc(50% - 8px);
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      border-radius: inherit;
      background: radial-gradient(75% 63.6% at 50% 2.5%, rgb(36 200 236) 0%, rgba(99, 102, 241, 0) 100%);
      opacity: 0.1;
    }

    &:after {
      content: '';
      position: absolute;
      right: 6px;
      top: 6px;
      width: 26px;
      height: 26px;
      pointer-events: none;
      border-radius: 10px;
      transform: translate(-5px, 5px);
      opacity: 0;
      transition: 0.2s ease;
      transition-property: transform, opacity;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 24 24'%3E%0A%3Cpath d='M 19.25 12 C 19.25 16.004 16.004 19.25 12 19.25 C 7.996 19.25 4.75 16.004 4.75 12 C 4.75 7.996 7.996 4.75 12 4.75 C 16.004 4.75 19.25 7.996 19.25 12 Z' fill='transparent' stroke-width='1' stroke='%2314b8a6' stroke-linecap='round' stroke-linejoin='round' stroke-dasharray=''%3E%3C/path%3E%3Cpath d='M 14.25 13.25 L 14.25 9.75 L 10.75 9.75 M 14 10 L 9.75 14.25' fill='transparent' stroke-width='1' stroke='%2314b8a6' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
    }

    &:hover {
      background-color: #182235;
      border-color: #14b8a6;
      transform: translateY(-1px);

      &:after {
        opacity: .9;
        transform: translate(0) scale(1);
      }
    }

    &:active {
      transform: translateY(0)
    }

    img {
      width: 100px;
      height: 100px;
      object-fit: contain;
      border-radius: 50%;
    }

    span {
      font: inherit;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      background-image: radial-gradient(126% 100% at 50% 37.5%, rgb(255, 255, 255) 0%, rgb(72, 82, 122) 100%);
    }
  }
}
</style>
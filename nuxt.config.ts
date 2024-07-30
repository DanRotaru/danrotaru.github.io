// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Dan Rotaru – full-stack engineer, designer, creative developer',
      meta: [
        {
          name: 'description',
          content: 'Dan Rotaru – a fullstack web developer with a creative edge.'
        },
        {
          property: 'og:site_name',
          content: 'Dan Rotaru – full-stack engineer, designer, creative developer'
        },
        {
          property: 'og:site:name',
          content: 'Dan Rotaru – full-stack engineer, designer, creative developer'
        },
        {
          property: 'og:title',
          content: 'Dan Rotaru – full-stack engineer, designer, creative developer',
        },
        {
          property: 'og:description',
          content: 'Dan Rotaru – a fullstack web developer with a creative edge.',
        },
        {
          property: 'og:url',
          content: 'https://dan13.me/',
        },
        {
          property: 'og:image',
          content: '/img/website.png',
        },
        {
          name: 'keywords',
          content: 'Dan Rotaru, DanRotaru, DanR, frontend, backend, fullstack, web developer, personal website, website, danrotaru website, Dan Rotaru website, DanRotaru site, DanRotaru projects, Dan Rotaru projects, Full-stack web developer, Personal story, Professional background, Web development experience, Technology enthusiast, Skills and expertise, Career journey, Projects and achievements, Coding skills, JavaScript developer, HTML/CSS expert, Vue 3, Composition API, Software projects, Development portfolio, User experience, UI/UX design, Web design, Programming languages, Tech innovations, Career path, Software engineering, Problem solving, Application development, Code quality, Responsive design, Front-end development, Back-end development, API integration, Web technologies, JavaScript frameworks, Front-end frameworks, Back-end frameworks, Database management, Agile methodology, Software testing, DevOps practices, Code optimization, Project management, Technical skills, Digital solutions, Creative solutions, Tech career, Professional growth, Developer tools, Personal growth, Web solutions'
        },
        {
          name: 'author',
          content: 'Dan Rotaru'
        }
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-Y14P7SCC0F'
        },
        {
          async: true,
          src: 'https://cdn.splitbee.io/sb.js'
        },
        {
          type: 'application/ld+json',
          innerHTML: `
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Dan Rotaru – full-stack engineer, designer, creative developer",
              "item": "https://dan13.me/"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "About me",
              "item": "https://dan13.me/about"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": "Projects",
              "item": "https://dan13.me/projects"
            },{
              "@type": "ListItem",
              "position": 4,
              "name": "Toolbox",
              "item": "https://dan13.me/toolbox"
            },{
              "@type": "ListItem",
              "position": 5,
              "name": "Blog",
              "item": "https://dan13.me/blog"
            }]
          }
          `.replace(/\s+/g, ' ').trim()
        },
        {
          innerHTML: `(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "h7m4aqhro4");
          window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-Y14P7SCC0F');
          `.replace(/\s+/g, ' ').trim()
        },
      ],
    }
  },
  compatibilityDate: '2024-07-19',
  css: [
    "~/assets/styles/main.scss"
  ],
  devtools: { enabled: false },
  devServer: {
    port: 8105
  }
})
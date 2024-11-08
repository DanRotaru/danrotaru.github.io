// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Dan Rotaru – a full-stack web developer with a creative edge',
      meta: [
        {
          property: 'og:site_name',
          content: 'Dan Rotaru – a full-stack web developer with a creative edge'
        },
        {
          property: 'og:site:name',
          content: 'Dan Rotaru – a full-stack web developer with a creative edge'
        },
        {
          property: 'og:title',
          content: 'Dan Rotaru – a full-stack web developer with a creative edge',
        },
        {
          name: 'description',
          content: 'Hi👋, my name is Dan Rotaru, I\'m a full-stack web developer, software engineer, technology enthusiast with a creative edge.',
        },
        {
          property: 'og:description',
          content: 'Hi👋, my name is Dan Rotaru, I\'m a full-stack web developer, software engineer, technology enthusiast with a creative edge.',
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: 'https://dan13.me/',
        },
        {
          property: 'og:image',
          content: 'https://dan13.me/img/website.png'
        },
        {
          property: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'keywords',
          content: 'Dan Rotaru, DanRotaru, dan13, dan13.me, dan13 dev, dan 13, Dan Rotaru 13, DanRotaru 13, DanR, personal website, portfolio, creative developer, developer with a creative edge, creative edge, Software Engineer, Dan Rotaru portfolio, DanRotaru portfolio, Dan Rotaru website, DanRotaru website, DanRotaru programmer, Dan Rotaru programmer, DanRotaru web developer, Dan Rotaru web developer, Dan Rotaru dev, DanRotaru dev, frontend, backend, full-stack, web developer, full-stack web developer, technology enthusiast, Personal story, DanRotaru story, Dan Rotaru story, Javascript developer, JS developer, Dan Rotaru js, DanRotaru js, Dan Rotaru projects, Home, About, Projects, Toolbox, Blog,  development experience, Career journey, Projects and achievements, JavaScript developer, Programming languages, Tech innovations, Career path, Software engineering, Problem solving, Application development, Code quality, Responsive design, Front-end development, Back-end development, API integration, Web technologies, JavaScript frameworks, Front-end frameworks, Back-end frameworks, Database management, Agile methodology, Software testing, Skills and expertise, Coding skills, Development portfolio, User experience, UI/UX design, Web design, DevOps practices, Code optimization, Project management, Technical skills, Digital solutions, Creative solutions, Tech career, Professional growth, Developer tools, Personal growth, Web solutions, Web, Programming'
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
              "name": "Home",
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
          type: 'application/ld+json',
          innerHTML: `
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dan Rotaru",
            "jobTitle": "Full-Stack Web Developer, Engineer",
            "gender": "male",
            "email": "mailto:hello@dan13.me",
            "image": "https://dan13.me/img/avatar.jpg",
            "url": "https://dan13.me/",
            "sameAs" : [
              "https://t.me/danrotaru",
              "https://github.com/DanRotaru/",
              "https://www.linkedin.com/in/dan-rotaru/",
              "https://www.instagram.com/dan.rotaru13/"
            ]
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
    },
  },
  router: {
    options: {
      strict: true
    }
  },
  compatibilityDate: '2024-11-08',
  css: [
    "~/assets/styles/main.scss"
  ],
  devtools: { enabled: false },
  devServer: {
    port: 8105
  }
})
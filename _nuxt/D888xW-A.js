import{d as o,r as l,o as n,c as t,b as a,e as r,w as p,F as c,f as d,a as h,g as m}from"./DlaUf_BD.js";const _={class:"container home"},u=h('<div class="home-heading"><h1 class="home-heading__title text-animation" aria-label="Hi👋, I&#39;m DanRotaru, a fullstack web developer, with a creative edge."><span>Hi👋, </span><span>I&#39;m </span><span class="primary">DanRotaru, </span><span>a </span><span>fullstack </span><span>web </span><span>developer, </span><span>with </span><span>a </span><span>creative </span><span>edge.</span></h1></div>',1),k={class:"home-cta"},v=a("svg",{fill:"none",width:"10",height:"10",viewBox:"0 0 10 10"},[a("path",{d:"M0 5h7"}),a("path",{d:"M1 1l4 4-4 4"})],-1),g={class:"home-cta__socials"},b=["href","aria-label","data-splitbee-event-destination"],w=["xlink:href"],L=o({__name:"index",setup(f){const s=[{name:"telegram",link:"https://t.me/danrotaru"},{name:"github",link:"https://github.com/DanRotaru/"},{name:"linkedin",link:"https://www.linkedin.com/in/dan-rotaru/"},{name:"instagram",link:"https://www.instagram.com/dan.rotaru13/"},{name:"email",link:"mailto:hello@dan13.me"}];return(x,R)=>{const i=l("RouterLink");return n(),t("div",_,[u,a("div",k,[r(i,{to:"/about",class:"home-cta__btn"},{default:p(()=>[m(" More about me "),v]),_:1}),a("div",g,[(n(),t(c,null,d(s,e=>a("a",{href:e.link,target:"_blank","aria-label":"My"+e.name,"data-splitbee-event":"Open Social Link","data-splitbee-event-destination":e.name},[(n(),t("svg",null,[a("use",{"xlink:href":"#svg-"+e.name},null,8,w)]))],8,b)),64))])])])}}});export{L as default};

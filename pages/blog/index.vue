<template>
  <div class="page page-blog">
    <div class="container">
      <div class="text-center">
        <h5 class="h5">Blog</h5>
        <h1 class="h1">Thoughts, ideas, and inspirations.</h1>
      </div>

      <p class="text-center">
        Dive into the world of web development with me. Here, you'll find insights, tutorials, and tips on full-stack
        development, covering everything from front-end design to back-end programming. Whether you're a seasoned
        developer or just starting out, there's something here for everyone. Let's code together and build something
        amazing!
      </p>

      <p class="text-center my-20">Coming soon...</p>

<!--      <div class="blog-posts">-->
<!--        <div class="post" v-for="i in 3"></div>-->
<!--      </div>-->
    </div>
  </div>

</template>

<script setup>
useSeoMeta({
  title: 'Dan Rotaru – Blog',
  description: 'Hi👋, my name is Dan Rotaru, I\'m a full-stack web developer, engineer with a creative edge. Thoughts, ideas, and inspirations...',

})
</script>

<style lang="scss">
.blog-posts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  margin: 50px 0;
  opacity: .5;

  .post {
    width: calc(33.33% - 16px);
    height: 400px;
    border-radius: 15px;
    background-color: rgb(255 255 255 / 10%);

    @media (min-width: 992px) and (max-width: 1200px) {
      width: calc(50% - 12px);
    }

    @media (max-width: 992px) {
      width: 100%;
    }
  }
}
</style>
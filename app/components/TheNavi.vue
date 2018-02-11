<template lang="pug">
  nav.the-navi
    p.
      Pages
    ul
      li
        nuxt-link(to="/").
          Home
      li
        nuxt-link(to="/about").
          About
      li
        nuxt-link(to="/articles").
          Articles
        span.annotation.
          (Sign in required)
</template>

<script>
</script>

<style lang="sass" scoped>
.the-navi
  ul
    list-style-type: disc
    padding-left: 30px
  .annotation
    font-size: 11px
    margin-left: 5px
    font-weight: bold
</style>

<template lang="pug">
  section.page-articles
    h2
      TheNavi
    h3.
      Articles
    ul
      li(v-for="article in articles")
        nuxt-link(:to="'/articles/'+article.id").
          {{article.title}}
</template>

<script>
import {fetchAllArticles} from '~/api/ArticleApi'
import TheNavi from '~/components/TheNavi'

export default {
  async asyncData() {
    const articles = await fetchAllArticles()
    return {
      articles
    }
  },
  components: {
    TheNavi
  }
}
</script>

<style lang="sass">
.page-articles
  ul
    list-style-type: disc
    padding-left: 30px
</style>

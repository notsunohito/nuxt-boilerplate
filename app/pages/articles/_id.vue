<template lang="pug">
  section.page-article-id
    h2
      TheNavi
    h3.
      {{article.title}}
    div.content
      p.content-paragraph(v-for="contentLine of contentLines").
        {{contentLine}}
</template>

<script>
import {fetchArticleById} from '~/api/ArticleApi'
import TheNavi from '~/components/TheNavi'

export default {
  async validate({params}) {
    return /^\d+$/.test(params.id)
  },
  async asyncData({ params, error }) {
    const article = await fetchArticleById(params.id)
    return {
      article
    }
  },
  components: {
    TheNavi
  },
  computed: {
    contentLines() {
      return this.$data.article.content.split(/(\r?\n)+/)
    }
  }
}
</script>

<style lang="sass" scoped>
.page-article-id
  .content
    padding: 0 10px
    .content-paragraph
      margin-top: 10px
</style>

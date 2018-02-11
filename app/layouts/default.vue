<template lang="pug">
  div.default-desktop-layout(v-if="isDesktop")
    the-header
    div.main
      nuxt
  div.default-mobile-layout(v-else)
    the-header
    div.main
      nuxt
</template>

<script>
import {mapState} from 'vuex'
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed: mapState(['isDesktop'])
}
</script>

<style lang="sass" scoped>
.default-desktop-layout
  .main
    background-color: #fff
    margin: 0 auto
    min-height: 50vh
    width: 420px
.default-mobile-layout
  .main
    background-color: #fff
    margin: 0 auto
    min-height: 50vh
</style>

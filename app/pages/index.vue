<template lang="pug">
  section.page-home(v-if="isDesktop")
    h2
      TheNavi
    h3.
      Home
    p.greeting(v-if="authUser").
      Hi, {{authUser.email}}!
    p.greeting(v-else).
      You can sign in by the dev account.<br>
      email: dev@example.com<br>
      password: 1234<br>
  section(v-else)
    h2
      TheNavi
    h3.
      Mobile Home
</template>

<script>
import {mapState} from 'vuex'
import TheNavi from '~/components/TheNavi'

export default {
  components: {
    TheNavi
  },
  computed: mapState([
    'isDesktop',
    'authUser'
  ])
}
</script>

<style lang="sass">
.page-home
  .greeting
    padding-left: 10px
</style>

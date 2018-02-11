<template lang="pug">
  header.the-header
    nuxt-link(to="/")
      img.logo(src="~assets/images/logo.png" alt="logo")
    div(v-if="!!authUser")
      span.
        {{authUser.email}}
      button(@click="signout").
        signout
    form(v-else @submit.prevent="signin")
      input(type="text" v-model="email" placeholder="email")
      input(type="password" v-model="password" placeholder="password")
      button(type="submit").
        signin
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: mapState(['authUser']),
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signout() {
      await this.$store.dispatch('signout')
      this.$router.replace('/')
    },
    async signin() {
      const {email, password} = this.$data
      await this.$store.dispatch('signin', {email, password})
      this.$data.email = ''
      this.$data.password = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.the-header
  height: 30px
  padding: 5px 10px
  background-color: white
  display: flex
  justify-content: space-between
  align-items: center
  border-bottom: 1px solid #000
  .logo
    height: 20px
</style>

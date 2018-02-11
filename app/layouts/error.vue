<template lang="pug">
  section.page-error
    h2
      TheNavi
    h3(v-if="error.statusCode === 401").
      401 Unauthorized
    h3(v-else="error.statusCode === 404").
      404 not found
    h3(v-else).
      Something went wrong
</template>

<script>
import TheNavi from '~/components/TheNavi'

export default {
  components: {
    TheNavi
  },
  props: ['error']
}
</script>

<style lang="sass" scoped>
</style>

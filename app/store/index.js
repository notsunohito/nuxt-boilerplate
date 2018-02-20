import isMobile from 'is-mobile'


export const state = () => ({
  authUser: null,
  isDesktop: null,
})

export const mutations = {
  SET_AUTH_USER(state, user) {
    state.authUser = user
  },
  SET_IS_DESKTOP(state, isDesktop) {
    state.isDesktop = isDesktop
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app, req }) {

    if (/userId=([^;]+);?/.test(req.headers.cookie)) {
      const [_, userId] = /userId=([^;]+);?/.exec(req.headers.cookie)
      const user = await app.$axios.fetchUserById(userId)
      commit('SET_AUTH_USER', user)
    }

    const isDesktop = !isMobile(req.headers['user-agent'])
    commit('SET_IS_DESKTOP', isDesktop)
  },
  async signin({ commit }, { email, password }) {
    try {
      const user = await this.$axios.createSession({email, password})
      commit('SET_AUTH_USER', user)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async signout({ commit }) {
    await this.$axios.destroySession()
    commit('SET_AUTH_USER', null)
  }
}
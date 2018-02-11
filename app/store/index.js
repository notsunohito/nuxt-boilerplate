import isMobile from 'is-mobile'
import apiClient, {bridgeCookieForServerSidePrefetch} from '~/api/apiClient'
import {createSession, destroySession} from '~/api/SessionApi'
import {fetchUserById} from '~/api/UserApi'


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
  async nuxtServerInit({ commit }, { req }) {
    // TODO: プロセスが状態を持ってしまってるのでstoreのstateに移す
    bridgeCookieForServerSidePrefetch(req.headers.cookie)

    if (/userId=([^;]+);?/.test(req.headers.cookie)) {
      const [_, userId] = /userId=([^;]+);?/.exec(req.headers.cookie)
      const user = await fetchUserById(userId)
      commit('SET_AUTH_USER', user)
    }

    const isDesktop = !isMobile(req.headers['user-agent'])
    commit('SET_IS_DESKTOP', isDesktop)
  },
  async signin({ commit }, { email, password }) {
    try {
      const user = await createSession({email, password})
      commit('SET_AUTH_USER', user)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async signout({ commit }) {
    await destroySession()
    commit('SET_AUTH_USER', null)
  }
}
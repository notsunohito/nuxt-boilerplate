import Cookies from 'js-cookie';


export default function ({ $axios, redirect }) {

  if (process.client) {
    const sessionId = Cookies.get('session')
    if(sessionId) {
      $axios.setToken(sessionId, 'Bearer')
    } else {
      $axios.setToken(false)
    }
  }

  $axios.fetchAllArticles = async () => {
    return await $axios.get('/articles').then(({data})=>data)
  }
  
  $axios.fetchArticleById = async (id) => {
    return await $axios.get(`/articles/${id}`).then(({data})=>data)
  }

  $axios.createSession = async ({email, password}) => {
    const {sessionId} = await $axios.post('/sessions/signin', {email, password}).then(({data})=> data)
    $axios.setToken(sessionId, 'Bearer')
    Cookies.set('session', sessionId)
    return await $axios.fetchMyUser()
  }
  
  $axios.destroySession = async () => {
    await $axios.post('/sessions/signout')
    $axios.setToken(false)
    Cookies.remove('session')
  }

  $axios.fetchMyUser = async () => {
    return await $axios.get(`/my/user`).then(({data})=> data)
  }
  
  $axios.fetchUserById = async (userId) => {
    return await $axios.get(`/users/${userId}`).then(({data})=> data)
  }
  
}

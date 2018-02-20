export default function ({ $axios, redirect }) {

  $axios.fetchAllArticles = async () => {
    return await $axios.get('/articles').then(({data})=>data)
  }
  
  $axios.fetchArticleById = async (id) => {
    return await $axios.get(`/articles/${id}`).then(({data})=>data)
  }

  $axios.createSession = async ({email, password}) => {
    const res = await $axios.post('/sessions/signin', {email, password})
    const [_, userId] = /userId=([^;])+;?/.exec(document.cookie)
    return await $axio.fetchUserById(userId)
  }
  
  $axios.destroySession = async () => {
    return await $axios.post('/sessions/signout')
  }
  
  $axios.fetchUserById = async (userId) => {
    return await $axios.get(`/users/${userId}`).then(({data})=> data)
  }
  
}

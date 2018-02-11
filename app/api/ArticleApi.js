import apiClient from '~/api/apiClient'


export const fetchAllArticles = async () => {
  return await apiClient.get('/articles').then(({data})=>data)
}

export const fetchArticleById = async (id) => {
  return await apiClient.get(`/articles/${id}`).then(({data})=>data)
}

import apiClient from '~/api/apiClient'


export const fetchMyUser = async ()=> {
  return await apiClient.get(`/my/users/`).then(({data})=> data)
}

export const fetchUserById = async (userId) => {
  return await apiClient.get(`/users/${userId}`).then(({data})=> data)
}

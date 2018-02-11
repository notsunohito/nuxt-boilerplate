import apiClient from '~/api/apiClient'
import {fetchUserById} from '~/api/UserApi'


export const createSession = async ({email, password}) => {
  const res = await apiClient.post('/sessions/signin', {email, password})
  const [_, userId] = /userId=([^;])+;?/.exec(document.cookie)
  return await fetchUserById(userId)
}

export const destroySession = async () => {
  return await apiClient.post('/sessions/signout')
}

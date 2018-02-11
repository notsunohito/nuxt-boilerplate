import axios from 'axios'

const { NODE_ENV } = process.env
const PORT = NODE_ENV === 'test' ? 1338 : 1337

const apiClient = axios.create({
  baseURL: `http://localhost:${PORT}/`,
  headers: {'Content-Type': 'application/json'},
  withCredentials: true
})

export default apiClient

export const bridgeCookieForServerSidePrefetch = (cookie)=> {
  apiClient.defaults.headers.common.Cookie = cookie
}

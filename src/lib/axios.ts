import axios from 'axios'
import { getStoredAccessToken, setStoredAccessToken } from './authToken'
import { refreshAccessToken } from '@/api/auth'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_PRODUCTION_API_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// attach token on refresh
api.interceptors.request.use((config) => {
  const token = getStoredAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// refresh token after expired
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true

      try {
        const { accessToken: newToken } = await refreshAccessToken()
        setStoredAccessToken(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (err) {
        console.error('refresh token failed', err)
      }
    }

    return Promise.reject(err)
  }
)

export default api

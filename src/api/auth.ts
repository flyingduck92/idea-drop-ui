import api from '@/lib/axios'
import type { LoginUserType, RegisterUserType } from '@/types'

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserType) => {
  try {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
    })
    return res.data
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to register'
    throw new Error(message)
  }
}

export const loginUser = async (credentials: LoginUserType) => {
  try {
    const res = await api.post('/auth/login', credentials)
    return res.data
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to login'
    throw new Error(message)
  }
}

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout')
  } catch (err: any) {
    const message = err.response?.data?.message || 'Failed to logout'
    throw new Error(message)
  }
}

export const refreshAccessToken = async () => {
  try {
    const res = await api.post('/auth/refresh')
    return res.data
  } catch (err: any) {
    const message =
      err.response?.data?.message || 'Failed to refresh Access Token'
    throw new Error(message)
  }
}

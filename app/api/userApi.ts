import type { User } from '../types/User'
import { BASE_URL } from '@/lib/constants'

const buildPostConfig = (body: User): RequestInit => ({
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.statusText}`)
  }

  return response
}

export const login = async ({ name, email }: User) => {
  const route = '/auth/login'

  const response = await fetch(BASE_URL + route, buildPostConfig({ name, email }))
  
  return handleResponse(response)
}

export const logout = async ({ name, email }: User) => {
  const route = '/auth/logout'

  const response = await fetch(BASE_URL + route, buildPostConfig({ name, email }))

  return handleResponse(response)
}

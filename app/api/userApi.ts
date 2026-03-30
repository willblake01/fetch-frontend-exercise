import type { User } from '../types/User'
import { BASE_URL } from "@/lib/constants"

export const login = async ({ name, email }: User) => {
  const route = '/auth/login'

  const response = await fetch(BASE_URL + route, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email
    })
  })
  
  if (response.ok) {
    return response
  } else {
    throw new Error(`Request failed: ${response.statusText}`)
  }
}

export const logout = async ({ name, email }: User) => {
  const route = '/auth/logout'

  const response = await fetch(BASE_URL + route, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email
    })
  })

  if (response.ok) {
    return response
  } else {
    throw new Error(`Request failed: ${response.statusText}`)
  }
}

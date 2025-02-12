const baseUrl = 'https://frontend-take-home-service.fetch.com'

interface User {
  name: string
  email: string
}

export const login = async ({ name, email }: User) => {
  const route = '/auth/login'

  const response = await fetch(baseUrl + route, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  
  if (response.status === 200) {
    return response
  } else {
    throw new Error('Failed to login')
  }
}

export const logout = async ({ name, email }: User) => {
  const route = '/auth/logout'
  
  const response = await fetch(baseUrl + route, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  
  if (response.status === 200) {
    return response
  } else {
    throw new Error('Failed to login')
  }
}

const baseUrl = 'https://frontend-take-home-service.fetch.com'

export const fetchBreeds = async () => {
  const route = '/dogs/breeds'

  const response = await fetch(baseUrl + route, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status === 200) {
    const json = await response.json()
    return json
  } else {
    throw new Error('Failed to fetch breeds')
  }
}

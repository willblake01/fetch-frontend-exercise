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

  if (response.ok) {
    const json = await response.json()
    return json
  } else if (response.status === 401) {
    throw new Error('Unauthorized')
  } else {
    throw new Error('Failed to fetch breeds')
  }
}

interface fetchDogIDsParams {
  params: {
    ageMax?: string | null
    ageMin?: string | null
    breeds?: string[] | null
    from?: string | null
    size?: string | null
    sortDirection?: string | null
    sortField?: string | null
    zipCodes?: string[] | null
  }
}

export const fetchDogIDs = async ({ params }: fetchDogIDsParams) => {
  const {  ageMax, ageMin, breeds, from, size, sortDirection, sortField, zipCodes } = params
  
  const ageMaxQuery = ageMax ? `ageMax=${ageMax}` : null
  const ageMinQuery = ageMin ? `ageMin=${ageMin}` : null
  const breedsQuery = breeds?.length ? breeds.map(breed => `breeds[]=${breed}`).join('&') : null
  const fromQuery = from ? `from=${from}` : null
  const sizeQuery = size ? `size=${size}` : null
  const sortQuery = sortField && sortDirection ? `sort=${sortField}:${sortDirection}` : null
  const zipCodesQuery = zipCodes?.length ? zipCodes.map(zipCode => `zipCodes[]=${zipCode}`).join('&') : null

  const queryParams = params ? ('?' + [ageMaxQuery, ageMinQuery, breedsQuery, fromQuery, sizeQuery, sortQuery, zipCodesQuery].filter(Boolean).join('&')) : null

  const route = `/dogs/search${queryParams}`

  const response = await fetch(baseUrl + route, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if (response.ok) {
    const json = await response.json()
    return json
  } else {
    throw new Error('Failed to fetch Dog IDs')
  }
}

interface DogIDs {
  resultIds: string[]
}

export const fetchDogs = async ({ resultIds }: DogIDs) => {
  const route = '/dogs'

  const response = await fetch(baseUrl + route, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resultIds)
  })

  if (response.ok) {
    const json = await response.json()

    return json
  } else {
    throw new Error('Failed to fetch dogs')
  }
}

interface SavedDogs {
  savedDogs: string[] | null
}

export const matchDog = async ({ savedDogs }: SavedDogs) => {
  const route = '/dogs/match'

  const response = await fetch(baseUrl + route, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(savedDogs)
  })

  if (response.ok) {
    const json = await response.json()
    
    return json
  } else {
    throw new Error('Failed to match dogs')
  }
}

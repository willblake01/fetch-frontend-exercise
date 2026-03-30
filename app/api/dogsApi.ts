import { BASE_URL } from "@/lib/constants"

const fetchConfig: RequestInit = {
  method: 'GET',
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
}

const buildPostConfig = (body: unknown): RequestInit => ({
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

const handleResponse = async (response: Response) => {
  if (response.ok) {
    return response.json()
  }

  if (response.status === 401) {
    throw new Error('Unauthorized')
  }
  throw new Error(`Request failed: ${response.statusText}`)
}

export const fetchBreeds = async () => {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    ...fetchConfig
  })

  return handleResponse(response)
}

interface FetchDogIDsParams {
  params: {
    ageMax?: string | null
    ageMin?: string | null
    breeds?: string[]
    from?: string | null
    size?: string | null
    sortDirection?: string | null
    sortField?: string | null
    zipCodes?: string[] | null
  }
}

export const fetchDogIDs = async ({ params }: FetchDogIDsParams) => {
  const {  ageMax, ageMin, breeds, from, size, sortDirection, sortField, zipCodes } = params

  const queryParams = new URLSearchParams()
  
  if (ageMax) queryParams.append('ageMax', ageMax)
  if (ageMin) queryParams.append('ageMin', ageMin)
  if (breeds?.length) breeds.forEach(breed => queryParams.append('breeds', breed))
  if (from) queryParams.append('from', from)
  if (size) queryParams.append('size', size)
  if (sortField && sortDirection) queryParams.append('sort', `${sortField}:${sortDirection}`)
  if (zipCodes?.length) zipCodes.forEach(zip => queryParams.append('zipCodes', zip))

  const queryString = queryParams.toString()

  const route = `/dogs/search${queryString ? `?${queryString}` : ''}`

  const response = await fetch(BASE_URL + route, {
    ...fetchConfig
  })

  return handleResponse(response)
}

interface FetchDogsParams {
  resultIds: string[]
}

export const fetchDogs = async ({ resultIds }: FetchDogsParams) => {
  const route = '/dogs'

  const response = await fetch(BASE_URL + route, buildPostConfig(resultIds))

  return handleResponse(response)
}

interface SavedDogs {
  savedDogs: string[] | null
}

export const matchDog = async ({ savedDogs }: SavedDogs) => {
  const route = '/dogs/match'

  if (!savedDogs?.length) throw new Error('No saved dogs to match')

  const response = await fetch(BASE_URL + route, buildPostConfig(savedDogs))

  return handleResponse(response)
}

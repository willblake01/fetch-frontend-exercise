'use client'
import { createContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from './utils/useLocalStorage'
import type { User } from './types/User'

export interface ContextType {
  ageMax: string | null
  setAgeMax: Dispatch<SetStateAction<string | null>>
  ageMin: string | null
  setAgeMin: Dispatch<SetStateAction<string | null>>
  breeds: string[]
  setBreeds: Dispatch<SetStateAction<string[]>>
  savedDogs: string[]
  setSavedDogs: Dispatch<SetStateAction<string[]>>
  size: string
  setSize: Dispatch<SetStateAction<string>>
  sortDirection: string
  setSortDirection: Dispatch<SetStateAction<string>>
  sortField: string
  setSortField: Dispatch<SetStateAction<string>>
  zipCodes: string[]
  setZipCodes: Dispatch<SetStateAction<string[]>>
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

export const Context = createContext<ContextType | null>(null)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage('user', null)

  // Filters query params
  const [ageMax, setAgeMax] = useLocalStorage('ageMax', null)
  const [ageMin, setAgeMin] = useLocalStorage('ageMin', null)
  const [breeds, setBreeds] = useLocalStorage('breeds', [])
  const [savedDogs, setSavedDogs] = useLocalStorage('savedDogs', [])
  const [size, setSize] = useLocalStorage('size', '25')
  const [sortDirection, setSortDirection] = useLocalStorage('sortDirection', 'asc')
  const [sortField, setSortField] = useLocalStorage('sortField', 'breed')
  const [zipCodes, setZipCodes] = useLocalStorage('zipCodes', [])

  const context = {
    ageMax,
    setAgeMax,
    ageMin,
    setAgeMin,
    breeds,
    savedDogs,
    setSavedDogs,
    setBreeds,
    size,
    setSize,
    sortDirection,
    setSortDirection,
    sortField,
    setSortField,
    zipCodes,
    setZipCodes,
    user,
    setUser
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

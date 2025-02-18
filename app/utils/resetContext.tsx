import { Dispatch, SetStateAction, useCallback, useContext } from 'react'
import { Context } from '../context';
import type { User } from '../types/User';

interface PageContext {
  setAgeMax: Dispatch<SetStateAction<string | null>>
  setAgeMin: Dispatch<SetStateAction<string | null>>
  setBreeds: Dispatch<SetStateAction<string[] | null>>
  setSavedDogs: Dispatch<SetStateAction<string[] | null>>
  setSize: Dispatch<SetStateAction<number | null>>
  setSortDirection: Dispatch<SetStateAction<string | null>>
  setSortField: Dispatch<SetStateAction<string | null>>
  setZipCodes: Dispatch<SetStateAction<string[] | null>>
  setUser: Dispatch<SetStateAction<User | null>>
}

const ResetContext = () => {
  const { setAgeMax, setAgeMin, setBreeds, setSavedDogs, setSize, setSortDirection, setSortField, setUser, setZipCodes} =  useContext(Context
  ) as unknown as PageContext

const resetAllContext = useCallback(() => {
  setAgeMax(null)
  setAgeMin(null)
  setBreeds(null)
  setSavedDogs(null)
  setSize(null)
  setSortDirection(null)
  setSortField(null)
  setUser(null)
  setZipCodes(null)
}, [setAgeMax, setAgeMin, setBreeds, setSize, setSortDirection, setSortField, setUser, setZipCodes])

const resetDogContext = useCallback(() => {
  setAgeMax(null)
  setAgeMin(null)
  setBreeds([])
  setSavedDogs([])
  setSize(25)
  setSortDirection('asc')
  setSortField('breed')
  setZipCodes(null)
}, [setAgeMax, setAgeMin, setBreeds, setSize, setSortDirection, setSortField, setZipCodes])
}

export default ResetContext
export { resetAllContext, resetDogContext }

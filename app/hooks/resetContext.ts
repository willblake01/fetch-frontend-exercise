import { useCallback, useContext } from 'react'
import { Context, ContextType } from '../context'

export const useResetContext = () => {
  const {
  setAgeMax,
  setAgeMin,
  setBreeds,
  setSavedDogs,
  setSize,
  setSortDirection,
  setSortField,
  setUser,
  setZipCodes
} = useContext(Context) as ContextType

const resetAllContext = useCallback(() => {
  setAgeMax(null)
  setAgeMin(null)
  setBreeds([])
  setSavedDogs(null)
  setSize('25')
  setSortDirection('asc')
  setSortField('breed')
  setUser(null)
  setZipCodes(null)
}, [setAgeMax, setAgeMin, setBreeds, setSavedDogs, setSize, setSortDirection, setSortField, setUser, setZipCodes])
  
const resetDogContext = useCallback(() => {
  setAgeMax(null)
  setAgeMin(null)
  setBreeds([])
  setSavedDogs(null)
  setSize('25')
  setSortDirection('asc')
  setSortField('breed')
  setZipCodes(null)
}, [setAgeMax, setAgeMin, setBreeds, setSavedDogs, setSize, setSortDirection, setSortField, setZipCodes])

  return { resetAllContext, resetDogContext }
}

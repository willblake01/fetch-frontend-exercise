'use client'
import { Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Context } from '../../context';
import { fetchDogs } from '@/app/api/dogsApi'
import { MatchCard } from './components'
import { LoadingSpinner } from '@/app/components/utils'
import type { DogMatch } from '@/app/types/Dog'
import type { User } from '@/app/types/User'

interface PageContext {
  setAgeMax: Dispatch<SetStateAction<string | null>>
  setAgeMin: Dispatch<SetStateAction<string | null>>
  setBreeds: Dispatch<SetStateAction<string[] | null>>
  setSavedDogs: Dispatch<SetStateAction<string[] | null>>
  setSize: Dispatch<SetStateAction<number | null>>
  setSortDirection: Dispatch<SetStateAction<string | null>>
  setSortField: Dispatch<SetStateAction<string | null>>
  setUser: Dispatch<SetStateAction<User | null>>
  setZipCodes: Dispatch<SetStateAction<string[] | null>>
}

const Page: FC = () => {
  const params = useParams()
  const router = useRouter()

  const { setAgeMax, setAgeMin, setBreeds, setSavedDogs, setSize, setSortDirection, setUser, setSortField, setZipCodes} =  useContext(Context
    ) as unknown as PageContext

  const { id } = params

  const [dog, setDog] = useState<DogMatch | null>(null)
  const [isLoading, setIsLoading] = useState(false)
    
    const resetAllContext = useCallback(() => {
      setAgeMax(null)
      setAgeMin(null)
      setBreeds([])
      setSavedDogs([])
      setSize(25)
      setSortDirection('asc')
      setSortField('breed')
      setUser(null)
      setZipCodes(null)
    }, [setAgeMax, setAgeMin, setBreeds, setSize, setSortDirection, setSortField, setUser, setZipCodes])

  useEffect(() => {
    if (id) {
      fetchDogs({ resultIds: Array.isArray(id) ? id : [id] }).then(response => {
        if (response) {
          setDog(response[0])
        }
      }).catch(error => {
      const { message } = error
      if (message === 'Unauthorized') {
        resetAllContext()
        router.push('/')
      }
    }).finally(() => setIsLoading(false));
    }
  }, [id])

  return (
    <div className='flex items-center justify-center h-full'>
      <LoadingSpinner
          ariaLabel='dna-loading'
          ballColors={['var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)']}
          backgroundColor='var(--loadingSpinnerBackgroundColor)'
          height='180'
          visible={isLoading}
          width='180'
          wrapperStyle={{ position: 'fixed', top: '50vh', left: '50vw', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
        />
      {dog && <MatchCard match={dog} />}
    </div>
  )
}

export default Page

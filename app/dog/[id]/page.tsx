'use client'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Context, ContextType } from '../../context'
import { fetchDogs } from '@/app/api/dogsApi'
import { DogCard } from './components'
import { LoadingSpinner } from '@/app/components/utils'
import type { DogMatch } from '@/app/types/Dog'

const Page: FC = () => {
  const params = useParams()
  const router = useRouter()

  const { setAgeMax, setAgeMin, setBreeds, setSavedDogs, setSize, setSortDirection, setUser, setSortField, setZipCodes} =  useContext(Context
    ) as unknown as ContextType

  const { id } = params

  const [dog, setDog] = useState<DogMatch | null>(null)
  const [isLoading, setIsLoading] = useState(false)
    
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

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      fetchDogs({ resultIds: Array.isArray(id) ? id : [id] }).then(response => {
        if (response) {
          setDog(response[0])
        }
      })
      .catch(error => {
        const { message } = error
        
        if (message === 'Unauthorized') {
          resetAllContext()
          router.push('/')
        }
      }).finally(() => setIsLoading(false))
    }
  }, [id, resetAllContext, router])

  return (
    <div className='absolute flex justify-center top-60 w-[100vw]'>
      {
        isLoading
          ?
        <LoadingSpinner
          ariaLabel='dna-loading'
          ballColors={['var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)']}
          backgroundColor='var(--loadingSpinnerBackgroundColor)'
          height='180'
          visible={isLoading}
          width='180'
          wrapperStyle={{ position: 'fixed', top: '50vh', left: '50vw', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
        />
        :
        dog && <div className='mb-6'><DogCard dog={dog} /></div>
      }
    </div>
  )
}

export default Page

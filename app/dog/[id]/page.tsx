'use client'
import { JSX, useEffect, useState} from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useResetContext } from '@/app/hooks'
import { fetchDogs } from '@/app/api/dogsApi'
import { DogCard } from './components'
import { LoadingSpinner } from '@/app/components/utils'
import { handleApiError } from '../../utils'
import type { DogMatch } from '@/app/types/Dog'

const Page: () => JSX.Element = () => {
  const params = useParams()
  const router = useRouter()
  const { resetAllContext } = useResetContext()

  const { id } = params

  const [dog, setDog] = useState<DogMatch | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (id) {
      setIsLoading(true)
      
      const resultIds = Array.isArray(id) ? id : [id as string]

      fetchDogs({ resultIds }).then(response => {
        if (response) {
          setDog(response[0])
        }
      })
      .catch(error => {
        handleApiError(error, router, resetAllContext)
      }).finally(() => setIsLoading(false))
    }
  }, [id, resetAllContext, router])

  return (
    <div className='absolute flex justify-center top-60 w-[100vw]'>
      {
        isLoading
          ?
        <LoadingSpinner
          height='180'
          width='180'
          ariaLabel='dna-loading'
          wrapperStyle={{
            position: 'fixed',
            top: '50vh',
            left: '50vw',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999'
          }}
          ballColors={['var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)']}
          backgroundColor='var(--loadingSpinnerBackgroundColor)'
          visible={isLoading}
        />
        :
        dog && <div className='mb-6'><DogCard dog={dog} /></div>
      }
    </div>
  )
}

export default Page

'use client'
import { JSX } from 'react'
import { useParams } from 'next/navigation'
import { fetchDogs } from '@/app/api/dogsApi'
import { useData } from '@/app/hooks'
import { DogCard } from './components'
import { LoadingSpinner } from '@/app/components/utils'

const Page: () => JSX.Element = () => {
  const params = useParams()

  const { id } = params

  const resultIds = Array.isArray(id) ? id : [id as string]

  const { data: dogs, isLoading } = useData(
      () => fetchDogs({ resultIds }),
      [id]
  )

  const dog = dogs?.[0] ?? null

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

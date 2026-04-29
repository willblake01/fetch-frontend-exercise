'use client'
import { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Button } from '@mui/material'
import { Context, ContextType } from '../../context'
import { useResetContext, useData } from '@/app/hooks'
import { fetchDogIDs, fetchDogs, matchDog } from '../../api/dogsApi'
import { LoadingSpinner, PaginationRounded } from '../../components/utils'
import { DogCards, Filters } from './components'
import { Alert } from '../../components/utils'
import { handleApiError } from '../../utils'

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
})

const Dogs: FC = () => {
  const router = useRouter()
  const { resetAllContext, resetDogContext } = useResetContext()

  const { ageMax, ageMin, breeds, savedDogs, size, sortDirection, sortField, user, zipCodes} =  useContext(Context
  ) as ContextType

  const [isLoading, setIsLoading] = useState(false)
  const [isContextReady, setIsContextReady] = useState(false)
  const [page, setPage] = useState(1)

  const from = ((page - 1) * (Number(size) || 25)).toString()

  const params = {
    ageMax: ageMax || null,
    ageMin: ageMin || null,
    breeds: breeds,
    from: from,
    size: size,
    sortDirection: sortDirection,
    sortField: sortField,
    zipCodes: zipCodes,
  }

  // Use useData hook to fetch dog IDs when search params change
  const { data: dogIDs, isLoading: isLoadingDogIDs } = useData(
    () => fetchDogIDs({ params }),
    [ageMax, ageMin, breeds, from, size, sortDirection, sortField, zipCodes, user],
    { skip: !user }
  )

  const totalPages = Math.ceil((dogIDs?.total || 0) / (Number(size) || 25))

  // Use useData hook to fetch dogs when resultIds change
  const { data: dogs, isLoading: isLoadingDogs } = useData(
    () => fetchDogs({ resultIds: dogIDs?.resultIds || [] }),
    [dogIDs?.resultIds],
    { skip: !dogIDs?.resultIds?.length }
  )

  const handleMatchDog = async () => {
    setIsLoading(true)

    try {
      const response = await matchDog({ savedDogs })

      if (response) {
        resetDogContext()
        await Alert({ title: 'Match Found!' })
        router.push(`/dog/${response.match}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        handleApiError(error, router, resetAllContext)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    event.preventDefault()
    setPage(value)
  }

  useEffect(() => {
    // Wait for initial mount to allow localStorage to hydrate
    setIsContextReady(true)
  }, [])

  useEffect(() => {
    // Only redirect after context is ready
    if (isContextReady && !user) {
      router.push('/login')
    }
  }, [user, router, isContextReady])


  return (
    <ThemeProvider theme={theme}>
      <div className='pb-16'>
        <div className='flex justify-center size-full gap-4 p-6'>
          <Filters />
        </div>
        <div className='flex justify-center items-center mb-4'>
          <Button sx={{ background: '#7C1E6F', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.313rem' }} className='submit-button' onClick={handleMatchDog} size='medium' type='button' variant='contained'>Match</Button>
        </div>
        <div className='flex-col justify-center'>
          <div className='flex justify-center mb-2'>
            <PaginationRounded count={totalPages} onChange={(e: ChangeEvent<unknown>, value: number) => handlePageChange(e, value)} page={page} />
          </div>
          {
            (isLoading || isLoadingDogIDs || isLoadingDogs) ?
            <LoadingSpinner
              ariaLabel='dna-loading'
              ballColors={['var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)']}
              backgroundColor='var(--loadingSpinnerBackgroundColor)'
              height='180'
              visible={isLoading || isLoadingDogIDs || isLoadingDogs}
              width='180'
              wrapperStyle={{ position: 'fixed', top: '50vh', left: '50vw', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
            /> :
            <>
              <div className='flex flex-wrap gap-6 justify-start mb-6 p-4'>
                <DogCards dogs={dogs || []} />
              </div>
              <div className='flex justify-center'>
                <PaginationRounded count={totalPages} onChange={(e: ChangeEvent<unknown>, value: number) => handlePageChange(e, value)} page={page} />
              </div>
            </>
          }
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Dogs

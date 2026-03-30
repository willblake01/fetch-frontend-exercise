'use client'
import { ChangeEvent, FC, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Button } from '@mui/material'
import { Context, ContextType } from '../../context'
import { useResetContext } from '@/app/hooks'
import { fetchDogIDs, fetchDogs, matchDog } from '../../api/dogsApi'
import { LoadingSpinner, PaginationRounded } from '../../components/utils'
import { DogCards, Filters } from './components'
import { Alert } from '../../components/utils'
import { handleApiError } from '../../utils'
import type { Dog } from '../../types/Dog'

interface DogIDs {
  next: string
  prev: string
  resultIds: string[] | null
  total: number
}

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
  const [dogs, setDogs] = useState<Dog[]>([])
  const [dogIDs, setDogIDs] = useState<DogIDs>({ next: '', prev: '', resultIds: null, total: 0 })
  const [page, setPage] = useState(1)

  const from = ((page - 1) * (Number(size) || 25)).toString()

  const totalPages = Math.ceil(dogIDs.total / (Number(size) || 25))

  const handleFetchDogs = useCallback(async (resultIds: string[]) => {
    setIsLoading(true)

    await fetchDogs({ resultIds })
        .then(res => {
          if (res) {
            setDogs(res as Dog[])
          }
        })
        .catch(error => {
          if (error instanceof Error) {
            handleApiError(error, router, resetAllContext)
          }
        })
        .finally(() => setIsLoading(false))
  }, [resetAllContext, router])

  const handleFetchDogIDs = useCallback(async () => {
    setIsLoading(true)

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

    try {
      const response = await fetchDogIDs({ params })

      if (response) {
        setDogIDs(response)
        await handleFetchDogs(response.resultIds)
      }
    } catch (error) {
      if (error instanceof Error) {
        handleApiError(error, router, resetAllContext)
      }
    } finally {
      setIsLoading(false)
    }
  }, [ageMax, ageMin, breeds, from, handleFetchDogs, resetAllContext, router, size, sortDirection, sortField, zipCodes])

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

    setIsLoading(true)
    setPage(value)
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  useEffect(() => {

    // Don't fetch dog IDs until context is available on window
    if (user) {
      const fetchData = async () => {
        await handleFetchDogIDs()
      }

      void fetchData()
    }
  }, [user, handleFetchDogIDs])

  return (
    <ThemeProvider theme={theme}>
      <div className='mb-20'>
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
            isLoading ?
            <LoadingSpinner
              ariaLabel='dna-loading'
              ballColors={['var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)']}
              backgroundColor='var(--loadingSpinnerBackgroundColor)'
              height='180'
              visible={isLoading}
              width='180'
              wrapperStyle={{ position: 'fixed', top: '50vh', left: '50vw', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
            /> :
            <>
              <div className='flex flex-wrap gap-6 justify-center mb-6 p-4'>
                <DogCards dogs={dogs} />
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

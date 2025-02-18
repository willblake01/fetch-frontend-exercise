'use client'
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Context } from '../../context';
import { fetchDogIDs, fetchDogs, matchDog } from '@/app/api/dogsApi';
import { LoadingSpinner, PaginationRounded } from '@/app/components/utils';
import { DogCards, Filters } from './components';
import type { Dog } from '../../types/Dog';
import type { User } from '../../types/User';

interface PageContext {
  ageMax: string | null
  setAgeMax: Dispatch<SetStateAction<string | null>>
  ageMin: string | null
  setAgeMin: Dispatch<SetStateAction<string | null>>
  breeds: string[] | null
  setBreeds: Dispatch<SetStateAction<string[] | null>>
  savedDogs: string[] | null
  setSavedDogs: Dispatch<SetStateAction<string[] | null>>
  size: string | null
  setSize: Dispatch<SetStateAction<string | null>>
  sortDirection: string | null
  setSortDirection: Dispatch<SetStateAction<string | null>>
  sortField: string | null
  setSortField: Dispatch<SetStateAction<string | null>>
  zipCodes: string[] | null
  setZipCodes: Dispatch<SetStateAction<string[] | null>>
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

interface DogIDs {
  next: string
  prev: string
  resultIds: string[]
  total: number
}

const Dogs: FC = () => {
  const router = useRouter()

  const { ageMax, setAgeMax, ageMin, setAgeMin, breeds, setBreeds, savedDogs, setSavedDogs, size, setSize, sortDirection, setSortDirection, sortField, setSortField, user, setUser, zipCodes, setZipCodes} =  useContext(Context
  ) as unknown as PageContext

  const [isLoading, setIsLoading] = useState(false)
  const [dogs, setDogs] = useState<Dog[]>([])
  const [dogIDs, setDogIDs] = useState<DogIDs>({ next: '', prev: '', resultIds: [], total: 0 })
  const { resultIds, total } = dogIDs
  const [page, setPage] = useState(1)
  const [from, setFrom] = useState('0')

  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  const totalPages = Math.ceil(total / (size ? Number(size) : 25))

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
  }, [setAgeMax, setAgeMin, setBreeds, setSavedDogs, setSize, setSortDirection, setSortField, setUser, setZipCodes])
  
  const resetDogContext = useCallback(() => {
    setAgeMax(null)
    setAgeMin(null)
    setBreeds([])
    setSavedDogs([])
    setSize('25')
    setSortDirection('asc')
    setSortField('breed')
    setZipCodes(null)
  }, [setAgeMax, setAgeMin, setBreeds, setSavedDogs, setSize, setSortDirection, setSortField, setZipCodes])

  const handleFetchDogIDs = useCallback(async () => {
    setIsLoading(true)

    const params = {
      ageMax: ageMax || null,
      ageMin: ageMin || null,
      breeds: breeds || null,
      from: from || null,
      size: size || null,
      sortDirection: sortDirection || null,
      sortField: sortField || null,
      zipCodes: zipCodes || null,
    };

    await fetchDogIDs({ params }).then(res => {
      if (res) {
        setDogIDs(res as DogIDs)
      }
    }).catch(error => {
      const { message } = error
      if (message === 'Unauthorized') {
        resetAllContext()
        router.push('/')
      }
    }).finally(() => setIsLoading(false))
  }, [ageMax, ageMin, breeds, from, resetAllContext, router, size, setDogIDs, sortDirection, sortField, zipCodes])

  const handleFetchDogs = useCallback(async () => {
    setIsLoading(true);

    await fetchDogs({ resultIds }).then(res => {
      if (res) {
        setDogs(res as Dog[])
      }
    }).catch(error => {
      const { message } = error
      if (message === 'Unauthorized') {
        resetAllContext()
        router.push('/')
      }
    }).finally(() => setIsLoading(false));
  }, [resetAllContext, router, resultIds, setDogs])

  const handleMatchDog = () => {
    matchDog({ savedDogs }).then(res => {
      if (res) {
        resetDogContext()

        const match = res.match
        
        router.push(`/dog/${match}`)
      }
    }
    ).catch(error => {
      const { message } = error
      if (message === 'Unauthorized') {
        resetAllContext()
        router.push('/')
      }
    })
  }

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    event.preventDefault()

    setIsLoading(true)
    setPage(value)

    const paginationCursor = (value - 1) * (Number(size) ? Number(size) : 25)
    setFrom(paginationCursor.toString())
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  useEffect(() => {
    handleFetchDogIDs()
  }, [ageMax, ageMin, breeds, from, handleFetchDogIDs, setDogIDs, size, setUser, zipCodes])

  useEffect(() => {
    handleFetchDogs();
  }, [ageMax, ageMin, handleFetchDogs, resultIds, setDogs, , size, user, setUser])

  return (
    <ThemeProvider theme={theme}>
      <div className='mb-20'>
        <div className='flex justify-center size-full gap-4 p-6'>
          <Filters />
        </div>
        <div className='flex justify-center items-center mb-4'>
          <Button sx={{ background: '#7C1E6F', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.313rem' }} className='submit-button' onClick={() => handleMatchDog()} size='medium' type='button' variant='contained'>Match</Button>
        </div>
        <LoadingSpinner
          ariaLabel='dna-loading'
          ballColors={['var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)', 'var(--loadingSpinnerBallColors)']}
          backgroundColor='var(--loadingSpinnerBackgroundColor)'
          height='180'
          visible={isLoading}
          width='180'
          wrapperStyle={{ position: 'fixed', top: '50vh', left: '50vw', transform: 'translate(-50%, -50%)', zIndex: '9999' }}
        />
        <div className='flex-col justify-center'>
          <div className='flex justify-center mb-2'>
            <PaginationRounded count={totalPages} onChange={(e:             ChangeEvent<unknown>, value: number) => handlePageChange(e, value)} page={page} />
          </div>
          <div className='flex flex-wrap gap-6 justify-center mb-6 p-4'>
            <DogCards dogs={dogs} />
          </div>
          <div className='flex justify-center'>
            <PaginationRounded count={totalPages} onChange={(e:             ChangeEvent<unknown>, value: number) => handlePageChange(e, value)} page={page} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Dogs

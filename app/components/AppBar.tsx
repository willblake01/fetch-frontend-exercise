'use client'
import { FC, useCallback, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { Context, ContextType } from '../context'
import { logout } from '../api/userApi'
import logo from '@/app/public/images/fetch-logo.png'

const Appbar: FC = () => {
  const router = useRouter()

  const {
    setAgeMax,
    setAgeMin,
    setBreeds,
    setSavedDogs,
    setSize,
    setSortDirection,
    setSortField,
    setZipCodes,
    user,
    setUser
  } = useContext(Context) as unknown as ContextType

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

  const handleLogout = async () => {
    if (user) {
      Promise.all([await logout(user)]).then(() => resetAllContext()).then(() => router.push('/')).catch(error => console.error(error))
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ bgcolor: '#7C1E6F', display: 'flex', flexDirection: 'row', flexGrow: 1, padding: '1.25rem' }}>
        <Image alt='logo' className='logo' onClick={() => {
          if (!user) {
            router.push('/')
          } else {
            router.push('/search/dogs')
          }
        }} src={logo} style={{ position: 'absolute' }} />
        <div className='flex items-center justify-center w-full'>
          <Typography
            component={'h2'}
            dangerouslySetInnerHTML={{ __html: 'Rescue' }}
            fontFamily='FingerPaint'
            variant={'h1'}
          />
        </div>
        <Toolbar>
          {
            user ? <Button color='inherit' onClick={() => handleLogout()} sx={{ position: 'absolute', right: '0' }}>Logout</Button> : null
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Appbar

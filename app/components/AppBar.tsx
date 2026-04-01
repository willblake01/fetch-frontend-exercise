'use client'
import { FC, useContext } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Context, ContextType } from '../context'
import { useResetContext } from '@/app/hooks'
import { logout } from '../api/userApi'
import logo from '@/app/public/images/fetch-logo.png'

const Appbar: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { resetAllContext } = useResetContext()

  const {
    user
  } = useContext(Context) as unknown as ContextType

  const handleLogout = async () => {
    if (user) {
      try {
        await logout(user)
        resetAllContext()
        router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <AppBar position='static' sx={{ bgcolor: '#7C1E6F', padding: '1.25rem' }}>
      <Toolbar sx={{ position: 'relative', justifyContent: 'center' }}>
        <Image
          alt='logo'
          className='logo'
          src={logo}
          onClick={() => router.push(user ? '/search/dogs' : '/')}
          style={{ position: 'absolute', left: 0, cursor: 'pointer' }}
        />
        <Typography component={'h1'} fontFamily='FingerPaint' variant={'h1'}>
          Rescue
        </Typography>
        {user && pathname !== '/' && (
            <Button color='inherit' onClick={handleLogout} sx={{ position: 'absolute', right: 0 }}>
              Logout
            </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Appbar

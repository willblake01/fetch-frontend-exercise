'use client'
import { FC, useContext } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { Button, Typography } from '@mui/material'
import { Context } from '../context';
import { logout } from '../api/userApi';
import logo from '@/app/public/images/fetch-logo.png';
import type { UserContext } from '../types/User';

const AppBar: FC = () => {
  const router = useRouter()

  const {
    user,
    setUser
  } = useContext(Context) as unknown as UserContext

  const handleLogout = async () => {
    if (user) {
      Promise.all([await logout(user)]).then(() => setUser(null)).then(() => router.push('/')).catch(error => console.error(error));
    }
  }

  return (
    <div className='flex items-center justify-center m-0 p-4 app-bar'>
      <Image alt='logo' className='logo' priority src={logo} style={{ left: 18, position: 'absolute' }} />
      <Typography
        component={'h2'}
        dangerouslySetInnerHTML={{ __html: 'Rescue' }}
        fontFamily='FingerPaint'
        variant={'h1'}
      />
      {user ? <Button
        component='a'
        href='/'
        onClick={() => handleLogout()}
        style={{
          background: 'none',
          color: '#FFFFFF',
          height: 'max-content',
          margin: 0,
          position: 'absolute',
          right: 18,
          width: 'max-content',
        }}
      >
        Logout
      </Button> : null}
    </div>
  );
}

export default AppBar

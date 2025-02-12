'use client'
import { FC, useContext } from 'react';
import Image from "next/image";
import { Button, Typography } from '@mui/material'
import { Context } from '../context';
import logo from "../public/images/fetch-logo.png";

const AppBar: FC = () => {
  interface UserContext {
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  }
  
  const {
    isLoggedIn,
    setIsLoggedIn
  } = useContext(Context) as unknown as UserContext

  return (
    <div className='flex p-4 app-bar'>
      <Image alt='logo' className='logo' priority src={logo} />
      <Typography
        component={'h2'}
        dangerouslySetInnerHTML={{ __html: 'Rescue' }}
        fontFamily="FingerPaint"
        variant={'h1'}
      />
      {isLoggedIn ? <Button
        component="a"
        href="/"
        onClick={() => setIsLoggedIn(false)}
        style={{
          background: 'none',
          color: 'var(--foreground)',
          margin: '0.625rem 0 0 0.625rem',
        }}
      >
        Logout
      </Button> : null}
    </div>
  );
}

export default AppBar

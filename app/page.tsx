'use client'
import React, { FC, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Context } from './context';
import { UserAuthentication } from './components';

const Home: FC = () => {
  const router = useRouter();
  interface UserContext {
    isLoggedIn: boolean
  }

  const {
    isLoggedIn
  } = useContext(Context) as unknown as UserContext

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dogs')
    }
  })

  return (
    <UserAuthentication />
  );
}

export default Home;

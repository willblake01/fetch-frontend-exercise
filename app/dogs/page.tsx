'use client'
import React, { FC, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Context } from '../context';
import { fetchBreeds } from '../utils/fetchDogs';

const Dogs: FC = () => {
  const Router = useRouter()
  interface UserContext {
    isLoggedIn: boolean
  }

  const {
    isLoggedIn
  } = useContext(Context) as unknown as UserContext

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push('/')
    }
    fetchBreeds()
  })

  return (
    <div className='flex justify-center align-center items-center size-full'>
      <h1 className='text-4xl'>Dogs</h1>
    </div>
  )
}

export default Dogs

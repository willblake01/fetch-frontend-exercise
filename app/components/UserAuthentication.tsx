'use client'
import React, { FC, useContext } from 'react';
import { useRouter } from 'next/navigation'
import { Context } from '../context';
import { Box, Button, TextField, Card, CardContent, CardHeader } from '@mui/material';
import { login } from '../utils/userAuthentication';

const UserAuthentication: FC = () => {
  const router = useRouter();

  interface UserContext {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  }

  const {
    setIsLoggedIn
  } = useContext(Context) as unknown as UserContext

  const handleLogin = () => {
    const nameInput = document.getElementById('name-input') as HTMLInputElement;
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    
    const name = nameInput.value;
    const email = emailInput.value;

    const clearInputs = () => {
    (document.getElementById('name-input') as HTMLInputElement).value = '';
    (document.getElementById('email-input') as HTMLInputElement).value = '';
  }

    Promise.all([login({ name, email }), setIsLoggedIn(true), clearInputs()]).then(() => router.push('/dogs'))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  }
  
  return (
    <div className='flex justify-center align-center items-center size-full'>
      <Card sx={{ boxShadow: 3, textAlign: 'center' }} className='authentication-card'>
        <CardHeader title="Welcome to Fetch Rescue!!! Please login. 🐶" />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ '& > :not(style)': { m: 2, display: 'flex', flexDirection: 'column' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="name-input" label="name" variant="outlined" />
            <TextField id="email-input" label="email" variant="outlined" />
            <Button sx={{ background: '#7C1E6F', color: '#ffffff', margin: '10px 0 0 10px', padding: '0.5rem 1rem', borderRadius: '0.313rem' }} className='submit-button' size='medium' type='submit' variant="contained">Submit</Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserAuthentication

'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import { Box, Button, TextField, Card, CardContent, CardHeader } from '@mui/material';
import { login } from '@/utils/userAuthentication';

const UserAuthentication = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameInput = document.getElementById('name-input') as HTMLInputElement;
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    
    const name = nameInput.value;
    const email = emailInput.value;

    const clearInputs = () => {
      (document.getElementById(
          'name-input'
        ) as HTMLInputElement).value = '';
      (document.getElementById(
          'email-input'
        ) as HTMLInputElement).value = '';
    }

    Promise.all([login({ name: name, email: email }), clearInputs()]).then(
      () => router.push('/dogs')
    );
  }
  
  return (
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
          <Button sx={{ margin: '10px 0 0 10px' }} className='submit-button' size='small' type='submit' variant="contained">Submit</Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserAuthentication

import { ChangeEvent } from 'react';
import { Box, Button, TextField, Card, CardContent, CardHeader } from '@mui/material';

interface AuthenticationCardProps {
  onSubmit: (event: ChangeEvent<HTMLFormElement>) => void
}

const AuthenticationCard = ({ onSubmit }: AuthenticationCardProps) => {
  return (
    <Card sx={{ borderRadius: '0.625rem', boxShadow: 3, textAlign: 'center', height: '20rem', width: '33.75rem' }}>
      <CardHeader title='Welcome to Fetch Rescue!!! Please login. 🐶' />
      <CardContent>
        <Box
          component='form'
          onSubmit={onSubmit}
          sx={{ '& > :not(style)': { m: 2, display: 'flex', flexDirection: 'column' } }}
          noValidate
          autoComplete='off'
        >
          <TextField id='name-input' label='name' variant='outlined' />
          <TextField id='email-input' label='email' variant='outlined' />
          <Button sx={{ background: '#7C1E6F', color: '#ffffff', margin: '10px 0 0 10px', padding: '0.5rem 1rem', borderRadius: '0.313rem' }} className='submit-button' size='medium' type='submit' variant='contained'>Submit</Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AuthenticationCard;

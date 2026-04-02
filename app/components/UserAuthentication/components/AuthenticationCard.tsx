import { ChangeEvent } from 'react'
import {Box, Button, TextField, Card, CardContent, CardHeader, Typography} from '@mui/material'

interface AuthenticationCardProps {
    name: string
    email: string
    onNameChange: (name: string) => void
    onEmailChange: (name: string) => void
    onSubmit: (event: ChangeEvent<HTMLFormElement>) => void
    isLoading: boolean
    error: string | null
}

const AuthenticationCard = ({ name, email, onNameChange, onEmailChange, onSubmit, isLoading, error }: AuthenticationCardProps) => {
  return (
    <Card sx={{ borderRadius: '0.625rem', boxShadow: 3, textAlign: 'center', minHeight: '20rem', width: '33.75rem' }}>
      <CardHeader
          title='Welcome to Fetch Rescue! 🐶'
          subheader='Please log in to continue'
      />
      <CardContent>
        <Box
          component='form'
          onSubmit={onSubmit}
          sx={{ '& > :not(style)': { m: 2, display: 'flex', flexDirection: 'column' } }}
          noValidate
          autoComplete='off'
        >
          <TextField
              label='Name'
              variant='outlined'
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
          />
          <TextField
              label='Email'
              variant='outlined'
              type='email'
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
          />
            {error && <Typography color ='error'>{error}</Typography>}
          <Button
              type='submit'
              variant='contained'
              disabled={isLoading}
              sx={{ background: '#7C1E6F', color: '#ffffff', margin: '10px 0 0 10px', padding: '0.5rem 1rem', borderRadius: '0.313rem' }}
              className='submit-button'
              size='medium'
          >
              {isLoading ? 'Logging in...' : 'Submit'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AuthenticationCard

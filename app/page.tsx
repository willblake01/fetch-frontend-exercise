'use client'
import { FC, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Context, ContextType} from './context'
import { UserAuthentication } from './components'

const Home: FC = () => {
  const router = useRouter()

  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  })

  const {
    user
  } = useContext(Context) as unknown as ContextType
  
  useEffect(() => {
    if (user) {
      router.push('/search/dogs')
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className='absolute flex justify-center top-60 w-[100vw]'>
        <UserAuthentication />
      </div>
    </ThemeProvider>
  )
}

export default Home

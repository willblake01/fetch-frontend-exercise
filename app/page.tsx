'use client'
import { FC, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Context } from './context';
import { UserAuthentication } from './components';
import type { UserContext } from './types/User';

const Home: FC = () => {
  const router = useRouter();

  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  const {
    user
  } = useContext(Context) as unknown as UserContext
  
  useEffect(() => {
    if (user) {
      router.push('/search/dogs')
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className='flex-col justify-center h-full'>
        <div className='flex items-center justify-center h-full'>
          <UserAuthentication />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;

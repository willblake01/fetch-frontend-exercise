'use client';
import { Card, CardContent } from '@mui/material';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div className='flex justify-center align-center items-center size-full'>
      <Card sx={{ borderRadius: '0.625rem', boxShadow: 3, textAlign: 'center', height: '20rem', width: '33.75rem' }}>
        <CardContent>
          <h2>Something went wrong!</h2>
          <p>{error.message}</p>
          <button onClick={() => reset()}>Try again</button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Error;

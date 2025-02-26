import { FC, useContext } from 'react'
import { TextField } from '@mui/material';
import { Context, ContextType } from '@/app/context';

const ZipCodes: FC = () => {
  const { zipCodes, setZipCodes } =  useContext(Context) as unknown as ContextType

  interface HandleChangeEvent {
    target: {
      value: string
    }
  }

  const handleChange = (event: HandleChangeEvent) => {
    const {
      target: { value },
    } = event

    setZipCodes(
      typeof value === 'string' && value.length ? value.split(',') : [],
    );
  };

  return (
    <TextField fullWidth id='zipCodes' label='Zip Codes' onChange={handleChange} value={zipCodes || ''} variant='outlined' />
  )
}
export default ZipCodes

import { useContext } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Context } from '@/app/context';

interface ComponentContext {
  size: string | null
  setSize: (size: string) => void
}

const ResultsPerPage = () => {
  const { size, setSize } =  useContext(Context
    ) as unknown as ComponentContext

  const resultsOptions = ['10', '25', '50', '100']

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='results-per-page-select-label'>Results Per Page</InputLabel>
      <Select
        id='results-per-page-select'
        label='Results Per Page'
        labelId='results-per-page-select-label'
        onChange={handleChange}
        value={size ?? ''}
      >
        {
          resultsOptions.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

export default ResultsPerPage

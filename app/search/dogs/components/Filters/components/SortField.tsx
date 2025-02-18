import { useContext } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Context } from '@/app/context';

interface ComponentContext {
  sortField: string | null
  setSortField: (size: string) => void
}

const SortField = () => {
  const { sortField, setSortField } =  useContext(Context
    ) as unknown as ComponentContext

  const resultsOptions = ['age', 'breed', 'name']

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string

    setSortField(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='sort-field-select-label'>Sort</InputLabel>
      <Select
        id='sort-field-select'
        label='Sort Field'
        labelId='sort-field-select-label'
        onChange={handleChange}
        value={sortField ?? ''}
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

export default SortField

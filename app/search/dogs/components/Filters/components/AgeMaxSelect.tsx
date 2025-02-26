import { useContext } from 'react';
import { Context, ContextType } from '@/app/context';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const AgeMaxSelect = () => {
  const { ageMax, setAgeMax } =  useContext(Context
      ) as unknown as ContextType

  const ageRange = Array.from({ length: 35 }, (_, i) => i + 1);

  const handleChange = (event: SelectChangeEvent) => {
    setAgeMax(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='age-max-select-label'>Age Max</InputLabel>
      <Select
        id='age-max-select'
        label='Age Max'
        labelId='age-max-select-label'
        onChange={handleChange}
        value={ageMax ?? ''}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {
          ageRange.map(age => (
            <MenuItem key={age} value={age}>{age}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

export default AgeMaxSelect

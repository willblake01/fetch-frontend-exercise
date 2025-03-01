import { useContext } from 'react'
import { Context, ContextType } from '@/app/context'
import { InputLabel, FormControl, MenuItem, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

const AgeMinSelect = () => {
  const { ageMin, setAgeMin } =  useContext(Context
    ) as unknown as ContextType

  const ageRange = Array.from({ length: 35 }, (_, i) => i + 1)

  const handleChange = (event: SelectChangeEvent) => {
    setAgeMin(event.target.value as string)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='age-min-select-label'>Age Min</InputLabel>
      <Select
        id='age-min-select'
        label='Age Min'
        labelId='age-min-select-label'
        onChange={handleChange}
        value={ageMin ?? ''}
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
  )
}

export default AgeMinSelect

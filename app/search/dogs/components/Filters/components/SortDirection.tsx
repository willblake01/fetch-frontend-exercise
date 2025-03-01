import { useContext } from 'react'
import { FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Context, ContextType } from '@/app/context'

const SortDirection = () => {
  const { sortDirection, setSortDirection } =  useContext(Context
    ) as unknown as ContextType

  const resultsOptions = ['asc', 'desc']

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string

    setSortDirection(value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='sort-direction-select-label'>Direction</InputLabel>
      <Select
        id='sort-direction-select'
        label='Sort Direction'
        labelId='sort-direction-select-label'
        onChange={handleChange}
        value={sortDirection ?? ''}
      >
        {
          resultsOptions.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default SortDirection

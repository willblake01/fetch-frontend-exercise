import { FC, useContext } from 'react'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { Context, ContextType } from '@/app/context'
import { useData } from '@/app/hooks'
import { fetchBreeds } from '@/app/api/dogsApi'

const BreedSelect: FC = () => {
  const { breeds, setBreeds } = useContext(Context) as unknown as ContextType

  // Use useData hook to fetch breeds on mount
  const { data: allBreeds } = useData(
    () => fetchBreeds(),
    []  // Empty deps array = fetch once on mount
  )

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

  const handleChange = (event: SelectChangeEvent<typeof breeds>) => {
    const {
      target: { value },
    } = event

    setBreeds(
      typeof value === 'string' ? value.split(',') : value,
    )
  }


  return (
    <FormControl fullWidth>
      <InputLabel id='breeds-select-label'>Breeds</InputLabel>
      <Select
        id='select-breeds'
        name='breeds'
        input={<OutlinedInput label='Breeds' />}
        label='Breeds'
        labelId='breeds-select-label'
        MenuProps={MenuProps}
        multiple
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        value={breeds ?? []}
      >
        {(allBreeds || []).map((breed: string) => (
          <MenuItem key={breed} value={breed ?? ''}>
            <Checkbox checked={breeds.includes(breed)} />
            <ListItemText primary={breed} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default BreedSelect

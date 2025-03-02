import React, { FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import { Context, ContextType } from '@/app/context'
import { fetchBreeds } from '@/app/api/dogsApi'
import { SelectChangeEvent } from '@mui/material/Select'

const BreedSelect: FC = () => {
  const router = useRouter()

  const { breeds, setBreeds, setUser } =  useContext(Context) as unknown as ContextType
  const [allBreeds, setAllBreeds] = useState<string[]>([])

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

  useEffect(() => {
    Promise.all([fetchBreeds()])
    .then(data => setAllBreeds(data[0]))
    .catch(error => {
      const { message } = error
      if (message === 'Unauthorized') {
        router.push('/')
        setUser(null)
      }
    })
  }, [router, setAllBreeds, setUser])

  return (
    <FormControl fullWidth>
      <InputLabel id='breeds-select-label'>Breeds</InputLabel>
      <Select
        id='select-breeds'
        input={<OutlinedInput label='Tag' />}
        label='Breeds'
        labelId='breeds-select-label'
        MenuProps={MenuProps}
        multiple
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        value={breeds ?? []}
      >
        {allBreeds?.map(breed => (
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

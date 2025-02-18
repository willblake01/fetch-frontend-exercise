import {  FC } from 'react'
import { Box } from '@mui/material'
import { AgeMaxSelect, AgeMinSelect, BreedSelect, ResultsPerPage, SortDirection, SortField, ZipCodes } from './components'

const Filters: FC = () => (
  <>
    <Box sx={{ width: 220 }}>
      <BreedSelect />
    </Box>
    <Box sx={{ width: 220 }}>
      <SortField />
    </Box>
    <Box sx={{ width: 220 }}>
      <SortDirection />
    </Box>
    <Box sx={{ width: 220 }}>
      <AgeMinSelect />
    </Box>
    <Box sx={{ width: 220 }}>
      <AgeMaxSelect />
    </Box>
    <Box sx={{ width: 220 }}>
      <ZipCodes />
    </Box>
    <Box sx={{ width: 220 }}>
      <ResultsPerPage />
    </Box>
  </>
)

export default Filters

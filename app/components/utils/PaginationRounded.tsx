'use client'
import Pagination from '@mui/material/Pagination'
import type { PaginationProps } from '@/app/types/Pagination'

const PaginationRounded = ({ count, onChange, page }: PaginationProps) => {
  return (
      <Pagination count={count} shape='rounded' onChange={onChange} page={page} size='large' />
  )
}

export default PaginationRounded

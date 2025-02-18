import { ChangeEvent } from 'react'

export interface PaginationProps {
  count: number
  onChange: (event: ChangeEvent<unknown>, value: number) => void
  page: number
}

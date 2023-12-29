import React, { memo } from 'react'
import usePagination from '../../hooks/usePagination'
import PaginationItem from './PaginationItem'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams()
  const pagination = usePagination(totalCount, params.get('page') || 1)
  const range = () => {
    const currentPage = +params.get('page')
    const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 8
    const start = (currentPage - 1) * pageSize + 1
    const end = Math.min(currentPage * pageSize, totalCount)
    return `${start} - ${end}`
  }
  return (
    <div className="flex w-full justify-between items-center">
      {!+params.get('page') && (
        <span className="text-sm italic">
          Show product 1 -{' '}
          {Math.min(process.env.REACT_APP_PRODUCT_LIMIT, totalCount) || 10} of{' '}
          {totalCount}{' '}
        </span>
      )}
      {+params.get('page') ? (
        <span className="text-sm italic">
          Show product {range()} of {totalCount}{' '}
        </span>
      ) : (
        ''
      )}
      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  )
}

export default memo(Pagination)

import React, { useEffect } from 'react'
import usePagination from '../../hooks/usePagination'
import PaginationItem from './PaginationItem'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ totalCount, currentPage }) => {
  const [params] = useSearchParams()
  const pagination = usePagination(totalCount, 2)
    const range = () => {
        const pageSize = process.env.REACT_APP_PRODUCT_LIMIT || 8
        const currentPage = +params.get('page')
        const start = ((currentPage - 1) * pageSize) +1
        const end = Math.min(currentPage * pageSize,totalCount)

        return `${start} - ${end}`
    } 
  return (
    <div className="flex w-main justify-between items-center">
      {!+params.get('page') && (
        <span className="text-sm italic">
          Show product 1 - {process.env.REACT_APP_PRODUCT_LIMIT || 8} of{' '}
          {totalCount}{' '}
        </span>
      )}
      {+params.get('page') && (
        <span className="text-sm italic">
          Show product {range()}   of{' '}
          {totalCount}{' '}
        </span>
      )}
      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  )
}

export default Pagination

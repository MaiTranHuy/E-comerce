import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useNavigate, useSearchParams,useParams, createSearchParams } from 'react-router-dom'
const PaginationItem = ({ children }) => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const {category} = useParams()

  const handlePagination = () => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for (let i of param) queries[i[0]] = i[1]
    if (Number(children)) queries.page = children
    navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString()
    })
  }

  return (
    <button
      className={clsx(
        'p-4  w-10 h-10 flex justify-center',
        !Number(children) ? 'items-end pb-2' : 'items-center hover:rounded-full  hover:bg-gray-300', +params.get('page') === children && 'rounded-full bg-gray-300',
        !+params.get('page') && children ===1 && 'rounded-full bg-gray-300'
      )}
      onClick={handlePagination}
      type='button'
      disabled={!Number(children)}
    >
      {children}
    </button>
  )
}

export default PaginationItem

import React, { memo, useEffect, useState } from 'react'
import icons from '../../utils/icons'
import { colors } from '../../utils/constants'
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom'
import { apiGetProducts } from '../../apis'
import { formatMoney } from '../../utils/helpers'
import useDebounce from '../../hooks/useDebounce'

const { AiOutlineDown } = icons
const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = 'checkbox'
}) => {
  const [selected, setSelected] = useState([])
  const [bestPrice, setBestPrice] = useState(null)
  const [price, setPrice] = useState({
    from: '',
    to: ''
  })
  const navigate = useNavigate()
  const { category } = useParams()
  const [params] = useSearchParams()
  const handleSelect = (e) => {
    changeActiveFilter(null)
    const alreadyElement = selected.find((el) => el === e.target.value)
    if (alreadyElement)
      setSelected((prev) => prev.filter((el) => el !== e.target.value))
    else setSelected((prev) => [...prev, e.target.value])
  }
  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for (let i of param) queries[i[0]] = i[1]
    if (selected.length > 0) {
      queries.color = selected.join(',')
    } else delete queries.color
    queries.category = category
    queries.page = 1
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString()
    })
  }, [selected])

  const fetchProductBestPrice = async () => {
    const response = await apiGetProducts({ sort: '-price', limit: 1 })
    if (response.success) setBestPrice(response.data.data.product[0].price)
  }
  useEffect(() => {
    if (type === 'input') {
      fetchProductBestPrice()
    }
  }, [type])

  useEffect(() => {
    if (price.from && price.to && price.from > price.to) alert('From must < To')
  }, [price])

  const debouncePriceFrom = useDebounce(price.from, 500)
  const debouncePriceTo = useDebounce(price.to, 500)

  useEffect(() => {
    let param = []
    for (let i of params.entries()) param.push(i)
    const queries = {}
    for (let i of param) queries[i[0]] = i[1]
    queries.category = category
    queries.page = 1
    if (Number(price.from) > 0) queries.from = price.from
    else delete queries.from
    if (Number(price.to) > 0) queries.to = price.to
    else delete queries.to
    queries.category = category
    queries.page = 1
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString()
    })
  }, [debouncePriceFrom, debouncePriceTo])
  return (
    <div
      className="p-3 cursor-pointer gap-6 text-gray-500 text-xs relative border border-gray-800 flex items-center justify-between"
      onClick={() => changeActiveFilter(name)}
    >
      <span className="capitalize">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div className="absolute z-10 top-[100%] left-0 w-fit p-4 border bg-white min-w[150px]">
          {type === 'checkbox' && (
            <div>
              <div className="p-4 items-center flex justify-between gap-8">
                <span className="whitespace-nowrap">
                  {selected.length} selected
                </span>
                <span
                  className="underline cursor-pointer hover:text-main"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected([])
                    changeActiveFilter(null)
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {colors.map((el, index) => (
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      value={el}
                      key={index}
                      onChange={handleSelect}
                      id={el}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    />
                    <label className="capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === 'input' && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 items-center flex justify-between gap-8">
                <span className="whitespace-nowrap">
                  The highest price {formatMoney(bestPrice)}
                </span>
                <span
                  className="underline cursor-pointer hover:text-main"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPrice({ from: '', to: '' })
                    changeActiveFilter(null)
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className="p-[12px] outline-double border-red-500"
                    type="number"
                    id="from"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className="p-[12px] outline-double border-red-500"
                    type="number"
                    id="to"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default memo(SearchItem)

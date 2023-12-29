import React, { memo, useEffect, useState } from 'react'
import icons from '../../utils/icons'
import { apiGetProducts } from '../../apis/product'
import { formatMoney, renderStars } from '../../utils/helpers'
import CountDown from '../common/CountDown'
import { Link } from 'react-router-dom'

const { AiFillStar, AiOutlineMenu } = icons
let idInterval
const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [expireTime, setExpireTime] = useState(false)

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 20),
      totalRatings: 5
    })
    if (response.success) {
      setDealDaily(response.data.data.product[0])
      const h = 24 - new Date().getHours()
      const m = 60 - new Date().getMinutes()
      const s = 60 - new Date().getSeconds()
      setHour(h)
      setMinute(m)
      setSecond(s)
    } else {
      setHour(0)
      setMinute(59)
      setSecond(59)
    }
  }

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
  }, [expireTime])
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1)
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1)
          setSecond(59)
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1)
            setMinute(59)
          } else {
            setExpireTime(!expireTime)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(idInterval)
    }
  }, [second, minute, hour, expireTime])

  return (
    <div className="w-full flex-auto border p-4">
      <div className="flex items-center justify-center">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="red" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-center flex justify-center text-gray-700">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <Link
        to={`/${dealDaily?.category?.title?.toLowerCase()}/${dealDaily?._id}/${
          dealDaily?.title
        }`}
        className="w-full flex flex-col items-center pt-8 px-4 gap-2"
      >
        <img
          src={
            dealDaily?.images[0] ||
            'https://res-console.cloudinary.com/da0rdutpc/thumbnails/v1/image/upload/v1701367279/RS1jb21tZXJjZS9rY3hnbm43d2Q1a2dqdXFybXNqZA==/grid_landscape'
          }
          alt=""
          className="w-full h-[274px] object-contain"
        />
        <span className="line-clamp-1 text-center"> {dealDaily?.title} </span>
        <span className="flex h-4">
          {renderStars(dealDaily?.totalRatings)?.map((el, index) => (
            <span key={index}>{el}</span>
          ))}{' '}
        </span>
        <span>{formatMoney(dealDaily?.price)} vnd </span>
      </Link>
      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-4">
          <CountDown key="hours" number={hour} unit={'Hours'} />
          <CountDown key="minutes" number={minute} unit={'Minutes'} />
          <CountDown key="seconds" number={second} unit={'Seconds'} />
        </div>
        <button
          type="button"
          className="flex py-2 gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 hover: text-white font-medium"
        >
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  )
}

export default memo(DealDaily)

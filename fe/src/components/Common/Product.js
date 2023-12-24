import React, { memo, useState } from 'react'
import { formatMoney, renderStars } from '../../utils/helpers'
import label from '../../assets/label.webp'
import labelBlue from '../../assets/label-blue.webp'
import SelectOption from './SelectOption'
import icons from '../../utils/icons'
import { Link } from 'react-router-dom'

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons

const Product = ({ productData, isNew, normal = true }) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className="w-full text-base px-[10px]">
      <Link
        to={`/${productData?.category?.title?.toLowerCase()}/${
          productData?._id
        }/${productData?.title}`}
        className="w-full border p-15px flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation(setIsShowOption(true))
        }}
        onMouseLeave={(e) => {
          e.stopPropagation(setIsShowOption(false))
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<BsFillSuitHeartFill />} />
            </div>
          )}
          <img
            src={
              productData?.images[0] ||
              'https://res-console.cloudinary.com/da0rdutpc/thumbnails/v1/image/upload/v1701367279/RS1jb21tZXJjZS9rY3hnbm43d2Q1a2dqdXFybXNqZA==/grid_landscape'
            }
            alt=""
            className="w-[274px] h-[274px] object-cover"
          />
          {!normal && (
            <img
              src={isNew ? label : labelBlue}
              alt=""
              className="absolute top-[1px] left-[-24px] w-[100px] h-[35px] object-cover"
            />
          )}
          {!normal && (
            <span className="absolute font-bold top-[13px] left-[10px] text-white">
              {isNew ? 'Best' : 'New'}
            </span>
          )}
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="line-clamp-1"> {productData?.title} </span>
          <span className="flex h-4">
            {renderStars(productData?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}{' '}
          </span>
          <span>{formatMoney(productData?.price)} vnd </span>
        </div>
      </Link>
    </div>
  )
}

export default memo(Product)

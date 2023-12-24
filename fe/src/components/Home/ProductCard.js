import React, { memo } from 'react'
import { formatMoney, renderStars } from '../../utils/helpers'
import { Link } from 'react-router-dom'

function ProductCard({ productData }) {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <Link
         to={`/${productData?.category?.title?.toLowerCase()}/${productData?._id}/${
          productData?.title
        }`}
        className=" flex border w-full"
      >
        <img
          src={
            productData?.images[0] ||
            'https://res-console.cloudinary.com/da0rdutpc/thumbnails/v1/image/upload/v1701367279/RS1jb21tZXJjZS9rY3hnbm43d2Q1a2dqdXFybXNqZA==/grid_landscape'
          }
          alt=""
          className="w-[120px] object-contain p-4"
        />
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm ">
            {' '}
            {productData?.title}{' '}
          </span>
          <span className="flex h-4">
            {renderStars(productData?.totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}{' '}
          </span>
          <span>{formatMoney(productData?.price)} vnd </span>
        </div>
      </Link>
    </div>
  )
}

export default memo(ProductCard)

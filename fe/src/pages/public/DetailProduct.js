import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from '../../apis'
import {
  Breadcrumb,
  Button,
  SelectQuantity,
  ProductExtraInfoItem,
  ProductInformation,
  CustomSlider
} from '../../components'
import Slider from 'react-slick'
import ReactImageMagnify from 'react-image-magnify'
import { formatMoney, renderStars } from '../../utils/helpers'

import { productExtraInformation } from '../../utils/constants'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
}

const DetailProduct = () => {
  const { pid, title, category } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState(null)

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid)
    if (response.success) setProduct(response.data.data)
  }

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category })
    if (response.success) setRelatedProducts(response.data.data.product)
  }

  useEffect(() => {
    if (pid) {
      fetchProductData()
      fetchProducts()
    }
  }, [pid])

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return
      }
      setQuantity(number)
    },
    [quantity]
  )
  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity > 1) {
      setQuantity((prev) => +prev - 1)
    }
    if (flag === 'plus') setQuantity((prev) => +prev + 1)
  })

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center  bg-gray-100">
        <div className="w-main">
          <h3 className="font-bold">{title}</h3>
          <Breadcrumb title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex gap-2">
        <div className="w-2/5 flex flex-col gap-2">
          <div>
            <ReactImageMagnify
              className="h-[458px] w-[458px]"
              {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: product?.images[0] // dung 2 anh 1200 va 687
                },
                largeImage: {
                  src: product?.images[0],
                  width: 1000,
                  height: 1000
                }
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider className="image-slider" {...settings}>
              {product?.images?.map((el) => (
                <div key={el} className="flex w-full justify-between">
                  {' '}
                  <img
                    src={el}
                    alt="sub"
                    className="h-[143px] w-[143px] object-cover border"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 border">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[30px] font-semibold">
              {formatMoney(product?.price)} vnd
            </h2>
            <span className="text-sm text-main">
              {' '}
              Kho: {product?.quantity}{' '}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-4 px-2">
            <div className="flex">
              {renderStars(product?.totalRatings, 20)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}{' '}
            </div>
            <span> {product?.ratings.length} </span>
            <span className="text-main"> (Đã bán {product?.sold})</span>
          </div>
          <div className="mt-4 text-sm text-gray-500 ">
            {product?.description?.map((el) => (
              <li className="leading-6 px-4" key={el}>
                {el}
              </li>
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 pt-2">
              <span className="font-semibold p-2">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button name="Add to Cart" fw>
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="w-1/5">
          {productExtraInformation.map((el) => (
            <ProductExtraInfoItem
              key={el.id}
              title={el.title}
              icon={el.icon}
              sub={el.sub}
            />
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-8">
        <ProductInformation />
      </div>
      <div className="w-main m-auto my-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          RELATED PRODUCT
        </h3>
        <CustomSlider products={relatedProducts} />
      </div>
    </div>
  )
}

export default DetailProduct

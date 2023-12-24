import React, { useState, useEffect, memo } from 'react'
import { apiGetProducts } from '../../apis/product'
import ProductCard from './ProductCard'

const FeatureProducts = () => {
  const [products, setProducts] = useState(null)
  const fetchProduct = async () => {
    const response = await apiGetProducts({
      limit: 10,
      totalRatings: 5
    })
    if (response.success) {
      setProducts(response.data.data.product)
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [])
  return (
    <div className="w-main">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURE PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-2 mx-[-10px]">
        {products?.map((el) => (
          <ProductCard pid={el.pid} key={el._id} productData={el} />
        ))}
      </div>
      <div>
        <div className="flex justify-between w-full">
          <img
            src={
              'https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661'
            }
            alt=""
            className="w-[50%] object-contain h-[100%]"
          />
          <div className="flex flex-col  w-[24%] gap-6">
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661'
              }
              alt=""
              className=" object-contain"
            />
            <img
              src={
                'https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661'
              }
              alt=""
              className=" object-contain"
            />
          </div>
          <img
            src={
              'https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661'
            }
            alt=""
            className=" w-[24%] object-contain "
          />
        </div>
      </div>
    </div>
  )
}

export default memo(FeatureProducts)

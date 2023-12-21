import React from 'react'
import CustomSlider from '../CustomSlider'
import {  useSelector } from 'react-redux'

function NewArrivals() {
  const { newProducts } = useSelector((state) => state.product)
  return (
    <div className='w-main'>
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        New Arrivals
      </h3>
      <div className="mt-4 mx-[-10px]">
        <CustomSlider products={newProducts}/>
      </div>
    </div>
  )
}

export default NewArrivals

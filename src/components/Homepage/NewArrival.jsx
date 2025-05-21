'use client'

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import Image from 'next/image'
import React from 'react'
import useAllProducts from '../Hooks/useAllProducts'

const NewArrival = () => {
  const { products = [], isProductsLoading, refetch } = useAllProducts()

  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12)

  return (
    <div className='my-20 w-[1200px] mx-auto'>
      <h1 className='text-[#111111] text-[26px] font-bold'>New Arrivals</h1>

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {latestProducts.map((product, index) => (
          <div
            key={index}
            className='w-[280px] bg-[#E5E5E5] shadow-lg rounded-lg p-4 group cursor-pointer hover:shadow-2xl transition duration-300 relative flex flex-col justify-between'
          >
            <div>
              <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[60px] h-[40px] rounded-br-2xl text-white absolute top-0 left-0 flex justify-center items-center font-bold'>
                {Math.round(product.discount)}%
              </div>

              <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[100px] text-[14px] h-[40px] rounded-bl-2xl text-white absolute top-0 right-0 flex text-center justify-center items-center font-semibold'>
                {product.tagline}
              </div>

              <div className='p-4 rounded-lg bg-white group-hover:scale-105 transition duration-300'>
                <Image
                  className='w-full h-[200px] object-contain'
                  src={product.productImages?.[0]}
                  width={300}
                  height={300}
                  alt={product.name}
                />
              </div>

              <h3 className='text-[#111111] text-[18px] mt-5 text-center font-bold min-h-[48px] line-clamp-2'>
                {product.name}
              </h3>

              <div className='mt-3 flex justify-center gap-3 items-center'>
                <p className='text-[#111111] text-[16px] font-semibold'>
                  ৳ {product.price.toLocaleString()}
                </p>
                <p className='text-[#555] text-[16px] font-semibold line-through'>
                  ৳ {(product.price / (1 - product.discount / 100)).toFixed(0)}
                </p>
              </div>

              <div className='mt-3 flex justify-center'>
                <Rating
                  style={{ maxWidth: 140 }}
                  value={product.rating}
                  readOnly
                />
              </div>
            </div>

            <div className='flex items-center gap-3 mt-4'>
              <button className='bg-[#111111] text-[16px] flex-1 px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#555555] transition duration-200 font-bold'>
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewArrival

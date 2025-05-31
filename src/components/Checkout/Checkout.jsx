'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoReturnUpBack } from 'react-icons/io5'

const Checkout = () => {
  let router = useRouter()

  return (
    <div className='bg-[#f1f1f180] pt-10 pb-24 px-6 lg:px-0'>
      <div className='w-[100%] lg:w-[1130px] mx-auto'>
        <button
          onClick={() => {
            router.back()
          }}
          className='bg-[#111] px-8 py-3 hover:bg-[#4d4d4d] cursor-pointer text-white font-bold uppercase text-[13px] transition-colors duration-300 ease-in-out flex items-center gap-3'
        >
          <IoReturnUpBack className='text-white text-[25px] font-bold' />
          Go Back
        </button>

        <div className='mainDiv flex flex-col lg:flex-row gap-10 justify-between items-start mt-6'>
          Checkout
        </div>
      </div>
    </div>
  )
}

export default Checkout

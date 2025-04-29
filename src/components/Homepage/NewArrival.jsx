import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import Image from 'next/image'
import React from 'react'

const NewArrival = () => {
  return (
    <div>
      <div className='my-20 w-[1200px] mx-auto'>
        <h1 className='text-[#111111] text-[26px] font-bold'>New Arrivals</h1>

        <div className='mt-10 flex flex-row gap-10'>
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300 relative'>
            <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[60px] h-[40px] rounded-br-2xl text-white absolute top-0 left-0 flex justify-center items-center font-bold'>
              20%
            </div>

            <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[100px] text-[14px] h-[40px] rounded-bl-2xl text-white absolute top-0 right-0 flex text-center justify-center items-center font-semibold'>
              Best Selling
            </div>
            <div className='p-4 rounded-lg bg-white group-hover:scale-105 transition duration-300'>
              <Image
                className='w-[200px] group-hover:scale-105 transition duration-300'
                src={
                  'https://www.mobiledokan.com/media/honor-200-black-official-image.webp'
                }
                width={700}
                height={700}
                alt='Camera Image'
              />
            </div>
            <h3 className='text-[#111111] text-[18px] mt-5 text-center font-bold'>
              Huawei Honor 200
            </h3>
            <div className='mt-3 flex justify-center gap-3 items-center'>
              <p className='text-[#111111] text-[16px] font-semibold '>
                ৳ 30,000
              </p>
              <p
                className='text-[#111111] text-[16px] font-semibold line-through
'
              >
                ৳ 32,000
              </p>
            </div>

            <div className='flex items-center gap-3 mt-3'>
              <button className='bg-[#111111] text-[16px] flex-1 px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#555555] transition duration-200 font-bold'>
                Details
              </button>
            </div>

            <div className='mt-3 flex justify-center'>
              <Rating style={{ maxWidth: 140 }} value={4} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewArrival

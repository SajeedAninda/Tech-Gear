import Image from 'next/image'
import React from 'react'

const NewArrival = () => {
  return (
    <div>
      <div className='my-20 w-[1200px] mx-auto'>
        <h1 className='text-[#111111] text-[26px] font-bold'>New Arrivals</h1>

        <div className='mt-10 flex flex-row gap-10'>
          <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewArrival

import Image from 'next/image'
import React from 'react'


const NewArrival = () => {
  return (
    <div>
      <div className='my-20 w-[1200px] mx-auto'>
        <h1 className='text-[#111111] text-[26px] font-bold'>New Arrivals</h1>
      </div>

      <div className='mt-10 flex flex-row gap-10'>
        <div className='bg-[#E5E5E5] shadow-lg rounded-lg p-6 group cursor-pointer hover:shadow-2xl transition duration-300'>
          <div className='p-4 rounded-lg bg-white'>
            <Image
              className='group-hover:scale-110 transition duration-300'
              src={'https://www.mobiledokan.com/media/honor-200-black-official-image.webp'}
              width={700}
              height={700}
              alt='Camera Image'
            />
          </div>
          <h3 className='text-[#111111] text-[22px] text-center font-bold group-hover:scale-120 transition duration-300'>
            Smartphones
          </h3>
        </div>
      </div>
    </div>
  )
}

export default NewArrival

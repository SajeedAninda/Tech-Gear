'use client'
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const BannerTypewriter = () => {
  return (
    <div className='mt-10'>
      <TypeAnimation
        className='text-[#111111] mt-10 text-[25px] font-semibold'
        sequence={[
          'Explore the Latest Gadgets and Accessories',
          1000,
          'Shop for the Gears You Love!',
          1000,
          'Smartphones, Laptops, Earbuds, Headphones, Smartwatches & Accessories.',
          1000
        ]}
        wrapper='span'
        speed={50}
        repeat={Infinity}
      />
    </div>
  )
}

export default BannerTypewriter

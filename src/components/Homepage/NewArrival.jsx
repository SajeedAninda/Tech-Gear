import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import Image from 'next/image'
import React from 'react'

const NewArrival = () => {
  const products = [
    {
      name: 'Huawei Honor 200',
      price: 30000,
      discount: 6.25,
      tagline: 'Latest',
      photo: 'https://www.mobiledokan.com/media/honor-200-black-official-image.webp',
      rating: 4
    },
    {
      name: 'Sony WH-1000XM5 Headphones',
      price: 349.99,
      discount: 10,
      tagline: 'Best Seller',
      photo: 'https://electronics.sony.com/content/dam/sony/global/images/products/wh-1000xm5/wh-1000xm5-b.jpg',
      rating: 4.8
    },
    {
      name: 'Apple Watch Series 9',
      price: 399.99,
      discount: 5,
      tagline: 'Latest',
      photo: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_34FR+watch-45-alum-silver-nc-9s_VW_34FR_WF_CO_GEO_US?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1693182461181',
      rating: 4.6
    },
    {
      name: 'JBL Flip 6 Portable Speaker',
      price: 129.95,
      discount: 15,
      tagline: 'Most Popular',
      photo: 'https://www.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw3e5e1a2f/JBL_FLIP6_HERO_BLACK_1605x1605px.png',
      rating: 4.7
    },
    {
      name: 'Canon EOS M50 Mark II Camera',
      price: 649.99,
      discount: 12,
      tagline: 'Best Seller',
      photo: 'https://www.usa.canon.com/internet/wcm/connect/us/2f4c1b3b-3d8e-4e1e-b2c0-9c1e4f8e0b3e/eos-m50-mark-ii-ef-m-15-45mm-is-stm-kit-black-front.png?MOD=AJPERES&CVID=',
      rating: 4.5
    },
    {
      name: 'Samsung Galaxy Buds 2 Pro',
      price: 229.99,
      discount: 20,
      tagline: 'Newcomer',
      photo: 'https://images.samsung.com/is/image/samsung/p6pim/ca/galaxy-buds2-pro/graphite/galaxy-buds2-pro-graphite-01.jpg',
      rating: 4.4
    },
    {
      name: 'Fitbit Charge 6',
      price: 159.95,
      discount: 8,
      tagline: 'Most Popular',
      photo: 'https://store.google.com/product/images/fitbit_charge_6/fitbit_charge_6_black.png',
      rating: 4.2
    },
    {
      name: 'Logitech G502 HERO Gaming Mouse',
      price: 49.99,
      discount: 18,
      tagline: 'Best Seller',
      photo: 'https://resource.logitechg.com/w_1200,h_630,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png?v=1',
      rating: 4.8
    },
    {
      name: 'Anker Soundcore Life Q30 Headphones',
      price: 79.99,
      discount: 25,
      tagline: 'Newcomer',
      photo: 'https://d2211byn0pk9fi.cloudfront.net/spree/products/123456/original/Life_Q30_Black.png?1604051234',
      rating: 4.3
    }
  ]

  return (
    <div>
      <div className='my-20 w-[1200px] mx-auto'>
        <h1 className='text-[#111111] text-[26px] font-bold'>New Arrivals</h1>

        <div className='mt-10 flex flex-wrap gap-10'>
          {products.map((product, index) => (
            <div
              key={index}
              className='w-[280px] bg-[#E5E5E5] shadow-lg rounded-lg p-4 group cursor-pointer hover:shadow-2xl transition duration-300 relative'
            >
              <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[60px] h-[40px] rounded-br-2xl text-white absolute top-0 left-0 flex justify-center items-center font-bold'>
                {Math.round(product.discount)}%
              </div>

              <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[100px] text-[14px] h-[40px] rounded-bl-2xl text-white absolute top-0 right-0 flex text-center justify-center items-center font-semibold'>
                {product.tagline}
              </div>

              <div className='p-4 rounded-lg bg-white group-hover:scale-105 transition duration-300'>
                <Image
                  className='w-full h-[200px] object-contain'
                  src={product.photo}
                  width={300}
                  height={300}
                  alt={product.name}
                />
              </div>

              <h3 className='text-[#111111] text-[18px] mt-5 text-center font-bold'>
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
                <Rating style={{ maxWidth: 140 }} value={product.rating} readOnly />
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
    </div>
  )
}

export default NewArrival

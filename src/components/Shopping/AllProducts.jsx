import React from 'react'
import useAllProducts from '../Hooks/useAllProducts'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Image from 'next/image'
import { GrSearch } from 'react-icons/gr'

const AllProducts = () => {
  const gadgetData = {
    Smartphones: [
      'Apple',
      'Samsung',
      'Xiaomi',
      'OnePlus',
      'Google',
      'Oppo',
      'Vivo',
      'Motorola',
      'Realme',
      'Nokia',
      'Asus',
      'Sony',
      'Huawei',
      'Tecno',
      'Infinix'
    ],
    Laptops: [
      'Dell',
      'HP',
      'Lenovo',
      'Apple',
      'Asus',
      'Acer',
      'Microsoft',
      'MSI',
      'Razer',
      'Samsung'
    ],
    Headphones: [
      'Sony',
      'Bose',
      'Sennheiser',
      'JBL',
      'Beats by Dre',
      'Skullcandy',
      'Audio-Technica'
    ],
    Camera: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic'],
    Earbuds: [
      'Apple',
      'Samsung',
      'OnePlus',
      'Sony',
      'JBL',
      'Realme',
      'Oppo',
      'Nothing',
      'Bose',
      'Beats'
    ],
    Gaming: [],
    Speakers: ['JBL', 'Bose', 'Sony', 'Marshall', 'Harman Kardon'],
    Smartwatches: [
      'Apple',
      'Samsung',
      'Garmin',
      'Fitbit',
      'Huawei',
      'Amazfit',
      'Fossil'
    ]
  }

  let { products } = useAllProducts()

  return (
    <div className='w-full flex justify-between gap-10 mt-10'>
      <div className='filter w-[25%]'>
        <h3 className='text-[#111111] text-[26px] font-bold'>Products</h3>

        {/* Search */}
        <div className='mt-6 relative'>
          <h3 className='text-md font-semibold text-[#111] mb-2'>Search</h3>
          <GrSearch className='text-[#111] text-[20px] absolute top-[44px] left-3'></GrSearch>
          <input
            type='text'
            placeholder='Search by product name...'
            className='w-full pl-10 pr-4 py-2 border border-[#111] rounded-md focus:outline-none focus:ring-2  placeholder:text-[#111]'
          />
        </div>
      </div>

      {/* PRODUCTS TAB  */}
      <div className='products w-[75%]'>
        <h3 className='text-[#111111] text-[26px] font-bold'>Products</h3>

        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {products?.map((product, index) => (
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
                    src={product.productImages[0]}
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
                    ৳{' '}
                    {(product.price / (1 - product.discount / 100)).toFixed(0)}
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
    </div>
  )
}

export default AllProducts

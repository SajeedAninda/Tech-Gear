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
      photo:
        'https://www.mobiledokan.com/media/honor-200-black-official-image.webp',
      rating: 4
    },
    {
      name: 'Sony WH-1000XM5 Headphones',
      price: 15000,
      discount: 10,
      tagline: 'Best Seller',
      photo:
        'https://m.media-amazon.com/images/I/51FgbLyCYOL._AC_UF1000,1000_QL80_.jpg',
      rating: 4.8
    },
    {
      name: 'Apple Watch Series 9',
      price: 28000,
      discount: 5,
      tagline: 'Latest',
      photo:
        'https://i5.walmartimages.com/seo/Apple-Watch-Series-9-With-Blood-Oxygen-GPS-Cellular-45mm-Graphite-Stainless-Steel-Case-with-Midnight-Sport-Band-M-L_72b9364e-dc83-45cc-80ed-1d5f1be4f85c.0e0762e34262398a32979e764d982f84.jpeg',
      rating: 4.6
    },
    {
      name: 'JBL Flip 6 Portable Speaker',
      price: 18000,
      discount: 15,
      tagline: 'Most Popular',
      photo:
        'https://www.startech.com.bd/image/cache/catalog/portable-speaker/Jbl/jbl-flip-6/flip-6-black-001-500x500.webp',
      rating: 4.7
    },
    {
      name: 'Canon EOS M50 Mark II Camera',
      price: 49000,
      discount: 12,
      tagline: 'Best Seller',
      photo:
        'https://media.ldlc.com/r1600/ld/products/00/05/81/63/LD0005816350_1.jpg',
      rating: 4.5
    },
    {
      name: 'Samsung Galaxy Buds 2 Pro',
      price: 27000,
      discount: 20,
      tagline: 'Newcomer',
      photo:
        'https://images.samsung.com/bd/galaxy-buds2-pro/feature//galaxy-buds2-pro-kv-mo.jpg',
      rating: 4.4
    },
    {
      name: 'Fitbit Charge 6',
      price: 19000,
      discount: 8,
      tagline: 'Most Popular',
      photo:
        'https://diamu.com.bd/wp-content/uploads/2022/11/Fitbit-Charge-4.jpg',
      rating: 4.2
    },
    {
      name: 'Logitech G502 HERO Gaming Mouse',
      price: 6200,
      discount: 18,
      tagline: 'Best Seller',
      photo:
        'https://resource.logitechg.com/w_1200,h_630,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png?v=1',
      rating: 4.8
    }
  ]

  return (
    <div>
      <div className='my-20 w-[1200px] mx-auto'>
        <h1 className='text-[#111111] text-[26px] font-bold'>New Arrivals</h1>

        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
          {products.map((product, index) => (
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
                    src={product.photo}
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

export default NewArrival

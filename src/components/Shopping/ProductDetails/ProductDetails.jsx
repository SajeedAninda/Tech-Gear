'use client'
import useAxiosInstance from '@/components/Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaBookmark, FaCartPlus } from 'react-icons/fa'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import useCurrentUser from '@/components/Hooks/useCurrentUser'
import toast from 'react-hot-toast'

const ProductDetails = () => {
  const axiosInstance = useAxiosInstance()
  const params = useParams()
  const id = params?.id
  const { userData } = useCurrentUser()
  const [activeImg, setActiveImg] = useState(null)

  const {
    data: product,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/productDetails/${id}`)
      return res.data
    },
    enabled: !!id
  })

  if (isLoading) return <div className='text-center py-10'>Loading...</div>
  if (isError || !product)
    return <div className='text-center py-10'>Product not found.</div>

  const {
    _id,
    name,
    shortDesc,
    longDesc,
    price,
    discount,
    tagline,
    rating,
    brand,
    category,
    productImages
  } = product

  const discountedPrice = price - (price * discount) / 100

  const handleAddToCart = product => {
    if (userData?.role === 'admin') {
      return toast.error('Administrator cannot add product to cart')
    }

    let cartData = {
      userEmail: userData?.email,
      userName: userData?.name,
      ...product
    }
  }

  return (
    <div className='w-[1200px] mx-auto px-4 py-10 flex gap-10'>
      {/* Image Section */}
      <div className='w-[50%]'>
        <div className='border-2 rounded-lg overflow-hidden w-full h-[500px]'>
          <Image
            src={activeImg || productImages[0]}
            alt={name}
            width={600}
            height={600}
            className='w-full object-contain rounded'
          />
        </div>
        {/* Thumbnail selector */}
        <div className='flex justify-center gap-2 mt-4'>
          {productImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              width={80}
              height={80}
              onClick={() => setActiveImg(img)}
              className={`cursor-pointer border rounded-md p-1 transition ${
                img === activeImg ? 'border-[#111]' : 'border-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className='w-[50%]'>
        <h2 className='text-2xl md:text-[30px] font-semibold mb-2'>{name}</h2>
        <span className='text-sm text-white bg-green-600 px-2 py-1 rounded capitalize'>
          {tagline}
        </span>

        <p className='text-[#111] mt-3'>{shortDesc}</p>

        <div className='flex items-center gap-2 mt-2'>
          <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          <span className='text-gray-500 text-[16px]'>({rating})</span>
        </div>

        <div className='mt-4 space-y-1 text-[16px] text-[#111]'>
          <p>
            <strong>Brand:</strong> {brand}
          </p>
          <p>
            <strong>Category:</strong> {category}
          </p>
        </div>

        <div className='mt-4 space-y-2'>
          {longDesc.split('\n').map((line, index) => {
            if (!line.includes(':')) {
              return (
                <p key={index} className='text-[#111] text-lg'>
                  {line}
                </p>
              )
            }

            const [key, ...rest] = line.split(':')
            return (
              <p key={index} className='text-[#111] text-lg'>
                <span className='font-semibold'>{key.trim()}:</span>
                <span> {rest.join(':').trim()}</span>
              </p>
            )
          })}
        </div>

        <div className='mt-4'>
          <p className='text-[30px] font-bold text-red-500'>
            ৳ {discountedPrice.toLocaleString()}
            <span className='text-gray-400 text-[20px] line-through ml-3'>
              ৳ {price.toLocaleString()}
            </span>
            <span className='ml-2 text-sm text-green-600'>
              ({discount}% off)
            </span>
          </p>
        </div>

        {/* BUTTONS  */}
        <div className='flex items-center gap-4 mt-3'>
          <div className='flex items-center gap-3 mt-4'>
            <button className='bg-[#111111] text-[16px] flex items-center gap-2 px-6 py-3 rounded-lg text-white cursor-pointer hover:bg-[#555555] transition duration-200 font-bold'>
              Order Now
              <MdOutlineShoppingCartCheckout />
            </button>
          </div>
          <div className='flex items-center gap-3 mt-4'>
            <button
              onClick={() => {
                handleAddToCart(product)
              }}
              className='bg-[#111111] text-[16px] flex items-center gap-2 px-6 py-3 rounded-lg text-white cursor-pointer hover:bg-[#555555] transition duration-200 font-bold'
            >
              Add to Cart
              <FaCartPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

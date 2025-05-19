'use client'
import useAxiosInstance from '@/components/Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import { FaBookmark, FaCartPlus } from 'react-icons/fa'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const ProductDetails = () => {
  const axiosInstance = useAxiosInstance()
  const params = useParams()
  const id = params?.id
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

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  if (isError || !product) return <div className="text-center py-10">Product not found.</div>

  const {
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

  return (
    <div className="w-[1200px] mx-auto px-4 py-10 flex gap-10">
      {/* Image Section */}
      <div className='w-[50%]'>
        <div className="border-2 rounded-lg overflow-hidden w-full h-[500px]">
          <Image
            src={activeImg || productImages[0]}
            alt={name}
            width={600}
            height={600}
            className="w-full object-contain rounded"
          />
        </div>
        {/* Thumbnail selector */}
        <div className="flex justify-center gap-2 mt-4">
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
        <h2 className="text-2xl md:text-[30px] font-semibold mb-2">{name}</h2>
        <span className="text-sm text-white bg-green-600 px-2 py-1 rounded capitalize">{tagline}</span>

        <p className="text-[#111] mt-3">{shortDesc}</p>

        <div className="flex items-center gap-2 mt-2">
          <Rating style={{ maxWidth: 120 }} value={rating} readOnly />
          <span className="text-gray-500 text-[16px]">({rating})</span>
        </div>

        <div className="mt-4 space-y-1 text-[16px] text-[#111]">
          <p><strong>Brand:</strong> {brand}</p>
          <p><strong>Category:</strong> {category}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-700 text-lg whitespace-pre-line">{longDesc}</p>
        </div>

        <div className="mt-4 space-y-1 text-sm text-[#111]">
          <p><strong>Brand:</strong> {brand}</p>
          <p><strong>Category:</strong> {category}</p>
        </div>

        <div className="mt-4">
          <p className="text-xl font-bold text-red-500">
            ৳ {discountedPrice.toLocaleString()}
            <span className="text-gray-400 text-sm line-through ml-2">৳ {price.toLocaleString()}</span>
            <span className="ml-2 text-sm text-green-600">({discount}% off)</span>
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2 transition">
            <FaCartPlus /> Order Now
          </button>
          <button className="border border-gray-400 hover:border-[#111] px-4 py-2 rounded-md flex items-center gap-2 transition">
            <FaBookmark /> Bookmark
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

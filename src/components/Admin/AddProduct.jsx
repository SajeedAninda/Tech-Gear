'use client'
import React, { useState } from 'react'
import useAxiosInstance from '../Hooks/useAxiosInstance'

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

const AddProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const axiosInstance = useAxiosInstance()
  let currentTime = new Date()

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value)
    setSelectedBrand('')
  }

  const handleAddProduct = e => {
    e.preventDefault()
  }

  return (
    <div className='mt-6'>
      <form onclick={handleAddProduct} className='space-y-5'>
        <div>
          <h2 className='text-[20px] font-bold'>General Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
            {/* PRODUCT NAME  */}
            <input
              type='text'
              name='name'
              placeholder='Product Name'
              className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
              required
            />
            {/* SHORT DESCRIPTION */}
            <input
              type='text'
              name='shortDesc'
              placeholder='Short Description'
              className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
              required
            />
          </div>

          {/* LONG DESCRIPTION  */}
          <div className='mt-3'>
            <textarea
              name='longDesc'
              placeholder='Brief Description'
              className='border py-2 px-3 rounded-lg placeholder:text-[#111111] w-full'
              rows='5'
            />
          </div>
        </div>

        <div>
          <h2 className='text-[20px] font-bold'>Product Category</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
            {/* Category Dropdown */}
            <select
              name='category'
              className='border py-2 px-3 rounded-lg text-[#111111] bg-white'
              required
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value=''>Choose Product Category</option>
              {Object.keys(gadgetData).map(category => (
                <option
                  key={category}
                  value={category}
                  className='bg-[#111111] text-white'
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Brand Dropdown */}
            <select
              name='brand'
              className={`border py-2 px-3 rounded-lg text-[#111111] bg-white ${
                !selectedCategory ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              disabled={!selectedCategory}
              required
            >
              <option value=''>Choose Brand</option>
              {selectedCategory &&
                gadgetData[selectedCategory]?.map(brand => (
                  <option
                    key={brand}
                    value={brand}
                    className='bg-[#111111] text-white'
                  >
                    {brand}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className='text-[20px] font-bold'>Pricing and General</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
            <input
              type='number'
              name='price'
              placeholder='Price'
              className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
              required
            />
            <input
              type='number'
              name='discount'
              placeholder='Discount %'
              className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
            />
            <select
              name='tagline'
              className='border py-2 px-3 rounded-lg text-[#111111] bg-white transition duration-300 focus:ring-2 focus:ring-[#111111]'
              required
            >
              <option value=''>Choose Product Tagline</option>
              <option value='latest' className='bg-[#111111] text-white'>
                Latest
              </option>
              <option value='best-seller' className='bg-[#111111] text-white'>
                Best Seller
              </option>
              <option value='most-popular' className='bg-[#111111] text-white'>
                Most Popular
              </option>
              <option value='new-comer' className='bg-[#111111] text-white'>
                New Comer
              </option>
              <option value='hot-product' className='bg-[#111111] text-white'>
                Hot Product
              </option>
            </select>

            <input
              type='number'
              name='rating'
              placeholder='Rating (out of 5)'
              min='0'
              max='5'
              step='0.1'
              className='border py-2 px-3 rounded-lg placeholder:text-[#111111]'
            />
          </div>
        </div>

        <button
          type='submit'
          className='flex justify-center hover:bg-[#2e2e2e] w-full cursor-pointer px-10 py-2 mt-10 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'
        >
          Add Product
          <svg
            className='w-8 h-8  group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45'
            viewBox='0 0 16 19'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z'
              className='fill-gray-800 group-hover:fill-gray-800'
            ></path>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default AddProduct

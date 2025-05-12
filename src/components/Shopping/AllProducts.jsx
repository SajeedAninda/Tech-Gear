import React, { useState } from 'react'
import useAllProducts from '../Hooks/useAllProducts'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Image from 'next/image'
import { GrSearch } from 'react-icons/gr'
import { IoIosArrowDown } from 'react-icons/io'

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

  const [searchValue, setSearchValue] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200000)
  const [sortOption, setSortOption] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value)
    setSelectedBrand('')
  }

  let { products } = useAllProducts()

  return (
    <div className='w-full flex justify-between gap-10 mt-10'>
      <div className='filter w-[25%]'>
        <h3 className='text-[#111111] text-[26px] font-bold'>Filters</h3>
        {/* Search */}
        <div className='mt-6 relative'>
          <h3 className='text-md font-semibold text-[#111] mb-3'>Search</h3>
          <GrSearch className='text-[#111] text-[20px] absolute top-[48px] left-3'></GrSearch>
          <input
            onChange={e => {
              setSearchValue(e.target.value)
            }}
            type='text'
            placeholder='Search by product name...'
            className='w-full pl-10 pr-4 py-2 border border-[#111] rounded-md focus:outline-none focus:ring-2  placeholder:text-[#111]'
          />
        </div>
        {/* Price Range */}
        <div className='mt-6'>
          <h3 className='text-md font-semibold text-[#111] mb-3'>
            Price Range
          </h3>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <span className='text-sm text-[#111] whitespace-nowrap'>
                Min:
              </span>
              <input
                type='range'
                min='0'
                max={maxPrice}
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#111]'
              />
              <span className='text-sm text-[#111] whitespace-nowrap'>
                ৳{minPrice}
              </span>
            </div>

            <div className='flex items-center gap-4'>
              <span className='text-sm text-[#111] whitespace-nowrap'>
                Max:
              </span>
              <input
                type='range'
                min={minPrice}
                max='200000'
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#111]'
              />
              <span className='text-sm text-[#111] whitespace-nowrap'>
                ৳{maxPrice}
              </span>
            </div>

            <p className='text-sm text-[#111]'>
              Selected Range: ${minPrice} - ${maxPrice}
            </p>
          </div>
        </div>
        {/* Sort By */}
        <div className='mt-6'>
          <h3 className='text-md font-semibold text-[#111] mb-3'>Sort By</h3>
          <div className='relative'>
            <select
              value={sortOption}
              onChange={e => {
                setSortOption(e.target.value)
              }}
              className='w-full px-4 py-2 border border-gray-300 rounded-md text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-[#111] appearance-none cursor-pointer'
            >
              <option value='default'>Default</option>
              <option value='low-to-high'>Price: Low to High</option>
              <option value='high-to-low'>Price: High to Low</option>
            </select>
            <IoIosArrowDown className='absolute right-5 bottom-3 pointer-events-none' />
          </div>
        </div>
        {/* Category & Brand */}
        <div>
          <h3 className='text-md font-semibold text-[#111] mt-3'>
            Product Category
          </h3>
          <div className='relative mt-2'>
            <select
              name='category'
              className='w-full px-4 py-2 border border-gray-300 rounded-md text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-[#111] appearance-none cursor-pointer'
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value=''>Choose Product Category</option>
              {Object.keys(gadgetData).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <IoIosArrowDown className='absolute right-5 bottom-3' />
          </div>

          {/* Brand Select  */}
          <div>
            <h3 className='text-md font-semibold text-[#111] mt-3'>Brand</h3>

            <div className='relative'>
              <select
                name='brand'
                className={`w-full mt-2 px-4 py-2 border border-gray-300 rounded-md text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-[#111] appearance-none cursor-pointer bg-white ${
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
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
              </select>
              <IoIosArrowDown className='absolute right-5 bottom-3' />
            </div>
          </div>
        </div>
        {/* Tagline  */}
        <div className='mt-6'>
          <h3 className='text-md font-semibold text-[#111] mb-3'>Tagline</h3>
          <div className='mt-2 ml-4 space-y-2'>
            {['Newcomer', 'Best Seller', 'Most Popular', 'Latest'].map(tag => (
              <label
                key={tag}
                className='flex items-center space-x-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={selectedTags.includes(tag)}
                  onChange={() =>
                    setSelectedTags(prev =>
                      prev.includes(tag)
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    )
                  }
                  className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
                />
                <span className='text-gray-700'>{tag}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Rating */}
        <div className='mt-6'>
          <h3 className='text-md font-semibold text-text-[#111] mb-2'>
            Rating
          </h3>
          <ul className='space-y-2'>
            {[1, 2, 3, 4, 5].map(rating => (
              <label
                key={rating}
                className='flex items-center space-x-2 cursor-pointer'
              >
                <input
                  type='radio'
                  name='rating'
                  className='h-4 w-4 text-[#111] border-gray-300 focus:ring-[#111]'
                />
                <span className='text-text-[#111]'>
                  {rating} {Array(rating).fill('★').join('')}
                </span>
              </label>
            ))}
          </ul>
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

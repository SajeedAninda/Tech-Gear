import React from 'react'
import { GrSearch } from 'react-icons/gr'
import { IoIosArrowDown } from 'react-icons/io'

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

const FilterSidebar = ({
  searchValue,
  setSearchValue,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sortOption,
  setSortOption,
  selectedCategory,
  handleCategoryChange,
  selectedBrand,
  setSelectedBrand,
  selectedTag,
  setSelectedTag,
  minRating,
  handleRatingChange,
  setCurrentPage
}) => {
  return (
    <div className='filter w-[25%]'>
      <h3 className='text-[#111111] text-[26px] font-bold'>Filters</h3>

      {/* Search */}
      <div className='mt-6 relative'>
        <h3 className='text-md font-semibold text-[#111] mb-3'>Search</h3>
        <GrSearch className='text-[#111] text-[20px] absolute top-[48px] left-3' />
        <input
          onChange={e => {
            setSearchValue(e.target.value)
            setCurrentPage(1)
          }}
          type='text'
          placeholder='Search by product name...'
          className='w-full pl-10 pr-4 py-2 border border-[#111] rounded-md focus:outline-none focus:ring-2 placeholder:text-[#111]'
        />
      </div>

      {/* Price Range */}
      <div className='mt-6'>
        <h3 className='text-md font-semibold text-[#111] mb-3'>Price Range</h3>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <span className='text-sm text-[#111] whitespace-nowrap'>Min:</span>
            <input
              type='range'
              min='0'
              max={maxPrice}
              value={minPrice}
              onChange={e => {
                setMinPrice(Number(e.target.value))
                setCurrentPage(1)
              }}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#111]'
            />
            <span className='text-sm text-[#111] whitespace-nowrap'>
              ৳{minPrice}
            </span>
          </div>

          <div className='flex items-center gap-4'>
            <span className='text-sm text-[#111] whitespace-nowrap'>Max:</span>
            <input
              type='range'
              min={minPrice}
              max='200000'
              value={maxPrice}
              onChange={e => {
                setMaxPrice(Number(e.target.value))
                setCurrentPage(1)
              }}
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#111]'
            />
            <span className='text-sm text-[#111] whitespace-nowrap'>
              ৳{maxPrice}
            </span>
          </div>
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
              setCurrentPage(1)
            }}
            className='w-full px-4 py-2 border border-gray-300 rounded-md text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-[#111] appearance-none cursor-pointer'
          >
            <option value='default'>Default</option>
            <option value='low-to-high'>Price: Low to High</option>
            <option value='high-to-low'>Price: High to Low</option>
            <option value='rating'>Highest Rating</option>
            <option value='discount'>Highest Discount</option>
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

        {/* Brand Select */}
        <div>
          <h3 className='text-md font-semibold text-[#111] mt-3'>Brand</h3>
          <div className='relative'>
            <select
              name='brand'
              className={`w-full mt-2 px-4 py-2 border border-gray-300 rounded-md text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-[#111] appearance-none cursor-pointer bg-white ${
                !selectedCategory ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              value={selectedBrand}
              onChange={e => {
                setSelectedBrand(e.target.value)
                setCurrentPage(1)
              }}
              disabled={!selectedCategory}
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

      {/* Tagline */}
      <div className='mt-6'>
        <h3 className='text-md font-semibold text-[#111] mb-3'>Tagline</h3>
        <div className='relative'>
          <select
            name='tagline'
            className='w-full px-4 py-2 border border-gray-300 rounded-md text-[#111] focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-[#111] appearance-none cursor-pointer'
            value={selectedTag}
            onChange={e => {
              setSelectedTag(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value=''>Choose Tagline</option>
            <option value='new-comer'>Newcomer</option>
            <option value='best-seller'>Best Seller</option>
            <option value='most-popular'>Most Popular</option>
            <option value='latest'>Latest</option>
          </select>
          <IoIosArrowDown className='absolute right-5 bottom-3' />
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
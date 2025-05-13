import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Image from 'next/image'
import { GrSearch } from 'react-icons/gr'
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward
} from 'react-icons/io'

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

  const axiosInstance = useAxiosInstance()
  const [searchValue, setSearchValue] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200000)
  const [sortOption, setSortOption] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      'products',
      searchValue,
      minPrice,
      maxPrice,
      sortOption,
      selectedCategory,
      selectedBrand,
      selectedTag,
      minRating,
      currentPage
    ],
    queryFn: async () => {
      const response = await axiosInstance.get('/filteredProducts', {
        params: {
          search: searchValue,
          minPrice,
          maxPrice,
          sortBy: sortOption === 'default' ? undefined : sortOption,
          category: selectedCategory,
          brand: selectedBrand,
          tagline: selectedTag,
          minRating,
          page: currentPage
        }
      })
      return response.data
    }
  })

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value)
    setSelectedBrand('')
    setCurrentPage(1)
  }

  const handleRatingChange = rating => {
    setMinRating(rating)
    setCurrentPage(1)
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetFilters = () => {
    setSearchValue('')
    setMinPrice(0)
    setMaxPrice(200000)
    setSortOption('default')
    setSelectedCategory('')
    setSelectedBrand('')
    setSelectedTag('')
    setMinRating(0)
    setCurrentPage(1)
  }

  return (
    <div className='w-full flex justify-between gap-10 mt-10'>
      {/* Filter Sidebar*/}
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
              <span className='text-sm text-[#111] whitespace-nowrap'>
                Max:
              </span>
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
              {/* <option value='newest'>Newest Arrivals</option> */}
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

        {/* Rating
        <div className='mt-6'>
          <h3 className='text-md font-semibold text-[#111] mb-3'>
            Minimum Rating
          </h3>
          <div className='flex items-center gap-2'>
            <Rating
              style={{ maxWidth: 120 }}
              value={minRating}
              onChange={handleRatingChange}
              isRequired
            />
            <span className='text-sm text-gray-600'>
              {minRating > 0 ? `${minRating}+` : 'Any'}
            </span>
          </div>
        </div> */}
      </div>

      {/* Products Section */}
      <div className='products w-[75%]'>
        <h3 className='text-[#111111] text-[26px] font-bold'>Products</h3>
        <h3 className='text-[#111111] text-[16px] font-semibold mt-3'>
          {isLoading
            ? 'Loading...'
            : `${productsData?.pagination?.totalProducts || 0} Products Found`}
        </h3>

        {isLoading ? (
          <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className='w-[280px] h-[400px] bg-gray-200 rounded-lg animate-pulse'
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
              {productsData?.data?.map((product, index) => (
                <div
                  key={index}
                  className='w-[280px] bg-[#E5E5E5] shadow-lg rounded-lg p-4 group cursor-pointer hover:shadow-2xl transition duration-300 relative flex flex-col justify-between'
                >
                  <div>
                    {product.discount > 0 && (
                      <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[60px] h-[40px] rounded-br-2xl text-white absolute top-0 left-0 flex justify-center items-center font-bold'>
                        {Math.round(product.discount)}%
                      </div>
                    )}

                    {product.tagline && (
                      <div className='bg-gradient-to-r from-[#111111] to-[#747373] w-[100px] text-[14px] h-[40px] rounded-bl-2xl text-white absolute top-0 right-0 flex text-center justify-center items-center font-semibold'>
                        {product.tagline}
                      </div>
                    )}

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
                      {product.discount > 0 && (
                        <p className='text-[#555] text-[16px] font-semibold line-through'>
                          ৳{' '}
                          {Math.round(
                            product.price / (1 - product.discount / 100)
                          ).toLocaleString()}
                        </p>
                      )}
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

            {/* Pagination Controls */}
            {productsData?.pagination?.totalPages > 1 && (
              <div className='flex justify-center mt-10 gap-2'>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='p-2 rounded-md cursor-pointer hover:opacity-70 border disabled:opacity-50 hover:bg-gray-100 transition'
                >
                  <IoIosArrowBack />
                </button>

                <button
                  onClick={() => handlePageChange(1)}
                  className={`w-10 h-10 rounded-md ${
                    currentPage === 1
                      ? 'bg-[#111] text-white cursor-pointer hover:opacity-70'
                      : 'border cursor-pointer hover:opacity-70'
                  }`}
                >
                  1
                </button>

                {currentPage > 3 && (
                  <span className='flex items-end px-1'>...</span>
                )}

                {[...Array(productsData.pagination.totalPages)].map(
                  (_, index) => {
                    const page = index + 1
                    if (
                      page > 1 &&
                      page < productsData.pagination.totalPages &&
                      Math.abs(page - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-10 h-10 rounded-md ${
                            currentPage === page
                              ? 'bg-[#111] text-white cursor-pointer hover:opacity-70'
                              : 'border cursor-pointer hover:opacity-70'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    }
                    return null
                  }
                )}

                {currentPage < productsData.pagination.totalPages - 2 && (
                  <span className='flex items-end px-1'>...</span>
                )}

                {productsData.pagination.totalPages > 1 && (
                  <button
                    onClick={() =>
                      handlePageChange(productsData.pagination.totalPages)
                    }
                    className={`w-10 h-10 rounded-md ${
                      currentPage === productsData.pagination.totalPages
                        ? 'bg-[#111] text-white cursor-pointer hover:opacity-70'
                        : 'border cursor-pointer hover:opacity-70over:bg-gray-100'
                    }`}
                  >
                    {productsData.pagination.totalPages}
                  </button>
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === productsData.pagination.totalPages}
                  className='p-2 rounded-md border disabled:opacity-50 cursor-pointer hover:opacity-70 transition'
                >
                  <IoIosArrowForward />
                </button>
              </div>
            )}

            {!isLoading && productsData?.data?.length === 0 && (
              <div className='mt-10 text-center'>
                <h3 className='text-xl font-semibold text-gray-600'>
                  No products found matching your filters
                </h3>
                <button
                  onClick={resetFilters}
                  className='mt-4 bg-[#111111] text-white px-4 py-2 rounded-md hover:bg-[#333333] transition'
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AllProducts

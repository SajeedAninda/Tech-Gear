import React, { useState } from 'react'
import { GrSearch } from 'react-icons/gr'
import useAllProducts from '../Hooks/useAllProducts'

const SearchItems = ({ showSearch, handleShowSearch }) => {
  const { products, isProductsLoading, refetch } = useAllProducts()
  const [searchText, setSearchText] = useState('')

  let filteredProducts

  if (searchText == '') {
    filteredProducts = products
  } else {
    filteredProducts = products?.filter(
      product =>
        product?.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product?.brand.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  return (
    <div className='relative flex items-center gap-4 overflow-visible'>
      <input
        onChange={e => setSearchText(e.target.value)}
        value={searchText}
        className={`absolute -right-[10px] top-1/2 -translate-y-1/2 w-[240px] rounded-lg bg-[#E5E5E5] py-2 px-6 transition-all duration-500 ease-in-out ${
          showSearch
            ? 'opacity-100 visible translate-x-0'
            : 'opacity-0 invisible -translate-x-full'
        }`}
        type='text'
        name='search'
        placeholder='Search for Gears'
      />
      <GrSearch
        onClick={handleShowSearch}
        className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer relative z-10'
      />

      {searchText && filteredProducts?.length > 0 && (
        <div className='absolute -right-[10px] top-full mt-2 w-[320px] max-h-[400px] bg-white rounded-md shadow-lg overflow-y-auto z-20 border'>
          {filteredProducts?.map(product => {
            const discountedPrice = Math.round(
              product.price - (product.price * product.discount) / 100
            )

            return (
              <div
                key={product?._id}
                className='flex items-center gap-5 p-3 hover:bg-gray-100 border-b last:border-b-0 cursor-pointer border-[#111]'
              >
                <img
                  src={product?.productImages[0]}
                  alt={product?.name}
                  className='w-10 h-10 object-cover rounded'
                />
                <div className='flex-1'>
                  <h4 className='text-sm font-medium text-[#111]'>
                    {product?.name}
                  </h4>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='text-red-600 font-semibold'>
                      ৳{discountedPrice}
                    </span>
                    <span className='line-through text-gray-500 text-xs'>
                      ৳{product?.price}
                    </span>
                    <span className='text-green-700 text-xs'>
                      ({product?.discount}% off)
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchItems

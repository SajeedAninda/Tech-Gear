import React from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import Image from 'next/image'
import { IoIosArrowDown, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'

const ProductSection = ({
  productsData,
  isLoading,
  currentPage,
  handlePageChange,
  resetFilters
}) => {
  return (
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

                <Link href={`/shop/product/${product?._id}`}  className='flex items-center gap-3 mt-4'>
                  <button className='bg-[#111111] text-[16px] flex-1 px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#555555] transition duration-200 font-bold'>
                    Details
                  </button>
                </Link>
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

              {[...Array(productsData.pagination.totalPages)].map((_, index) => {
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
              })}

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
  )
}

export default ProductSection
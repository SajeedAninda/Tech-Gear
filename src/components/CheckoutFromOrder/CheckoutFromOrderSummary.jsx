import React from 'react'
import useAllProducts from '../Hooks/useAllProducts'
import { useSearchParams } from 'next/navigation'

const CheckoutFromOrderSummary = () => {
  const { products, isProductsLoading, refetch } = useAllProducts()
  const searchParams = useSearchParams()
  const orderedProductId = searchParams.get('productId')
  const orderedQuantity = Number(searchParams.get('quantity'))

  const orderedProduct = products?.find(
    product => product._id === orderedProductId
  )

  const discountedPrice = orderedProduct
    ? orderedProduct.price -
      (orderedProduct.price * (orderedProduct.discount || 0)) / 100
    : 0

  const totalPayable = orderedProduct ? discountedPrice * orderedQuantity : 0

  return (
    <div className='w-full lg:w-[35%] bg-white rounded-xl py-12 px-6'>
      <h3 className='text-[#191919] uppercase font-bold text-[18px]'>
        Summary
      </h3>

      {!orderedProduct ? (
        <p className='text-[#191919] mt-4 font-bold text-center text-[18px]'>
          No Products Available
        </p>
      ) : (
        <div className='mt-5'>
          <div className='flex justify-between items-start mb-4'>
            <div className='flex gap-4 items-center'>
              <img
                src={orderedProduct?.productImages[0]}
                className='w-16 h-16 object-cover rounded'
                alt={orderedProduct?.name}
              />
              <div>
                <p className='font-bold text-[15px] text-[#191919]'>
                  {orderedProduct?.name}
                </p>
                <p className='text-[#00000080] text-[14px] mt-1 font-semibold'>
                  ৳ {discountedPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className='quantity'>
              <p className='text-[#00000080] mt-1 font-bold'>
                x{orderedQuantity}
              </p>
            </div>
          </div>

          <div className='mt-8 flex justify-between gap-4 items-center'>
            <p className='text-[17px] font-semibold text-[#00000080] uppercase'>
              Total:
            </p>
            <h3 className='text-[#191919] font-bold text-[18px]'>
              ৳ {totalPayable.toFixed(2)}
            </h3>
          </div>

          <div className='mt-3 flex justify-between gap-4 items-center'>
            <p className='text-[17px] font-semibold text-[#00000080] uppercase'>
              Shipping:
            </p>
            <h3 className='text-[#191919] font-bold text-[18px]'>৳ 50.00</h3>
          </div>

          <div className='mt-10 flex justify-between gap-4 items-center'>
            <p className='text-[17px] font-semibold text-[#00000080] uppercase'>
              Grand Total:
            </p>
            <h3 className='text-[#111] font-bold text-[18px]'>
              ৳ {(totalPayable + 50).toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutFromOrderSummary

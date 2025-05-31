import React, { useContext, useState } from 'react'
import { useCart } from '../Provider/CartProvider'

const CheckoutSummary = () => {
 const { cartData, isCartLoading, refetch } = useCart()
  const [quantities, setQuantities] = useState({})

   const totalPayable =
    cartData?.reduce((total, item) => {
      const quantity = quantities[item._id] ?? item.productQuantity
      const discount = item.discount || 0
      const discountedPrice = item.price - (item.price * discount) / 100
      return total + discountedPrice * quantity
    }, 0) || 0

  return (
    <div className='w-full lg:w-[35%] bg-white rounded-xl py-12 px-6'>
      <h3 className='text-[#191919] uppercase font-bold text-[18px]'>
        Summary
      </h3>

      {cartData?.length === 0 ? (
        <p className='text-[#191919] font-bold text-center text-[18px]'>
          Your cart is empty.
        </p>
      ) : (
        <div className='mt-5'>
          {cartData?.map(product => (
            <div
              key={product._id}
              className='flex justify-between items-start mb-4'
            >
              <div className='flex gap-4 items-center'>
                <img
                  src={product?.productImages[0]}
                  className='w-16 h-16 object-cover rounded'
                  alt={product?.name}
                />
                <div>
                  <p className='font-bold text-[15px] text-[#191919]'>
                    {product?.name}
                  </p>
                  <p className='text-[#00000080] text-[14px] mt-1 font-semibold'>
                    {`৳ ${(
                        product.price -
                        (product.price * (product.discount || 0)) / 100
                      ).toFixed(2)}`}
                  </p>
                </div>
              </div>

              <div className='quantity'>
                <p className='text-[#00000080] mt-1 font-bold'>
                  x{product?.productQuantity}
                </p>
              </div>
            </div>
          ))}

          <div className='mt-8 flex justify-between gap-4 items-center'>
            <p className='text-[17px] font-semibold text-[#00000080] uppercase'>
              Total:
            </p>
            <h3 className='text-[#191919] font-bold text-[18px]'>
              $ {totalPayable}
            </h3>
          </div>

          <div className='mt-3 flex justify-between gap-4 items-center'>
            <p className='text-[17px] font-semibold text-[#00000080] uppercase'>
              Shipping:
            </p>
            <h3 className='text-[#191919] font-bold text-[18px]'>$ 50.00</h3>
          </div>

          <div className='mt-10 flex justify-between gap-4 items-center'>
            <p className='text-[17px] font-semibold text-[#00000080] uppercase'>
              Grand Total:
            </p>
            <h3 className='text-[#111] font-bold text-[18px]'>
              $ {(totalPayable + 50 ).toFixed(2)}
            </h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutSummary

import Link from 'next/link'
import React, { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import useAxiosInstance from '../Hooks/useAxiosInstance'

const CartModal = ({ cartData, isCartLoading, refetch, onClose }) => {
  const [quantities, setQuantities] = useState({})
  const axiosInstance = useAxiosInstance()

  const totalPayable =
    cartData?.reduce((total, item) => {
      const quantity = quantities[item._id] ?? item.productQuantity
      const discount = item.discount || 0
      const discountedPrice = item.price - (item.price * discount) / 100
      return total + discountedPrice * quantity
    }, 0) || 0

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => {
      const currentQty =
        prev[productId] ??
        cartData.find(p => p._id === productId)?.productQuantity ??
        1

      const newQty = Math.min(10, Math.max(1, currentQty + delta))

      if (newQty !== currentQty) {
        axiosInstance.patch(`/updateCartPrdtQty/${productId}`, {
          quantity: newQty
        })
        refetch()
      }

      return {
        ...prev,
        [productId]: newQty
      }
    })
  }

  return (
    <div
      className='fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm  flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='bg-white max-h-[90vh] overflow-y-auto rounded-lg px-8 py-6 w-[90%] lg:w-[500px]'
        onClick={e => e.stopPropagation()}
      >
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-bold mb-6 uppercase'>
            Cart ({cartData?.length})
          </h2>
        </div>

        {cartData?.length === 0 ? (
          <p className='text-[#191919] font-bold text-center text-[18px]'>
            Your cart is empty.
          </p>
        ) : (
          <div className='mt-5'>
            {cartData?.map(product => (
              <div
                key={product?._id}
                className='flex justify-between items-center mb-4'
              >
                <div className='flex gap-4 items-center'>
                  <img
                    src={product?.productImages[0]}
                    className='w-16 h-16 object-cover rounded'
                    alt={product?.name}
                  />
                  <div>
                    <p className='font-bold text-[#191919]'>{product?.name}</p>
                    <p className='text-[#00000080] mt-1 font-semibold'>
                      {`৳ ${(
                        product.price -
                        (product.price * (product.discount || 0)) / 100
                      ).toFixed(2)}`}
                    </p>
                  </div>
                </div>

                <div className='cartCounter flex items-center'>
                  <div
                    className='bg-[#f1f1f1] h-[48px] hover:bg-[#d3d2d2] cursor-pointer transition-colors duration-300 ease-in-out py-2 px-4 flex items-center group select-none'
                    onClick={e => {
                      handleQuantityChange(product._id, -1)
                    }}
                  >
                    <FiMinus className='text-[15px] group-hover:text-[#111]' />
                  </div>
                  <div className='bg-[#f1f1f1] h-[48px] font-bold py-2 px-4 text-[15px] flex justify-center items-center'>
                    {product?.productQuantity}
                  </div>
                  <div
                    className='bg-[#f1f1f1] h-[48px] hover:bg-[#d3d2d2] cursor-pointer transition-colors duration-300 ease-in-out py-2 px-4 flex items-center group select-none'
                    onClick={e => {
                      handleQuantityChange(product._id, 1)
                    }}
                  >
                    <FiPlus className='text-[15px] group-hover:text-[#111]' />
                  </div>
                </div>
              </div>
            ))}

            <div className='mt-8 flex justify-center gap-4 items-center'>
              <p className='text-[17px] font-semibold text-[#00000080] uppercase'>
                Total:
              </p>
              <h3 className='text-[#191919] font-bold text-[18px]'>
                ৳ {totalPayable}
              </h3>
            </div>

            <div className='mt-8 w-full flex items-center justify-center text-center'>
              <Link
                onClick={onClose}
                href={'/checkout'}
                className='bg-[#111] w-full px-10 py-3 hover:bg-[#555] text-white font-bold uppercase text-[13px] transition-colors duration-300 ease-in-out'
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartModal

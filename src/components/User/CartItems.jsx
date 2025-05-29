'use client'
import React, { useState } from 'react'
import useCurrentUser from '../Hooks/useCurrentUser'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { RiDeleteBinFill } from 'react-icons/ri'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

const CartItems = () => {
  const { userData, isUserLoading } = useCurrentUser()
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()

  const {
    data: cartData,
    isLoading: isCartLoading,
    refetch
  } = useQuery({
    queryKey: ['cartData', currentUserEmail],
    queryFn: async () => {
      const response = await axiosInstance.get(`/getCart/${currentUserEmail}`)
      return response.data
    },
    enabled: !!currentUserEmail
  })

  const [quantities, setQuantities] = useState({})

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
      }

      return {
        ...prev,
        [productId]: newQty
      }
    })
  }

  const totalPayable =
    cartData?.reduce((total, item) => {
      const quantity = quantities[item._id] ?? item.productQuantity
      const discount = item.discount || 0
      const discountedPrice = item.price - (item.price * discount) / 100
      return total + discountedPrice * quantity
    }, 0) || 0

  const handleDeleteProduct = id => {
    Swal.fire({
      title: 'Do You want to Remove this from Cart?',
      text: 'Once Deleted, you cannot revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111111',
      cancelButtonColor: '#ed4747',
      confirmButtonText: 'Yes, Delete!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/deleteCartProduct/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              toast.success('Removed from Cart')
            }
          })
          .catch(error => {
            console.error('Error:', error)
            toast.error('Failed to remove from Cart')
          })
      }
    })
  }

  return (
    <div>
      <div className='mt-8'>
        <h1 className='text-[22px] text-[#111111] font-bold'>
          Total Products in Cart: {cartData?.length || 0}
        </h1>
      </div>

      <div className='mt-4'>
        <div className='bg-gradient-to-r from-[#111111] to-[#747373] rounded-tl-xl rounded-tr-xl grid grid-cols-12 px-2 md:px-6 py-4'>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            #SL
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            Image
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
            Name
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center'>
            Brand
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center'>
            Price
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center'>
            Quantity
          </div>
          <div className='text-white font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
            Delete
          </div>
        </div>
      </div>

      {cartData ? (
        cartData.map((product, index) => {
          const productQty = quantities[product._id] ?? product.productQuantity

          return (
            <div key={product._id}>
              <Link
                href={`shop/product/${product.productId}`}
                className='bg-[#F7FFF7] border-b-2 border-[#111111] grid grid-cols-12 px-2 md:px-6 py-4 items-center cursor-pointer hover:bg-gray-300 transition-all duration-150'
              >
                <div className='text-[#111111] font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center'>
                  {index + 1}
                </div>

                <div className='text-[#111111] font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center'>
                  <img
                    className='w-[50px] h-[50px] rounded-full object-cover'
                    src={product?.productImages[0]}
                    alt=''
                  />
                </div>

                <div className='text-[#111111] font-bold text-[9px] md:text-base lg:text-[18px] col-span-3 text-center'>
                  {product?.name}
                </div>

                <div className='text-[#111111] font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center'>
                  {product?.brand}
                </div>

                <div className='text-[#111111] font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center capitalize'>
                  {`৳ ${(
                    product.price -
                    (product.price * (product.discount || 0)) / 100
                  ).toFixed(2)}`}
                </div>

                <div className='text-[#111111] font-bold text-[9px] md:text-base lg:text-[18px] col-span-2 text-center capitalize'>
                  <div className='flex items-center gap-3 justify-center'>
                    <button
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleQuantityChange(product._id, -1)
                      }}
                      disabled={productQty <= 1}
                      className={`bg-[#111111] text-white p-1 rounded-lg font-bold cursor-pointer hover:bg-[#555555] transition duration-200 ${
                        productQty <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <FaMinus />
                    </button>

                    <span className='text-[20px] font-semibold'>
                      {productQty}
                    </span>

                    <button
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleQuantityChange(product._id, 1)
                      }}
                      disabled={productQty >= 10}
                      className={`bg-[#111111] text-white p-1 rounded-lg font-bold cursor-pointer hover:bg-[#555555] transition duration-200 ${
                        productQty >= 10 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div
                  onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    handleDeleteProduct(product._id)
                  }}
                  className='text-[#111111] font-bold text-[9px] md:text-base lg:text-[18px] col-span-1 text-center flex justify-center'
                >
                  <RiDeleteBinFill className='text-[12px] md:text-base lg:text-3xl cursor-pointer font-bold text-[#ed4747] hover:opacity-60' />
                </div>
              </Link>
            </div>
          )
        })
      ) : (
        <div>Loading....</div>
      )}

      <div className='mt-8 mr-8 text-right'>
        <h3 className='text-[22px] font-bold text-[#111]'>
          Total Payable: <span className='text-green-700'>৳ {totalPayable.toLocaleString()}</span>
        </h3>
      </div>
    </div>
  )
}

export default CartItems

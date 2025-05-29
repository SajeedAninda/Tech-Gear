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

      <div className='mt-8 mr-8 text-right flex flex-col items-end'>
        <h3 className='text-[22px] font-bold text-[#111]'>
          Total Payable:{' '}
          <span className='text-green-700'>
            ৳ {totalPayable.toLocaleString()}
          </span>
        </h3>

        <button className='flex cursor-pointer px-10 py-2 mt-6 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'>
          Proceed To Checkout
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
      </div>
    </div>
  )
}

export default CartItems

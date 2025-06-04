'use client'
import React from 'react'
import useAuth from '../Hooks/useAuth'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { FaMoneyBillWave } from 'react-icons/fa'

const UserOrders = () => {
  const { loggedInUser } = useAuth()
  const currentUserEmail = loggedInUser?.email
  const axiosInstance = useAxiosInstance()

  const {
    data: userOrders,
    isLoading: isOrdersLoading,
    refetch
  } = useQuery({
    queryKey: ['userOrders', currentUserEmail],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/userOrders/${currentUserEmail}`
      )
      return response.data
    },
    enabled: !!currentUserEmail
  })

  if (isOrdersLoading)
    return <div className='text-center py-10'>Loading...</div>

  return (
    <div className='mt-4'>
      {userOrders?.length === 0 ? (
        <div className='text-center text-gray-700'>No orders found.</div>
      ) : (
        <div className='space-y-8'>
          {userOrders?.map(order => {
            const products = Object.values(order).filter(
              item => typeof item === 'object' && item?.name
            )

            const totalPrice = products.reduce(
              (sum, p) => sum + p.price * p.productQuantity,
              0
            )

            const totalDiscount = products.reduce(
              (sum, p) =>
                sum + ((p.price * p.discount) / 100) * p.productQuantity,
              0
            )

            const priceAfterDiscount = totalPrice - totalDiscount

            return (
              <div
                key={order._id}
                className='border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-all duration-300'
              >
                <div className='mb-4'>
                  <h2 className='text-lg font-semibold text-[#111] mb-2'>
                    Your Order Name: {order.name} ({order.email})
                  </h2>
                  <p className='text-sm text-gray-700'>
                    Your Phone: {order.phone} | Your Address: {order.address},{' '}
                    {order.city}, {order.zip}, {order.country}
                  </p>
                  <p className='text-sm text-gray-700 mt-1 flex items-center gap-1'>
                    <FaMoneyBillWave className='text-green-600' />
                    Your Payment Method:{' '}
                    <span className='ml-1 font-medium capitalize'>
                      {order.paymentMethod}
                    </span>
                  </p>
                </div>

                {/* Products List */}
                <div className='grid md:grid-cols-2 gap-4'>
                  {products.map(product => (
                    <div
                      key={product._id}
                      className='flex gap-4 border p-4 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 transition'
                    >
                      <img
                        src={product.productImages[0]}
                        alt={product.name}
                        className='w-[100px] h-[100px] object-cover rounded-md border'
                      />
                      <div>
                        <h3 className='text-md font-semibold text-gray-800'>
                          {product.name}
                        </h3>
                        <p className='text-sm text-gray-700'>
                          {product.shortDesc}
                        </p>
                        <p className='text-sm mt-1 font-medium text-[#111]'>
                          Quantity: {product.productQuantity}
                        </p>
                        <p className='text-sm mt-1 text-gray-600'>
                          ৳ {product.price.toLocaleString()} -{' '}
                          {product.discount}% off
                        </p>
                        <p className='text-xs text-gray-700 mt-1'>
                          Category: {product.category} | Brand: {product.brand}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-6 border-t pt-4 text-sm text-gray-800 space-y-1 text-center'>
                  <p>
                    <span className='font-medium'>Total Price:</span> ৳{' '}
                    {totalPrice.toLocaleString()}
                  </p>
                  <p>
                    <span className='font-medium'>Total Discount:</span> ৳{' '}
                    {totalDiscount.toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })}
                  </p>
                  <p>
                    <span className='font-medium'>Total After Discount:</span> ৳{' '}
                    {priceAfterDiscount.toLocaleString(undefined, {
                      maximumFractionDigits: 0
                    })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default UserOrders

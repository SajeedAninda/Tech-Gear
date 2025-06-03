'use client'
import React from 'react'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'
import { FaMoneyBillWave } from 'react-icons/fa'
import { MdOutlineLocalShipping } from 'react-icons/md'

const Orders = () => {
  const axiosInstance = useAxiosInstance()
  const {
    data: orders,
    isLoading: isOrdersLoading,
    refetch
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/allOrders`)
      return response.data
    }
  })

  if (isOrdersLoading)
    return <div className='text-center py-10'>Loading...</div>

  return (
    <div className='mt-4'>
      {orders?.length === 0 ? (
        <div className='text-center text-gray-700'>No orders found.</div>
      ) : (
        <div className='space-y-8'>
          {orders.map((order, index) => (
            <div
              key={order._id}
              className='border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-all duration-300'
            >
              <div className='mb-4'>
                <h2 className='text-lg font-semibold text-[#111] mb-2'>
                  Order by: {order.name} ({order.email})
                </h2>
                <p className='text-sm text-gray-700'>
                  Phone: {order.phone} | Address: {order.address}, {order.city},{' '}
                  {order.zip}, {order.country}
                </p>
                <p className='text-sm text-gray-700 mt-1 flex items-center gap-1'>
                  <FaMoneyBillWave className='text-green-600' />
                  Payment Method:{' '}
                  <span className='ml-1 font-medium capitalize'>
                    {order.paymentMethod}
                  </span>
                </p>
              </div>

              <div className='grid md:grid-cols-2 gap-4'>
                {Object.values(order)
                  .filter(item => typeof item === 'object' && item?.name)
                  .map((product, i) => (
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders

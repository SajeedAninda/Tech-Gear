'use client'
import React from 'react'
import { BsBorderStyle } from 'react-icons/bs'
import { PiUsersThreeFill } from 'react-icons/pi'
import useAllProducts from '../Hooks/useAllProducts'
import { AiFillProduct } from 'react-icons/ai'
import useAxiosInstance from '../Hooks/useAxiosInstance'
import { useQuery } from '@tanstack/react-query'

const Dashboard = () => {
  let { products } = useAllProducts()
  let productsCount = products?.length

  const axiosInstance = useAxiosInstance()
  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/allOrders`)
      return response.data
    }
  })

  const { data: userData, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/allUsers`)
      return response.data
    }
  })

  const memberUsers = userData?.filter(user => user.role === 'user')

  return (
    <div className='w-full mt-4 flex justify-between items-center gap-4'>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center gap-4'>
          <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
            <span>Total Products</span>
            <span className='text-[30px] font-bold flex items-center gap-4'>
              <AiFillProduct />
              {productsCount ?? 0}
            </span>
          </div>
          <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
            <span>Total Orders</span>
            <span className='text-[30px] font-bold flex items-center gap-4'>
              <BsBorderStyle />
              {orders?.length ?? 0}
            </span>
          </div>
        </div>
        <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
          <span>Total Users</span>
          <span className='text-[30px] font-bold flex items-center gap-4'>
            <PiUsersThreeFill />
            {memberUsers?.length ?? 0}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Dashboard

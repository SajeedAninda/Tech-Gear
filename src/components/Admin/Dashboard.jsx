'use client'
import React from 'react'
import { BsBorderStyle } from 'react-icons/bs'
import { PiUsersThreeFill } from 'react-icons/pi'
import useAllProducts from '../Hooks/useAllProducts'

const Dashboard = () => {
  let { products } = useAllProducts()

  let productsCount = products?.length


  return (
    <div className='w-full mt-4 flex justify-between items-center gap-4'>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between items-center gap-4'>
          <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
            <span>Total Products</span>
            <span className='text-[30px] font-bold'>{productsCount}</span>
          </div>
          <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
            <span>Total Orders</span>
            <span className='text-[30px] font-bold flex items-center gap-4'>
              <BsBorderStyle /> 20
            </span>
          </div>
        </div>
        <div className='text-[24px] font-semibold text-[#111] p-6 rounded-xl shadow-lg flex flex-col gap-2'>
          <span>Total Users</span>
          <span className='text-[30px] font-bold flex items-center gap-4'>
            <PiUsersThreeFill />
            10
          </span>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Dashboard

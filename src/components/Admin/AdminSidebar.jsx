import Link from 'next/link'
import React from 'react'
import { MdOutlineDashboard } from 'react-icons/md'
import { BsBorderStyle } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { IoSettings } from "react-icons/io5";


const AdminSidebar = () => {
  return (
    <div className='h-full bg-[#111111] rounded-l-2xl py-10 px-8'>
      <Link href={'/'} className='text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-[20px] font-semibold flex items-center gap-2'>
        <MdOutlineDashboard />
        Dashboard
      </Link>
      <Link href={'/'} className='text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-[20px] font-semibold flex items-center gap-2 '>
        <BsBorderStyle />
        Orders
      </Link>
      <Link href={'/'} className='text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-[20px] font-semibold flex items-center gap-2 '>
        <AiFillProduct />
        Products
      </Link>
      <Link href={'/'} className='text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-[20px] font-semibold flex items-center gap-2 '>
        <MdFormatListBulletedAdd />
        Add Products
      </Link>
      <Link href={'/'} className='text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-[20px] font-semibold flex items-center gap-2 '>
        <ImUsers />
        Users
      </Link>
      <Link href={'/'} className='text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 text-[20px] font-semibold flex items-center gap-2 '>
        <IoSettings />
        Settings
      </Link>
    </div>
  )
}

export default AdminSidebar

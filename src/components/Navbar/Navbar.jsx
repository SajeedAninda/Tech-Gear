'use client'
import React, { useState } from 'react'
import logo from '../../images/tech_gear_logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { GrSearch } from 'react-icons/gr'
import { IoPerson } from 'react-icons/io5'
import { RiShoppingCart2Fill } from 'react-icons/ri'

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false)

  const handleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className=''>
      <div className='h-[14vh] bg-white w-[1200px] mx-auto flex items-center justify-between'>
        <Link
          href={'/'}
          className='logo cursor-pointer flex gap-1 items-center'
        >
          <Image src={logo} width={50} alt='Tech Gear Logo' />
          <p className='text-[20px] font-bold'>Tech Gear</p>
        </Link>

        <div className='links flex gap-6 items-center'>
          <p className='text-[#111111] text-[18px] font-semibold hover:opacity-65 cursor-pointer'>
            Home
          </p>
          <p className='text-[#111111] text-[18px] font-semibold hover:opacity-65 cursor-pointer'>
            Shop
          </p>
          <p className='text-[#111111] text-[18px] font-semibold hover:opacity-65 cursor-pointer'>
            About
          </p>
          <p className='text-[#111111] text-[18px] font-semibold hover:opacity-65 cursor-pointer'>
            Contact
          </p>
        </div>

        <div className='customs flex gap-6 items-center'>
          <div className='flex items-center gap-4'>
            <input
              className={`w-[240px] rounded-xl bg-[#E5E5E5] py-2 px-6 ${
                !showSearch ? 'hidden' : ''
              }`}
              type='text'
              name='search'
              placeholder='Search for Gears'
            />
            <GrSearch onClick={handleShowSearch} className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer' />
          </div>
          <IoPerson className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer' />
          <RiShoppingCart2Fill className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Navbar

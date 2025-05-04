'use client'
import React, { useState } from 'react'
import logo from '../../images/tech_gear_logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { GrSearch } from 'react-icons/gr'
import { IoPerson } from 'react-icons/io5'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import useCurrentUser from '../Hooks/useCurrentUser'

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false)

  const handleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  const { userData } = useCurrentUser()
  console.log(userData)
  return (
    <div>
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

        <div className='customs flex gap-6 items-center relative'>
          <div className='flex items-center gap-4 overflow-hidden'>
            <input
              className={`absolute right-20 top-1/2 -translate-y-1/2 w-[240px] rounded-lg bg-[#E5E5E5] py-2 px-6 transition-all duration-500 ease-in-out ${
                showSearch
                  ? 'opacity-100 visible translate-x-0'
                  : 'opacity-0 invisible -translate-x-full'
              }`}
              type='text'
              name='search'
              placeholder='Search for Gears'
            />

            <GrSearch
              onClick={handleShowSearch}
              className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer relative z-10'
            />
          </div>
          <div>
            {userData ? (
              <div>
                <Image className='rounded-full w-[30px] cursor-pointer hover:opacity-65' src={userData?.imageUrl} width={20} height={24} alt='User Image'></Image>
              </div>
            ) : (
              <Link href={'/login'}>
                <IoPerson className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer' />
              </Link>
            )}
          </div>
          <RiShoppingCart2Fill className='text-[#111111] text-[24px] font-bold hover:opacity-65 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Navbar

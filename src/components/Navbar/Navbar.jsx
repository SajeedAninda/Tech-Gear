'use client'
import React, { useState } from 'react'
import logo from '../../images/tech_gear_logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { GrSearch } from 'react-icons/gr'
import { IoPerson } from 'react-icons/io5'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import useCurrentUser from '../Hooks/useCurrentUser'

const gadgetData = {
  Smartphones: [
    'Apple',
    'Samsung',
    'Xiaomi',
    'OnePlus',
    'Google',
    'Oppo',
    'Vivo',
    'Motorola',
    'Realme',
    'Nokia',
    'Asus',
    'Sony',
    'Huawei',
    'Tecno',
    'Infinix'
  ],
  Laptops: [
    'Dell',
    'HP',
    'Lenovo',
    'Apple',
    'Asus',
    'Acer',
    'Microsoft',
    'MSI',
    'Razer',
    'Samsung'
  ],
  Headphones: [
    'Sony',
    'Bose',
    'Sennheiser',
    'JBL',
    'Beats by Dre',
    'Skullcandy',
    'Audio-Technica'
  ],
  Camera: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic'],
  Earbuds: [
    'Apple',
    'Samsung',
    'OnePlus',
    'Sony',
    'JBL',
    'Realme',
    'Oppo',
    'Nothing',
    'Bose',
    'Beats'
  ],
  Gaming: [],
  Speakers: ['JBL', 'Bose', 'Sony', 'Marshall', 'Harman Kardon'],
  Smartwatches: [
    'Apple',
    'Samsung',
    'Garmin',
    'Fitbit',
    'Huawei',
    'Amazfit',
    'Fossil'
  ]
}

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false)
  const handleShowSearch = () => setShowSearch(!showSearch)

  const { userData } = useCurrentUser()

  return (
    <div className='bg-white shadow'>
      <div className='h-[14vh] w-[1200px] mx-auto flex items-center justify-between relative'>
        <Link href='/' className='logo cursor-pointer flex gap-1 items-center'>
          <Image src={logo} width={50} alt='Tech Gear Logo' />
          <p className='text-[20px] font-bold'>Tech Gear</p>
        </Link>

        <div className='links flex gap-6 items-center relative'>
          <p className='text-[#111111] text-[18px] font-semibold hover:opacity-65 cursor-pointer'>
            Home
          </p>

          <div className='relative'>
            <p className='text-[#111111] text-[18px] font-semibold hover:opacity-65 cursor-pointer peer'>
              Shop
            </p>

            {/* Main Dropdown */}
            <div className='absolute top-5 -left-5 mt-2 z-50 opacity-0 invisible peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100 transition duration-300 ease-in-out'>
              <div className='bg-white  shadow-2xl rounded-md w-[300px] flex flex-col gap-2 py-2'>
                {Object.entries(gadgetData).map(([gadget, brands]) => (
                  <div key={gadget} className='relative group'>
                    <p className='font-bold text-[#111] mb-2 whitespace-nowrap cursor-pointer px-4 py-2 transition-all duration-200 hover:bg-[#111111] hover:text-white'>
                    <Link href={`/${gadget}`}>{gadget}</Link>
                    </p>

                    {/* Submenu */}
                    {brands.length > 0 && (
                      <div className='absolute left-40 top-0 ml-2 bg-white shadow-2xl p-2 rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-300 z-50 min-w-[350px]'>
                        <ul className='text-sm space-y-1 grid grid-cols-3'>
                          {brands.map((brand, i) => (
                            <li
                              key={i}
                              className='font-bold text-[#111] mb-2 whitespace-nowrap cursor-pointer px-4 py-2 transition-all duration-200 hover:bg-[#111111] hover:text-white'
                            >
                              <Link href={`/${gadget}/${brand}`}>{brand}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

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
              <Image
                className='rounded-full w-[30px] h-[30px] cursor-pointer hover:opacity-65'
                src={userData?.imageUrl}
                width={30}
                height={30}
                alt='User Image'
              />
            ) : (
              <Link href='/login'>
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

import React from 'react'
import logo from '../../images/tech_gear_logo.png'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=''>
      <div className='h-[14vh] bg-white w-[1200px] mx-auto flex items-center justify-between'>
        <Link href={"/"} className='logo cursor-pointer flex gap-1 items-center'>
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
      </div>
    </div>
  )
}

export default Navbar

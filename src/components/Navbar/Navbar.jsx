import React from 'react'
import logo from '../../images/tech_gear_logo.png'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className=''>
      <div className='h-[14vh] bg-white w-[1200px] mx-auto flex items-center justify-between'>
        <div className='logo flex gap-1 items-center'>
          <Image src={logo} width={50} alt='Tech Gear Logo' />
          <p className='text-[20px] font-bold'>Tech Gear</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar

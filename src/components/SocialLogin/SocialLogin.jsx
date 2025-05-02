import React from 'react'
import { FaGoogle } from 'react-icons/fa'

const SocialLogin = () => {
  return (
    <div className='flex justify-center'>
      <button className='flex justify-center cursor-pointer w-full px-10 py-2 mt-6 gap-2 items-center shadow-xl text-lg text-white hover:text-gray-300 bg-[#111111]  backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10  overflow-hidden border-2 rounded-full group'>
        Google
        <FaGoogle className=' group-hover:rotate-360 text-gray-600 group-hover:text-white transition duration-700' />
      </button>
    </div>
  )
}

export default SocialLogin

'use client'
import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10)
    } else {
      setShow(false)
    }
  }, [isOpen])

  if (!isOpen || !user) return null

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm transition-all duration-300'>
      <div
        className={`bg-white w-full max-w-[750px] p-8 rounded-xl relative shadow-2xl transform transition-all duration-300
          ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-[#111] text-[30px] cursor-pointer font-bold hover:opacity-60 transition-all duration-300'
        >
          <IoIosCloseCircle />
        </button>

        <div className='flex gap-6 items-center'>
          <img
            src={user?.imageUrl}
            alt='User'
            className='w-[120px] h-[120px] rounded-full object-cover'
          />
          <div>
            <h2 className='text-[24px] font-bold text-[#111]'>{user?.name}</h2>
            <p className='text-gray-600 mt-1'>{user?.email}</p>
            <p className='mt-1'>
              Role:{' '}
              <span
                className={`font-semibold capitalize ${
                  user?.role === 'admin' ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {user?.role}
              </span>
            </p>
            <p className='mt-1 text-gray-500'>Member Since: Not Available</p>
          </div>
        </div>

        <div className='mt-8 flex gap-4 justify-end'>
          <button className='bg-[#111] cursor-pointer text-white px-5 py-3 rounded hover:bg-[#333] text-base font-semibold hover:opacity-60 transition-all duration-300'>
            Change Role
          </button>
          <button className='bg-red-600 cursor-pointer text-white px-5 py-3 rounded hover:bg-red-700 text-base font-semibold hover:opacity-60 transition-all duration-300'>
            Delete User
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsModal
